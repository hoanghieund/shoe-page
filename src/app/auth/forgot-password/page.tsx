import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Quên mật khẩu | ShoesVN",
  description: "Đặt lại mật khẩu cho tài khoản ShoesVN của bạn",
};

/**
 * Trang quên mật khẩu
 * Hiển thị form yêu cầu đặt lại mật khẩu
 */
export default function ForgotPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
