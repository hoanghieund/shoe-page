import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

/**
 * Route handler cho OAuth callback
 * Xử lý callback từ các nhà cung cấp OAuth (Google, Facebook, v.v.)
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  
  // Nếu không có code, chuyển hướng về trang đăng nhập
  if (!code) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
  
  const supabase = createServerSupabaseClient();
  
  // Trao đổi code để lấy session
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  
  // Nếu có lỗi, chuyển hướng về trang đăng nhập
  if (error) {
    console.error("Lỗi xác thực OAuth:", error);
    return Response.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }
  
  // Xác thực thành công, chuyển hướng về trang chủ
  return Response.redirect(new URL("/", request.url));
}
