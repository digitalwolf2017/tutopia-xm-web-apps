# Rule 05: Frontend API Handling & Data Fetching

> **Scope**: Standardizes all client-side and server-side API communication, response normalization, authentication token injection, caching strategy, and feature colocation across the Tutopia Exam web app.

---

## 1. Core Architecture & Tech Stack

1. **Transport Layer**: Centralized typed HTTP client (`@/lib/api-client.ts`) wrapping native `fetch`.
2. **Caching & Asynchronous State**: **TanStack Query (React Query v5)** for client-side fetching, caching, deduplication, and background updates.
3. **Data Contracts & Validation**: **Zod** schemas for runtime payload and response validation with inferred TypeScript types.
4. **Feature Colocation**: Endpoints, schemas, query keys, and custom query/mutation hooks reside strictly within their domain module (`src/features/<feature>/api/`).

---

## 2. Standard Feature API Directory Layout

Every feature with API interactions must organize its API layer under `src/features/<feature>/api/`:

```
src/features/<feature>/
└── api/
    ├── types.ts          # Zod schemas & inferred TypeScript types
    ├── query-keys.ts     # Query key factory object
    ├── endpoints.ts      # Pure API fetch functions using apiClient
    └── hooks.ts          # TanStack useQuery and useMutation hooks
```

### Responsibility Breakdown
- **`types.ts`**: Defines request params, response payload schemas with Zod, and exports `z.infer<typeof ...>` types.
- **`query-keys.ts`**: Centralized query keys using the factory pattern for deterministic cache invalidation.
- **`endpoints.ts`**: Pure async functions that call `apiClient.get()`, `apiClient.post()`, etc. No React hooks allowed here.
- **`hooks.ts`**: React hooks wrapping `useQuery` / `useMutation` with proper typing, cache invalidation, and toast feedback.

---

## 3. Centralized API Client (`@/lib/api-client.ts`)

All outbound network requests must go through the shared `apiClient` utility. Direct invocation of `window.fetch` or `axios` inside components is strictly prohibited.

### Key Capabilities
1. **Base URL Resolution**: Resolves `process.env.NEXT_PUBLIC_API_BASE_URL` with a sensible fallback to `/api`.
2. **Bearer Token Interception**:
   - Automatically retrieves the authentication token (from secure cookies or auth state).
   - Injects `Authorization: Bearer <token>` into headers when an active token exists.
3. **Automatic 401 Unauthorized Handling**:
   - On `401 Unauthorized`, clears local user session and triggers a client redirect to `/login` with a `?redirect=<currentPath>` query param.
4. **Standard Envelope & Error Normalization**:
   - Parses responses into a standardized structure:
     ```ts
     export interface ApiResponse<T> {
       success: boolean;
       data: T;
       message?: string;
     }

     export interface ApiErrorResponse {
       success: false;
       error: {
         code: string;
         message: string;
         details?: Record<string, string[]>;
       };
     }
     ```
   - Throws a typed `AppApiError` containing HTTP status, error code, and user-facing message.

---

## 4. Query Key Factory Pattern

To prevent cache key collisions and enable surgical cache invalidation, every feature must define a Query Key Factory in `query-keys.ts`:

```ts
// Example: src/features/mock-tests/api/query-keys.ts
export const mockTestKeys = {
  all: ['mock-tests'] as const,
  lists: () => [...mockTestKeys.all, 'list'] as const,
  list: (filters?: { category?: string; status?: string }) =>
    [...mockTestKeys.lists(), filters ?? {}] as const,
  details: () => [...mockTestKeys.all, 'detail'] as const,
  detail: (id: string) => [...mockTestKeys.details(), id] as const,
  attempts: () => [...mockTestKeys.all, 'attempts'] as const,
  attempt: (attemptId: string) => [...mockTestKeys.attempts(), attemptId] as const,
};
```

---

## 5. TanStack Query Configuration & Defaults

### Query Client Defaults
- **`staleTime`**:
  - Semi-static content (Subjects, Chapters, Batch Listings): `1000 * 60 * 5` (5 minutes).
  - Dynamic / interactive content (Mock test questions, Active CBT session): `0` or `1000 * 30` (30 seconds).
  - Profile / User Account: `1000 * 60 * 2` (2 minutes).
- **`refetchOnWindowFocus`**: Set to `false` for examination and test-taking views to prevent accidental layout shifts or re-renders during active tests.
- **`retry`**:
  - `false` or `1` for 4xx client errors (e.g., 400 Bad Request, 401 Unauthorized, 404 Not Found).
  - Maximum `2` retries for 5xx server errors with exponential backoff.

### Mutation Best Practices
1. **Explicit Invalidation**: Always invalidate target query keys on `onSuccess` using `queryClient.invalidateQueries({ queryKey: ... })`.
2. **Optimistic Updates**: For snappy UX (e.g. bookmarking a chapter or marking an issue report), implement optimistic cache updates with rollback on `onError`.
3. **Toast Notifications**: Provide immediate user feedback on mutations (success confirmation or error alert).

---

## 6. Zod Validation & Type Safety Rules

1. **Validate at the Edge**:
   - Parse untrusted API responses with `.parse()` or `.safeParse()` where data integrity is critical.
2. **No Manual Duplicate Interfaces**:
   - Define the Zod schema first, then derive TypeScript types using `z.infer`:
     ```ts
     export const liveBatchSchema = z.object({
       id: z.string(),
       title: z.string(),
       examTrack: z.string(),
       startDate: z.string(),
       price: z.number(),
       isEnrolled: z.boolean().default(false),
     });

     export type LiveBatch = z.infer<typeof liveBatchSchema>;
     ```
3. **Strict Form Schemas**:
   - Form schemas for mutation endpoints (Login, Register, Report Issue, Profile Update) must specify validation rules, field messages, and regex patterns.

---

## 7. Graceful Degradation & Mock Data Fallbacks

1. **Development & Preview Mode**:
   - If backend endpoints are under development or offline, the API layer should fall back to `@/lib/mock-data.ts` seamlessly without altering component consumers.
   - Keep mock datasets synchronized with Zod schemas in `types.ts`.
2. **Offline & Network Drop Protection (CBT Runner)**:
   - For Mock Test question submission, serialize answer state to `localStorage` before emitting the mutation to prevent answer loss on sudden connection drops.

---

## 8. Code & Performance Optimization Rules

1. **Request Deduplication & AbortController Cancellation**:
   - Pass TanStack Query's automatic `signal` into `apiClient` to cancel in-flight network requests when a user navigates away or switches tabs rapidly:
     ```ts
     export function useSubjectsQuery() {
       return useQuery({
         queryKey: subjectKeys.lists(),
         queryFn: ({ signal }) => fetchSubjects({ signal }),
       });
     }
     ```
   - `apiClient` ignores canceled `AbortError`s cleanly without logging false network alerts.

2. **Debounce Search & Dynamic Filtering**:
   - Never trigger an API call on every keystroke (e.g., live topic search, chapter filter, pincode lookup).
   - Use a `300ms - 400ms` debounce threshold before updating query key filter params.

3. **Selective Re-rendering with the `select` Option**:
   - When a component only requires a subset or transformed slice of an API response, use TanStack Query's `select` option:
     ```ts
     // Re-renders ONLY when the count of active live batches changes
     const { data: liveCount } = useLiveBatchesQuery({
       select: (batches) => batches.filter((b) => b.isLive).length,
     });
     ```
   - Leverages structural sharing to prevent unnecessary virtual DOM reconciliation.

4. **Intent-Based Prefetching (Hover & Route Prediction)**:
   - Prefetch target data when a student hovers over high-probability actions (e.g., hovering over a Mock Test card or Chapter item):
     ```ts
     const onHoverTest = (testId: string) => {
       queryClient.prefetchQuery({
         queryKey: mockTestKeys.detail(testId),
         queryFn: () => getMockTestDetail(testId),
         staleTime: 1000 * 60,
       });
     };
     ```

5. **Eliminate Request Waterfalls (Parallel Fetching)**:
   - Avoid chaining sequential `await` calls if requests are independent.
   - In components needing multiple queries, declare multiple `useQuery` hooks or use `useQueries` for parallel execution:
     ```ts
     // Runs concurrently in parallel, not sequentially
     const userQuery = useMeQuery();
     const citiesQuery = useCitiesQuery();
     ```

6. **Derive State Instead of Duplicating in `useState`**:
   - Do NOT mirror query responses into local `useState` (e.g., `useEffect(() => setState(data), [data])`).
   - Treat the query cache as the single source of truth. Only use local state for uncommitted form inputs.

7. **Garbage Collection & Memory Hygiene (`gcTime`)**:
   - Balance cache availability with browser memory consumption.
   - Configure `gcTime: 1000 * 60 * 30` (30 minutes) for heavy static resources, and short `gcTime: 1000 * 60 * 5` for ephemeral test runs so memory is released promptly.

