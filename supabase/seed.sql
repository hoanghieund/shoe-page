-- Insert sample categories
INSERT INTO public.categories (id, name, slug, description, image_url) VALUES
('11111111-1111-1111-1111-111111111111', 'Giày Nam', 'giay-nam', 'Giày thời trang nam', 'https://example.com/images/categories/men.jpg'),
('22222222-2222-2222-2222-222222222222', 'Giày Nữ', 'giay-nu', 'Giày thời trang nữ', 'https://example.com/images/categories/women.jpg'),
('33333333-3333-3333-3333-333333333333', 'Giày Thể Thao', 'giay-the-thao', 'Giày thể thao đa năng', 'https://example.com/images/categories/sports.jpg'),
('44444444-4444-4444-4444-444444444444', 'Giày Giảm Giá', 'sale', 'Giày đang khuyến mãi', 'https://example.com/images/categories/sale.jpg');

-- Insert sample products
INSERT INTO public.products (id, name, slug, description, price, compare_at_price, category_id, featured) VALUES
-- Men's shoes
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Giày Sneaker Nam Đế Cao', 'giay-sneaker-nam-de-cao', 'Mẫu giày sneaker nam đế cao phong cách Hàn Quốc', 899000, 1200000, '11111111-1111-1111-1111-111111111111', true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Giày Tây Công Sở', 'giay-tay-cong-so', 'Giày tây nam công sở lịch lãm', 1299000, 1599000, '11111111-1111-1111-1111-111111111111', false),
-- Women's shoes
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Giày Cao Gót Quai Ngang', 'giay-cao-got-quai-ngang', 'Giày cao gót nữ quai ngang thanh lịch', 699000, 899000, '22222222-2222-2222-2222-222222222222', true),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Giày Búp Bê Nữ', 'giay-bup-be-nu', 'Giày búp bê nữ dễ thương', 499000, 650000, '22222222-2222-2222-2222-222222222222', false),
-- Sports shoes
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Giày Chạy Bộ Đế Mềm', 'giay-chay-bo-de-mem', 'Giày chạy bộ đế êm ái, thoáng khí', 1599000, 1999000, '33333333-3333-3333-3333-333333333333', true),
-- Sale items
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Giày Lười Nam Da Thật', 'giay-luoi-nam-da-that', 'Giày lười nam da thật mềm mại', 799000, 1499000, '44444444-4444-4444-4444-444444444444', false),
('99999999-9999-9999-9999-999999999999', 'Giày Sandal Nữ Quai Ngang', 'giay-sandal-nu-quai-ngang', 'Sandal nữ quai ngang phong cách Hàn Quốc', 599000, 899000, '44444444-4444-4444-4444-444444444444', true);

-- Insert product sizes and stock
-- Men's shoes (sizes 38-46)
INSERT INTO public.product_sizes (product_id, size, stock, sku) VALUES
-- Sneaker Nam Đế Cao
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '38', 10, 'SNK-M-38'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '39', 15, 'SNK-M-39'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '40', 12, 'SNK-M-40'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '41', 8, 'SNK-M-41'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '42', 5, 'SNK-M-42'),
-- Giày Tây Công Sở
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '39', 7, 'GTC-M-39'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '40', 10, 'GTC-M-40'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '41', 10, 'GTC-M-41'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '42', 15, 'GTC-M-42'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '43', 8, 'GTC-M-43'),
-- Giày Cao Gót Nữ
('cccccccc-cccc-cccc-cccc-cccccccccccc', '35', 5, 'GCN-35'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '36', 10, 'GCN-36'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '37', 12, 'GCN-37'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '38', 8, 'GCN-38'),
-- Giày Búp Bê Nữ
('dddddddd-dddd-dddd-dddd-dddddddddddd', '34', 3, 'GBN-34'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '35', 7, 'GBN-35'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '36', 10, 'GBN-36'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '37', 15, 'GBN-37'),
-- Giày Chạy Bộ
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '38', 10, 'GCB-38'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '39', 15, 'GCB-39'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '40', 20, 'GCB-40'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '41', 15, 'GCB-41'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '42', 10, 'GCB-42'),
-- Giày Lười Nam
('ffffffff-ffff-ffff-ffff-ffffffffffff', '39', 5, 'GLN-39'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '40', 8, 'GLN-40'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '41', 10, 'GLN-41'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '42', 15, 'GLN-42'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '43', 8, 'GLN-43'),
-- Sandal Nữ
('99999999-9999-9999-9999-999999999999', '35', 5, 'SDN-35'),
('99999999-9999-9999-9999-999999999999', '36', 10, 'SDN-36'),
('99999999-9999-9999-9999-999999999999', '37', 12, 'SDN-37'),
('99999999-9999-9999-9999-999999999999', '38', 8, 'SDN-38');

-- Insert product images
INSERT INTO public.product_images (product_id, url, alt_text, position) VALUES
-- Sneaker Nam Đế Cao
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://example.com/images/products/sneaker-nam-1.jpg', 'Sneaker Nam Đế Cao - Ảnh 1', 1),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://example.com/images/products/sneaker-nam-2.jpg', 'Sneaker Nam Đế Cao - Ảnh 2', 2),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://example.com/images/products/sneaker-nam-3.jpg', 'Sneaker Nam Đế Cao - Ảnh 3', 3),
-- Giày Tây Công Sở
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://example.com/images/products/giay-tay-1.jpg', 'Giày Tây Công Sở - Ảnh 1', 1),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'https://example.com/images/products/giay-tay-2.jpg', 'Giày Tây Công Sở - Ảnh 2', 2),
-- Giày Cao Gót Nữ
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://example.com/images/products/giay-cao-got-1.jpg', 'Giày Cao Gót Nữ - Ảnh 1', 1),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://example.com/images/products/giay-cao-got-2.jpg', 'Giày Cao Gót Nữ - Ảnh 2', 2),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'https://example.com/images/products/giay-cao-got-3.jpg', 'Giày Cao Gót Nữ - Ảnh 3', 3),
-- Giày Búp Bê Nữ
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'https://example.com/images/products/giay-bup-be-1.jpg', 'Giày Búp Bê Nữ - Ảnh 1', 1),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'https://example.com/images/products/giay-bup-be-2.jpg', 'Giày Búp Bê Nữ - Ảnh 2', 2),
-- Giày Chạy Bộ
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'https://example.com/images/products/giay-chay-bo-1.jpg', 'Giày Chạy Bộ - Ảnh 1', 1),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'https://example.com/images/products/giay-chay-bo-2.jpg', 'Giày Chạy Bộ - Ảnh 2', 2),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'https://example.com/images/products/giay-chay-bo-3.jpg', 'Giày Chạy Bộ - Ảnh 3', 3),
-- Giày Lười Nam
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'https://example.com/images/products/giay-luoi-nam-1.jpg', 'Giày Lười Nam - Ảnh 1', 1),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'https://example.com/images/products/giay-luoi-nam-2.jpg', 'Giày Lười Nam - Ảnh 2', 2),
-- Sandal Nữ
('99999999-9999-9999-9999-999999999999', 'https://example.com/images/products/sandal-nu-1.jpg', 'Sandal Nữ - Ảnh 1', 1),
('99999999-9999-9999-9999-999999999999', 'https://example.com/images/products/sandal-nu-2.jpg', 'Sandal Nữ - Ảnh 2', 2),
('99999999-9999-9999-9999-999999999999', 'https://example.com/images/products/sandal-nu-3.jpg', 'Sandal Nữ - Ảnh 3', 3);

-- Create a test user (password: Test123!)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'test@example.com',
  '$2a$10$rX9LWtJqkYvGZOn8fW.1UuBd6Qwz9q9Xq9LkXJZJZJZJZJZJZJZJZ',
  '2023-01-01 00:00:00.000+00',
  '2023-01-01 00:00:00.000+00',
  '2023-01-01 00:00:00.000+00',
  '{"provider":"email","providers":["email"],"email_verified":true}',
  '{"email":"test@example.com","email_verified":true,"full_name":"Nguyễn Văn A"}',
  '2023-01-01 00:00:00.000+00',
  '2023-01-01 00:00:00.000+00',
  '',
  '',
  '',
  ''
);

-- Create a test user profile
INSERT INTO public.users (id, email, full_name, phone)
VALUES ('11111111-1111-1111-1111-111111111111', 'test@example.com', 'Nguyễn Văn A', '0901234567');

-- Create a test cart for the user
INSERT INTO public.carts (id, user_id) 
VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111');

-- Add some items to the test cart
INSERT INTO public.cart_items (cart_id, product_id, size_id, quantity)
SELECT 
  '22222222-2222-2222-2222-222222222222', 
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
  id,
  2
FROM public.product_sizes 
WHERE product_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' AND size = '40'
LIMIT 1;

-- Create a test order
INSERT INTO public.orders (
  id,
  user_id,
  order_number,
  status,
  subtotal,
  shipping_fee,
  total,
  shipping_address,
  payment_method,
  payment_status
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'ORD-20230816-000001',
  'delivered',
  1798000,
  30000,
  1828000,
  '{"name":"Nguyễn Văn A","phone":"0901234567","address":"123 Đường Lê Lợi, Quận 1, TP.HCM","city":"Hồ Chí Minh","district":"Quận 1"}',
  'cod',
  'paid'
);

-- Add order items
INSERT INTO public.order_items (
  order_id,
  product_id,
  product_name,
  product_price,
  size,
  quantity,
  total_price
) VALUES 
('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Giày Sneaker Nam Đế Cao', 899000, '40', 2, 1798000);

-- Create an admin user (password: Admin123!)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '44444444-4444-4444-4444-444444444444',
  'authenticated',
  'authenticated',
  'admin@example.com',
  '$2a$10$rX9LWtJqkYvGZOn8fW.1UuBd6Qwz9q9Xq9LkXJZJZJZJZJZJZJZJZ',
  '2023-01-01 00:00:00.000+00',
  '2023-01-01 00:00:00.000+00',
  '2023-01-01 00:00:00.000+00',
  '{"provider":"email","providers":["email"],"email_verified":true,"role":"admin"}',
  '{"email":"admin@example.com","email_verified":true,"full_name":"Admin User"}',
  '2023-01-01 00:00:00.000+00',
  '2023-01-01 00:00:00.000+00',
  '',
  '',
  '',
  ''
);

-- Create admin user profile
INSERT INTO public.users (id, email, full_name, phone)
VALUES ('44444444-4444-4444-4444-444444444444', 'admin@example.com', 'Admin User', '0908765432');

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$
BEGIN
  -- Public read access policies
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.categories;
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.products;
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.product_sizes;
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.product_images;
  
  -- User policies
  DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
  DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
  DROP POLICY IF EXISTS "Users can manage their own carts" ON public.carts;
  DROP POLICY IF EXISTS "Users can manage items in their own cart" ON public.cart_items;
  DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
  
  -- Admin policies
  DROP POLICY IF EXISTS "Admins can manage users" ON public.users;
  DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
  DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
  DROP POLICY IF EXISTS "Admins can manage product sizes" ON public.product_sizes;
  DROP POLICY IF EXISTS "Admins can manage product images" ON public.product_images;
  DROP POLICY IF EXISTS "Admins can manage all carts" ON public.carts;
  DROP POLICY IF EXISTS "Admins can manage all cart items" ON public.cart_items;
  DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
  DROP POLICY IF EXISTS "Admins can manage all order items" ON public.order_items;
END $$;

-- Create policies for public access to products and categories
CREATE POLICY "Enable read access for all users" ON public.categories
FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.products
FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.product_sizes
FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.product_images
FOR SELECT USING (true);

-- Create policies for user-specific data
CREATE POLICY "Users can view their own profile" ON public.users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
FOR UPDATE USING (auth.uid() = id);

-- Create policies for cart management
CREATE POLICY "Users can manage their own carts" ON public.carts
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage items in their own cart" ON public.cart_items
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.carts 
    WHERE carts.id = cart_items.cart_id 
    AND carts.user_id = auth.uid()
  )
);

-- Create policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
FOR SELECT USING (auth.uid() = user_id);

-- Admin policies for each table
CREATE POLICY "Admins can manage users" ON public.users
FOR ALL USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = auth.uid() 
  AND raw_user_meta_data->>'role' = 'admin'
));

CREATE POLICY "Admins can manage categories" ON public.categories
FOR ALL USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = auth.uid() 
  AND raw_user_meta_data->>'role' = 'admin'
));

CREATE POLICY "Admins can manage products" ON public.products
FOR ALL USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = auth.uid() 
  AND raw_user_meta_data->>'role' = 'admin'
));

CREATE POLICY "Admins can manage product sizes" ON public.product_sizes
FOR ALL USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = auth.uid() 
  AND raw_user_meta_data->>'role' = 'admin'
));

CREATE POLICY "Admins can manage product images" ON public.product_images
FOR ALL USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = auth.uid() 
  AND raw_user_meta_data->>'role' = 'admin'
));

CREATE POLICY "Admins can manage all carts" ON public.carts
FOR ALL USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = auth.uid() 
  AND raw_user_meta_data->>'role' = 'admin'
));

CREATE POLICY "Admins can manage all cart items" ON public.cart_items
FOR ALL USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = auth.uid() 
  AND raw_user_meta_data->>'role' = 'admin'
));

CREATE POLICY "Admins can manage all orders" ON public.orders
FOR ALL USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = auth.uid() 
  AND raw_user_meta_data->>'role' = 'admin'
));

CREATE POLICY "Admins can manage all order items" ON public.order_items
FOR ALL USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = auth.uid() 
  AND raw_user_meta_data->>'role' = 'admin'
));

-- Create a function to get the current user's cart ID
CREATE OR REPLACE FUNCTION public.get_my_cart_id()
RETURNS uuid AS $$
DECLARE
  cart_id uuid;
BEGIN
  SELECT id INTO cart_id 
  FROM public.carts 
  WHERE user_id = auth.uid()
  LIMIT 1;
  
  IF cart_id IS NULL THEN
    INSERT INTO public.carts (user_id)
    VALUES (auth.uid())
    RETURNING id INTO cart_id;
  END IF;
  
  RETURN cart_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a view for product listings
CREATE OR REPLACE VIEW public.product_listings AS
SELECT 
  p.*,
  c.name as category_name,
  c.slug as category_slug,
  (SELECT json_agg(DISTINCT ps.size) FROM public.product_sizes ps WHERE ps.product_id = p.id) as available_sizes,
  (SELECT json_agg(pi.url ORDER BY pi.position) FROM public.product_images pi WHERE pi.product_id = p.id) as image_urls,
  (SELECT COALESCE(bool_or(ps.stock > 0), false) FROM public.product_sizes ps WHERE ps.product_id = p.id) as in_stock
FROM 
  public.products p
  LEFT JOIN public.categories c ON p.category_id = c.id;

-- Create a function to search products
CREATE OR REPLACE FUNCTION public.search_products(search_term text)
RETURNS SETOF public.products AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.products
  WHERE 
    to_tsvector('simple', name || ' ' || description) @@ plainto_tsquery('simple', search_term)
    OR name ILIKE '%' || search_term || '%'
    OR description ILIKE '%' || search_term || '%';
END;
$$ LANGUAGE plpgsql STABLE;
