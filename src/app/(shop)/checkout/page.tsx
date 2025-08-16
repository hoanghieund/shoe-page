import { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";

export const metadata: Metadata = {
  title: "Thanh toán | SneakerShop",
  description: "Hoàn tất đơn hàng và thanh toán sản phẩm của bạn",
};

/**
 * Trang thanh toán
 * Hiển thị form thanh toán và tóm tắt đơn hàng
 */
export default function CheckoutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
