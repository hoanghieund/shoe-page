import { Hero } from "@/components/kokonutui/hero";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { ProductCard } from "@/components/kokonutui/product-card";
import { ActionBar } from "@/components/ui/action-bar";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "@/components/ui/product-carousel";
import {
  getBestSellers,
  getCategories,
  getNewArrivals,
} from "@/lib/supabase/products";
import {
  Clock,
  Flame,
  Grid,
  Newspaper,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";

/**
 * Trang chủ sử dụng các components KokonutUI
 * - Hero (CTA chính)
 * - Lưới ProductCard với dữ liệu từ Supabase
 * - Các client islands cho phần tương tác
 */
export default async function HomePage() {
  // Fetch dữ liệu từ Supabase server-side
  const [bestSellersData, newArrivalsData, categoriesData] = await Promise.all([
    getBestSellers(4),
    getNewArrivals(6),
    getCategories(),
  ]);

  // Thêm icon cho categories
  const categories = categoriesData.map(category => ({
    ...category,
    icon: <Grid className="h-5 w-5" />,
  }));

  // Blog posts (giữ static cho đến khi có CMS)
  const blogPosts = [
    {
      id: "b1",
      title: "Cách chọn size giày chuẩn",
      excerpt: "Mẹo nhanh để chọn size chính xác cho mọi dòng giày.",
      tag: "Hướng dẫn",
    },
    {
      id: "b2",
      title: "Top 5 đôi chạy bộ 2025",
      excerpt: "Danh sách giày chạy bộ đáng mua nhất.",
      tag: "Gợi ý mua",
    },
    {
      id: "b3",
      title: "Bảo quản giày đúng cách",
      excerpt: "Tăng tuổi thọ giày với 5 bước đơn giản.",
      tag: "Chăm sóc",
    },
  ];

  return (
    <>
      {/* Hero theo phong cách KokonutUI */}
      <Hero />

      {/* Section danh mục nổi bật (Categories) */}
      <section className="container py-10 md:py-14">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Danh mục nổi bật
          </h2>
          <p className="mt-2 text-muted-foreground">
            Khám phá nhanh theo nhu cầu của bạn
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(c => (
            <LiquidGlassCard
              key={c.key}
              className="p-4 text-center"
              variant="secondary"
              intensity="low"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 rounded-full bg-muted/50">{c.icon}</div>
                <p className="text-sm font-medium">{c.label}</p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </section>

      {/* Section tính năng nổi bật với LiquidGlassCard */}
      <section className="container py-12 md:py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Tính năng nổi bật
          </h2>
          <p className="mt-2 text-muted-foreground">
            Trải nghiệm mua sắm tuyệt vời cùng Shoe Store
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LiquidGlassCard className="p-6" variant="info" intensity="medium">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium">Chính hãng 100%</h3>
              <p className="text-sm text-muted-foreground">
                Cam kết chỉ bán sản phẩm chính hãng, có nguồn gốc rõ ràng
              </p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6" variant="success" intensity="medium">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium">Giao hàng miễn phí</h3>
              <p className="text-sm text-muted-foreground">
                Miễn phí giao hàng toàn quốc cho đơn hàng từ 500.000₫
              </p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6" variant="warning" intensity="medium">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <RefreshCcw className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-medium">Đổi trả dễ dàng</h3>
              <p className="text-sm text-muted-foreground">
                Đổi trả sản phẩm trong vòng 30 ngày nếu không vừa ý
              </p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6" variant="primary" intensity="medium">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium">Hỗ trợ 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giúp đỡ
              </p>
            </div>
          </LiquidGlassCard>
        </div>
      </section>

      {/* Best sellers (Carousel đơn giản, snap-x) - Sử dụng client component */}
      <section className="container py-10 md:py-14">
        <ProductCarousel
          products={bestSellersData}
          title="Bán chạy"
          subtitle="Những sản phẩm được yêu thích nhất"
          icon={<Flame className="h-5 w-5 text-orange-500" />}
        />
      </section>

      {/* Banner giữa trang (Promo) */}
      <section className="container py-8">
        <LiquidGlassCard className="p-6 md:p-10">
          {/* Giữ nội dung gọn: tiêu đề + phụ đề + CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Tag className="h-4 w-4" /> Khuyến mãi tuần này
              </p>
              <h3 className="text-2xl md:text-3xl font-bold mt-1">
                Giảm đến 30% cho dòng chạy bộ
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Số lượng có hạn - chỉ đến hết Chủ nhật
              </p>
            </div>
            <Button className="rounded-full px-6">Mua ngay</Button>
          </div>
        </LiquidGlassCard>
      </section>

      {/* Sản phẩm mới về - Dữ liệu từ Supabase */}
      <section className="container pb-12 md:pb-16">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Sản phẩm mới về
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newArrivalsData.map(p => (
            <ProductCard key={p.id} {...p} isNew />
          ))}
        </div>
      </section>

      {/* Blog / Content marketing */}
      <section className="container pb-12 md:pb-20">
        <div className="mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight flex items-center justify-center gap-2">
            <Newspaper className="h-5 w-5" /> Góc chia sẻ
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Kinh nghiệm và mẹo hay từ Shoe Store
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map(b => (
            <LiquidGlassCard
              key={b.id}
              className="p-6"
              variant="secondary"
              intensity="low"
            >
              {/* Thẻ blog ngắn gọn: tag, title, excerpt */}
              <p className="text-xs text-muted-foreground">{b.tag}</p>
              <h3 className="mt-1 font-semibold line-clamp-2">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {b.excerpt}
              </p>
            </LiquidGlassCard>
          ))}
        </div>
      </section>

      {/* Thanh hành động nhanh (toast + reload) - Client component */}
      <section className="container py-6">
        <ActionBar />
      </section>
    </>
  );
}
