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

// Schema xác thực form đăng ký
const registerSchema = z
  .object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * RegisterForm component - Form đăng ký người dùng mới
 * Sử dụng Supabase Auth và react-hook-form
 */
export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
  // Khởi tạo form với react-hook-form và zod
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  // Xử lý đăng ký
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      const supabase = createClientSupabaseClient();
      
      // Đăng ký người dùng mới
      const { error: signUpError, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          },
        },
      });
      
      if (signUpError) {
        toast({
          title: "Đăng ký thất bại",
          description: signUpError.message,
          variant: "destructive",
        });
        return;
      }
      
      // Tạo profile cho người dùng mới
      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: authData.user.id,
            full_name: data.name,
            email: data.email,
          });
        
        if (profileError) {
          console.error("Lỗi tạo profile:", profileError);
        }
      }
      
      // Đăng ký thành công
      toast({
        title: "Đăng ký thành công",
        description: "Vui lòng kiểm tra email để xác nhận tài khoản",
      });
      
      // Chuyển hướng đến trang đăng nhập
      router.push("/auth/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
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
          <h1 className="text-2xl font-bold">Đăng ký tài khoản</h1>
          <p className="text-sm text-muted-foreground">
            Tạo tài khoản mới để mua sắm và theo dõi đơn hàng
          </p>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Họ tên</Label>
            <Input
              id="name"
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              disabled={isLoading}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          
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
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
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
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isLoading}
                {...form.register("confirmPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                </span>
              </Button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Đăng ký
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
                    title: "Đăng ký thất bại",
                    description: error.message,
                    variant: "destructive",
                  });
                }
              } catch (error) {
                console.error("Lỗi đăng ký Google:", error);
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
            Đăng ký với Google
          </Button>
        </div>
        
        <div className="text-center text-sm">
          Đã có tài khoản?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
