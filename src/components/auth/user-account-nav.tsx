"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/supabase/auth-client";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";

interface UserAccountNavProps {
  user: User;
  userProfile?: {
    full_name?: string;
    avatar_url?: string;
  } | null;
}

/**
 * UserAccountNav component - Hiển thị menu dropdown cho người dùng đã đăng nhập
 * Bao gồm: thông tin người dùng, liên kết đến trang cá nhân, đơn hàng, đăng xuất
 */
export function UserAccountNav({ user, userProfile }: UserAccountNavProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // Xử lý đăng xuất
  const handleSignOut = async () => {
    try {
      await signOut();
      
      toast({
        title: "Đã đăng xuất",
        description: "Bạn đã đăng xuất thành công",
      });
      
      router.refresh();
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      toast({
        title: "Đã xảy ra lỗi",
        description: "Không thể đăng xuất. Vui lòng thử lại sau",
        variant: "destructive",
      });
    }
  };
  
  // Lấy tên hiển thị từ profile hoặc email
  const displayName = userProfile?.full_name || user.email?.split("@")[0] || "Người dùng";
  
  // Lấy chữ cái đầu tiên của tên để hiển thị trong avatar fallback
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={userProfile?.avatar_url || ""}
              alt={displayName}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {userProfile?.full_name && (
              <p className="font-medium">{userProfile.full_name}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">Tài khoản</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders">Đơn hàng</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/wishlist">Yêu thích</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            handleSignOut();
          }}
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
