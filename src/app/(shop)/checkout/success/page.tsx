import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";

export const metadata: Metadata = {
  title: "Đặt hàng thành công | SneakerShop",
  description: "Cảm ơn bạn đã đặt hàng tại SneakerShop",
};

/**
 * Trang xác nhận đơn hàng thành công
 * Hiển thị thông báo đặt hàng thành công và các bước tiếp theo
 */
export default function CheckoutSuccessPage() {
  return (
    <div className="container max-w-3xl py-16">
      <LiquidGlassCard className="p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        
        <h1 className="mt-6 text-3xl font-bold">Đặt hàng thành công!</h1>
        
        <p className="mt-4 text-lg text-muted-foreground">
          Cảm ơn bạn đã mua hàng tại SneakerShop. Chúng tôi đã nhận được đơn hàng của bạn và sẽ xử lý trong thời gian sớm nhất.
        </p>
        
        <div className="mt-8 space-y-4">
          <div className="rounded-lg border p-4 text-left">
            <h2 className="text-lg font-medium">Các bước tiếp theo</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">1.</span>
                <span>Bạn sẽ nhận được email xác nhận đơn hàng trong vòng vài phút.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                <span>Đội ngũ của chúng tôi sẽ kiểm tra và xác nhận đơn hàng của bạn.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                <span>Đơn hàng sẽ được đóng gói và giao đến địa chỉ của bạn trong vòng 2-5 ngày làm việc.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">4.</span>
                <span>Bạn có thể theo dõi trạng thái đơn hàng trong trang tài khoản của mình.</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/products">Tiếp tục mua sắm</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/account/orders">Xem đơn hàng của tôi</Link>
            </Button>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
