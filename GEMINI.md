# Tutopia Exam (tutopiaxm) — Project Memory & Agent Guidelines

> **Project Name:** Tutopia Exam Web App (`tutopiaxm`)  
> **Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui  
> **Primary Purpose:** Modern, responsive web platform translating the Tutopia Exam Android App (v1.0) into a responsive, high-performance web application.  
> **Brand Theme:** Signature Tutopia Primary Blue (`#0284C7`) and Vibrant Amber/Yellow (`#F59E0B`) with clean white cards and bottom accent stripes.

---

## 1. Reference App Screen Mapping
Original screenshots are stored in [`refrence/`](file:///Users/abhilash/work/nextjs/tutopiaxm/refrence):

| Screenshot | Original Screen | Web App Equivalent Route | Key Features & UX Notes |
| :--- | :--- | :--- | :--- |
| **Auth** | *(New Addition)* | `/(auth)/login`, `/(auth)/register` | Dual-mode login (Mobile OTP / Password), registration with target exam track, city & pincode. |
| **`1.png`** | Home Dashboard | `/(dashboard)/page.tsx` | Header (avatar, name, bell, search), promotional banner carousel (₹1999 1-year prep), quick action pills, 2x2 video class cards. |
| **`2.png`** | Mock Test List | `/(dashboard)/mock-tests` | Exam cards (100 Marks, 03:00 Hrs, last attempt date), "View History" link, sticky "View Mock test history" button. |
| **`3.png`** | Video Class Categories | `/(dashboard)/subjects` | Dual-accent cards (SSC, RAIL, WBCS; Exams Portal; All Bank Exams; GK Class 9-12; One Line GK). |
| **`4.png`** | Subject / Chapter Grid | `/(dashboard)/subjects/[category]` | Exam badge selector (`SSC`), live subject search bar, categorized topics (Maths, Reasoning, English, GK, Static GK) with chapter badges. |
| **`5.png`** | Live Classes | `/(dashboard)/live-classes` | Live stream carousel, batch card with dates & yearly subscription badge, dual CTAs ("Explore" yellow, "Buy now" blue). |
| **`6.png`** | More Menu | `/(dashboard)/more` | Settings list (My profile, Report an issue, Terms & conditions, Logout button, v1.0 footer). |
| **`7.png`** | My Profile | `/(dashboard)/profile` | Profile details (Mobile, WhatsApp, City, Pincode), full-width yellow "Subscriptions" CTA, "Edit Profile" (blue) & "Change Password" buttons. |

---

## 2. Directory Architecture & Colocation Map
The codebase follows a **Gemini-Optimized Feature Architecture** located under `src/`:

```
src/
├── app/
│   ├── (auth)/                       # Login, Register, Verify-OTP, Forgot-Password
│   ├── (dashboard)/                  # Home, Mock Tests, Subjects, Live Classes, Profile, More
│   └── api/                          # Next.js API Route Handlers
├── components/
│   ├── ui/                           # shadcn/ui components (Button, Card, Dialog, Input, etc.)
│   ├── layout/                       # Header, Sidebar, MobileBottomBar, SearchDialog
│   └── common/                       # BannerCarousel, CategoryCard, ExamPillButton
├── features/                         # High-cohesion domain modules
│   ├── auth/                         # Forms, validation schemas, auth session hooks
│   ├── home/                         # Carousel, quick pills, video class categories
│   ├── mock-tests/                   # Test cards, CBT full-screen runner, timer, question palette
│   ├── subjects/                     # Subject filter, chapter accordion, topic grid
│   ├── live-classes/                 # Live batch cards, video stream embed, interactive chat
│   └── profile/                      # Profile card, edit dialog, subscriptions
├── lib/
│   ├── utils.ts                      # cn() class utility
│   ├── constants.ts                  # App metadata, exam categories, navigation items
│   └── mock-data.ts                  # High-fidelity mock dataset matching the reference screens
└── types/                            # Global TypeScript interfaces
```

---

## 3. Strict Rules & Conventions
All agents and developers must adhere to the rules located in [`rules/`](file:///Users/abhilash/work/nextjs/tutopiaxm/rules):
- **[`rules/01-design-system-and-theme.md`](file:///Users/abhilash/work/nextjs/tutopiaxm/rules/01-design-system-and-theme.md)**: Brand colors, 4px card bottom accent stripes, font hierarchies (Bengali + English).
- **[`rules/02-nextjs-app-router-architecture.md`](file:///Users/abhilash/work/nextjs/tutopiaxm/rules/02-nextjs-app-router-architecture.md)**: Feature colocation, Server vs. Client component boundaries, `@/` absolute imports.
- **[`rules/03-ui-ux-guidelines.md`](file:///Users/abhilash/work/nextjs/tutopiaxm/rules/03-ui-ux-guidelines.md)**: Dual responsive layout (Desktop sidebar + Mobile 3-tab bottom bar), full-screen CBT runner UX, phone + OTP forms.
- **[`rules/04-code-quality-and-state-management.md`](file:///Users/abhilash/work/nextjs/tutopiaxm/rules/04-code-quality-and-state-management.md)**: Strict TypeScript, Zod schemas, URL-driven filtering, accessibility.
- **[`rules/05-frontend-api-handling.md`](file:///Users/abhilash/work/nextjs/tutopiaxm/rules/05-frontend-api-handling.md)**: Standardized TanStack Query + typed fetch client, feature API colocation (`src/features/<feature>/api/`), Zod validation, Bearer token injection, and 401 redirect handling.

---

## 4. Development Status & Milestone Tracker

### Phase 1: Foundation & Architecture Setup
- [x] Analyze all 7 reference app screens from `refrence/`.
- [x] Define Tutopia design tokens & color palette.
- [x] Create comprehensive Architecture & UX Blueprint artifact (`app_architecture_and_ux_plan.md`).
- [x] Create project directory skeleton (`src/`, `rules/`, `public/`).
- [x] Create detailed rule files (`rules/01` to `rules/04`) and mirror to `.agents/rules/`.
- [x] Establish `GEMINI.md` memory & tracking file.

### Phase 2: Project Scaffolding & Design Tokens
- [x] Initialize Next.js 15 with Tailwind CSS and TypeScript.
- [x] Install Lucide React and core shadcn/ui primitives.
- [x] Configure `globals.css` with Tutopia HSL color tokens.
- [x] Create `@/lib/mock-data.ts` containing mock items for all 7 screens.

### Phase 3: Auth Flow Implementation
- [x] Build `(auth)/layout.tsx` (Split-screen on desktop, centered card on mobile).
- [x] Build `/login` (Switchable OTP & Password tabs, +91 phone formatting).
- [x] Build `/register` (Name, Phone, WhatsApp, Exam Selector, Pincode).

### Phase 4: App Shell & Responsive Navigation
- [x] Build `AppHeader` (Avatar, "Abhilash Bera", Exam track switcher, Search bar, Bell).
- [x] Build `AppSidebar` (Desktop navigation).
- [x] Build `MobileBottomBar` (Exact 3 tabs: Home, Live Classes, More).

### Phase 5: Home & Subject Explorer
- [x] Implement promotional carousel with Bengali text & pill dots.
- [x] Build quick action pills ("Chapter wise MCQ", "Competitive Exam").
- [x] Build Video Classes grid with blue and yellow bottom accent stripes.
- [x] Build Subject & Chapter Explorer with real-time topic search and chapter counts.

### Phase 6: Mock Test Portal & CBT Runner
- [x] Build Mock Test listing cards with 100 Marks, 03:00 Hrs duration, and last attempt date.
- [x] Build Computer-Based Test (CBT) full-screen exam runner with timer and question palette.
- [x] Build Mock Test History and scorecard view.

### Phase 7: Live Classes & Profile Hub
- [x] Build Live Classes list with schedule dates, pricing tags, and dual CTAs ("Explore", "Buy now").
- [x] Build My Profile view with contact details, Subscriptions CTA, Edit Profile, and Change Password.
- [x] Build More menu screen with Report an Issue and Terms & Conditions views.

### Phase 8: Chapter Explorer & Video Lectures (Screens 9 & 10)
- [x] Add `ChapterItem` and `VideoLesson` schemas and mock datasets to `@/lib/mock-data.ts`.
- [x] Implement Screen `9.png`: Chapter Explorer (`/subjects/[examCategory]/[subjectSlug]`) with topic pill switcher (`Arithmetic`, `Algebra`, `Geometry`, `Trigo`, `D.I`) and chapter listing.
- [x] Implement Screen `10.png`: Video Lectures Playlist (`/subjects/[examCategory]/[subjectSlug]/[chapterSlug]`) with top-right chapter switcher dropdown (`NUMBER SYSTEM ⌵`), teal geometric thumbnails, and lock badges.
- [x] Build interactive [`VideoPlayerDialog`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/[examCategory]/[subjectSlug]/[chapterSlug]/_components/video-player-dialog.tsx) and [`LockSubscriptionDialog`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/[examCategory]/[subjectSlug]/[chapterSlug]/_components/lock-subscription-dialog.tsx).
### Phase 9: Real Auth API Integration (Tutopia v1.0)
- [x] Integrate Tutopia v1.0 authentication API specification (`https://competitive.tutopia.in/api/documentation#/Tutopia%20version%201.0%20(Authentication)`).
- [x] Configure dynamic base URL strictly via `process.env.NEXT_PUBLIC_API_BASE_URL`.
- [x] Build feature API slice in `src/features/auth/api/` (`types.ts`, `query-keys.ts`, `endpoints.ts`, `hooks.ts`).
- [x] Implement persistent web client device token in `src/features/auth/utils/device-token.ts`.
- [x] Upgrade `AuthProvider` with token storage, live profile hydration, and server-side token revocation on logout.
- [x] Connect `/login` (OTP verification & password tabs) and `/register` to live mutations with error handling, loading states, and 60s countdown timer.
- [x] Verify production build passes cleanly (`npm run build` exits with code 0).

### Phase 10: Mock Tests & CBT Exam API Integration
- [x] Full audit of Tutopia Mock Test and Exam OpenAPI documentation (`https://competitive.tutopia.in/docs/api-docs.json`).
- [x] Build feature API slice in `src/features/mock-tests/api/` (`types.ts`, `query-keys.ts`, `endpoints.ts`, `hooks.ts`).
- [x] Wire `/mock-tests` to live `useExamCategoriesQuery()` and `useExamsQuery(selectedTypeId)` with dynamic filter tabs and instant refresh.
- [x] Wire `/mock-tests/history` to live `useCompletedExamsQuery()` with scores, passing badges, attempt dates, and duration.
- [x] Wire CBT runner `/mock-tests/[testId]/take` to live `useExamDetailsQuery(testId)` and `useSubmitExamMutation()`.
- [x] Verify data mapping across all fields and execute clean production build (`npm run build` exits 0).

### Phase 11: Home Feed Live Integration
- [x] Build feature API slice in `src/features/home/api/` (`types.ts`, `query-keys.ts`, `endpoints.ts`, `hooks.ts`) for `GET /api/v1/home`.
- [x] Connect dashboard carousel to real Tutopia CDN banner sliders with auto-advance and manual controls.
- [x] Map Video Classes grid to live `types` categories (`SSC, RAIL, WBCS`, `Exams Portal`, `All Bank Exams`, `GK 9-12`, `One Line GK`).
- [x] Completely purge mock promo cards and mock batches from Home feed.

### Phase 12: Subjects, Chapters & Video Lectures Live API Integration & Full Mock Data Purge
- [x] Full audit of Tutopia OpenAPI specs for `chapters`, `tutorials`, and `video-play`.
- [x] Build feature API slice in `src/features/subjects/api/` (`types.ts`, `query-keys.ts`, `endpoints.ts`, `hooks.ts`).
- [x] Wire `/subjects` to live `useCompetitiveTypesQuery()` with real CDN icons and refresh actions.
- [x] Wire `/subjects/[examCategory]` to live `useCompetitiveTypeDetailQuery(typeId)` with real exam tracks, dynamic subject categories, chapter counters, and live topic search.
- [x] Wire `/subjects/[examCategory]/[subjectSlug]` to live `useChaptersQuery(subjectId)` with dynamic sibling topic pills, chapter cards, video counts, and practice question counters.
- [x] Wire `/subjects/[examCategory]/[subjectSlug]/[chapterSlug]` to live `useTutorialsQuery(chapterId)` with CDN thumbnails, duration formatting, top-right chapter switcher dropdown, and lock/play modal dialogs.
- [x] Wire `/chapter-mcq` to live `useCompetitiveTypeDetailQuery(23)` with real syllabus topics.
- [x] Wire `AppHeader` and `/profile/subscriptions` directly to live `useAuth()` session.
- [x] Complete purge of mock data imports across all subject routes, components, and headers.
- [x] Production build passes cleanly across all 19 routes (`npm run build` exits with code 0).

### Phase 13: Chapter Practice MCQs & Live Quiz Runner
- [x] Audit `chapter-practices`, `set-practice-question-answer`, and `clear-practice-question-answer` OpenAPI endpoints.
- [x] Build Practice types, endpoints, and hooks in `src/features/subjects/api/`.
- [x] Create interactive Chapter Practice Quiz Runner route at `/subjects/[examCategory]/[subjectSlug]/[chapterSlug]/practice`.
- [x] Feature instant question evaluation, question image diagrams, concept explanations, and live answer saving.
- [x] Provide scorecard summary with overall accuracy, correct/incorrect counters, and retake quiz capabilities.
- [x] Production build passes cleanly across all 20 routes (`npm run build` exits with code 0).

### Phase 14: Competitive Exam Tracks & Learning Analytics Hub
- [x] Full audit and testing of Tutopia Graph Feed OpenAPI endpoints (`v1/graph`, `v1/graph-total-video`, `v1/graph-total-watched`, `v1/graph-attempted-question`, `v1/graph-mock-test`).
- [x] Build feature API slice in `src/features/exam-tracks/api/` (`types.ts`, `query-keys.ts`, `endpoints.ts`, `hooks.ts`).
- [x] Create reusable performance components (`GraphMetricCard`, `LearningBarChart`, `PracticeTrendChart`).
- [x] Build `/exam-tracks` portal with dual tabs: Learning Graphs (24h/7d/30d filters, subject dropdown, KPI stats, charts, study streak) and Browse Exam Tracks.
- [x] Connect Card 2 on Dashboard Home page to `/exam-tracks`.
- [x] Production build passes cleanly across all 20 routes (`npm run build` exits with code 0).

### Phase 15: Subscriptions, Orders, and Wallet Credits Hub
- [x] Full audit of Tutopia Subscription & Order OpenAPI endpoints (`/api/v1/subscription-plans`, `/api/v1/order-request`, `/api/v1/credit-orders`, `/api/v1/wallet`).
- [x] Build feature API slice in `src/features/subscriptions/api/` (`types.ts`, `query-keys.ts`, `endpoints.ts`, `hooks.ts`).
- [x] Create reusable UI components: `SubscriptionPlanCard`, `OrderRequestDialog`, `OrderHistoryList`, and `WalletCard`.
- [x] Upgrade `/profile/subscriptions` into a unified Hub with 3 tabs: "Available Packages", "My Orders & Requests", and "Wallet & Credits".
- [x] Provide instant assisted order callback requests via `POST /api/v1/order-request`.
- [x] Update navigation links in `AppSidebar`, `AppHeader`, and `ProfilePage`.
- [x] Production build passes cleanly across all 20 routes (`npm run build` exits with code 0).

---

## 5. Decision Log
- **2026-10-17:** Retained exact mobile app 3-tab bottom bar on mobile viewports while upgrading to a full sidebar + command-palette layout on desktop.
- **2026-10-17:** Added dedicated Authentication (`/login`, `/register`, `/verify-otp`) to capture student onboarding data consistent with the profile fields in `refrence/7.png`.
- **2026-10-17:** Successfully scaffolded Next.js 15 App Router with full suite of screens matching the reference app, verified zero build errors.
- **2026-10-17:** UI Enhancement & Polish: Removed dated bottom colored borders in favor of clean neutral borders (`border-slate-200/80`), standardized on compact `rounded-md` (0.375rem) corners, built a glassmorphic global header with ⌘K search and exam switcher, built custom branded animated SVG loader (`<TutopiaLoader />`), and introduced smooth micro-interactions.
- **2026-10-17:** Header Streamlining: Removed exam track dropdown from [`AppHeader`](file:///Users/abhilash/work/nextjs/tutopiaxm/src/components/layout/app-header.tsx) to yield a clean global navigation bar focused on branding, search, notification alerts, and student profile. Verified 100% build pass across all 18 routes.
- **2026-10-17:** Header Layout Refinement: Repositioned the global search bar (`w-64 lg:w-80`) to the left section directly adjacent to the Tutopia Exam brand logo, keeping the center open and the user tools docked to the right.
- **2026-10-17:** Native Mobile Nav & Footer Experience: Re-engineered [`MobileBottomBar`](file:///Users/abhilash/work/nextjs/tutopiaxm/src/components/layout/mobile-bottom-bar.tsx) with GPU-accelerated smooth sliding capsule (`translateX`), top sliding accent glow bar, active icon elevation, live pulse badge, safe-area-bottom padding, and added a subtle desktop footer in [`DashboardLayout`](file:///Users/abhilash/work/nextjs/tutopiaxm/src/app/(dashboard)/layout.tsx).
- **2026-10-17:** Floating Dock Style Navigation: Transformed the mobile bottom bar into a floating glassmorphic dock (`inset-x-3 bottom-3 sm:bottom-4`, `rounded-xl`, `shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]`) with internal sliding pill indicator and expanded layout clearance (`pb-24`) to eliminate overlap on all mobile viewports.
- **2026-10-22:** Live Classes Batch Visual Balance: Updated the right-side batch card ("Bank PO & Clerk 2026 Target Batch") thumbnail header from bright blue to a clean, simple dark gray placeholder background (`bg-slate-800`), providing visual hierarchy and contrast against the primary blue Tutopia batch card.
- **2026-10-22:** Wireframe Placeholder & Normal Sidebar: Applied explicit `#CCCCCC` background color to the right-side batch card thumbnail with legible dark text/badges for an unmistakable placeholder appearance. Converted [`AppSidebar`](file:///Users/abhilash/work/nextjs/tutopiaxm/src/components/layout/app-sidebar.tsx) to sticky viewport navigation (`sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto`) so the sidebar remains fixed in place like a standard dashboard instead of scrolling with page height.
- **2026-10-22:** Compact Live Hero Section: Replaced bloated fixed wide aspect ratio (`sm:aspect-[21/7]`) on the Live Classes featured classroom banner with a compact padding-based container (`p-4 sm:p-5`), reducing excessive vertical height from ~500px to ~100px so all batch cards and controls sit cleanly above the fold.
- **2026-10-22:** 3-Card Grid & Uniform Wireframe Placeholders: Expanded the Live Batches collection to 3 courses (`SSC RAIL WBCS PSC`, `Bank PO & Clerk 2026`, and `Railway NTPC & Group D`) in a responsive 3-column grid (`lg:grid-cols-3`), standardizing all batch thumbnail banners to use the `#CCCCCC` placeholder styling with high-contrast text and clean badges.
- **2026-10-22:** Chapter Explorer & Video Playlist Implementation (Screens 9 & 10): Delivered dedicated dynamic routes for `/subjects/[examCategory]/[subjectSlug]` (Screen 9.png) and `/subjects/[examCategory]/[subjectSlug]/[chapterSlug]` (Screen 10.png). Added topic pill switcher, chapter dropdown switcher, teal geometric video player cards, interactive video playback modal dialog, and subscription lock prompt dialog. Verified 100% build pass across all 18 routes.
- **2026-10-22:** Next.js Security Patch (`next@15.3.9`): Upgraded Next.js from `15.2.1` to `15.3.9` to resolve the Vercel deployment block regarding CVE-2025-66478. Verified clean local and production compilation across all 19 routes.
- **2026-10-22:** Auth Protection & Dummy User Simulation: Introduced [`AuthGuard`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/features/auth/auth-guard.tsx) protecting all dashboard routes (`/`, `/subjects`, etc.) so unauthenticated visits redirect to `/login`. Built interactive Demo User Simulation on [`/login`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(auth)/login/page.tsx) with 1-click and auto-fill login for 3 test personas (Abhilash Bera, Priya Sharma, Rahul Mukherjee), dynamic initials/name in [`AppHeader`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/components/layout/app-header.tsx), and full session logout. Verified 100% clean production build.
- **2026-10-24:** Frontend API Standards Established (`rules/05-frontend-api-handling.md`): Defined end-to-end API communication rules with the user. Adopted TanStack Query v5 with centralized typed `apiClient` (`fetch` wrapper), Bearer token injection, 401 redirect to `/login`, feature-colocated API slices (`src/features/<feature>/api/{types,query-keys,endpoints,hooks}.ts`), and Zod-enforced schema contracts.
- **2026-10-24:** Live Auth Integration (Tutopia v1.0): Completed full live authentication flow (Send OTP, Verify OTP, Password Login, Register, Logout) powered by `NEXT_PUBLIC_API_BASE_URL` with persistent web device token generation and seamless offline demo simulation fallback.
- **2026-10-24:** Auth & Session Lifecycle Fixes: Resolved `/register` automatic redirect to `/login?redirect=%2Fregister` caused by unauthenticated protected `GET /api/v1/cities` returning 401 (guarded hook with token availability and excluded auth routes from global 401 redirect). Fixed logout token persistence by unifying cookie deletion (`Max-Age=0; SameSite=Lax`), wiping `localStorage` via [`clearAuthStorage()`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/lib/api-client.ts), and clearing TanStack in-memory query cache (`queryClient.clear()`). Verified clean production build.
- **2026-10-24:** Registration Flow Redesign (Name + Phone -> OTP Verification): Upgraded [`/register`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(auth)/register/page.tsx) into a streamlined 2-step onboarding experience. Step 1 collects Full Name and 10-digit Phone (+91), triggers phone uniqueness check, calls `register` and `send-otp`. Step 2 renders an interactive 6-box OTP verification card with a 60s countdown timer, auto-focus/paste support, and direct session establishment via `verify-otp` and [`setSession()`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/features/auth/auth-context.tsx). Pre-populates phone on `/login` if existing user. Clean production build verified.
- **2026-10-24:** Header Profile & Logout Dropdown: Replaced static profile pill link in [`AppHeader`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/components/layout/app-header.tsx) with a rich Radix-powered [`DropdownMenu`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/components/ui/dropdown-menu.tsx). Includes student name, phone, subscription badge, navigation links to "My Profile", "My Subscriptions", "Change Password", and a dedicated "Logout" action connected to `logout()`. Production build verified.
- **2026-10-24:** Profile Hub Live API Integration: Wired [`/profile`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/profile/page.tsx) to `useMeQuery` (`GET /api/v1/me`) with live data sync and cached fallback; wired [`/profile/edit`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/profile/edit/page.tsx) to `useUpdateProfileMutation` (`POST /api/v1/update-profile`) and `useCitiesQuery` (`GET /api/v1/cities`); wired [`/profile/change-password`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/profile/change-password/page.tsx) to `useChangePasswordMutation` (`POST /api/v1/change-password`). Production build verified with zero errors.
- **2026-10-24:** Real API Response Alignment (`profile_image` & `cityName`): Audited Swagger OpenAPI schema and live response payload. Added `profile_image`, `cityName`, and `registered_class_id` to [`userProfileSchema`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/features/auth/api/types.ts) and [`AuthUser`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/features/auth/auth-context.tsx). Wired `<AvatarImage />` with graceful fallback across [`AppHeader`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/components/layout/app-header.tsx), [`MyProfilePage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/profile/page.tsx), and [`EditProfilePage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/profile/edit/page.tsx). Production build verified cleanly.
- **2026-10-24:** Mock Test & CBT Exam API Integration: Built full Mock Test API slice under `src/features/mock-tests/api/` matching Tutopia backend endpoints (`/api/v1/exams`, `/api/v1/exam-types`, `/api/v1/completed-exams`, `/api/v1/exam-details/{id}`, `/api/v1/set-answer-to-exam`). Connected `/mock-tests`, `/mock-tests/history`, and full-screen CBT runner `/mock-tests/[testId]/take` with live data sync, question paper extraction, timer calculations, answer submission payload formatting, and resilient fallback handling. Verified 100% passing production build (`npm run build` exits 0).
- **2026-10-24:** Complete Mock Data Purge in Mock Tests: Removed hardcoded `mockMockTests`, `fallbackAttempts`, and `sampleQuestions` from `/mock-tests`, `/mock-tests/history`, and `/mock-tests/[testId]/take`. All test lists, attempt scorecards, categories, and CBT questions are now rendered purely from live backend APIs with dedicated loading and empty states when no data is returned. Production build verified 100% cleanly.
- **2026-10-24:** Home Feed Live API Integration: Built feature API slice under `src/features/home/api/` (`types.ts`, `query-keys.ts`, `endpoints.ts`, `hooks.ts`) for `GET /api/v1/home`. Connected dashboard (`/(dashboard)/page.tsx`) to real CDN banner sliders with auto-advance carousel and manual controls, live Video Classes category stream thumbnails (`SSC, RAIL, WBCS`, `Exams Portal`, `All Bank Exams`, `GK Class 9 to 12`, `One Line GK`), and on-demand live refetch trigger. Verified 100% passing production build.
- **2026-10-24:** Complete Mock Data Purge across Subjects, Chapters & Video Lectures: Removed all hardcoded mock arrays (`mockSubjectHierarchy`, `mockChaptersByTopic`, `mockVideosByChapter`, `mockVideoClassCategories`) from `/subjects`, `/subjects/[examCategory]`, `/subjects/[examCategory]/[subjectSlug]`, `/subjects/[examCategory]/[subjectSlug]/[chapterSlug]`, `/chapter-mcq`, and removed `mockCurrentUser` from `AppHeader` and `/profile/subscriptions`. Wired all pages to live endpoints (`GET /api/v1/competitive-types`, `GET /api/v1/competitive-type-details/{id}`, `GET /api/v1/chapters/{subjectId}`, `GET /api/v1/chapter-tutorials/{chapterId}/{type}`). Verified 100% clean production build pass across all 19 routes.
- **2026-10-24:** Chapter Playlist Header Streamlining: Removed the top-right chapter switcher dropdown button and refresh button from [`ChapterVideosPlaylistPage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/[examCategory]/[subjectSlug]/[chapterSlug]/page.tsx). Cleaned up unused state and imports, leaving a clean breadcrumb navigation header. Production build verified cleanly (`npm run build` exits 0).
- **2026-10-24:** Chapter List Header Streamlining: Removed the reload/refresh button from [`SubjectChapterListPage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/[examCategory]/[subjectSlug]/page.tsx). Cleaned up unused `RefreshCw` import and query states. Production build verified cleanly (`npm run build` exits 0).
- **2026-10-24:** Pure Dynamic API ID Routing (Zero Hardcoded Slugs/IDs): Completely eliminated `resolveTypeId` and `getCategoryHref` mapping functions across [`HomePage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/page.tsx), [`SubjectsCategoriesPage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/page.tsx), [`SubjectChapterGridPage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/[examCategory]/page.tsx), [`SubjectChapterListPage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/[examCategory]/[subjectSlug]/page.tsx), [`ChapterVideosPlaylistPage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/[examCategory]/[subjectSlug]/[chapterSlug]/page.tsx), and [`ChapterMcqPage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/chapter-mcq/page.tsx). Routes and API calls now consume purely dynamic backend IDs (`cat.id`, `sub.id`, `chap.id`) directly. Production build verified cleanly (`npm run build` exits 0).
- **2026-10-24:** Global Removal of Reload / Refresh Buttons: Removed all manual reload/refresh buttons across the application (Home, Video Classes, Subject Tracks, Chapter Listing, Video Lectures, Chapter MCQ, Mock Tests, Mock Test History, and Student Profile). Cleaned up unused `RefreshCw` imports and state. Removed duplicate `public/favicon.ico` resolving Next.js App Router metadata warning. Verified 100% clean production build (`rm -rf .next && npm run build` exits 0).
- **2026-10-25:** Live Video Playback & Chapter Notes Integration: Wired [`VideoPlayerDialog`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/[examCategory]/[subjectSlug]/[chapterSlug]/_components/video-player-dialog.tsx) to `useVideoPlayQuery` (`GET /api/v1/video-play/{tutorialId}/1`) for native HTML5 video streaming (`video_url`) with auto-play, custom poster, and loading states. Built Chapter Notes integration via `useChapterNotesQuery` (`GET /api/v1/chapter-notes/{chapterId}`), wiring direct PDF download buttons into both the video player modal and the chapter playlist header. Replaced the last remaining hardcoded slug in the dashboard quick action card with `/subjects`. Verified 100% clean production build pass (`npm run build` exits 0 across all 19 routes).
- **2026-10-25:** Chapter Practice MCQ Quiz System: Built dedicated practice API slice under `src/features/subjects/api/` (`useChapterPracticesQuery`, `useSetPracticeAnswerMutation`, `useClearPracticeAnswersMutation`) mapped to `v1/chapter-practices/{chapterId}`, `v1/set-practice-question-answer`, and `v1/clear-practice-question-answer/{chapterId}`.
- **2026-10-25:** Dedicated Chapter-Wise MCQ Architecture & Video Playlist Separation: Removed the "Practice MCQs" button from the Video Lectures playlist screen ([`ChapterVideosPlaylistPage`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/subjects/[examCategory]/[subjectSlug]/[chapterSlug]/page.tsx)), keeping it cleanly dedicated to video playback and PDF notes. Built a dedicated multi-screen flow for Chapter-wise MCQs:
  1. [`/chapter-mcq`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/chapter-mcq/page.tsx): Dynamic exam category switcher tabs (`SSC, RAIL, WBCS`, `Bank Exams`, `Exams Portal`, etc.) and syllabus subjects grid.
  2. [`/chapter-mcq/[examCategory]/[subjectSlug]`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/chapter-mcq/[examCategory]/[subjectSlug]/page.tsx): Subject chapter list with sibling topic switcher, question count badges, and "Start Practice" CTA.
  3. [`/chapter-mcq/[examCategory]/[subjectSlug]/[chapterSlug]`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/chapter-mcq/[examCategory]/[subjectSlug]/[chapterSlug]/page.tsx): Interactive practice quiz runner with live evaluation, diagram support, step-by-step explanations, question palette navigation, and retake capability.
  Verified 100% clean production build pass across all routes (`npm run build` exits 0).
- **2026-10-25:** Competitive Exam Tracks & Learning Analytics Hub: Built full feature API slice in `src/features/exam-tracks/api/` (`useGraphFeedQuery`, `examTracksEndpoints.getGraphFeed`) mapped to `v1/graph`. Created unified Exam Tracks and Analytics portal at [`/exam-tracks`](file:///Users/abhilash/work/nextjs/tutopia-xm-web-apps/src/app/(dashboard)/exam-tracks/page.tsx) featuring a dual-tab experience:
  1. **My Learning Graphs**: Timeframe selector (`24 Hours`, `7 Days`, `30 Days`), subject dropdown filter, 4 KPI cards (Study Time, Videos Watched, MCQs Solved, Mock Tests), responsive SVG Daily Study Time bar chart, and MCQs & Mock Tests consistency trend chart with hover tooltips and daily study streak banner.
  2. **Browse Exam Tracks & Syllabus**: Visual catalog of Tutopia competitive tracks with descriptions and direct links to courses.
  Connected Card 2 on Dashboard Home page to `/exam-tracks`. Verified 100% clean production build pass across all 20 routes (`npm run build` exits 0).



