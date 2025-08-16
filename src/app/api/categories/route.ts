import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * GET /api/categories
 * Lấy danh sách tất cả các danh mục sản phẩm
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, image_url")
      .order("name");
    
    if (error) {
      console.error("Error fetching categories:", error);
      
      // Fallback nếu chưa có bảng categories
      const fallbackCategories = [
        { id: "1", name: "Giày nam", slug: "men", image_url: null },
        { id: "2", name: "Giày nữ", slug: "women", image_url: null },
        { id: "3", name: "Trẻ em", slug: "kids", image_url: null },
        { id: "4", name: "Thể thao", slug: "sport", image_url: null },
        { id: "5", name: "Thời trang", slug: "casual", image_url: null },
        { id: "6", name: "Outdoor", slug: "outdoor", image_url: null },
      ];
      
      return NextResponse.json({ categories: fallbackCategories });
    }
    
    return NextResponse.json({ categories: data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}
