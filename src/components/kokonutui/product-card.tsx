"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";

/**
 * ProductCard - Thẻ sản phẩm theo phong cách KokonutUI
 * - Hiển thị ảnh, tên, giá và CTA
 * - Hiệu ứng hover nâng cao với framer-motion
 * - Hỗ trợ badge cho sản phẩm mới/giảm giá
 * - Nút thêm vào giỏ hàng và yêu thích
 */
export type ProductCardProps = {
  id: string;
  name: string;
  price: string; // định dạng hiển thị, ví dụ: "1.290.000₫"
  originalPrice?: string; // giá gốc trước khi giảm
  href?: string;
  imageUrl?: string;
  isNew?: boolean;
  discount?: number; // phần trăm giảm giá
  rating?: number; // đánh giá sao (1-5)
  className?: string;
};

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  href = `/products/${id}`,
  imageUrl = "https://images.unsplash.com/photo-1528701800489-20be3c2ea4f1?w=800&q=80&auto=format&fit=crop",
  isNew = false,
  discount,
  rating,
  className
}: ProductCardProps): JSX.Element {
  // Hiệu ứng hover với framer-motion
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn("group", className)}
    >
      <LiquidGlassCard 
        className="overflow-hidden h-full flex flex-col p-0"
        variant="secondary"
        intensity="low"
        hoverEffect={true}
      >
        <div className="flex flex-col h-full">
          {/* Ảnh sản phẩm với badge */}
          <div className="p-0 relative">
            <Link href={href} aria-label={name}>
              <div className="aspect-square relative overflow-hidden rounded-t-xl">
                <Image 
                  src={imageUrl} 
                  alt={name} 
                  fill 
                  priority 
                  className="object-cover transition-all duration-300 group-hover:scale-105" 
                />
                
                {/* Overlay gradient khi hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
            
            {/* Badge cho sản phẩm mới hoặc giảm giá */}
            {isNew && (
              <div className="absolute top-2 left-2 bg-[#000000] text-white text-xs font-medium px-2 py-1 rounded-md">
                Mới
              </div>
            )}
            
            {discount && (
              <div className="absolute top-2 right-2 bg-[#FF4D4F] text-white text-xs font-medium px-2 py-1 rounded-md">
                -{discount}%
              </div>
            )}
            
            {/* Nút yêu thích */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ display: discount ? 'none' : 'flex' }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Nội dung: tên, đánh giá, giá */}
          <div className="p-4 flex-grow">
            {/* Đánh giá sao */}
            {rating && (
              <div className="flex items-center mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(rating) ? "text-[#FAAD14] fill-current" : "text-gray-300 fill-current"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
              </div>
            )}
            
            <Link href={href} className="block">
              <p className="text-xs text-muted-foreground">Shoe Store</p>
              <h3 className="mt-1 text-base font-medium tracking-tight line-clamp-2 group-hover:text-[#000000] transition-colors duration-200">
                {name}
              </h3>
            </Link>
            
            <div className="mt-2 flex items-center">
              <p className="font-semibold text-[#000000]">{price}</p>
              {originalPrice && (
                <p className="ml-2 text-sm text-muted-foreground line-through">{originalPrice}</p>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="p-4 pt-0">
            <Button 
              className="w-full group/btn bg-[#000000] hover:bg-[#212121] text-white" 
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </LiquidGlassCard>
    </motion.div>
  );
}
