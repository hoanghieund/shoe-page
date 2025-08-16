import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Database } from "./database.types";

/**
 * Lấy danh sách sản phẩm bán chạy nhất
 * @param limit Số lượng sản phẩm muốn lấy
 * @returns Danh sách sản phẩm bán chạy
 */
export async function getBestSellers(limit = 4) {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image_url, slug")
    .order("sold_count", { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
  
  return data.map((product: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    slug: string;
  }) => ({
    id: product.id,
    name: product.name,
    price: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0
    }).format(product.price),
    image_url: product.image_url,
    slug: product.slug
  }));
}

/**
 * Lấy danh sách sản phẩm mới nhất
 * @param limit Số lượng sản phẩm muốn lấy
 * @returns Danh sách sản phẩm mới
 */
export async function getNewArrivals(limit = 6) {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image_url, slug")
    .order("created_at", { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
  
  return data.map((product: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    slug: string;
  }) => ({
    id: product.id,
    name: product.name,
    price: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0
    }).format(product.price),
    image_url: product.image_url,
    slug: product.slug,
    isNew: true
  }));
}

/**
 * Lấy danh sách danh mục sản phẩm
 * @returns Danh sách danh mục
 */
export async function getCategories() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");
  
  if (error) {
    console.error("Error fetching categories:", error);
    // Fallback nếu chưa có bảng categories
    return [
      { key: "men", label: "Giày nam" },
      { key: "women", label: "Giày nữ" },
      { key: "kids", label: "Trẻ em" },
      { key: "sport", label: "Thể thao" },
      { key: "casual", label: "Thời trang" },
      { key: "outdoor", label: "Outdoor" },
    ];
  }
  
  return data.map((category: {
    id: string;
    name: string;
    slug: string;
  }) => ({
    key: category.slug,
    label: category.name
  }));
}
