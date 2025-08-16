import { createClient } from "@/lib/supabase/client";
import { createBrowserClient } from "@supabase/ssr";

/**
 * Tạo Supabase client cho phía client
 * Sử dụng cho các thao tác xác thực phía client
 */
export const createClientSupabaseClient = createClient;

/**
 * Lấy thông tin người dùng hiện tại từ server
 * @returns Thông tin người dùng hoặc null nếu chưa đăng nhập
 */
export async function getCurrentUser() {
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
      ...user,
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
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

/**
 * Tạo middleware để bảo vệ các route yêu cầu xác thực
 * @param redirectTo Đường dẫn chuyển hướng nếu chưa đăng nhập
 */
export async function requireAuth(redirectTo = "/auth/login") {
  const isLoggedIn = await isAuthenticated();
  
  if (!isLoggedIn) {
    return Response.redirect(new URL(redirectTo, process.env.NEXT_PUBLIC_SITE_URL));
  }
  
  return null;
}
