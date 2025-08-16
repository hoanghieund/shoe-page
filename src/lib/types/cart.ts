/**
 * Định nghĩa các kiểu dữ liệu liên quan đến giỏ hàng
 */

// Kiểu dữ liệu cho một sản phẩm trong giỏ hàng
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  priceFormatted: string;
  quantity: number;
  size?: string;
  color?: string;
  imageUrl?: string;
  slug: string;
}

// Kiểu dữ liệu cho toàn bộ giỏ hàng
export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  subtotalFormatted: string;
  shipping: number;
  shippingFormatted: string;
  total: number;
  totalFormatted: string;
}

// Kiểu dữ liệu cho context giỏ hàng
export interface CartContextType {
  cart: Cart;
  addItem: (item: Omit<CartItem, "id">) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

// Kiểu dữ liệu cho sản phẩm thêm vào giỏ hàng
export interface AddToCartProps {
  productId: string;
  name: string;
  price: number;
  priceFormatted: string;
  quantity: number;
  size?: string;
  color?: string;
  imageUrl?: string;
  slug: string;
}
