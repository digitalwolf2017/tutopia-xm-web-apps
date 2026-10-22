# Rule 04: Code Quality, State Management & Accessibility

## 1. TypeScript & Type Safety
1. **Strict Types**: Always provide explicit TypeScript types for props, API responses, and function parameters. Avoid `any`.
2. **Data Schemas with Zod**:
   - Use `zod` for validating form inputs (login, registration, profile editing, issue reports).
   - Infer TypeScript types using `z.infer<typeof schema>`.
3. **No Unused Code**: Clean up unused imports, dead variables, and legacy console logs before completing features.

---

## 2. State Management Strategy
1. **URL as State**: For filters (e.g. active exam track, selected subject, search query, test status filter), prefer Next.js URL search params (`useSearchParams`, `useRouter`, `usePathname`) to enable shareable links and browser back/forward navigation.
2. **Local Component State**: Use standard React `useState` / `useReducer` for ephemeral UI state (dropdowns, modals, timer tick).
3. **Global Auth & User State**: Light React Context or lightweight store (e.g. Zustand) for session, cart/enrolled batches, and active student profile.

---

## 3. Accessibility & Performance
1. **Semantic HTML**: Use standard `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<button>` tags.
2. **Keyboard Navigation**:
   - `Cmd + K` (Mac) or `Ctrl + K` (Windows) triggers global search command palette.
   - Mock test runner supports number keys `1-4` for option selection and `Enter` for next question.
3. **Image Optimization**: Always use `next/image` for banners, icons, and student avatars with proper `sizes` and `priority` for above-the-fold banners.
4. **Resilient Error Handling**: Wrap data-fetching views in Next.js `error.tsx` and provide actionable retry buttons.
