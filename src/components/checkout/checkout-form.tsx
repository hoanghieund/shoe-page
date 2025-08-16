"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// Schema xác thực form thanh toán
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  city: z.string().min(2, "Vui lòng chọn tỉnh/thành phố"),
  district: z.string().min(2, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(2, "Vui lòng chọn phường/xã"),
  paymentMethod: z.enum(["cod", "banking", "momo", "zalopay"]),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

/**
 * CheckoutForm component - Form thanh toán đơn hàng
 * Bao gồm thông tin giao hàng và phương thức thanh toán
 */
export function CheckoutForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { cart, clearCart } = useCart();
  const [isLoading, setIsLoading] = React.useState(false);
  const [districts, setDistricts] = React.useState<{ value: string; label: string }[]>([]);
  const [wards, setWards] = React.useState<{ value: string; label: string }[]>([]);
  
  // Khởi tạo form với react-hook-form và zod
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      paymentMethod: "cod",
      notes: "",
    },
  });
  
  // Danh sách các tỉnh/thành phố (mẫu)
  const cities = [
    { value: "hanoi", label: "Hà Nội" },
    { value: "hochiminh", label: "TP. Hồ Chí Minh" },
    { value: "danang", label: "Đà Nẵng" },
    { value: "haiphong", label: "Hải Phòng" },
    { value: "cantho", label: "Cần Thơ" },
  ];
  
  // Xử lý khi chọn tỉnh/thành phố
  const handleCityChange = (value: string) => {
    form.setValue("city", value);
    form.setValue("district", "");
    form.setValue("ward", "");
    
    // Mẫu dữ liệu quận/huyện (trong thực tế sẽ gọi API)
    if (value === "hanoi") {
      setDistricts([
        { value: "hbt", label: "Hai Bà Trưng" },
        { value: "hk", label: "Hoàn Kiếm" },
        { value: "dd", label: "Đống Đa" },
        { value: "tx", label: "Thanh Xuân" },
      ]);
    } else if (value === "hochiminh") {
      setDistricts([
        { value: "q1", label: "Quận 1" },
        { value: "q3", label: "Quận 3" },
        { value: "q7", label: "Quận 7" },
        { value: "tb", label: "Tân Bình" },
      ]);
    } else {
      setDistricts([]);
    }
    
    setWards([]);
  };
  
  // Xử lý khi chọn quận/huyện
  const handleDistrictChange = (value: string) => {
    form.setValue("district", value);
    form.setValue("ward", "");
    
    // Mẫu dữ liệu phường/xã (trong thực tế sẽ gọi API)
    if (value === "hbt") {
      setWards([
        { value: "bach_khoa", label: "Bách Khoa" },
        { value: "vinh_tuy", label: "Vĩnh Tuy" },
        { value: "minh_khai", label: "Minh Khai" },
      ]);
    } else if (value === "q1") {
      setWards([
        { value: "ben_nghe", label: "Bến Nghé" },
        { value: "ben_thanh", label: "Bến Thành" },
        { value: "da_kao", label: "Đa Kao" },
      ]);
    } else {
      setWards([]);
    }
  };
  
  // Xử lý đặt hàng
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsLoading(true);
    
    try {
      // TODO: Gửi dữ liệu đơn hàng lên server
      console.log("Dữ liệu đơn hàng:", {
        ...data,
        items: cart.items,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        total: cart.total,
      });
      
      // Giả lập xử lý đơn hàng
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Đặt hàng thành công
      toast({
        title: "Đặt hàng thành công",
        description: "Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ sớm nhất!",
      });
      
      // Xóa giỏ hàng
      clearCart();
      
      // Chuyển hướng đến trang xác nhận đơn hàng
      router.push("/checkout/success");
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      toast({
        title: "Đặt hàng thất bại",
        description: "Đã xảy ra lỗi khi xử lý đơn hàng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <LiquidGlassCard className="p-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Thông tin giao hàng</h3>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ tên</Label>
              <Input
                id="fullName"
                placeholder="Nguyễn Văn A"
                disabled={isLoading}
                {...form.register("fullName")}
              />
              {form.formState.errors.fullName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.fullName.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                disabled={isLoading}
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                placeholder="0912345678"
                disabled={isLoading}
                {...form.register("phone")}
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Tỉnh/Thành phố</Label>
              <Select
                disabled={isLoading}
                onValueChange={handleCityChange}
                defaultValue={form.getValues("city")}
              >
                <SelectTrigger id="city">
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.city && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="district">Quận/Huyện</Label>
              <Select
                disabled={isLoading || districts.length === 0}
                onValueChange={(value) => handleDistrictChange(value)}
                defaultValue={form.getValues("district")}
              >
                <SelectTrigger id="district">
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district.value} value={district.value}>
                      {district.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.district && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.district.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ward">Phường/Xã</Label>
              <Select
                disabled={isLoading || wards.length === 0}
                onValueChange={(value) => form.setValue("ward", value)}
                defaultValue={form.getValues("ward")}
              >
                <SelectTrigger id="ward">
                  <SelectValue placeholder="Chọn phường/xã" />
                </SelectTrigger>
                <SelectContent>
                  {wards.map((ward) => (
                    <SelectItem key={ward.value} value={ward.value}>
                      {ward.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.ward && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.ward.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Địa chỉ cụ thể</Label>
              <Input
                id="address"
                placeholder="Số nhà, tên đường..."
                disabled={isLoading}
                {...form.register("address")}
              />
              {form.formState.errors.address && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
              <Input
                id="notes"
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                disabled={isLoading}
                {...form.register("notes")}
              />
            </div>
          </div>
        </div>
      </LiquidGlassCard>
      
      <LiquidGlassCard className="p-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Phương thức thanh toán</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="cod"
                value="cod"
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                checked={form.watch("paymentMethod") === "cod"}
                onChange={() => form.setValue("paymentMethod", "cod")}
                disabled={isLoading}
              />
              <Label htmlFor="cod" className="cursor-pointer">
                Thanh toán khi nhận hàng (COD)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="banking"
                value="banking"
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                checked={form.watch("paymentMethod") === "banking"}
                onChange={() => form.setValue("paymentMethod", "banking")}
                disabled={isLoading}
              />
              <Label htmlFor="banking" className="cursor-pointer">
                Chuyển khoản ngân hàng
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="momo"
                value="momo"
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                checked={form.watch("paymentMethod") === "momo"}
                onChange={() => form.setValue("paymentMethod", "momo")}
                disabled={isLoading}
              />
              <Label htmlFor="momo" className="cursor-pointer">
                Ví MoMo
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="zalopay"
                value="zalopay"
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                checked={form.watch("paymentMethod") === "zalopay"}
                onChange={() => form.setValue("paymentMethod", "zalopay")}
                disabled={isLoading}
              />
              <Label htmlFor="zalopay" className="cursor-pointer">
                ZaloPay
              </Label>
            </div>
          </div>
        </div>
      </LiquidGlassCard>
      
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading || cart.items.length === 0}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Đặt hàng
        </Button>
      </div>
    </form>
  );
}
