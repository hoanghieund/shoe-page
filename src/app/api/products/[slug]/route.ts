import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * GET /api/products/[slug]
 * Lấy thông tin chi tiết của một sản phẩm theo slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    const slug = params.slug;
    
    // Lấy thông tin sản phẩm
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();
    
    if (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }
    
    // Định dạng giá tiền
    const formattedProduct = {
      ...product,
      price_formatted: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0
      }).format(product.price)
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
    }
    
    // Định dạng giá tiền cho sản phẩm liên quan
    const formattedRelatedProducts = relatedProducts?.map(item => ({
      ...item,
      price_formatted: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0
      }).format(item.price)
    })) || [];
    
    return NextResponse.json({
      product: formattedProduct,
      related_products: formattedRelatedProducts
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}
