"use client";

import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Hero section theo phong cách KokonutUI
 * - Thiết kế hiện đại với hiệu ứng animation từ framer-motion
 * - Sử dụng LiquidGlassCard cho hiệu ứng glass morphism
 * - Gradient background và hình ảnh sản phẩm nổi bật
 * - CTA rõ ràng và hiệu ứng hover nâng cao
 */
export function Hero(): JSX.Element {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-0 left-0 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-green-500/5 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Khám phá bộ sưu tập <br />
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                giày thể thao
              </span>{" "}
              mới
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Thiết kế hiện đại, hiệu suất tối ưu. Giao hàng nhanh, đổi trả dễ
              dàng trong 30 ngày.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/products">
                  <Button size="lg" className="rounded-full px-8 group">
                    Mua ngay
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8"
                  >
                    Tìm hiểu thêm
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Stats trong LiquidGlassCard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <LiquidGlassCard
                variant="info"
                intensity="low"
                className="p-4 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold">500+</p>
                <p className="text-xs text-muted-foreground">Mẫu giày</p>
              </LiquidGlassCard>

              <LiquidGlassCard
                variant="success"
                intensity="low"
                className="p-4 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold">24h</p>
                <p className="text-xs text-muted-foreground">Giao hàng</p>
              </LiquidGlassCard>

              <LiquidGlassCard
                variant="primary"
                intensity="low"
                className="p-4 text-center hidden md:block"
              >
                <p className="text-2xl md:text-3xl font-bold">30+</p>
                <p className="text-xs text-muted-foreground">Thương hiệu</p>
              </LiquidGlassCard>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-3xl opacity-30" />
              <Image
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80"
                alt="Giày thể thao cao cấp"
                fill
                className="object-contain p-8 z-10 drop-shadow-xl"
                priority
              />

              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
