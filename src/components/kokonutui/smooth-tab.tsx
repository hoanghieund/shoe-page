"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LiquidGlassCard } from "./liquid-glass-card";

/**
 * Định nghĩa kiểu dữ liệu cho tab
 * - id: ID duy nhất của tab
 * - label: Tiêu đề hiển thị của tab
 * - content: Nội dung của tab
 * - icon: Icon tùy chọn để hiển thị trước label
 */
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Định nghĩa kiểu dữ liệu cho props của SmoothTab
 * - tabs: Danh sách các tab
 * - defaultTabId: ID của tab mặc định được chọn
 * - className: Class tùy chỉnh cho container
 * - tabClassName: Class tùy chỉnh cho các tab
 * - contentClassName: Class tùy chỉnh cho phần nội dung
 * - variant: Biến thể màu sắc cho tab
 * - glassEffect: Bật/tắt hiệu ứng glassmorphism
 * - tabPosition: Vị trí của các tab (top, bottom, center)
 */
export interface SmoothTabProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "custom";
  glassEffect?: boolean;
  tabPosition?: "top" | "center" | "bottom";
}

/**
 * SmoothTab - Component tab với hiệu ứng chuyển động mượt mà theo phong cách KokonutUI
 * - Hiệu ứng chuyển động mượt mà khi chuyển tab
 * - Hỗ trợ glassmorphism cho các tab
 * - Animation khi thay đổi nội dung
 * - Hỗ trợ icon cho các tab
 * - Nhiều vị trí tab (trên, giữa, dưới)
 */
export default function SmoothTab({
  tabs,
  defaultTabId,
  className,
  tabClassName,
  contentClassName,
  variant = "primary",
  glassEffect = true,
  tabPosition = "top",
}: SmoothTabProps) {
  // Sử dụng defaultTabId nếu được cung cấp, nếu không thì sử dụng tab đầu tiên
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId || (tabs.length > 0 ? tabs[0].id : "")
  );

  // Lấy nội dung của tab đang active
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  // Xác định màu sắc dựa trên variant
  const getTabColors = () => {
    switch (variant) {
      case "primary":
        return "bg-primary/10 text-primary border-primary";
      case "secondary":
        return "bg-gray-100/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700";
      case "success":
        return "bg-green-100/50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-500";
      case "danger":
        return "bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-500";
      case "warning":
        return "bg-yellow-100/50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-500";
      case "info":
        return "bg-blue-100/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-500";
      default:
        return "bg-primary/10 text-primary border-primary";
    }
  };

  // Xác định class cho container dựa trên tabPosition
  const getContainerClass = () => {
    switch (tabPosition) {
      case "center":
        return "flex justify-center";
      case "bottom":
        return "flex justify-end";
      default:
        return "flex justify-start";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Tab headers */}
      <div className={cn("relative mb-4", getContainerClass())}>
        <div 
          className={cn(
            "flex relative rounded-full p-1",
            glassEffect ? "backdrop-blur-md bg-white/10 dark:bg-black/10 shadow-sm" : "border border-zinc-200 dark:border-zinc-800"
          )}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium relative z-10 rounded-full transition-all duration-300",
                  "flex items-center gap-2",
                  isActive
                    ? getTabColors()
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300",
                  tabClassName
                )}
                aria-selected={isActive}
              >
                {tab.icon && <span className="opacity-80">{tab.icon}</span>}
                {tab.label}
                {isActive && glassEffect && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/10 dark:bg-white/5 shadow-sm -z-10"
                    layoutId="smooth-tab-background"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className={cn("mt-6", contentClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {glassEffect ? (
              <LiquidGlassCard 
                variant={variant} 
                intensity="low"
                className="overflow-hidden"
              >
                <div className="p-4">
                  {activeContent}
                </div>
              </LiquidGlassCard>
            ) : (
              activeContent
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Demo component với dữ liệu mẫu
 * - Sử dụng các biến thể màu sắc khác nhau
 * - Hiển thị sản phẩm với hiệu ứng glassmorphism
 * - Tích hợp icon cho các tab
 */
export function SmoothTabDemo() {
  // Import các icon từ lucide-react
  const MaleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7L16 3M16 3H20M16 3V7M9 17C12.866 17 16 13.866 16 10C16 6.13401 12.866 3 9 3C5.13401 3 2 6.13401 2 10C2 13.866 5.13401 17 9 17ZM9 17V21M9 21H5M9 21H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  const FemaleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17C12.866 17 16 13.866 16 10C16 6.13401 12.866 3 9 3C5.13401 3 2 6.13401 2 10C2 13.866 5.13401 17 9 17ZM9 17V22M6 19H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  const ChildIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 9C16.1046 9 17 8.10457 17 7C17 5.89543 16.1046 5 15 5C13.8954 5 13 5.89543 13 7C13 8.10457 13.8954 9 15 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9V13M9 21V17M9 17L7 15M9 17L11 15M15 9V13M15 21V17M15 17L13 15M15 17L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  const AccessoryIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Dữ liệu mẫu cho các tab
  const demoTabs: TabItem[] = [
    {
      id: "giay-nam",
      label: "Giày Nam",
      icon: <MaleIcon />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                <img
                  src={`https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop`}
                  alt={`Giày nam ${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="font-medium text-lg">
                Giày Thể Thao Nam {i}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold text-primary">
                  1.200.000₫
                </p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ))}
                  <span className="text-xs ml-1 text-zinc-500">(12)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "giay-nu",
      label: "Giày Nữ",
      icon: <FemaleIcon />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                <img
                  src={`https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop`}
                  alt={`Giày nữ ${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">-15%</span>
                </div>
              </div>
              <h3 className="font-medium text-lg">
                Giày Thời Trang Nữ {i}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <p className="font-semibold text-primary">
                    1.350.000₫
                  </p>
                  <p className="text-xs text-zinc-500 line-through">1.590.000₫</p>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ))}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs ml-1 text-zinc-500">(8)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "giay-tre-em",
      label: "Trẻ Em",
      icon: <ChildIcon />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                <img
                  src={`https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1470&auto=format&fit=crop`}
                  alt={`Giày trẻ em ${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Mới</span>
                </div>
              </div>
              <h3 className="font-medium text-lg">
                Giày Thể Thao Trẻ Em {i}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold text-primary">
                  850.000₫
                </p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ))}
                  <span className="text-xs ml-1 text-zinc-500">(6)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "phu-kien",
      label: "Phụ Kiện",
      icon: <AccessoryIcon />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                <img
                  src={`https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1528&auto=format&fit=crop`}
                  alt={`Phụ kiện ${i}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="font-medium text-lg">
                Tất Thể Thao {i}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold text-primary">
                  120.000₫
                </p>
                <div className="flex items-center">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ))}
                  <span className="text-xs ml-1 text-zinc-500">(4)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  // Trả về component SmoothTab với các tùy chọn
  return (
    <SmoothTab 
      tabs={demoTabs} 
      variant="primary" 
      glassEffect={true} 
      tabPosition="center"
    />
  );
}
