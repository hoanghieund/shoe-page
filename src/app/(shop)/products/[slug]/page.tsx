import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductGallery } from "@/components/ui/product-gallery";
import { ProductActions } from "@/components/ui/product-actions";
import { ProductCard } from "@/components/kokonutui/product-card";
import { getProductDetails } from "@/lib/supabase/product-details";
import { Star, Award, CheckCircle } from "lucide-react";

// Tạo metadata động dựa trên dữ liệu sản phẩm
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { product } = await getProductDetails(params.slug);
  
  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
      description: "Không tìm thấy sản phẩm này trong cửa hàng của chúng tôi.",
    };
  }
  
  return {
    title: `${product.name} | Shoe Store`,
    description: product.description || `Mua ${product.name} tại Shoe Store - Giày chính hãng, chất lượng cao`,
    openGraph: {
      images: [{ url: product.images[0].url }],
    },
  };
}

// Trang chi tiết sản phẩm
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { product, relatedProducts } = await getProductDetails(params.slug);
  
  // Nếu không tìm thấy sản phẩm, chuyển hướng đến trang 404
  if (!product) {
    notFound();
  }
  
  // Danh sách kích cỡ mẫu (sẽ lấy từ database trong thực tế)
  const sizes = [
    { value: "36", label: "36", inStock: true },
    { value: "37", label: "37", inStock: true },
    { value: "38", label: "38", inStock: true },
    { value: "39", label: "39", inStock: true },
    { value: "40", label: "40", inStock: true },
    { value: "41", label: "41", inStock: true },
    { value: "42", label: "42", inStock: false },
    { value: "43", label: "43", inStock: true },
  ];
  
  return (
    <div className="container py-10">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground">Trang chủ</a>
        <span className="mx-2">/</span>
        <a href={`/categories/${product.category_slug}`} className="hover:text-foreground">
          {product.category_name || "Danh mục"}
        </a>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>
      
      {/* Thông tin sản phẩm */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Gallery */}
        <ProductGallery images={product.images} />
        
        {/* Thông tin và actions */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">(12 đánh giá)</span>
              {product.is_best_seller && (
                <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
                  <Award className="mr-1 h-3 w-3" /> Bán chạy
                </span>
              )}
            </div>
          </div>
          
          <ProductActions 
            productId={product.id} 
            productName={product.name} 
            price={product.price_formatted}
            priceRaw={product.price}
            imageUrl={product.images[0]?.url}
            slug={product.slug}
            sizes={sizes}
          />
        </div>
      </div>
      
      {/* Tabs thông tin chi tiết */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="specifications">Thông số</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4">
            <div className="prose max-w-none dark:prose-invert">
              <p>{product.description || "Đang cập nhật mô tả sản phẩm..."}</p>
              
              <h3>Đặc điểm nổi bật</h3>
              <ul>
                <li>Chất liệu cao cấp, bền bỉ</li>
                <li>Thiết kế hiện đại, thời trang</li>
                <li>Đế giày êm ái, hỗ trợ vận động</li>
                <li>Phù hợp cho nhiều hoạt động khác nhau</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Thương hiệu</h3>
                  <p className="text-sm text-muted-foreground">{product.brand || "Shoe Store"}</p>
                </div>
                <div>
                  <h3 className="font-medium">Chất liệu</h3>
                  <p className="text-sm text-muted-foreground">{product.material || "Da tổng hợp, vải cao cấp"}</p>
                </div>
                <div>
                  <h3 className="font-medium">Xuất xứ</h3>
                  <p className="text-sm text-muted-foreground">{product.origin || "Việt Nam"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Phong cách</h3>
                  <p className="text-sm text-muted-foreground">{product.style || "Thể thao, năng động"}</p>
                </div>
                <div>
                  <h3 className="font-medium">Bảo hành</h3>
                  <p className="text-sm text-muted-foreground">12 tháng</p>
                </div>
                <div>
                  <h3 className="font-medium">Mã sản phẩm</h3>
                  <p className="text-sm text-muted-foreground">{product.sku || product.id}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Đánh giá từ khách hàng</h3>
                <span className="text-sm text-muted-foreground">12 đánh giá</span>
              </div>
              
              {/* Placeholder cho đánh giá */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Nguyễn Văn A</span>
                      <span className="text-xs text-muted-foreground">12/08/2025</span>
                    </div>
                    <div className="flex">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                    </div>
                  </div>
                  <p className="text-sm">Sản phẩm rất tốt, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận.</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Trần Thị B</span>
                      <span className="text-xs text-muted-foreground">10/08/2025</span>
                    </div>
                    <div className="flex">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-sm">Giày đẹp, form vừa. Chất lượng tốt so với giá tiền.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sản phẩm liên quan */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}
      
      {/* Cam kết */}
      <div className="mt-16 mb-8">
        <h2 className="mb-6 text-2xl font-bold">Cam kết của chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-medium">Chính hãng 100%</h3>
              <p className="text-sm text-muted-foreground">Cam kết sản phẩm chính hãng hoặc hoàn tiền 200%</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-medium">Đổi trả 30 ngày</h3>
              <p className="text-sm text-muted-foreground">Đổi trả sản phẩm trong vòng 30 ngày nếu không vừa ý</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-medium">Bảo hành 12 tháng</h3>
              <p className="text-sm text-muted-foreground">Bảo hành chính hãng 12 tháng theo quy định nhà sản xuất</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
