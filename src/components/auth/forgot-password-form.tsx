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
import { Loader2 } from "lucide-react";

// Schema xác thực form quên mật khẩu
const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

/**
 * ForgotPasswordForm component - Form yêu cầu đặt lại mật khẩu
 * Sử dụng Supabase Auth và react-hook-form
 */
export function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  // Khởi tạo form với react-hook-form và zod
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  
  // Xử lý gửi yêu cầu đặt lại mật khẩu
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      const supabase = createClientSupabaseClient();
      
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) {
        toast({
          title: "Yêu cầu thất bại",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Yêu cầu thành công
      setIsSubmitted(true);
      toast({
        title: "Yêu cầu đã được gửi",
        description: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu",
      });
    } catch (error) {
      console.error("Lỗi gửi yêu cầu đặt lại mật khẩu:", error);
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
          <h1 className="text-2xl font-bold">Quên mật khẩu</h1>
          <p className="text-sm text-muted-foreground">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-primary/10 p-4 text-center">
              <p className="text-sm">
                Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến địa chỉ email của bạn.
                Vui lòng kiểm tra hộp thư đến và làm theo hướng dẫn.
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() => router.push("/auth/login")}
            >
              Quay lại đăng nhập
            </Button>
          </div>
        ) : (
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
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Gửi yêu cầu
            </Button>
            
            <div className="text-center text-sm">
              <Link href="/auth/login" className="text-primary hover:underline">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        )}
      </div>
    </LiquidGlassCard>
  );
}
