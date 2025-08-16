"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingBag } from "lucide-react";

/**
 * CartButton component - Nút hiển thị giỏ hàng trên thanh điều hướng
 * Hiển thị số lượng sản phẩm trong giỏ và mở giỏ hàng khi nhấp vào
 */
export function CartButton() {
  const { cart, openCart } = useCart();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={openCart}
      aria-label="Giỏ hàng"
    >
      <ShoppingBag className="h-5 w-5" />
      {cart.totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          {cart.totalItems}
        </span>
      )}
    </Button>
  );
}
