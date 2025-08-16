export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          price: number
          category_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          price: number
          category_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          price?: number
          category_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Thêm các bảng khác tương tự
    }
    Views: {
      product_listings: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          price: number
          category_id: string
          created_at: string
          updated_at: string
          category_name: string
          category_slug: string
          available_sizes: string[] | null
          image_urls: string[] | null
          in_stock: boolean
        }
      }
    }
    Functions: {
      get_my_cart_id: {
        Args: Record<string, never>
        Returns: string
      }
      get_or_create_cart: {
        Args: { user_id: string }
        Returns: string
      }
      search_products: {
        Args: { search_term: string }
        Returns: {
          id: string
          name: string
          slug: string
          description: string
          price: number
          category_id: string
          created_at: string
          updated_at: string
        }[]
      }
      create_order_from_cart: {
        Args: {
          cart_id: string
          shipping_address: Json
          payment_method: string
        }
        Returns: string
      }
    }
  }
}