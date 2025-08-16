import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Lấy thông tin chi tiết của một sản phẩm theo slug
 * @param slug Slug của sản phẩm
 * @returns Thông tin chi tiết sản phẩm và sản phẩm liên quan
 */
export async function getProductDetails(slug: string) {
  const supabase = createServerSupabaseClient();
  
  // Lấy thông tin sản phẩm
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  
  if (error) {
    console.error("Error fetching product details:", error);
    return { product: null, relatedProducts: [] };
  }
  
  // Định dạng giá tiền
  const formattedProduct = {
    ...product,
    price_formatted: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0
    }).format(product.price),
    // Chuyển đổi chuỗi hình ảnh thành mảng đối tượng
    images: product.image_urls 
      ? (Array.isArray(product.image_urls) 
          ? product.image_urls 
          : [product.image_url]
        ).map((url: string) => ({
          url,
          alt: product.name
        }))
      : [{ url: product.image_url || "/placeholder.png", alt: product.name }]
  };
  
  // Lấy các sản phẩm liên quan (cùng danh mục)
  const { data: relatedProducts, error: relatedError } = await supabase
    .from("products")
    .select("id, name, price, image_url, slug")
    .eq("category_slug", product.category_slug)
    .neq("id", product.id)
    .limit(4);
  
  if (relatedError) {
    console.error("Error fetching related products:", relatedError);
    return { product: formattedProduct, relatedProducts: [] };
  }
  
  // Định dạng giá tiền cho sản phẩm liên quan
  const formattedRelatedProducts = relatedProducts.map((item: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    slug: string;
  }) => ({
    id: item.id,
    name: item.name,
    price: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0
    }).format(item.price),
    image_url: item.image_url,
    slug: item.slug
  }));
  
  return {
    product: formattedProduct,
    relatedProducts: formattedRelatedProducts
  };
}
