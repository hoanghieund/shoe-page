"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserAccountNav } from "@/components/auth/user-account-nav";
import { User } from "@supabase/supabase-js";

interface AuthButtonProps {
  user: User | null;
  userProfile?: {
    full_name?: string;
    avatar_url?: string;
  } | null;
}

/**
 * AuthButton component - Hiển thị nút đăng nhập/đăng ký hoặc menu người dùng
 * Tùy thuộc vào trạng thái đăng nhập của người dùng
 */
export function AuthButton({ user, userProfile }: AuthButtonProps) {
  if (user) {
    return <UserAccountNav user={user} userProfile={userProfile} />;
  }

  return (
    <Button asChild variant="ghost" size="sm">
      <Link href="/auth/login">Đăng nhập</Link>
    </Button>
  );
}
