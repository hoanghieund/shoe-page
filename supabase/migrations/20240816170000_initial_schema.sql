-- Enable necessary extensions
create extension if not exists "uuid-ossp" with schema extensions;

-- Users table (extends auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price decimal(10,2) not null,
  compare_at_price decimal(10,2),
  category_id uuid references public.categories(id) on delete set null,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Product sizes and stock
create table public.product_sizes (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  size text not null,
  stock integer not null default 0,
  sku text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(product_id, size)
);

-- Product images
create table public.product_images (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  url text not null,
  alt_text text,
  position integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Carts
create table public.carts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Cart items
create table public.cart_items (
  id uuid default uuid_generate_v4() primary key,
  cart_id uuid references public.carts(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  size_id uuid references public.product_sizes(id) not null,
  quantity integer not null default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(cart_id, product_id, size_id)
);

-- Orders
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  order_number text unique not null,
  status text not null default 'pending', -- pending, processing, shipped, delivered, cancelled
  subtotal decimal(10,2) not null,
  shipping_fee decimal(10,2) not null,
  discount_amount decimal(10,2) default 0,
  total decimal(10,2) not null,
  shipping_address jsonb not null,
  payment_method text not null,
  payment_status text default 'pending', -- pending, paid, failed, refunded
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order items
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id),
  product_name text not null,
  product_price decimal(10,2) not null,
  size text not null,
  quantity integer not null,
  total_price decimal(10,2) not null
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_sizes enable row level security;
alter table public.product_images enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Create a trigger to handle the updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Apply the trigger to all tables with updated_at
create trigger handle_users_updated_at
  before update on public.users
  for each row execute procedure public.handle_updated_at();

create trigger handle_categories_updated_at
  before update on public.categories
  for each row execute procedure public.handle_updated_at();

create trigger handle_products_updated_at
  before update on public.products
  for each row execute procedure public.handle_updated_at();

create trigger handle_product_sizes_updated_at
  before update on public.product_sizes
  for each row execute procedure public.handle_updated_at();

create trigger handle_carts_updated_at
  before update on public.carts
  for each row execute procedure public.handle_updated_at();

create trigger handle_cart_items_updated_at
  before update on public.cart_items
  for each row execute procedure public.handle_updated_at();

create trigger handle_orders_updated_at
  before update on public.orders
  for each row execute procedure public.handle_updated_at();

-- Create indexes for better performance
create index idx_products_category_id on public.products(category_id);
create index idx_product_sizes_product_id on public.product_sizes(product_id);
create index idx_product_images_product_id on public.product_images(product_id);
create index idx_cart_items_cart_id on public.cart_items(cart_id);
create index idx_order_items_order_id on public.order_items(order_id);
create index idx_orders_user_id on public.orders(user_id);

-- Set up storage for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Set up storage policies for product images
create policy "Public Access"
on storage.objects for select
using (bucket_id = 'product-images');

-- Create a function to generate order numbers
create or replace function public.generate_order_number()
returns text as $$
declare
  nextval bigint;
  padded_val text;
begin
  nextval := (nextval('order_number_seq') % 1000000);
  padded_val := lpad(nextval::text, 6, '0');
  return 'ORD-' || to_char(now()::date, 'YYYYMMDD') || '-' || padded_val;
end;
$$ language plpgsql;

-- Create a sequence for order numbers
create sequence if not exists public.order_number_seq;

-- Modify the orders table to use the order number function
alter table public.orders 
alter column order_number set default public.generate_order_number();

-- Create a function to get or create a user's cart
create or replace function public.get_or_create_cart(user_id uuid)
returns uuid as $$
declare
  cart_id uuid;
begin
  -- Try to get existing cart
  select id into cart_id from public.carts 
  where carts.user_id = get_or_create_cart.user_id
  limit 1;
  
  -- If no cart exists, create one
  if cart_id is null then
    insert into public.carts (user_id)
    values (get_or_create_cart.user_id)
    returning id into cart_id;
  end if;
  
  return cart_id;
end;
$$ language plpgsql security definer;

-- Set up RLS policies for users
create policy "Users can view their own data"
on public.users for select
using (auth.uid() = id);

create policy "Users can update their own data"
on public.users for update
using (auth.uid() = id);

-- Set up RLS policies for carts
create policy "Users can manage their own carts"
on public.carts
for all
using (auth.uid() = user_id);

-- Set up RLS policies for cart items
create policy "Users can manage items in their own cart"
on public.cart_items
for all
using (
  exists (
    select 1 from public.carts 
    where carts.id = cart_items.cart_id 
    and carts.user_id = auth.uid()
  )
);

-- Set up RLS policies for orders
create policy "Users can view their own orders"
on public.orders
for select
using (auth.uid() = user_id);

-- Create a function to create an order from a cart
create or replace function public.create_order_from_cart(
  cart_id uuid,
  shipping_address jsonb,
  payment_method text
)
returns uuid as $$
declare
  order_id uuid;
  cart_record record;
  cart_item record;
  item_total decimal(10,2);
  order_total decimal(10,2) := 0;
  shipping_fee decimal(10,2) := 0; -- You can implement shipping fee calculation
begin
  -- Get cart details
  select * into cart_record from public.carts where id = cart_id and user_id = auth.uid();
  
  if cart_record is null then
    raise exception 'Cart not found';
  end if;
  
  -- Calculate order total
  for cart_item in 
    select ci.*, p.price, ps.size
    from public.cart_items ci
    join public.products p on ci.product_id = p.id
    join public.product_sizes ps on ci.size_id = ps.id
    where ci.cart_id = cart_id
  loop
    item_total := cart_item.price * cart_item.quantity;
    order_total := order_total + item_total;
    
    -- Check stock
    perform 1 from public.product_sizes 
    where id = cart_item.size_id 
    and stock >= cart_item.quantity
    for update;
    
    if not found then
      raise exception 'Insufficient stock for product %', cart_item.product_id;
    end if;
  end loop;
  
  -- Calculate shipping fee (simplified example)
  shipping_fee := 30000; -- 30,000 VND as a flat rate
  
  -- Create order
  insert into public.orders (
    user_id, 
    status, 
    subtotal, 
    shipping_fee, 
    total, 
    shipping_address, 
    payment_method
  ) values (
    auth.uid(),
    'pending',
    order_total,
    shipping_fee,
    order_total + shipping_fee,
    shipping_address,
    payment_method
  )
  returning id into order_id;
  
  -- Add order items and update stock
  for cart_item in 
    select ci.*, p.name as product_name, p.price, ps.size
    from public.cart_items ci
    join public.products p on ci.product_id = p.id
    join public.product_sizes ps on ci.size_id = ps.id
    where ci.cart_id = cart_id
  loop
    -- Add order item
    insert into public.order_items (
      order_id,
      product_id,
      product_name,
      product_price,
      size,
      quantity,
      total_price
    ) values (
      order_id,
      cart_item.product_id,
      cart_item.product_name,
      cart_item.price,
      cart_item.size,
      cart_item.quantity,
      cart_item.price * cart_item.quantity
    );
    
    -- Update stock
    update public.product_sizes
    set stock = stock - cart_item.quantity
    where id = cart_item.size_id;
  end loop;
  
  -- Clear cart
  delete from public.cart_items where cart_id = cart_id;
  
  return order_id;
end;
$$ language plpgsql security definer;
