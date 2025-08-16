import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AccountProfile } from "@/components/account/account-profile";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";

export const metadata: Metadata = {
  title: "Tài khoản | SneakerShop",
  description: "Quản lý thông tin tài khoản của bạn",
};

/**
 * Trang tài khoản người dùng
 * Hiển thị thông tin cá nhân và cho phép cập nhật
 */
export default async function AccountPage() {
  const supabase = createServerSupabaseClient();
  
  // Lấy thông tin người dùng hiện tại
  const { data: { user } } = await supabase.auth.getUser();
  
  // Nếu không có người dùng, chuyển hướng đến trang đăng nhập
  if (!user) {
    redirect("/auth/login");
  }
  
  // Lấy thông tin profile của người dùng
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Tài khoản của tôi</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <LiquidGlassCard className="p-6">
            <nav className="space-y-2">
              <a href="/account" className="block px-3 py-2 rounded-md bg-primary/10 font-medium">
                Thông tin cá nhân
              </a>
              <a href="/account/orders" className="block px-3 py-2 rounded-md hover:bg-muted">
                Đơn hàng của tôi
              </a>
              <a href="/account/wishlist" className="block px-3 py-2 rounded-md hover:bg-muted">
                Danh sách yêu thích
              </a>
              <a href="/account/addresses" className="block px-3 py-2 rounded-md hover:bg-muted">
                Sổ địa chỉ
              </a>
            </nav>
          </LiquidGlassCard>
        </div>
        
        <div className="lg:col-span-3">
          <AccountProfile user={user} profile={profile} />
        </div>
      </div>
    </div>
  );
}
