# B2C Shoe Web App VN Product Requirements Document (PRD)

## 1. Goals and Background Context

### 1.1 Goals
- Tạo doanh thu đầu tiên trong 2–4 tuần sau khi MVP live.
- Đạt 100 đơn hàng trong 60 ngày với CAC ≤ 10% giá trị đơn.
- CVR ≥ 1.2% trong 60 ngày; LCP < 2.5s.
- Thiết lập tăng trưởng organic-first (UGC/KOC, ưu đãi ra mắt, referral).
- Ra mắt MVP ≤ 3 tuần với luồng mua hoàn chỉnh và vận hành ổn định.

### 1.2 Background Context
Dự án nhắm thị trường bán giày B2C Việt Nam với ngân sách hạn chế cho SEO/ads. Để giải quyết vấn đề tiếp cận khách hàng, ta ưu tiên chiến lược organic-first + ưu đãi ra mắt, tập trung MVP gọn (danh sách/chi tiết sản phẩm, giỏ hàng/checkout, đơn hàng tối thiểu) cùng nền tảng hiệu năng/SEO tốt. Đối tượng chính là người mua giày phổ thông (mobile-first) và ngách chạy bộ entry-level. Mục tiêu tạo doanh thu sớm để tái đầu tư và tối ưu chuyển đổi.

### 1.3 Change Log
| Date       | Version | Description                                       | Author |
|------------|---------|---------------------------------------------------|--------|
| 2025-08-16 | v0.1    | Khởi tạo PRD – Goals/Background từ brief         | PM     |

## 2. Requirements

### 2.1 Functional Requirements (FR)
- FR1: Người dùng xem danh sách sản phẩm với lọc theo size/giá/loại và phân trang.
- FR2: Người dùng xem trang chi tiết sản phẩm với ảnh thật, mô tả, hướng dẫn chọn size, tồn kho theo size.
- FR3: Người dùng thêm/xóa/cập nhật số lượng sản phẩm trong giỏ hàng.
- FR4: Checkout tối thiểu với thông tin nhận hàng, phí ship ước tính, nhập mã giảm giá ra mắt.
- FR5: Hệ thống tạo đơn hàng với trạng thái cơ bản (đã đặt/đang giao/hoàn tất) và gửi email xác nhận.
- FR6: Admin CRUD sản phẩm (tên, mô tả, giá, ảnh, thuộc tính), quản lý tồn kho theo size.
- FR7: Admin xem danh sách đơn hàng và cập nhật trạng thái.
- FR8: Theo dõi sự kiện add_to_cart, begin_checkout, purchase (analytics).
- FR9: Sitemap/robots/meta/schema Product tự động cho danh mục và sản phẩm.
- FR10: Trang nội dung tĩnh cần thiết (FAQ size/đổi trả/chăm giày, chính sách).

### 2.2 Non-Functional Requirements (NFR)
- NFR1: Hiệu năng trang sản phẩm/danh mục đạt LCP < 2.5s, TTFB < 500ms, CLS mức “Good”.
- NFR2: Độ ổn định: lỗi 5xx < 0.1% request trong giai đoạn MVP.
- NFR3: Bảo mật: quản lý secrets qua env, ẩn PII trong logs, RBAC cơ bản cho CMS.
- NFR4: Khả dụng: hỗ trợ Chrome/Safari/Edge (2 bản gần nhất), iOS 15+, Android 9+.
- NFR5: SEO cơ bản: ISR/SSR, canonical, sitemap, robots, schema.org Product.
- NFR6: Khả năng mở rộng: kiến trúc monolith Next + Supabase, dễ tích hợp cổng thanh toán Phase 2.
- NFR7: Observability: tích hợp Vercel Analytics, Sentry, Supabase logs ngay từ đầu.
- NFR8: Ảnh tối ưu: dùng WebP/AVIF, lazy-load, CDN; thời gian hiển thị ảnh chính < 1s trên 4G.
- NFR9: Quy trình backup: backup DB hằng ngày (Supabase), retention ≥ 7 ngày.
- NFR10: Khả năng test: tối thiểu unit + integration cho domain core (giỏ/đơn) ở Phase MVP+.

## 3. User Interface Design Goals

### 3.1 Overall UX Vision
- Mobile-first, tốc độ cao, tối giản thao tác “chọn size → thêm giỏ → checkout”. [Giả định]
- Hình ảnh thật, mô tả ngắn gọn, nhấn mạnh size/giá/đổi trả.
- SEO/ISR sẵn sàng: URL sạch, metadata đầy đủ.

### 3.2 Key Interaction Paradigms
- Lọc nhanh theo size/giá/loại với state giữ được khi back/forward (shallow routing).
- Size picker hiển thị tồn kho từng size; cảnh báo hết hàng.
- Add-to-cart tức thời, mini-cart nổi; checkout tối giản 1–2 bước.
- Mã giảm giá ở checkout có phản hồi tức thì (valid/invalid).
- Ảnh zoom/lightbox; swipe gallery trên mobile. [Giả định]

### 3.3 Core Screens and Views
- Danh sách sản phẩm (Category/Listing)
- Chi tiết sản phẩm (PDP)
- Giỏ hàng (Cart) + Mini-cart
- Checkout (Address + Review + Place Order)
- Đơn hàng thành công / trạng thái đơn
- CMS tối thiểu (Product, Inventory by size, Orders)

### 3.4 Accessibility
- Mức mục tiêu: WCAG AA. [Giả định]

### 3.5 Branding
- Tối giản, hiện đại; nhấn mạnh ảnh thật, màu trung tính (đen/trắng/xám) + 1 màu nhấn. [Giả định]
- Sẽ cập nhật khi có logo/tokens chính thức.

### 3.6 Target Device and Platforms
- Web Responsive (ưu tiên mobile), hỗ trợ desktop cơ bản.

### 3.7 KPIs & Giới hạn tài nguyên
#### Chỉ số thành công (30 ngày đầu)
- **Tỷ lệ chuyển đổi (CVR)**: ≥ 1.2%
- **Thời gian tải trang (LCP)**: < 2.5s
- **Đơn hàng mục tiêu**: 50 đơn
- **Tỷ lệ thoát trang**: < 60%
- **Tỷ lệ add-to-cart**: > 5%

#### Giới hạn tài nguyên
- **Nhóm phát triển**: 1-2 dev fullstack
- **Hạ tầng**: Free tier Vercel + Supabase
- **Băng thông**: ~100GB/tháng (Vercel)
- **Lưu trữ ảnh**: ~5GB (Supabase Storage)
- **Số request API**: ~500k/tháng (Supabase)

## 4. Technical Assumptions

### 4.1 Repository Structure
- Monorepo đơn giản, 1 ứng dụng Next.js. (Chọn: Monorepo)

### 4.2 Service Architecture
- Monolith Next.js 15 (App Router) + Route Handlers/Server Actions; tránh microservices ở MVP. (Chọn: Monolith)

### 4.3 Languages & Frameworks
- TypeScript, Next.js 15, Vite (dev/bundle), pnpm. (Theo brief)

### 4.4 UI Library & Styling
- KokonutUI + Tailwind CSS nếu phù hợp với khuyến nghị/thành phần có sẵn. (Chọn: Có Tailwind)

### 4.5 Database & Auth
- Supabase: Postgres + Auth + Storage. (Theo brief)

### 4.6 Caching & Rendering
- ISR/SSR cho Listing/PDP; revalidate mặc định 120s (tối ưu giữa tươi mới và chi phí). (Chọn: 120s)

### 4.7 Search & Filtering
- Lọc/sort từ DB với index cơ bản (price, category, size); chưa dùng công cụ search nâng cao ở MVP. (Chọn: Không Algolia/Meilisearch ở MVP)

### 4.8 Email & Notifications
- Resend cho email xác nhận đơn và thông báo cơ bản. (Chọn: Resend)

### 4.9 Payments
- MVP: COD. Phase 2: VNPay/Momo/ZaloPay. (Theo brief)

### 4.10 Hosting & Infra
- Ứng dụng Next trên Vercel; DB/Storage/Auth trên Supabase; CDN ảnh. (Theo brief)

### 4.11 Observability & Logging
- Sentry cho error tracking, Vercel Analytics cho hiệu năng.
- Winston cho logging server-side (Route Handlers/Jobs) theo mức độ: info/warn/error. (Chọn: Có)

### 4.12 Security
- ENV secrets; ẩn PII trong logs; RBAC tối thiểu cho CMS; headers bảo mật/cors cơ bản.

### 4.13 Testing
- Unit + Integration cho domain core (cart/order) trong MVP; E2E nhẹ sau khi ổn định. (Chọn: Unit + Integration)

### 4.14 Backup & Migration
- Supabase backup hằng ngày (retention ≥ 7 ngày); migration có version (SQL scripts).

### 4.15 Performance Targets
- LCP < 2.5s, TTFB < 500ms cho listing/PDP; ảnh WebP/AVIF + lazy‑load.

### 4.16 Accessibility
- Mục tiêu WCAG AA cho thành phần tương tác chủ đạo. (Theo UI Goals)

### 4.17 Dữ liệu mẫu
- **Sản phẩm**: 20-30 mẫu giày đa dạng về loại (sneaker, giày chạy bộ, giày thời trang)
- **Hình ảnh**: 3-5 ảnh mỗi sản phẩm (tổng cộng ~100 ảnh)
- **Kích thước**: Từ 35-44 (nữ) và 38-46 (nam)
- **Danh mục**: 4-6 danh mục chính (ví dụ: nam, nữ, giảm giá, bán chạy)
- **Mẫu đơn hàng**: 5-10 đơn mẫu để test flow từng trạng thái

## 5. Epic List & Timeline

| Epic | Mô tả | Timeline Ước tính |
|------|-------|------------------|
| **Epic 1**: Foundation & Setup | Khởi tạo dự án Next.js 15 + Supabase, CI/CD, env, logging (Sentry/Winston), analytics, routing cơ bản và trang canary. | 3 ngày |
| **Epic 2**: Product Catalog & PDP | Danh sách sản phẩm (lọc size/giá/loại), SEO (ISR/SSR, sitemap/robots/schema), PDP (ảnh thật, size guide, tồn theo size). | 5 ngày |
| **Epic 3**: Cart & Minimal Checkout | Giỏ hàng (thêm/xóa/sửa), mini-cart, checkout tối thiểu (địa chỉ, phí ship ước tính, mã giảm giá), xác nhận đơn (COD). | 4 ngày |
| **Epic 4**: Orders & Admin CMS | Tạo/ghi nhận đơn, trạng thái (đã đặt/đang giao/hoàn tất), email xác nhận (Resend), CMS tối thiểu (CRUD sản phẩm, tồn kho theo size, danh sách đơn). | 4 ngày |
| **Epic 5**: Performance, SEO Hardening & Launch Readiness | Tối ưu CWV, rà soát SEO/meta/canonical, events (add_to_cart/begin_checkout/purchase), checklist go‑live. | 4 ngày |

**Tổng thời gian dự kiến**: 20 ngày làm việc
**Đệm rủi ro**: +25% (5 ngày)
**Tổng timeline**: 25 ngày (~5 tuần)

## 6. Epics & Stories Details

### Epic 1: Foundation & Setup
Mục tiêu mở rộng: Thiết lập nền tảng dự án vận hành ổn định (build, deploy, quan trắc, bảo mật sơ bộ) và cung cấp một increment testable (canary/health) đã deploy.

#### Story 1.1 Scaffold dự án & cấu hình cơ bản
As a developer,
I want a Next.js 15 + TS + pnpm project scaffolded with base config,
so that team có nền tảng thống nhất để phát triển.

Acceptance Criteria
1: Repo khởi tạo Next 15 (App Router), TypeScript, Vite dev, pnpm lockfile.
2: Thiết lập alias/module resolution cơ bản; lint/format script chạy OK.
3: README hướng dẫn run dev/build.

#### Story 1.2 Thiết lập CI/CD và môi trường
As a developer,
I want CI (lint/build) và CD (Vercel) cấu hình,
so that mỗi thay đổi đều build/deploy tự động.

Acceptance Criteria
1: CI chạy lint + build trên PR; block nếu fail.
2: Deploy lên Vercel preview cho PR; production branch deploy tự động.
3: Tài liệu ENV variables (Supabase, Resend…) trong README (không lộ secret).

#### Story 1.3 Logging & Analytics căn bản
As an operator,
I want Sentry và Winston logging server-side, Vercel Analytics,
so that có thể theo dõi lỗi/hiệu năng ngay từ đầu.

Acceptance Criteria
1: Sentry SDK cấu hình với DSN qua ENV; sample error test hoạt động.
2: Winston logger tiện ích dùng chung trong Route Handlers (info/warn/error).
3: Vercel Analytics hiển thị được page views/metrics sau deploy.

#### Story 1.4 Canary/Health route
As a user,
I want a canary page/health endpoint,
so that có thể xác nhận hệ thống chạy và quan trắc cơ bản.

Acceptance Criteria
1: Route `/health` trả JSON status: ok, version, timestamp.
2: Canary page hiển thị build info (commit short, build time) ở footer.
3: Được bảo vệ hợp lý (no secrets), cache phù hợp.

#### Story 1.5 Kết nối Supabase & cấu trúc DB cơ bản
As a developer,
I want Supabase client và schema tối thiểu sẵn sàng,
so that có thể lưu/đọc dữ liệu sản phẩm/đơn trong các epic tiếp theo.

Acceptance Criteria
1: Supabase client phía server cấu hình bằng ENV.
2: Tạo bảng khởi đầu: `products` (id, name, price, images, category), `product_sizes` (product_id, size, stock).
3: Migration scripts có version; chạy lại được từ đầu trên môi trường mới.

#### Story 1.6 Routing & UI cơ bản
As a shopper,
I want một trang chủ tối giản và header/footer chuẩn hóa,
so that có khung UI thống nhất cho các luồng sau.

Acceptance Criteria
1: Trang Home có link tới canary/health; header chứa logo placeholder, nav tối thiểu.
2: Áp dụng KokonutUI (+ Tailwind) cho layout cơ bản; responsive.
3: Core Web Vitals trên Home đạt mức “Good” trong Analytics (sau deploy).

### Epic 2: Product Catalog & PDP
Mục tiêu mở rộng: Cho phép người dùng khám phá danh mục và xem chi tiết sản phẩm với thông tin/ảnh/size rõ ràng, tối ưu SEO và hiệu năng.

#### Story 2.1 Trang danh sách sản phẩm (Listing)
As a shopper,
I want xem danh sách sản phẩm theo danh mục,
so that tôi có thể duyệt và tìm sản phẩm phù hợp.

Acceptance Criteria
1: Listing hiển thị thẻ sản phẩm (ảnh, tên, giá) với phân trang.
2: URL SEO‑friendly: `/c/{category}`; breadcrumb cơ bản.
3: ISR cho listing; revalidate 120s; fallback nhanh.

#### Story 2.2 Lọc/sắp xếp & giữ trạng thái
As a shopper,
I want lọc theo size/giá/loại và sắp xếp,
so that tôi mau chóng rút gọn lựa chọn.

Acceptance Criteria
1: Bộ lọc size/giá/loại, sort theo giá/mới nhất.
2: Shallow routing giữ state khi back/forward.
3: Truy vấn DB có index phù hợp (price, category, size).

#### Story 2.3 Trang chi tiết sản phẩm (PDP)
As a shopper,
I want xem ảnh thật, mô tả, size guide và tồn kho theo size,
so that tôi tự tin chọn size và mua.

Acceptance Criteria
1: Gallery ảnh (zoom/lightbox; swipe mobile), mô tả ngắn gọn.
2: Size picker hiển thị tồn theo size; trạng thái hết hàng rõ ràng.
3: Gợi ý sản phẩm tương tự (cùng danh mục/giá gần).

#### Story 2.4 SEO & Metadata cho Catalog/PDP
As a marketer,
I want metadata/schema/sitemap/canonical chuẩn,
so that trang được index và hiển thị tốt trên tìm kiếm.

Acceptance Criteria
1: Schema.org Product trên PDP; Open Graph/Twitter Cards.
2: Canonical URL cho listing/PDP; robots/meta đầy đủ.
3: sitemap.xml tự động cho danh mục và sản phẩm.

#### Story 2.5 Hiệu năng Listing/PDP
As an operator,
I want các trang catalog/PDP tải nhanh,
so that đạt mục tiêu LCP/TTFB/CLS của MVP.

Acceptance Criteria
1: Ảnh WebP/AVIF, lazy‑load, kích thước tối ưu theo viewport.
2: LCP < 2.5s, TTFB < 500ms trên trang listing/PDP (điều kiện tiêu chuẩn lab).
3: Đo lường qua Vercel Analytics + check CWV; tối ưu nếu dưới ngưỡng.

### Epic 3: Cart & Minimal Checkout
Mục tiêu mở rộng: Cho phép thêm giỏ/mua nhanh với checkout tối thiểu, hỗ trợ mã giảm giá ra mắt và xác nhận đơn COD.

#### Story 3.1 Cart & Mini‑cart
As a shopper,
I want thêm/xóa/sửa số lượng sản phẩm trong giỏ,
so that tôi quản lý đơn hàng trước khi thanh toán.

Acceptance Criteria
1: Thêm/Xóa/Cập nhật số lượng; hiển thị tạm tính.
2: Mini‑cart xuất hiện sau add‑to‑cart; link tới trang Cart.
3: Lưu trạng thái giỏ theo session (server hoặc cookie‑based) an toàn.

#### Story 3.2 Mã giảm giá (Launch Coupon)
As a shopper,
I want nhập mã giảm giá ở checkout,
so that tôi nhận ưu đãi ra mắt.

Acceptance Criteria
1: Input mã + nút áp dụng; phản hồi valid/invalid ngay.
2: Rule cơ bản: %/số tiền; ngưỡng tối thiểu; 1 mã/đơn.
3: Log sự kiện áp dụng mã (analytics) không lộ PII.

#### Story 3.3 Checkout – Bước Address
As a shopper,
I want nhập thông tin nhận hàng (tên/điện thoại/địa chỉ),
so that cửa hàng có thể giao hàng.

Acceptance Criteria
1: Form tối thiểu, validate cơ bản (điện thoại VN, bắt buộc trường chính).
2: Ước tính phí ship hiển thị rõ (giả định rule tĩnh MVP).
3: Lưu tạm dữ liệu để chuyển bước Review.

#### Story 3.4 Checkout – Bước Review + Place Order (COD)
As a shopper,
I want xem tóm tắt đơn và đặt hàng COD,
so that tôi hoàn tất mua.

Acceptance Criteria
1: Review giỏ + address + phí ship + tổng tiền (sau mã giảm giá).
2: Nút “Place Order” tạo đơn trạng thái "đã đặt"; ghi DB an toàn.
3: Gửi email xác nhận qua Resend; hiển thị trang success chứa mã đơn.

#### Story 3.5 Tracking & Error Handling
As an operator,
I want theo dõi sự kiện và xử lý lỗi thân thiện,
so that có thể tối ưu funnel và giảm rớt bước.

Acceptance Criteria
1: Ghi events add_to_cart, begin_checkout, purchase.
2: Thông báo lỗi rõ ràng, không lộ thông tin nhạy cảm; log bằng Winston/Sentry.
3: Retry/lỗi mạng nhẹ được xử lý UI (toast/hint) ở các thao tác quan trọng.

### Epic 4: Orders & Admin CMS
Mục tiêu mở rộng: Quản lý vòng đời đơn hàng từ tạo đơn (COD) đến cập nhật trạng thái; cung cấp CMS tối thiểu cho sản phẩm, tồn kho theo size và danh sách đơn.

#### Story 4.1 Tạo đơn hàng (server) và số hóa dữ liệu
As a system,
I want tạo bản ghi Order an toàn khi người dùng Place Order,
so that dữ liệu giao dịch được lưu trữ chuẩn hoá.

Acceptance Criteria
1: Bảng `orders` (id, code, items, subtotal, shipping_fee, discount, total, address_json, status, created_at).
2: Lưu `order_items` tham chiếu sản phẩm/size/qty/price.
3: Giao dịch (transaction) đảm bảo tính nhất quán; chống double‑submit.

#### Story 4.2 Cập nhật tồn kho theo size khi đặt hàng
As an operator,
I want giảm `stock` theo size khi đơn được tạo,
so that tồn kho phản ánh chính xác.

Acceptance Criteria
1: Giảm tồn ở `product_sizes` theo từng item; ngăn âm kho.
2: Rollback nếu bất kỳ item hết hàng trong quá trình tạo.
3: Log hoạt động điều chỉnh tồn kho (audit trail tối thiểu).

#### Story 4.3 Trạng thái đơn & trang theo dõi
As a shopper,
I want xem trạng thái đơn sau khi đặt thành công,
so that tôi biết quá trình xử lý.

Acceptance Criteria
1: Trạng thái: `đã đặt` → `đang giao` → `hoàn tất` (MVP).
2: Trang success hiển thị mã đơn + link theo dõi trạng thái cơ bản.
3: Endpoint server trả trạng thái đơn theo mã/code (ẩn PII).

#### Story 4.4 Email xác nhận đơn (Resend)
As a shopper,
I want nhận email xác nhận chi tiết đơn hàng,
so that tôi yên tâm về đặt hàng.

Acceptance Criteria
1: Gửi email sau khi tạo đơn (server event); template đơn giản, tiếng Việt.
2: Retry 1–2 lần nếu thất bại; log lỗi bằng Winston/Sentry.
3: Không rò rỉ PII trong log; cấu hình qua ENV.

#### Story 4.5 Admin CMS – Sản phẩm & tồn kho
As an admin,
I want tạo/sửa/xoá sản phẩm và tồn kho theo size,
so that tôi quản trị catalog nhanh.

Acceptance Criteria
1: Trang CMS tối thiểu: danh sách sản phẩm (paginate, search tên), form CRUD.
2: Quản lý `product_sizes` (size, stock) theo từng sản phẩm.
3: RBAC tối thiểu: chỉ admin đăng nhập (Supabase Auth/RLS cơ bản) truy cập.

#### Story 4.6 Admin CMS – Đơn hàng
As an admin,
I want xem và cập nhật trạng thái đơn,
so that tôi xử lý giao hàng.

Acceptance Criteria
1: Danh sách đơn (paginate, lọc theo trạng thái, thời gian).
2: Trang chi tiết đơn: items, địa chỉ, tổng tiền, lịch sử trạng thái.
3: Cập nhật trạng thái an toàn; ghi log audit (ai/bao giờ/đổi gì).

## 7. Checklist Results Report
### 7.1 PRD Review Checklist
#### Scope & Completeness
- [ ] Tất cả epics/stories đã cover đủ scope MVP trong timeline 3 tuần?
- [ ] Mỗi story có đủ acceptance criteria để dev/test?
- [ ] Còn thiếu edge cases nào không? (Ví dụ: hết hàng khi thanh toán, lỗi mạng, v.v.)

#### Technical Feasibility
- [ ] Các yêu cầu kỹ thuật có khả thi với Next.js 15 + Supabase không?
- [ ] Có phụ thuộc bên ngoài nào cần tích hợp sớm không? (Resend, v.v.)
- [ ] Đã xem xét giới hạn của ISR/SSR với dữ liệu động?

#### UX/UI Alignment
- [ ] Các luồng chính đã được mô tả đủ rõ để thiết kế UI chưa?
- [ ] Có cần thêm màn hình/trạng thái nào không? (Ví dụ: empty states, loading, lỗi)

#### SEO & Performance
- [ ] Đã cover hết các yêu cầu SEO cơ bản (meta, sitemap, schema)?
- [ ] Các target LCP/TTFB có khả thi với hosting Vercel + Supabase không?

#### Launch Readiness
- [ ] Đã có kế hoạch monitoring sau launch chưa?
- [ ] Có cần thêm logging/analytics events nào không?

### 7.2 Open Questions & Decisions Needed
1. **Ưu tiên phát triển**: Có nên đẩy CMS lên trước để nhập dữ liệu mẫu không?
2. **Dữ liệu mẫu**: Cần chuẩn bị bao nhiêu sản phẩm/ảnh cho bản demo?
3. **Testing**: Có cần test thủ công trên thiết bị thật không, hay chỉ dùng lab tools?
4. **Phân quyền**: Có cần phân quyền chi tiết hơn cho CMS (ví dụ: editor vs admin)?

## 8. Next Steps
### 8.1 UX Expert Prompt (Draft)
```
Tôi cần thiết kế UI/UX cho ứng dụng bán giày B2C với các yêu cầu chính:

**Tổng quan**:
- Mobile-first, tối ưu cho đối tượng 18–30 tuổi tại VN
- Tập trung vào trải nghiệm xem ảnh thật, chọn size, và checkout nhanh
- Ngân sách hạn chế nên ưu tiên sử dụng component có sẵn của KokonutUI

Yêu cầu chi tiết theo từng màn hình (xem PRD mục 6):
1. Trang danh sách sản phẩm với bộ lọc nổi bật
2. Trang chi tiết sản phẩm với gallery ảnh và size picker
3. Luồng giỏ hàng + checkout 2 bước
4. Admin CMS tối giản cho sản phẩm/đơn hàng

**Cần thiết kế**:
- Wireframe chi tiết cho các màn hình chính
- UI components tái sử dụng
- Các trạng thái (loading, error, empty)
- Responsive breakpoints

**Tài nguyên có sẵn**:
- KokonutUI component library
- Màu sắc thương hiệu: đen/trắng/xám + 1 màu nhấn (chưa chốt)
- Ảnh sản phẩm thật (sẽ cung cấp sau)
```

## 9. Rủi ro & Kế hoạch Giảm thiểu

### 9.1 Rủi ro Kỹ thuật
1. **Hiệu năng chậm do hạn chế tài nguyên**
   - *Giảm thiểu*: Tối ưu ISR/SSR, cache CDN, giới hạn số lượng sản phẩm hiển thị
   - *Theo dõi*: Giám sát LCP, TTFB qua Vercel Analytics

2. **Mất dữ liệu**
   - *Giảm thiểu*: Backup hàng ngày, xác thực dữ liệu đầu vào
   - *Phục hồi*: Quy trình restore từ bản backup gần nhất

3. **Lỗi thanh toán**
   - *Giảm thiểu*: Xử lý lỗi thanh toán rõ ràng, ghi log đầy đủ
   - *Dự phòng*: Hỗ trợ đa phương thức thanh toán ở giai đoạn sau

### 9.2 Rủi ro Kinh doanh
1. **Thiếu traffic**
   - *Giảm thiểu*: Tối ưu SEO ngay từ đầu, chạy chương trình giới thiệu
   - *Mở rộng*: Tăng ngân sách quảng cáo khi có doanh thu

2. **Tỷ lệ chuyển đổi thấp**
   - *Giảm thiểu*: A/B testing UI/UX, tối ưu luồng thanh toán
   - *Cải thiện*: Thu thập phản hồi người dùng sớm

3. **Vấn đề vận chuyển**
   - *Giảm thiểu*: Làm rõ chính sách vận chuyển từ đầu
   - *Đối phó*: Có sẵn phương án đối tác vận chuyển dự phòng

### 9.3 Kế hoạch Khắc phục Sự cố
1. **Giám sát**
   - Sentry cho lỗi frontend/backend
   - Uptime monitoring với thông báo qua email/SMS

2. **Quy trình ứng phó**
   - Phân loại mức độ ưu tiên sự cố
   - Tài liệu hướng dẫn xử lý sự cố thường gặp
   - Danh sách liên lạc khẩn cấp

3. **Đánh giá sau sự cố**
   - Ghi nhận và phân tích nguyên nhân gốc rễ
   - Cập nhật tài liệu và quy trình

---

### 8.2 Architect Prompt (Draft)
```
Tôi cần thiết kế kiến trúc cho ứng dụng bán giày với yêu cầu:

**Tổng quan**:
- Next.js 15 (App Router) + TypeScript + Supabase (Postgres/Auth/Storage)
- Hosting: Vercel cho FE/BE, Supabase cho database/auth
- Yêu cầu: Tốc độ tải nhanh (LCP < 2.5s), SEO tốt, dễ mở rộng

**Yêu cầu chi tiết**:
1. Database schema tối ưu cho:
   - Sản phẩm + tồn kho theo size
   - Đơn hàng + lịch sử trạng thái
   - Mã giảm giá đơn giản

2. API design:
   - Route Handlers cho các tác vụ chính (thêm giỏ, đặt hàng, v.v.)
   - Server Actions cho form handling
   - Caching strategy cho danh mục/sản phẩm

3. Bảo mật:
   - RLS trên Supabase
   - Xử lý thanh toán an toàn (phase 2)
   - Chống spam/bot

4. Triển khai:
   - CI/CD pipeline
   - Environment management
   - Backup/restore

**Cần cung cấp**:
- ERD chi tiết
- API endpoints + types
- Deployment architecture
- Monitoring/logging strategy
```

### Epic 5: Performance, SEO Hardening & Launch Readiness
Mục tiêu mở rộng: Đảm bảo hiệu năng/SEO đạt mục tiêu và quy trình go‑live an toàn, theo dõi đầy đủ các sự kiện chính.

#### Story 5.1 Tối ưu Core Web Vitals
As an operator,
I want tối ưu LCP/CLS/INP cho các trang chính,
so that trải nghiệm người dùng mượt và điểm SEO tốt.

Acceptance Criteria
1: Home/Listing/PDP đạt: LCP < 2.5s, CLS < 0.1, INP < 200ms (lab tiêu chuẩn).
2: Ảnh hero preconnect/preload hợp lý; critical CSS tối thiểu; tránh layout shift.
3: Kiểm tra trước/sau tối ưu với báo cáo Analytics.

#### Story 5.2 SEO Audit & Schema
As a marketer,
I want rà soát SEO on‑page, metadata và schema,
so that trang index tốt và hiển thị đẹp trên SERP.

Acceptance Criteria
1: Meta title/description hợp lệ; canonical/robots chuẩn; hreflang nếu cần.
2: Schema Product/Collection hợp lệ (test Rich Results).
3: sitemap.xml sinh đúng; kiểm tra 404/redirect/canonical loop.

#### Story 5.3 Tracking Sự kiện & Funnels
As a marketer,
I want các sự kiện chính được ghi nhất quán,
so that có thể phân tích funnel và chuyển đổi.

Acceptance Criteria
1: add_to_cart, begin_checkout, purchase ghi với context cần thiết (không PII).
2: Gắn UTM parsing cơ bản; lưu vào session context cho reports.
3: Tài liệu map sự kiện → mục tiêu/kênh đo lường.

#### Story 5.4 QA/UAT & Bug‑bash
As a team,
I want một vòng QA/UAT ngắn với checklist rõ ràng,
so that giảm lỗi trước khi go‑live.

Acceptance Criteria
1: Checklist test flows: browse → PDP → cart → checkout → success.
2: Test trên thiết bị phổ biến (mobile trước); ghi log bug và fix critical.
3: Regression nhanh cho các path chính; không còn blocker severity high.

#### Story 5.5 Go‑live Checklist & Rollout
As an operator,
I want checklist go‑live và kế hoạch rollback đơn giản,
so that phát hành an toàn.

Acceptance Criteria
1: ENV/secret kiểm tra đủ; domain/DNS/SSL OK; 404/500 page sẵn sàng.
2: Monitoring: Sentry alerts, Analytics real‑time theo dõi sau deploy.
3: Kế hoạch rollback: revert release, tắt traffic nếu cần; người chịu trách nhiệm.
