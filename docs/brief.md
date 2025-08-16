# Project Brief: Web Bán Giày B2C Việt Nam

## Executive Summary
Một trang web bán giày B2C tại Việt Nam sử dụng Next.js 15, TypeScript, Vite, pnpm; KokonutUI cho UI và Supabase cho cơ sở dữ liệu. Mục tiêu là ra mắt MVP nhanh để tạo doanh thu sớm, dùng chiến lược marketing chi phí thấp (organic + ưu đãi ra mắt) nhằm khắc phục hạn chế ngân sách SEO/ads.

- Vấn đề chính: Người dùng khó tiếp cận trang do SEO/ads yếu vì ngân sách hạn chế.
- Thị trường mục tiêu: Người mua giày phổ thông (mobile-first) và các ngách tiềm năng.
- Giá trị cốt lõi: UX nhanh, rõ ràng; nội dung hữu ích; ưu đãi hấp dẫn khi ra mắt.

## Problem Statement
- Hiện trạng: Khách hàng khó mua giày thuận tiện; không tìm thấy website của chúng ta.
- Nguyên nhân gốc: Ngân sách không đủ cho SEO/quảng cáo hiệu quả (kết quả Five Whys).
- Tác động: Doanh số thấp, thương hiệu yếu, khó cạnh tranh.
- Hạn chế của cách tiếp cận cũ: Dựa nặng vào paid ads tốn kém và lâu cho kết quả.
- Tính cấp thiết: Tận dụng đà tăng trưởng TMĐT, tạo doanh thu sớm để tái đầu tư.

## Proposed Solution
- Xây dựng MVP với Next.js 15 + TS + Vite + pnpm; KokonutUI; Supabase.
- Tập trung time-to-value: danh sách/chi tiết sản phẩm, giỏ hàng/checkout cơ bản, quản lý đơn tối thiểu.
- Tăng trưởng chi phí thấp: ưu đãi ra mắt, nội dung organic (UGC/KOC), định vị ngách, referral.
- Tối ưu nền tảng SEO/hiệu năng: SSR/ISR, schema Product, metadata, tốc độ tải nhanh.
- Khác biệt: Organic-first + ưu đãi; mobile-first; tập trung ngách để tăng CVR.

## Target Users
- Primary: 18–30 tại TP lớn, mua qua mobile, ưu tiên trend/giá. Đau điểm: chọn size, lo chất lượng, phí/đổi trả; mong muốn: mua nhanh, rõ size, giao nhanh, dễ đổi.
- Secondary: Phụ huynh 25–45 mua giày học sinh. Ưu tiên bền–rẻ; cần size rõ, combo tiết kiệm.
- Niche: Người chạy bộ entry-level cần tư vấn chọn giày theo thể trạng/cự ly.

## Goals & Success Metrics
- Business (SMART):
  - Doanh thu đầu tiên trong 2–4 tuần sau MVP.
  - 100 đơn/60 ngày với CAC ≤ 10% giá trị đơn.
  - Tỷ lệ mua lần 2 ≥ 15% trong 90 ngày.
  - CVR ≥ 1.2% trong 60 ngày.
- User Metrics: time-to-add-to-cart < 90s; checkout completion ≥ 55%; đổi size < 8%; CSAT ≥ 4.4/5.
- KPIs: Organic traffic +20% MoM (3 tháng đầu); CVR ≥ 1.2% (MVP), ≥ 1.8% (sau tối ưu); AOV ≥ 450k; CAC ≤ 40k; NPS ≥ 40; LCP < 2.5s.

## MVP Scope
- Must Have: danh sách sản phẩm (lọc size/giá/loại, ISR, URL SEO); chi tiết sản phẩm (ảnh thật, hướng dẫn size, tồn theo size, gợi ý); giỏ hàng + checkout tối thiểu (địa chỉ, phí ship ước tính, mã giảm giá); tạo/ theo dõi đơn (trạng thái cơ bản, email xác nhận); CMS đơn giản (CRUD sản phẩm/tồn size, dashboard đơn cơ bản); SEO/Perf (schema, sitemap, CWV); tracking sự kiện.
- Out of Scope: thanh toán online phức tạp (ưu tiên COD hoặc cổng tối giản nếu cần), loyalty nâng cao, bundling/upsell phức tạp, app native, ERP, blog phức tạp.
- Success Criteria: live ≤ 3 tuần; 100 đơn/60 ngày; CVR ≥ 1.2%; LCP < 2.5s; checkout ≥ 55%; lỗi 500 < 0.1% request.

## Post‑MVP Vision
- Phase 2: VNPay/Momo/ZaloPay; tài khoản KH; review/UGC; blog tối giản; gợi ý thông minh; quản trị nhập CSV/đồng bộ tồn, phân quyền cơ bản.
- 1–2 năm: Định vị ngách rõ; cá nhân hóa; chuẩn hóa vận hành (SLA, đổi trả); BI gọn; dần A/B testing.
- Mở rộng: curated marketplace đối tác; private label MOQ nhỏ; dịch vụ bảo dưỡng/giặt; mini‑app/social commerce.

## Technical Considerations
- Platform: web responsive; Chrome/Safari/Edge (2 phiên bản gần nhất), iOS 15+, Android 9+; LCP < 2.5s, TTFB < 500ms, CLS “Good”.
- Technology: FE Next.js 15 + TS + Vite + pnpm, KokonutUI; BE Route Handlers/Server Actions; DB Supabase (Postgres/Auth/Storage); Infra Vercel + Supabase; CDN ảnh.
- Architecture: single repo/monorepo đơn giản; monolith Next + API nhẹ; tích hợp email (Resend/SendGrid); thanh toán Phase 2; bảo mật env, RBAC CMS, ẩn PII trong logs, backup DB hàng ngày.
- Vận hành: Vercel Analytics, Sentry, Supabase logs; SEO (sitemap, robots, schema, canonical); ảnh WebP/AVIF, lazy-load.

## Constraints & Assumptions
- Constraints: ngân sách hạn chế; MVP ≤ 3 tuần; nhân lực gọn; thanh toán online hoãn Phase 2; ảnh thật hạn chế; chưa có ERP, tồn theo size trong Supabase.
- Assumptions: nhu cầu đủ để đạt 100 đơn/60 ngày; COD + 1 cổng tối giản là đủ; organic + ưu đãi tạo traffic ban đầu; nguồn hàng ổn/SLA 2–5 ngày; đổi size linh hoạt tăng niềm tin.

## Risks & Open Questions
- Rủi ro: thiếu traffic ban đầu; đổi size cao; ảnh thật hạn chế; thiếu tồn kho size hot; lỗi checkout.
- Câu hỏi: kênh social hiệu quả (TikTok/FB/IG)? chính sách đổi size tối ưu? chọn ngách nào trước? cần cổng thanh toán ngay hay không? nguồn hàng/SLA/ảnh/ MOQ?
- Nghiên cứu thêm: mùa vụ mua giày; CVR COD vs cổng thanh toán; tác động UGC tới CVR; chi phí đổi size.

## Appendices
- Research Summary: tham chiếu kết quả brainstorming tại `docs/brainstorming-session-results.md`.
- Stakeholder Input: sẽ bổ sung trong quá trình triển khai.
- References: Supabase docs; Next.js 15; KokonutUI; Vercel; schema.org Product.

## Next Steps
1. Tạo PRD từ brief này và lưu `docs/prd.md`.
2. Soạn `docs/front-end-spec.md` (UI/UX) dựa trên PRD.
3. Soạn `docs/fullstack-architecture.md` dựa trên PRD + UI spec.
4. PO kiểm tra và shard tài liệu vào `docs/prd/` và `docs/architecture/`.
5. Tạo user stories và bắt đầu vòng SM → Dev → QA.
6. Thiết lập dự án Next 15 + Supabase, triển khai MVP ≤ 3 tuần.
