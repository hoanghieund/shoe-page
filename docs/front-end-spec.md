# Front-end Specification

## 1. Tổng quan
- **Mục tiêu**: Xây dựng giao diện người dùng cho web bán giày B2C với trải nghiệm mua sắm mượt mà, tối ưu cho mobile
- **Nguyên tắc thiết kế**: Mobile-first, tối giản, tập trung vào sản phẩm
- **Thư viện chính**: Next.js 15, TypeScript, KokonutUI, Tailwind CSS

## 2. Design System

### 2.1 Màu sắc
```typescript
const colors = {
  primary: '#000000',     // Đen
  secondary: '#FFFFFF',   // Trắng
  accent: '#FF4D4F',      // Đỏ nhạt (màu nhấn)
  gray: {
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  success: '#52C41A',
  warning: '#FAAD14',
  error: '#FF4D4F',
}
```

### 2.2 Typography
- **Font chính**: Inter (Google Fonts)
- **Kích thước chữ**:
  ```css
  :root {
    --text-xs: 0.75rem;   /* 12px */
    --text-sm: 0.875rem;  /* 14px */
    --text-base: 1rem;    /* 16px */
    --text-lg: 1.125rem;  /* 18px */
    --text-xl: 1.25rem;   /* 20px */
    --text-2xl: 1.5rem;   /* 24px */
    --text-3xl: 1.875rem; /* 30px */
  }
  ```

### 2.3 Khoảng cách (Spacing)
- Sử dụng hệ thống spacing scale: 4px (0.25rem)
- Các giá trị phổ biến: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128

## 3. Component Library

### 3.1 Button
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}
```

### 3.2 Product Card
```tsx
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  onAddToCart?: () => void;
  onQuickView?: () => void;
}
```

## 4. Các Màn Hình Chính

### 4.1 Trang Chủ
- Hero banner (1-2 slides)
- Danh mục nổi bật (4-6 danh mục)
- Sản phẩm bán chạy (carousel)
- Sản phẩm mới về
- Banner quảng cáo giữa trang
- Blog/Content marketing

### 4.2 Danh Sách Sản Phẩm
- Bộ lọc (size, màu sắc, giá, thương hiệu)
- Sắp xếp (mới nhất, bán chạy, giá thấp-cao)
- Grid/List view
- Phân trang (load more hoặc pagination)
- Empty state

### 4.3 Chi Tiết Sản Phẩm (PDP)
- Gallery ảnh (ảnh chính + thumbnails)
- Thông tin sản phẩm (tên, giá, mô tả)
- Chọn size (hiển thị số lượng tồn)
- Nút thêm vào giỏ/ Mua ngay
- Tab thông tin (mô tả, đánh giá, chính sách)
- Sản phẩm tương tự

## 5. Luồng Thanh Toán

### 5.1 Giỏ Hàng
- Danh sách sản phẩm đã chọn
- Thay đổi số lượng/Xóa sản phẩm
- Mã giảm giá
- Tổng tiền tạm tính
- Nút thanh toán

### 5.2 Thanh Toán
- Thông tin giao hàng
- Phương thức thanh toán (COD)
- Xem lại đơn hàng
- Nút đặt hàng

## 6. Trạng Thái (States)

### 6.1 Loading States
- Button loading
- Skeleton cho danh sách sản phẩm
- Skeleton cho chi tiết sản phẩm

### 6.2 Empty States
- Giỏ hàng trống
- Không tìm thấy sản phẩm
- Lịch sử đơn hàng trống

## 7. Responsive Breakpoints
```typescript
const breakpoints = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px',
}
```

## 8. Animation & Micro-interactions
- Fade in/out khi chuyển trang
- Hover effect trên các thẻ sản phẩm
- Animation khi thêm vào giỏ hàng
- Loading skeleton

## 9. Accessibility
- Đảm bảo đủ độ tương phản màu sắc
- Keyboard navigation
- ARIA labels cho các thành phần tương tác
- Skip to main content

## 10. Performance Optimization
- Lazy load ảnh
- Code splitting
- Prefetch các route quan trọng
- Tối ưu bundle size

## 11. Testing
- Unit test cho các components
- Integration test cho các luồng chính
- E2E test với Cypress

## 12. Tài Nguyên
- [KokonutUI Documentation](https://kokonutui.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Figma Design Kit](#) (link sẽ được cập nhật sau)
