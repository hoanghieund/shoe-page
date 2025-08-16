"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Hero } from "@/components/kokonutui/hero";
import { ProductCard } from "@/components/kokonutui/product-card";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { ShieldCheck, Truck, RefreshCcw, Clock } from "lucide-react";

/**
 * Trang chủ sử dụng các components KokonutUI
 * - Hero (CTA chính)
 * - Lưới ProductCard demo
 * - Nút trigger toast để kiểm tra shadcn/ui
 */
export default function HomePage() {
  const { toast } = useToast();

  // Demo data tạm thời; sẽ thay bằng data thật từ Supabase sau
  const products = [
    { id: "alpha", name: "Alpha Runner Pro", price: "1.590.000₫" },
    { id: "beta", name: "Beta Street Classic", price: "1.290.000₫" },
    { id: "gamma", name: "Gamma Trail Max", price: "1.890.000₫" },
    { id: "delta", name: "Delta City Flex", price: "1.490.000₫" },
    { id: "omega", name: "Omega Sport Air", price: "2.190.000₫" },
    { id: "nova", name: "Nova Sprint Light", price: "1.390.000₫" },
  ];

  return (
    <>
      {/* Hero theo phong cách KokonutUI */}
      <Hero />

      {/* Section tính năng nổi bật với LiquidGlassCard */}
      <section className="container py-12 md:py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tính năng nổi bật</h2>
          <p className="mt-2 text-muted-foreground">Trải nghiệm mua sắm tuyệt vời cùng Shoe Store</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LiquidGlassCard className="p-6" variant="info" intensity="medium">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium">Chính hãng 100%</h3>
              <p className="text-sm text-muted-foreground">Cam kết chỉ bán sản phẩm chính hãng, có nguồn gốc rõ ràng</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6" variant="success" intensity="medium">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium">Giao hàng miễn phí</h3>
              <p className="text-sm text-muted-foreground">Miễn phí giao hàng toàn quốc cho đơn hàng từ 500.000₫</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6" variant="warning" intensity="medium">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <RefreshCcw className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-medium">Đổi trả dễ dàng</h3>
              <p className="text-sm text-muted-foreground">Đổi trả sản phẩm trong vòng 30 ngày nếu không vừa ý</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6" variant="primary" intensity="medium">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium">Hỗ trợ 24/7</h3>
              <p className="text-sm text-muted-foreground">Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giúp đỡ</p>
            </div>
          </LiquidGlassCard>
        </div>
      </section>

      {/* Thanh hành động nhanh (toast + reload) */}
      <section className="container py-6">
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() =>
              toast({ title: "KokonutUI hoạt động!", description: "Toast từ shadcn/ui" })
            }
          >
            Hiển thị thông báo
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Tải lại trang
          </Button>
        </div>
      </section>

      {/* Lưới sản phẩm demo dùng ProductCard */}
      <section className="container pb-12 md:pb-16">
        <div className="mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Sản phẩm nổi bật</h2>
          <p className="mt-1 text-sm text-muted-foreground">Bộ sưu tập mới nhất từ Shoe Store</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </>
  );
}
