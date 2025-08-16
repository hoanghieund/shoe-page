"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * QueryProvider component cho KokonutUI
 * Cung cấp React Query context cho toàn bộ ứng dụng
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Tạo một instance của QueryClient
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Cấu hình mặc định cho các queries
        staleTime: 60 * 1000, // 1 phút
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
