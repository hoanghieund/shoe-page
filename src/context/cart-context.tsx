"use client";

import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { Cart, CartContextType, CartItem } from "@/lib/types/cart";

// Khởi tạo giỏ hàng trống
const initialCart: Cart = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  subtotalFormatted: "0₫",
  shipping: 0,
  shippingFormatted: "0₫",
  total: 0,
  totalFormatted: "0₫"
};

// Tạo context
export const CartContext = React.createContext<CartContextType | undefined>(undefined);

// Format số tiền theo định dạng VND
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0
  }).format(amount);
};

// Tính toán lại tổng giỏ hàng
const recalculateCart = (items: CartItem[]): Cart => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Tính phí vận chuyển: miễn phí nếu đơn hàng > 500.000₫
  const shipping = subtotal >= 500000 ? 0 : 30000;
  
  const total = subtotal + shipping;
  
  return {
    items,
    totalItems,
    subtotal,
    subtotalFormatted: formatCurrency(subtotal),
    shipping,
    shippingFormatted: formatCurrency(shipping),
    total,
    totalFormatted: formatCurrency(total)
  };
};

// Provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  // State cho giỏ hàng và trạng thái hiển thị
  const [cart, setCart] = React.useState<Cart>(initialCart);
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
  
  // Khôi phục giỏ hàng từ localStorage khi component mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Lỗi khi đọc giỏ hàng từ localStorage:", error);
      }
    }
  }, []);
  
  // Lưu giỏ hàng vào localStorage khi thay đổi
  React.useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  
  // Thêm sản phẩm vào giỏ hàng
  const addItem = (newItem: Omit<CartItem, "id">) => {
    setCart(prevCart => {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa (cùng productId và size)
      const existingItemIndex = prevCart.items.findIndex(
        item => item.productId === newItem.productId && item.size === newItem.size
      );
      
      let updatedItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới
        const itemWithId: CartItem = {
          ...newItem,
          id: uuidv4()
        };
        updatedItems = [...prevCart.items, itemWithId];
      }
      
      return recalculateCart(updatedItems);
    });
    
    // Mở giỏ hàng khi thêm sản phẩm
    setIsCartOpen(true);
  };
  
  // Cập nhật số lượng sản phẩm
  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      
      return recalculateCart(updatedItems);
    });
  };
  
  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (itemId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.id !== itemId);
      
      if (updatedItems.length === 0) {
        localStorage.removeItem("cart");
        return initialCart;
      }
      
      return recalculateCart(updatedItems);
    });
  };
  
  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart(initialCart);
  };
  
  // Mở giỏ hàng
  const openCart = () => setIsCartOpen(true);
  
  // Đóng giỏ hàng
  const closeCart = () => setIsCartOpen(false);
  
  // Giá trị context
  const value: CartContextType = {
    cart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    isCartOpen,
    openCart,
    closeCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook để sử dụng context
export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
