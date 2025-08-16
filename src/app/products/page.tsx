import React from "react";
import BentoGrid, { BentoGridItem } from "@/components/kokonutui/bento-grid";
import SmoothTab from "@/components/kokonutui/smooth-tab";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";

export default function ProductsPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      {/* Tiêu đề trang */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-zinc-900 dark:text-white">
          Bộ Sưu Tập Giày
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Khám phá bộ sưu tập giày cao cấp của chúng tôi, được thiết kế với sự kết hợp hoàn hảo giữa phong cách và sự thoải mái.
        </p>
      </div>

      {/* Tabs sản phẩm */}
      <section className="mb-16">
        <SmoothTab
          tabs={[
            {
              id: "all",
              label: "Tất cả",
              content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCard
                      key={i}
                      id={`product-${i}`}
                      name={`Giày Thể Thao Cao Cấp ${i + 1}`}
                      price={1200000 + i * 50000}
                      image={`https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80`}
                      rating={4.5}
                    />
                  ))}
                </div>
              ),
            },
            {
              id: "men",
              label: "Nam",
              content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCard
                      key={i}
                      id={`product-men-${i}`}
                      name={`Giày Thể Thao Nam ${i + 1}`}
                      price={1350000 + i * 50000}
                      image={`https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80`}
                      rating={4.7}
                    />
                  ))}
                </div>
              ),
            },
            {
              id: "women",
              label: "Nữ",
              content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCard
                      key={i}
                      id={`product-women-${i}`}
                      name={`Giày Thời Trang Nữ ${i + 1}`}
                      price={1150000 + i * 50000}
                      image={`https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80`}
                      rating={4.6}
                    />
                  ))}
                </div>
              ),
            },
            {
              id: "kids",
              label: "Trẻ Em",
              content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCard
                      key={i}
                      id={`product-kids-${i}`}
                      name={`Giày Trẻ Em ${i + 1}`}
                      price={850000 + i * 30000}
                      image={`https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80`}
                      rating={4.8}
                    />
                  ))}
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Bộ sưu tập nổi bật */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Bộ Sưu Tập Nổi Bật
          </h2>
          <Button variant="ghost" className="flex items-center gap-2">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <BentoGrid className="mx-auto">
          {featuredCollections.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 0 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </section>

      {/* Thông tin thêm */}
      <section className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-zinc-700 dark:text-zinc-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-white">
              Giao Hàng Miễn Phí
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Miễn phí giao hàng cho tất cả đơn hàng trên 1 triệu đồng
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-zinc-700 dark:text-zinc-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-white">
              Thanh Toán An Toàn
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Nhiều phương thức thanh toán an toàn và bảo mật
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-zinc-700 dark:text-zinc-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-white">
              Đổi Trả Dễ Dàng
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Đổi trả miễn phí trong vòng 30 ngày sau khi mua
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// Component ProductCard
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

function ProductCard({ id, name, price, image, rating }: ProductCardProps) {
  // Format giá tiền theo định dạng Việt Nam
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 group hover:shadow-md transition-shadow duration-300">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={image}
          alt={name}
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
            {rating}
          </span>
        </div>
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-1 truncate">
          {name}
        </h3>
        <p className="font-semibold text-zinc-900 dark:text-white">
          {formattedPrice}
        </p>
      </div>
    </div>
  );
}

// Dữ liệu mẫu cho bộ sưu tập nổi bật
const featuredCollections = [
  {
    title: "Nike Air Max",
    description: "Giày thể thao cao cấp với công nghệ đệm khí tiên tiến, mang lại cảm giác thoải mái tối đa cho người dùng.",
    header: (
      <div className="flex justify-center w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-violet-500 to-purple-500">
        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop"
          alt="Nike Air Max"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-violet-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
  },
  {
    title: "Adidas Ultraboost",
    description: "Giày chạy bộ với công nghệ Boost độc quyền, mang lại khả năng đàn hồi và thoải mái vượt trội.",
    header: (
      <div className="flex justify-center w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500">
        <img
          src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1431&auto=format&fit=crop"
          alt="Adidas Ultraboost"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-blue-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: "Puma RS-X",
    description: "Thiết kế đường phố táo bạo với công nghệ đệm Running System, kết hợp phong cách retro và hiện đại.",
    header: (
      <div className="flex justify-center w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-500">
        <img
          src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop"
          alt="Puma RS-X"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-orange-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
        />
      </svg>
    ),
  },
];
