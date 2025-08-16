"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * LiquidGlassCard - Card với hiệu ứng kính lỏng theo phong cách Apple/KokonutUI
 * - Sử dụng gradient, blur và hiệu ứng hover
 * - Tích hợp Framer Motion cho animation mượt mà
 * - Hỗ trợ dark mode và các tùy chọn màu sắc
 */
export interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "custom";
  intensity?: "low" | "medium" | "high";
  hoverEffect?: boolean;
  customColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

export function LiquidGlassCard({
  children,
  className,
  variant = "primary",
  intensity = "medium",
  hoverEffect = true,
  customColors,
  ...props
}: LiquidGlassCardProps) {
  // Định nghĩa các biến màu dựa trên variant và intensity
  const colors = React.useMemo(() => {
    // Opacity dựa trên intensity
    const opacityMap = {
      low: { base: 0.1, accent: 0.2, highlight: 0.05 },
      medium: { base: 0.15, accent: 0.3, highlight: 0.1 },
      high: { base: 0.25, accent: 0.4, highlight: 0.15 },
    };
    
    // Màu sắc dựa trên variant
    const variantColors = {
      primary: {
        primary: "120, 119, 198", // tím nhạt
        secondary: "100, 100, 220", // tím đậm hơn
        accent: "130, 80, 230", // tím sáng
      },
      secondary: {
        primary: "100, 100, 100", // xám
        secondary: "80, 80, 80", // xám đậm
        accent: "120, 120, 120", // xám sáng
      },
      success: {
        primary: "80, 200, 120", // xanh lá
        secondary: "60, 180, 100", // xanh lá đậm
        accent: "100, 220, 140", // xanh lá sáng
      },
      danger: {
        primary: "220, 70, 70", // đỏ
        secondary: "200, 50, 50", // đỏ đậm
        accent: "240, 90, 90", // đỏ sáng
      },
      warning: {
        primary: "230, 180, 60", // vàng
        secondary: "210, 160, 40", // vàng đậm
        accent: "250, 200, 80", // vàng sáng
      },
      info: {
        primary: "60, 170, 220", // xanh dương
        secondary: "40, 150, 200", // xanh dương đậm
        accent: "80, 190, 240", // xanh dương sáng
      },
      custom: {
        primary: customColors?.primary || "255, 255, 255",
        secondary: customColors?.secondary || "240, 240, 240",
        accent: customColors?.accent || "200, 200, 200",
      },
    };

    const selectedVariant = variantColors[variant];
    const selectedOpacity = opacityMap[intensity];

    return {
      primary: `rgba(${selectedVariant.primary}, ${selectedOpacity.base})`,
      secondary: `rgba(${selectedVariant.secondary}, ${selectedOpacity.accent})`,
      accent: `rgba(${selectedVariant.accent}, ${selectedOpacity.highlight})`,
      highlight: `rgba(255, 255, 255, ${selectedOpacity.highlight})`,
    };
  }, [variant, intensity, customColors]);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6",
        "backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_8px_16px_rgb(0_0_0/0.08)]",
        variant === "primary" && "border-purple-200/20 dark:border-purple-300/10",
        variant === "secondary" && "border-gray-200/20 dark:border-gray-300/10",
        variant === "success" && "border-green-200/20 dark:border-green-300/10",
        variant === "danger" && "border-red-200/20 dark:border-red-300/10",
        variant === "warning" && "border-yellow-200/20 dark:border-yellow-300/10",
        variant === "info" && "border-blue-200/20 dark:border-blue-300/10",
        variant === "custom" && "border-white/20 dark:border-white/10",
        hoverEffect && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      }}
      {...props}
    >
      {/* Hiệu ứng liquid glass */}
      <div
        className="absolute inset-0 z-[-1] opacity-70"
        style={{
          background: `
            radial-gradient(circle at top left, ${colors.accent}, transparent 40%),
            radial-gradient(circle at bottom right, ${colors.secondary}, transparent 40%),
            radial-gradient(circle at center, ${colors.highlight}, transparent 30%)
          `,
        }}
      />
      
      {/* Hiệu ứng bóng và highlight */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `
            linear-gradient(
              135deg,
              ${colors.highlight} 0%,
              rgba(255, 255, 255, 0) 50%,
              ${colors.accent} 100%
            )
          `,
        }}
      />
      
      {/* Nội dung */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
