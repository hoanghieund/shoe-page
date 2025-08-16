"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { Button } from "@/components/ui/button";

/**
 * Footer component theo phong cách KokonutUI
 * - Hiển thị phần chân trang với thông tin liên hệ và liên kết hữu ích
 * - Sử dụng LiquidGlassCard cho form đăng ký nhận tin
 * - Hiệu ứng hover và animation từ framer-motion
 * - Social media icons và gradient
 */
export function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  // State cho form đăng ký
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Xử lý đăng ký nhận tin
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Giả lập API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      // Thông báo thành công (có thể sử dụng toast)
      alert("Đăng ký nhận tin thành công!");
    }, 1000);
  };
  
  return (
    <footer className="relative border-t bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 h-40 w-40 rounded-full bg-primary/5 blur-2xl" />
      </div>
      
      <div className="container relative z-10 py-12 md:py-16">
        {/* Newsletter section */}
        <div className="mb-16">
          <LiquidGlassCard variant="primary" intensity="low" className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold">Đăng ký nhận tin</h3>
                <p className="mt-2 text-muted-foreground">
                  Nhận thông báo về sản phẩm mới và khuyến mãi đặc biệt từ Shoe Store.
                </p>
              </div>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  required
                  className="flex-1 px-4 py-2 bg-background/50 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                </Button>
              </form>
            </div>
          </LiquidGlassCard>
        </div>
        
        {/* Main footer content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
        >
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Shoe Store
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Cửa hàng giày dép chất lượng cao với nhiều mẫu mã đa dạng cho mọi nhu cầu.
            </p>
            
            {/* Social media */}
            <div className="mt-6 flex items-center space-x-4">
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              >
                <Youtube size={18} />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Sản phẩm</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/products/men", label: "Giày nam" },
                { href: "/products/women", label: "Giày nữ" },
                { href: "/products/kids", label: "Giày trẻ em" },
                { href: "/products/sport", label: "Giày thể thao" },
                { href: "/products/casual", label: "Giày thời trang" },
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Thông tin</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/about", label: "Về chúng tôi" },
                { href: "/contact", label: "Liên hệ" },
                { href: "/faq", label: "Câu hỏi thường gặp" },
                { href: "/shipping", label: "Chính sách vận chuyển" },
                { href: "/returns", label: "Chính sách đổi trả" },
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Liên hệ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  contact@shoestore.vn
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  0123 456 789
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Shoe Store. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              Điều khoản sử dụng
            </Link>
            <Link href="/sitemap" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              Sitemap
            </Link>
          </div>
        </div>
        
        {/* Payment methods */}
        <div className="mt-6 flex justify-center md:justify-start space-x-4">
          {["visa", "mastercard", "paypal", "momo"].map((payment) => (
            <div key={payment} className="opacity-50 hover:opacity-100 transition-opacity duration-200">
              <span className="sr-only">{payment}</span>
              <div className="h-6 w-10 bg-muted rounded">
                {/* Placeholder for payment icons */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
