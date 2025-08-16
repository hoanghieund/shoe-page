import { AuthProvider } from "@/components/kokonutui/auth-provider";
import { Footer } from "@/components/kokonutui/footer";
import { Navbar } from "@/components/kokonutui/navbar";
import { QueryProvider } from "@/components/kokonutui/query-provider";
import { ThemeProvider } from "@/components/kokonutui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Shoe Store - Cửa hàng giày thể thao chính hãng",
  description:
    "Chuyên cung cấp các loại giày thể thao, giày chạy bộ, giày thời trang chính hãng",
  keywords: "giày thể thao, giày chạy bộ, giày thời trang, giày chính hãng",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
