# Rule 02: Next.js 15 App Router & Gemini-Optimized Architecture

## 1. Core Principles
1. **Feature-First Modularity**:
   - Every major domain entity lives in `src/features/<feature-name>/`.
   - Feature directories contain their own `components/`, `hooks/`, `types/`, and `services/`.
   - Never create catch-all monolithic folders.

2. **Explicit Server vs. Client Boundaries**:
   - Pages (`src/app/**/page.tsx`) and Layouts are **Server Components** by default.
   - Any component requiring interactivity (`useState`, `useEffect`, `onClick`, browser APIs) must be extracted into a separate client file with `'use client'` at the top (e.g. `mock-test-runner-client.tsx`, `login-form.tsx`).
   - Keep `'use client'` boundaries as low down the component tree as possible.

3. **Colocation & Import Conventions**:
   - Use absolute path alias `@/` for all imports (e.g., `@/components/ui/button`, `@/features/mock-tests/types`).
   - Group imports in order:
     1. React / Next.js built-ins (`react`, `next/navigation`, `next/image`)
     2. Third-party packages (`lucide-react`, `zod`, `tailwind-merge`)
     3. Shared UI primitives (`@/components/ui/*`)
     4. Feature-specific components and hooks
     5. Types & utilities

---

## 2. Directory Layout & Roles

| Directory | Scope & Rules |
| :--- | :--- |
| `src/app/(auth)/` | Public authentication routes (`login`, `register`, `verify-otp`, `forgot-password`). Centered/split auth layout without dashboard sidebar. |
| `src/app/(dashboard)/` | Protected student routes with unified responsive app shell (top header, desktop sidebar, mobile bottom navigation). |
| `src/features/<name>/` | Feature domain logic. High cohesion, low coupling. |
| `src/components/ui/` | shadcn/ui primitives. Never import feature logic into `components/ui/`. |
| `src/components/layout/` | Structural navigation components (`app-header`, `app-sidebar`, `mobile-bottom-bar`). |
| `src/components/common/` | Reusable UI atoms across multiple features (`banner-carousel`, `category-card`). |
| `src/lib/` | Pure utilities (`utils.ts`, `api-client.ts`, `mock-data.ts`). |
| `src/types/` | Global TypeScript definitions. |

---

## 3. Gemini / AI Pair Programming Guidelines
1. **Keep Files Focused**: Strive for component files under 250 lines. Break large components into composable subcomponents.
2. **Explicit Interfaces**: Export clear TypeScript interfaces for all component props. Avoid `any`.
3. **Mock Data Single Source of Truth**: When backend APIs are pending, consume data from `@/lib/mock-data.ts` to allow instant, error-free previewing and test runs.
