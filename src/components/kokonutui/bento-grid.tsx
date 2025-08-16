"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { LiquidGlassCard } from "./liquid-glass-card";

/**
 * Định nghĩa kiểu dữ liệu cho item trong BentoGrid
 * - title: Tiêu đề của item
 * - description: Mô tả chi tiết
 * - header: Phần header (thường là hình ảnh)
 * - icon: Icon hiển thị bên cạnh tiêu đề
 * - className: Class tùy chỉnh
 * - variant: Biến thể màu sắc (theo KokonutUI)
 * - intensity: Cường độ hiệu ứng glass
 * - href: Liên kết khi click vào item
 * - hoverEffect: Bật/tắt hiệu ứng hover
 */
export interface BentoGridItemProps {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "custom";
  intensity?: "low" | "medium" | "high";
  href?: string;
  hoverEffect?: boolean;
  customColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

/**
 * Component cho mỗi item trong BentoGrid
 * - Sử dụng LiquidGlassCard để tạo hiệu ứng glassmorphism
 * - Hỗ trợ hiệu ứng hover với con trỏ chuột
 * - Hỗ trợ animation khi xuất hiện
 */
export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className,
  variant = "primary",
  intensity = "low",
  href,
  hoverEffect = true,
  customColors,
}: BentoGridItemProps) {
  // Theo dõi vị trí chuột để tạo hiệu ứng 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tạo hiệu ứng gradient theo chuột
  const maskImage = useMotionTemplate`radial-gradient(
    350px at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.15),
    transparent
  )`;

  // Xử lý sự kiện di chuyển chuột
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  // Wrap với thẻ a nếu có href
  const content = (
    <LiquidGlassCard
      variant={variant}
      intensity={intensity}
      hoverEffect={hoverEffect}
      customColors={customColors}
      className={cn(
        "row-span-1 group/bento transition-all duration-300",
        "overflow-hidden relative flex flex-col justify-between h-full",
        hoverEffect && "hover:-translate-y-1",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Hiệu ứng gradient theo chuột */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover/bento:opacity-100 transition-opacity z-[1]"
        style={{ maskImage }}
        aria-hidden="true"
      />

      <div className="p-6 flex flex-col h-full z-10">
        {/* Header (thường là hình ảnh) */}
        {header && (
          <motion.div 
            className="mb-4 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {header}
          </motion.div>
        )}

        {/* Tiêu đề và icon */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {icon && (
            <div className="p-2 w-10 h-10 shrink-0 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              {icon}
            </div>
          )}
          <h3 className="font-semibold text-lg tracking-tight">
            {title}
          </h3>
        </motion.div>

        {/* Mô tả */}
        <motion.p 
          className="mt-3 text-sm opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </LiquidGlassCard>
  );

  // Nếu có href, wrap bằng thẻ a
  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}

/**
 * Định nghĩa kiểu dữ liệu cho props của BentoGrid
 * - className: Class tùy chỉnh
 * - children: Các BentoGridItem con
 * - animate: Bật/tắt animation khi xuất hiện
 */
export interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
  animate?: boolean;
}

/**
 * Component BentoGrid chính
 * - Layout grid responsive
 * - Hỗ trợ animation khi xuất hiện từng item
 */
export default function BentoGrid({ className, children, animate = true }: BentoGridProps) {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto",
        className
      )}
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// Tạo một BentoGrid với dữ liệu mẫu
export function BentoGridDemo() {
  return (
    <BentoGrid className="mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 0 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

// Dữ liệu mẫu cho BentoGrid
const items = [
  {
    title: "Nike Air Max",
    description: "Giày thể thao cao cấp với công nghệ đệm khí tiên tiến, mang lại cảm giác thoải mái tối đa cho người dùng.",
    header: (
      <div className="flex justify-center w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-violet-500 to-purple-500">
        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop"
          alt="Nike Air Max"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-violet-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
  },
  {
    title: "Adidas Ultraboost",
    description: "Giày chạy bộ với công nghệ Boost độc quyền, mang lại khả năng đàn hồi và thoải mái vượt trội.",
    header: (
      <div className="flex justify-center w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500">
        <img
          src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1431&auto=format&fit=crop"
          alt="Adidas Ultraboost"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-blue-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: "Puma RS-X",
    description: "Thiết kế đường phố táo bạo với công nghệ đệm Running System, kết hợp phong cách retro và hiện đại.",
    header: (
      <div className="flex justify-center w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-500">
        <img
          src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop"
          alt="Puma RS-X"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-orange-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
        />
      </svg>
    ),
  },
  {
    title: "New Balance 990",
    description: "Biểu tượng của sự thoải mái và phong cách, được sản xuất tại Mỹ với chất lượng cao cấp.",
    header: (
      <div className="flex justify-center w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-gray-500 to-zinc-700">
        <img
          src="https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1471&auto=format&fit=crop"
          alt="New Balance 990"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  },
  {
    title: "Converse Chuck Taylor",
    description: "Giày thể thao kinh điển với thiết kế bất tử, là biểu tượng văn hóa trong hơn một thế kỷ qua.",
    header: (
      <div className="flex justify-center w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-red-500 to-pink-500">
        <img
          src="https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1472&auto=format&fit=crop"
          alt="Converse Chuck Taylor"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
  {
    title: "Vans Old Skool",
    description: "Giày trượt ván biểu tượng với sọc bên hông đặc trưng, là lựa chọn hàng đầu cho văn hóa đường phố.",
    header: (
      <div className="flex justify-center w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-black to-zinc-800">
        <img
          src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1396&auto=format&fit=crop"
          alt="Vans Old Skool"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-zinc-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
        />
      </svg>
    ),
  },
];
