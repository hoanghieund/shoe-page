"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/kokonutui/product-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ProductCarousel component - client component tách từ page.tsx
 * Hiển thị carousel sản phẩm với nút điều hướng
 * @param products - Mảng sản phẩm để hiển thị
 * @param title - Tiêu đề section
 * @param subtitle - Phụ đề section
 * @param icon - Icon component để hiển thị bên cạnh tiêu đề
 */
interface ProductCarouselProps {
  products: Array<{
    id: string;
    name: string;
    price: string;
    image_url?: string;
    isNew?: boolean;
  }>;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export function ProductCarousel({ products, title, subtitle, icon }: ProductCarouselProps) {
  // Ref cho carousel
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // Hàm cuộn nhẹ nhàng cho carousel
  const scrollCarousel = (dir: "prev" | "next") => {
    const el = carouselRef.current;
    if (!el) return;
    // Cuộn theo chiều rộng container để lộ item tiếp theo
    const delta = dir === "next" ? el.clientWidth : -el.clientWidth;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2">
            {icon}
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Prev" onClick={() => scrollCarousel("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Next" onClick={() => scrollCarousel("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div 
        ref={carouselRef} 
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div key={p.id} className="min-w-[280px] snap-start">
            <ProductCard {...p} />
          </div>
        ))}
      </div>
    </>
  );
}
