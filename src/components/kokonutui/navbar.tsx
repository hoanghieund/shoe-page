"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, Menu, X, Sun, Moon } from "lucide-react";
import { CartButton } from "@/components/cart/cart-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { AuthProvider } from "@/components/auth/auth-provider";

/**
 * Navbar component theo phong cách KokonutUI
 * - Hiển thị thanh điều hướng chính với menu responsive
 * - Hiệu ứng animation và glassmorphism khi cuộn trang
 * - Tích hợp tìm kiếm, giỏ hàng, yêu thích và chuyển đổi giao diện sáng/tối
 * - Menu mobile với animation
 */
export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  // Xử lý sự kiện cuộn trang để thay đổi style của navbar
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Kiểm tra dark mode khi khởi tạo
  React.useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }
  }, []);
  
  // Chuyển đổi dark/light mode
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  // Danh sách các liên kết chính
  const links = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-background"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
          >
            Shoe Store
          </motion.span>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
            >
              <motion.span
                className={cn(
                  "text-sm font-medium transition-colors relative py-1",
                  pathname === link.href 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                whileHover={{ scale: 1.05 }}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbar-underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.span>
            </Link>
          ))}
        </nav>
        
        {/* User actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Tìm kiếm */}
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div 
                initial={{ width: 40, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 40, opacity: 0 }}
                className="relative hidden md:flex items-center"
              >
                <input 
                  type="text" 
                  placeholder="Tìm kiếm..."
                  className="w-full pl-8 pr-4 py-1 text-sm bg-muted/50 rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                />
                <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 h-7 w-7"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hidden md:flex"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Yêu thích */}
          <Button variant="ghost" size="icon" className="hidden md:flex relative">
            <Heart className="h-5 w-5" />
          </Button>
          
          {/* Giỏ hàng */}
          <CartButton />
          
          {/* Tài khoản */}
          <div className="hidden md:block">
            <AuthProvider />
          </div>
          
          {/* Dark/Light mode toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex"
            onClick={toggleTheme}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                      Shoe Store
                    </span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleTheme}
                  >
                    {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </Button>
                </div>
                
                {/* Tìm kiếm mobile */}
                <div className="relative mb-6">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm..."
                    className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                
                {/* Menu links */}
                <nav className="flex flex-col gap-1">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center py-3 px-2 rounded-lg transition-colors",
                          pathname === link.href 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-muted-foreground hover:bg-muted"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                {/* User actions mobile */}
                <div className="mt-auto pt-6 border-t space-y-3">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" />
                      Tài khoản / Đăng nhập
                    </Button>
                  </Link>
                  <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Heart className="h-4 w-4" />
                      Yêu thích
                    </Button>
                  </Link>
                  <Button 
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setIsOpen(false);
                      // CartButton sẽ mở giỏ hàng khi được nhấp vào
                      const { openCart } = require("@/context/cart-context").useCart();
                      openCart();
                    }}
                  >
                    <CartButton />
                    <span className="ml-2">Giỏ hàng</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Mega menu - có thể thêm sau nếu cần */}
    </header>
  );
}
