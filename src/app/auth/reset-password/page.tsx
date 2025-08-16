import { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu | ShoesVN",
  description: "Đặt lại mật khẩu cho tài khoản ShoesVN của bạn",
};

/**
 * Trang đặt lại mật khẩu
 * Hiển thị form đặt lại mật khẩu
 */
export default function ResetPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
