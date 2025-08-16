// Đây là phiên bản tạm thời để tránh lỗi next/headers trong Client Component
// Trong môi trường sản xuất, bạn nên tách riêng logic server và client

import { createClient } from './client';

// Sử dụng client thay vì server để tránh lỗi next/headers
export const createServerSupabaseClient = () => {
  // Đây là giải pháp tạm thời, không nên sử dụng trong sản xuất
  return createClient();
};

export const getSession = async () => {
  const supabase = createServerSupabaseClient();
  return await supabase.auth.getSession();
};

export const getUser = async () => {
  const supabase = createServerSupabaseClient();
  return await supabase.auth.getUser();
};
