"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

/**
 * OrderSummary component - Hiển thị tóm tắt đơn hàng trong trang thanh toán
 * Bao gồm danh sách sản phẩm, tổng tiền, phí vận chuyển và tổng thanh toán
 */
export function OrderSummary() {
  const { cart, removeItem } = useCart();
  
  // Tính tổng số lượng sản phẩm
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <LiquidGlassCard className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Tóm tắt đơn hàng</h3>
          <span className="text-sm text-muted-foreground">
            {totalItems} sản phẩm
          </span>
        </div>
        
        {cart.items.length > 0 ? (
          <>
            <div className="divide-y">
              {cart.items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-secondary">
                        <span className="text-xs text-muted-foreground">Không có ảnh</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <Link 
                        href={`/products/${item.slug}`}
                        className="font-medium hover:underline"
                      >
                        {item.name}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Xóa sản phẩm</span>
                      </Button>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Size: {item.size}</span>
                      <span className="mx-2">•</span>
                      <span>Số lượng: {item.quantity}</span>
                    </div>
                    
                    <div className="font-medium">
                      {item.priceFormatted}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex justify-between text-sm">
                <span>Tạm tính</span>
                <span>{cart.subtotalFormatted}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển</span>
                <span>{cart.shippingFormatted}</span>
              </div>
              
              <div className="flex justify-between font-medium">
                <span>Tổng thanh toán</span>
                <span>{cart.totalFormatted}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Giỏ hàng của bạn đang trống</p>
            <Button asChild>
              <Link href="/products">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        )}
      </div>
    </LiquidGlassCard>
  );
}
