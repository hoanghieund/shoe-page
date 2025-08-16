"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClientSupabaseClient } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// Schema xác thực form đăng nhập
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * LoginForm component - Form đăng nhập người dùng
 * Sử dụng Supabase Auth và react-hook-form
 */
export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  
  // Khởi tạo form với react-hook-form và zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Xử lý đăng nhập
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const supabase = createClientSupabaseClient();
      
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        toast({
          title: "Đăng nhập thất bại",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Đăng nhập thành công
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn quay trở lại!",
      });
      
      // Chuyển hướng đến trang chủ
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast({
        title: "Đã xảy ra lỗi",
        description: "Vui lòng thử lại sau",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <LiquidGlassCard className="w-full max-w-md p-6 sm:p-8">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          <p className="text-sm text-muted-foreground">
            Nhập thông tin đăng nhập của bạn để tiếp tục
          </p>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              autoComplete="email"
              disabled={isLoading}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isLoading}
                {...form.register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                </span>
              </Button>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Đăng nhập
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Hoặc
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              try {
                const supabase = createClientSupabaseClient();
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                  },
                });
                
                if (error) {
                  toast({
                    title: "Đăng nhập thất bại",
                    description: error.message,
                    variant: "destructive",
                  });
                }
              } catch (error) {
                console.error("Lỗi đăng nhập Google:", error);
                toast({
                  title: "Đã xảy ra lỗi",
                  description: "Vui lòng thử lại sau",
                  variant: "destructive",
                });
              } finally {
                setIsLoading(false);
              }
            }}
          >
            Đăng nhập với Google
          </Button>
        </div>
        
        <div className="text-center text-sm">
          Chưa có tài khoản?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Đăng ký
          </Link>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
