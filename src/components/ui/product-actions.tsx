"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";
import { ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";

/**
 * ProductActions component - Hiển thị các action cho sản phẩm
 * Bao gồm: chọn size, số lượng, thêm vào giỏ hàng, yêu thích, chia sẻ
 */
interface ProductActionsProps {
  productId: string;
  productName: string;
  price: string;
  priceRaw?: number; // Giá gốc dạng số để thêm vào giỏ hàng
  imageUrl?: string;
  slug: string;
  sizes?: Array<{
    value: string;
    label: string;
    inStock: boolean;
  }>;
}

export function ProductActions({ 
  productId, 
  productName, 
  price, 
  priceRaw = 0, 
  imageUrl, 
  slug,
  sizes = [] 
}: ProductActionsProps) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast({
        title: "Vui lòng chọn kích cỡ",
        description: "Bạn cần chọn kích cỡ trước khi thêm vào giỏ hàng",
        variant: "destructive",
      });
      return;
    }

    // Thêm sản phẩm vào giỏ hàng thông qua context
    addItem({
      productId,
      name: productName,
      price: priceRaw,
      priceFormatted: price, // Thêm giá đã định dạng
      quantity,
      size: selectedSize || undefined,
      imageUrl,
      slug
    });
    
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} ${productName} ${selectedSize ? `- Size ${selectedSize}` : ""}`
    });
  };

  // Xử lý thêm vào yêu thích
  const handleAddToWishlist = () => {
    // TODO: Thêm logic yêu thích thực tế
    toast({
      title: "Đã thêm vào danh sách yêu thích",
      description: productName
    });
  };

  // Xử lý chia sẻ
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productName,
        text: `Xem sản phẩm ${productName} tại Shoe Store`,
        url: window.location.href,
      }).catch((error) => console.log('Lỗi chia sẻ:', error));
    } else {
      // Fallback: Copy URL vào clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Đã sao chép liên kết",
        description: "Liên kết đã được sao chép vào clipboard"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Giá */}
      <div>
        <h2 className="text-3xl font-bold">{price}</h2>
        <p className="text-sm text-muted-foreground mt-1">Đã bao gồm thuế</p>
      </div>

      {/* Chọn size */}
      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Kích cỡ</span>
            <button className="text-xs text-primary hover:underline">
              Hướng dẫn chọn size
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size.value}
                className={`h-10 rounded-md border text-center text-sm font-medium transition-colors
                  ${selectedSize === size.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  }
                  ${!size.inStock ? "cursor-not-allowed opacity-50" : ""}
                `}
                disabled={!size.inStock}
                onClick={() => setSelectedSize(size.value)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Số lượng */}
      <div>
        <span className="text-sm font-medium mb-2 block">Số lượng</span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Các nút hành động */}
      <div className="flex flex-col space-y-2">
        <Button size="lg" className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Thêm vào giỏ hàng
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={handleAddToWishlist}>
            <Heart className="mr-2 h-4 w-4" />
            Yêu thích
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Chia sẻ
          </Button>
        </div>
      </div>

      {/* Thông tin giao hàng */}
      <LiquidGlassCard className="p-4" variant="secondary" intensity="low">
        <div className="space-y-2 text-sm">
          <p className="font-medium">Thông tin giao hàng:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Miễn phí giao hàng cho đơn từ 500.000₫</li>
            <li>• Giao hàng tiêu chuẩn: 2-4 ngày</li>
            <li>• Giao hàng nhanh: 1-2 ngày (phụ phí)</li>
            <li>• Đổi trả miễn phí trong 30 ngày</li>
          </ul>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
