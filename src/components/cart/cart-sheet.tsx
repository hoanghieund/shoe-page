"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";

/**
 * CartSheet component - Hiển thị giỏ hàng dạng sheet bên phải màn hình
 * Cho phép xem, chỉnh sửa số lượng, xóa sản phẩm và thanh toán
 */
export function CartSheet() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateItemQuantity,
    removeItem,
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center text-xl">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Giỏ hàng ({cart.totalItems})
          </SheetTitle>
        </SheetHeader>
        
        {cart.items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 py-4">
              <div className="space-y-4 pr-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Hình ảnh sản phẩm */}
                    <div className="h-24 w-24 overflow-hidden rounded-md border">
                      <Link href={`/products/${item.slug}`} onClick={closeCart}>
                        <Image
                          src={item.imageUrl || "/placeholder.png"}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                    </div>
                    
                    {/* Thông tin sản phẩm */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link 
                          href={`/products/${item.slug}`} 
                          onClick={closeCart}
                          className="line-clamp-1 font-medium hover:underline"
                        >
                          {item.name}
                        </Link>
                        
                        {item.size && (
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size}
                          </p>
                        )}
                        
                        <p className="mt-1 font-medium">
                          {item.priceFormatted}
                        </p>
                      </div>
                      
                      {/* Điều chỉnh số lượng */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Xóa sản phẩm */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Tổng tiền và thanh toán */}
            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{cart.subtotalFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí vận chuyển</span>
                  <span>{cart.shippingFormatted}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Tổng cộng</span>
                  <span>{cart.totalFormatted}</span>
                </div>
              </div>
              
              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout" onClick={closeCart}>
                    Thanh toán
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={closeCart}
                >
                  Tiếp tục mua sắm
                </Button>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" strokeWidth={1} />
            <div className="text-center">
              <h3 className="text-lg font-medium">Giỏ hàng trống</h3>
              <p className="text-sm text-muted-foreground">
                Bạn chưa thêm sản phẩm nào vào giỏ hàng.
              </p>
            </div>
            <Button asChild>
              <Link href="/" onClick={closeCart}>
                Tiếp tục mua sắm
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
