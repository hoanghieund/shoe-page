import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Đăng ký | ShoesVN",
  description: "Tạo tài khoản mới trên ShoesVN để mua sắm và theo dõi đơn hàng",
};

/**
 * Trang đăng ký
 * Hiển thị form đăng ký và các tùy chọn đăng ký khác
 */
export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <RegisterForm />
      </div>
    </div>
  );
}
