"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * ActionBar component - client component tách từ page.tsx
 * Chứa các nút tương tác như hiển thị toast và reload trang
 */
export function ActionBar() {
  const { toast } = useToast();

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        onClick={() =>
          toast({ title: "KokonutUI hoạt động!", description: "Toast từ shadcn/ui" })
        }
      >
        Hiển thị thông báo
      </Button>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Tải lại trang
      </Button>
    </div>
  );
}
