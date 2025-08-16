import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập | ShoesVN",
  description: "Đăng nhập vào tài khoản ShoesVN của bạn",
};

/**
 * Trang đăng nhập
 * Hiển thị form đăng nhập và các tùy chọn đăng nhập khác
 */
export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <LoginForm />
      </div>
    </div>
  );
}
