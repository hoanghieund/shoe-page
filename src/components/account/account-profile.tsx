"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClientSupabaseClient } from "@/lib/supabase/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface AccountProfileProps {
  user: User;
  profile: any;
}

// Schema xác thực form cập nhật thông tin
const profileSchema = z.object({
  full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  ward: z.string().optional(),
  postal_code: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

/**
 * AccountProfile component - Form cập nhật thông tin cá nhân
 * Cho phép người dùng cập nhật thông tin cá nhân và địa chỉ
 */
export function AccountProfile({ user, profile }: AccountProfileProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(profile?.avatar_url || null);
  
  // Khởi tạo form với react-hook-form và zod
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      city: profile?.city || "",
      district: profile?.district || "",
      ward: profile?.ward || "",
      postal_code: profile?.postal_code || "",
    },
  });
  
  // Xử lý cập nhật thông tin cá nhân
  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      const supabase = createClientSupabaseClient();
      
      // Cập nhật thông tin profile
      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin cá nhân của bạn đã được cập nhật",
      });
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      toast({
        title: "Cập nhật thất bại",
        description: "Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Xử lý tải lên ảnh đại diện
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Kiểm tra kích thước file (tối đa 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File quá lớn",
        description: "Kích thước ảnh đại diện không được vượt quá 2MB",
        variant: "destructive",
      });
      return;
    }
    
    // Kiểm tra định dạng file
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast({
        title: "Định dạng không hỗ trợ",
        description: "Chỉ hỗ trợ định dạng JPEG, PNG và WebP",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const supabase = createClientSupabaseClient();
      
      // Tạo tên file duy nhất
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
      // Tải file lên Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Lấy URL công khai của file
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);
      
      // Cập nhật avatar_url trong profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);
      
      if (updateError) {
        throw updateError;
      }
      
      // Cập nhật UI
      setAvatarUrl(publicUrl);
      
      toast({
        title: "Tải lên thành công",
        description: "Ảnh đại diện của bạn đã được cập nhật",
      });
    } catch (error) {
      console.error("Lỗi tải lên ảnh đại diện:", error);
      toast({
        title: "Tải lên thất bại",
        description: "Đã xảy ra lỗi khi tải lên ảnh đại diện. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Lấy chữ cái đầu tiên của tên để hiển thị trong avatar fallback
  const initials = (profile?.full_name || user.email?.split("@")[0] || "User")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
  
  return (
    <LiquidGlassCard className="p-6">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl || ""} alt={profile?.full_name || "Avatar"} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 rounded-full bg-primary p-1 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span className="sr-only">Tải lên ảnh đại diện</span>
              </label>
              
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <h3 className="font-medium">{profile?.full_name || "Chưa cập nhật tên"}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">Họ tên</Label>
              <Input
                id="full_name"
                placeholder="Nguyễn Văn A"
                disabled={isLoading}
                {...form.register("full_name")}
              />
              {form.formState.errors.full_name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.full_name.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                placeholder="0912345678"
                disabled={isLoading}
                {...form.register("phone")}
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                placeholder="Số nhà, tên đường..."
                disabled={isLoading}
                {...form.register("address")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Tỉnh/Thành phố</Label>
              <Input
                id="city"
                placeholder="Hà Nội"
                disabled={isLoading}
                {...form.register("city")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="district">Quận/Huyện</Label>
              <Input
                id="district"
                placeholder="Hai Bà Trưng"
                disabled={isLoading}
                {...form.register("district")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ward">Phường/Xã</Label>
              <Input
                id="ward"
                placeholder="Bách Khoa"
                disabled={isLoading}
                {...form.register("ward")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="postal_code">Mã bưu điện</Label>
              <Input
                id="postal_code"
                placeholder="100000"
                disabled={isLoading}
                {...form.register("postal_code")}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cập nhật thông tin
            </Button>
          </div>
        </form>
      </div>
    </LiquidGlassCard>
  );
}
