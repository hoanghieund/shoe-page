import React from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import BentoGrid, { BentoGridItem } from "@/components/kokonutui/bento-grid";
import SmoothTab from "@/components/kokonutui/smooth-tab";

// Dữ liệu mẫu cho sản phẩm
const products = [
  {
    id: "product-1",
    name: "Nike Air Max 270",
    price: 3200000,
    description:
      "Giày Nike Air Max 270 mang đến trải nghiệm thoải mái vượt trội với đệm khí lớn nhất từ trước đến nay của Nike. Thiết kế lấy cảm hứng từ Air Max 93 và 180, đôi giày này có đế đệm khí 270 độ ở gót chân, mang lại cảm giác êm ái và nâng đỡ suốt cả ngày.",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=1374&auto=format&fit=crop",
    ],
    colors: ["Đen", "Trắng", "Xanh Navy"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    rating: 4.8,
    reviews: 124,
    brand: "Nike",
    category: "Giày Thể Thao",
    features: [
      "Công nghệ đệm khí Max Air 270 độ",
      "Phần trên bằng vải lưới thoáng khí",
      "Đế giữa bằng bọt mềm mại",
      "Đế ngoài bằng cao su bền bỉ",
    ],
  },
  {
    id: "product-2",
    name: "Adidas Ultraboost 22",
    price: 4100000,
    description:
      "Adidas Ultraboost 22 được thiết kế đặc biệt với sự tham gia của đội ngũ kỹ sư nữ để mang lại sự vừa vặn hoàn hảo. Với công nghệ Boost độc quyền, đôi giày chạy bộ này cung cấp khả năng hoàn trả năng lượng vượt trội và cảm giác thoải mái tối đa.",
    images: [
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1431&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1364&auto=format&fit=crop",
    ],
    colors: ["Đen", "Trắng", "Xám"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    rating: 4.9,
    reviews: 210,
    brand: "Adidas",
    category: "Giày Chạy Bộ",
    features: [
      "Công nghệ đệm Boost hoàn trả năng lượng",
      "Thân giày Primeknit+ co giãn",
      "Đế ngoài Continental™ Rubber bền bỉ",
      "Thiết kế thân thiện với môi trường",
    ],
  },
];

// Hàm lấy thông tin sản phẩm từ ID
function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

// Trang chi tiết sản phẩm
export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);

  // Nếu không tìm thấy sản phẩm, chuyển hướng đến trang 404
  if (!product) {
    notFound();
  }

  // Format giá tiền theo định dạng Việt Nam
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);

  return (
    <main className="container mx-auto py-8 px-4">
      {/* Nút quay lại */}
      <div className="mb-6">
        <Link href="/products">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Quay lại
          </Button>
        </Link>
      </div>

      {/* Chi tiết sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Hình ảnh sản phẩm */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(0, 3).map((image, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-pointer hover:ring-2 hover:ring-zinc-900 dark:hover:ring-white transition-all"
              >
                <img
                  src={image}
                  alt={`${product.name} - Ảnh ${i + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded-md">
                {product.brand}
              </span>
              <span className="text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded-md">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-300 dark:text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {product.rating} ({product.reviews} đánh giá)
              </span>
            </div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {formattedPrice}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              {product.description}
            </p>
          </div>

          {/* Chọn màu sắc */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">
              Màu sắc
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    i === 0
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn kích cỡ */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">
              Kích cỡ
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.sizes.map((size, i) => (
                <button
                  key={i}
                  className={`py-2 rounded-md text-sm font-medium ${
                    i === 2
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Số lượng */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">
              Số lượng
            </h3>
            <div className="flex items-center">
              <button className="p-2 rounded-l-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                <Minus className="h-4 w-4" />
              </button>
              <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-center min-w-[3rem]">
                1
              </div>
              <button className="p-2 rounded-r-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <div className="flex gap-4">
            <Button className="flex-1 flex items-center justify-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Thêm vào giỏ hàng
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs thông tin chi tiết */}
      <section className="mb-16">
        <SmoothTab
          tabs={[
            {
              id: "details",
              label: "Chi tiết sản phẩm",
              content: (
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
                    Đặc điểm nổi bật
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <h3 className="text-lg font-semibold mt-6 mb-4 text-zinc-900 dark:text-white">
                    Thông số kỹ thuật
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-md">
                      <h4 className="font-medium mb-2 text-zinc-900 dark:text-white">
                        Thương hiệu
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {product.brand}
                      </p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-md">
                      <h4 className="font-medium mb-2 text-zinc-900 dark:text-white">
                        Loại giày
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {product.category}
                      </p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-md">
                      <h4 className="font-medium mb-2 text-zinc-900 dark:text-white">
                        Chất liệu
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Vải lưới, cao su, phylon
                      </p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-md">
                      <h4 className="font-medium mb-2 text-zinc-900 dark:text-white">
                        Xuất xứ
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Chính hãng
                      </p>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "reviews",
              label: "Đánh giá",
              content: (
                <div className="py-4">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        Đánh giá từ khách hàng
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {product.reviews} đánh giá
                      </p>
                    </div>
                    <Button>Viết đánh giá</Button>
                  </div>

                  <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            NT
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-zinc-900 dark:text-white">
                            Nguyễn Thành
                          </h4>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < 5
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-zinc-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Giày rất thoải mái, đúng size, chất lượng tốt. Đã mua
                        nhiều lần và sẽ tiếp tục ủng hộ.
                      </p>
                    </div>

                    {/* Review 2 */}
                    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            LM
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-zinc-900 dark:text-white">
                            Lê Minh
                          </h4>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < 4
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-zinc-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Giao hàng nhanh, đóng gói cẩn thận. Giày đẹp như hình,
                        nhưng hơi chật so với size thông thường.
                      </p>
                    </div>

                    {/* Review 3 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            TH
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-zinc-900 dark:text-white">
                            Trần Hương
                          </h4>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < 5
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-zinc-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Sản phẩm chính hãng, đúng như mô tả. Đệm rất êm, thích
                        hợp cho cả chạy bộ và đi hàng ngày. Sẽ mua thêm màu khác.
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">
                      Xem thêm đánh giá
                    </Button>
                  </div>
                </div>
              ),
            },
            {
              id: "shipping",
              label: "Vận chuyển & Đổi trả",
              content: (
                <div className="py-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-white">
                        Chính sách vận chuyển
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                        <li>
                          Miễn phí giao hàng cho đơn hàng từ 1.000.000₫ trở lên
                        </li>
                        <li>
                          Phí vận chuyển tiêu chuẩn: 30.000₫ (2-3 ngày làm việc)
                        </li>
                        <li>
                          Phí vận chuyển nhanh: 60.000₫ (1-2 ngày làm việc)
                        </li>
                        <li>
                          Giao hàng toàn quốc thông qua các đơn vị vận chuyển uy
                          tín
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-white">
                        Chính sách đổi trả
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                        <li>
                          Đổi trả miễn phí trong vòng 30 ngày kể từ ngày mua hàng
                        </li>
                        <li>
                          Sản phẩm phải còn nguyên tem, nhãn và chưa qua sử dụng
                        </li>
                        <li>
                          Hoàn tiền 100% nếu sản phẩm bị lỗi từ nhà sản xuất
                        </li>
                        <li>
                          Không áp dụng đổi trả cho sản phẩm đã qua sử dụng hoặc
                          bị hư hỏng do người dùng
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-white">
                        Hướng dẫn đổi trả
                      </h3>
                      <ol className="list-decimal pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                        <li>
                          Liên hệ với bộ phận chăm sóc khách hàng qua hotline
                          1900.1234 hoặc email support@shoeshop.vn
                        </li>
                        <li>
                          Cung cấp thông tin đơn hàng và lý do đổi/trả
                        </li>
                        <li>
                          Nhận mã đổi trả và hướng dẫn đóng gói sản phẩm
                        </li>
                        <li>
                          Gửi sản phẩm về địa chỉ được cung cấp
                        </li>
                        <li>
                          Nhận sản phẩm mới hoặc hoàn tiền trong vòng 7 ngày làm
                          việc
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Sản phẩm tương tự */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Sản phẩm tương tự
          </h2>
          <Button variant="ghost" className="flex items-center gap-2">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 group hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ShoppingBag className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {p.rating}
                  </span>
                </div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-1 truncate">
                  {p.name}
                </h3>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(p.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
