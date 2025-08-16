import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row'];

export type Enums<T extends keyof Database['public']['Enums']> = 
  Database['public']['Enums'][T];

export type Product = Tables<'products'> & {
  images: Tables<'product_images'>[];
  sizes: Tables<'product_sizes'>[];
  category: Tables<'categories'> | null;
};

export type CartItem = Tables<'cart_items'> & {
  product: Product;
  size: Tables<'product_sizes'>;
};

export type Cart = Tables<'carts'> & {
  items: CartItem[];
};

export type OrderItem = Tables<'order_items'> & {
  product: Tables<'products'> | null;
};

export type Order = Tables<'orders'> & {
  items: OrderItem[];
};

export type UserProfile = Tables<'users'>;
