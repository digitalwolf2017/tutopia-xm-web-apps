/**
 * TanStack Query Key Factory for Mock Tests & Exams
 * Follows Rule 05 (Frontend API Handling & Data Fetching)
 */
export const mockTestKeys = {
  all: ['mock-tests'] as const,
  lists: () => [...mockTestKeys.all, 'list'] as const,
  list: (typeId?: number | string) =>
    [...mockTestKeys.lists(), { typeId: typeId ?? 'all' }] as const,
  categories: () => [...mockTestKeys.all, 'categories'] as const,
  histories: () => [...mockTestKeys.all, 'history'] as const,
  history: (typeId?: number | string) =>
    [...mockTestKeys.histories(), { typeId: typeId ?? 'all' }] as const,
  details: () => [...mockTestKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...mockTestKeys.details(), String(id)] as const,
};
