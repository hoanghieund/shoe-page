import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * GET /api/products
 * Lấy danh sách sản phẩm với các tùy chọn lọc và sắp xếp
 * Query params:
 * - limit: số lượng sản phẩm trả về (mặc định: 10)
 * - offset: vị trí bắt đầu (mặc định: 0)
 * - sort: trường sắp xếp (created_at, price, name)
 * - order: thứ tự sắp xếp (asc, desc)
 * - best_sellers: 1 để lấy sản phẩm bán chạy
 * - category: slug của danh mục
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const searchParams = request.nextUrl.searchParams;
    
    // Xử lý các tham số truy vấn
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const sort = searchParams.get("sort") || "created_at";
    const order = searchParams.get("order") === "asc" ? true : false;
    const bestSellers = searchParams.get("best_sellers") === "1";
    const category = searchParams.get("category");
    
    // Bắt đầu truy vấn
    let query = supabase
      .from("products")
      .select("id, name, price, image_url, slug, created_at, sold_count");
    
    // Áp dụng bộ lọc
    if (bestSellers) {
      query = query.order("sold_count", { ascending: false });
    } else if (sort) {
      query = query.order(sort, { ascending: order });
    }
    
    if (category) {
      query = query.eq("category_slug", category);
    }
    
    // Phân trang
    query = query.range(offset, offset + limit - 1);
    
    // Thực hiện truy vấn
    const { data, error, count } = await query;
    
    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Lỗi khi lấy dữ liệu sản phẩm" },
        { status: 500 }
      );
    }
    
    // Định dạng giá tiền
    const formattedData = data.map(product => ({
      ...product,
      price_formatted: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0
      }).format(product.price)
    }));
    
    return NextResponse.json({
      products: formattedData,
      total: count,
      limit,
      offset
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}
