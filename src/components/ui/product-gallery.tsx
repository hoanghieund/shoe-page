"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";

/**
 * ProductGallery component - Hiển thị gallery hình ảnh sản phẩm
 * Hỗ trợ nhiều hình ảnh và chọn hình ảnh chính
 */
interface ProductGalleryProps {
  images: Array<{
    url: string;
    alt: string;
  }>;
  className?: string;
}

export function ProductGallery({ images, className }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState(0);

  // Fallback nếu không có hình ảnh
  if (!images || images.length === 0) {
    return (
      <div className={cn("aspect-square w-full bg-muted flex items-center justify-center", className)}>
        <p className="text-muted-foreground">Không có hình ảnh</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Hình ảnh chính */}
      <LiquidGlassCard className="aspect-square w-full overflow-hidden rounded-xl">
        <div className="relative h-full w-full">
          <Image
            src={images[selectedImage].url}
            alt={images[selectedImage].alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover object-center"
          />
        </div>
      </LiquidGlassCard>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative h-20 w-20 cursor-pointer overflow-hidden rounded-md border-2",
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/50"
              )}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
