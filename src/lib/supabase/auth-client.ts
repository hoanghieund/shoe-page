import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

/**
 * Lấy thông tin người dùng hiện tại từ client
 * @returns Thông tin người dùng hoặc null nếu chưa đăng nhập
 */
export async function getCurrentUser(): Promise<{
  user: User;
  profile: any | null;
} | null> {
  const supabase = createClient();
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }
    
    // Lấy thêm thông tin chi tiết từ bảng profiles (nếu có)
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    return {
      user,
      profile: profile || null
    };
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    return null;
  }
}

/**
 * Kiểm tra xem người dùng đã đăng nhập hay chưa
 * @returns true nếu đã đăng nhập, false nếu chưa
 */
export async function isAuthenticated(): Promise<boolean> {
  const userData = await getCurrentUser();
  return !!userData;
}

/**
 * Đăng xuất người dùng
 * @returns Kết quả đăng xuất
 */
export async function signOut() {
  const supabase = createClient();
  return await supabase.auth.signOut();
}

/**
 * Đăng nhập với email và mật khẩu
 * @param email Email đăng nhập
 * @param password Mật khẩu
 * @returns Kết quả đăng nhập
 */
export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient();
  return await supabase.auth.signInWithPassword({ email, password });
}

/**
 * Đăng ký tài khoản mới
 * @param email Email đăng ký
 * @param password Mật khẩu
 * @param metadata Thông tin bổ sung
 * @returns Kết quả đăng ký
 */
export async function signUp(email: string, password: string, metadata?: any) {
  const supabase = createClient();
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
}
