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
    
    // Màu sắc dựa trên front-end-spec.md
    const variantColors = {
      primary: {
        // Màu chính là đen theo spec
        primary: "0, 0, 0", // primary: '#000000'
        secondary: "33, 33, 33", // gray.800: '#212121'
        accent: "255, 77, 79", // accent: '#FF4D4F'
      },
      secondary: {
        primary: "255, 255, 255", // secondary: '#FFFFFF'
        secondary: "245, 245, 245", // gray.100: '#F5F5F5'
        accent: "224, 224, 224", // gray.300: '#E0E0E0'
      },
      success: {
        primary: "82, 196, 26", // success: '#52C41A'
        secondary: "62, 176, 16", // success darker
        accent: "102, 216, 46", // success lighter
      },
      danger: {
        primary: "255, 77, 79", // error: '#FF4D4F'
        secondary: "235, 57, 59", // error darker
        accent: "255, 97, 99", // error lighter
      },
      warning: {
        primary: "250, 173, 20", // warning: '#FAAD14'
        secondary: "230, 153, 0", // warning darker
        accent: "255, 193, 40", // warning lighter
      },
      info: {
        primary: "60, 170, 220", // info blue
        secondary: "40, 150, 200", // info darker
        accent: "80, 190, 240", // info lighter
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
        variant === "primary" && "border-black/20 dark:border-black/10",
        variant === "secondary" && "border-gray-200/20 dark:border-gray-300/10",
        variant === "success" && "border-[#52C41A]/20 dark:border-[#52C41A]/10",
        variant === "danger" && "border-[#FF4D4F]/20 dark:border-[#FF4D4F]/10",
        variant === "warning" && "border-[#FAAD14]/20 dark:border-[#FAAD14]/10",
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
