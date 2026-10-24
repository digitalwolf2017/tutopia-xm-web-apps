'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mockTestEndpoints } from './endpoints';
import { mockTestKeys } from './query-keys';
import {
  CompletedExamItem,
  ExamCategory,
  ExamDetail,
  ExamItem,
  ExamSubmissionPayload,
} from './types';

// ==========================================
// Queries
// ==========================================

/**
 * Hook to retrieve available mock tests, optionally filtered by category
 */
export function useExamsQuery(
  typeId?: number | string,
  options?: { enabled?: boolean }
) {
  return useQuery<ExamItem[]>({
    queryKey: mockTestKeys.list(typeId),
    queryFn: ({ signal }) => mockTestEndpoints.getExams(typeId, signal),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: options?.enabled ?? true,
    retry: false,
  });
}

/**
 * Hook to retrieve exam categories (SSC, WBCS, RAIL, etc.)
 */
export function useExamCategoriesQuery(options?: { enabled?: boolean }) {
  return useQuery<ExamCategory[]>({
    queryKey: mockTestKeys.categories(),
    queryFn: ({ signal }) => mockTestEndpoints.getExamCategories(signal),
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: options?.enabled ?? true,
    retry: false,
  });
}

/**
 * Hook to retrieve completed exams and history
 */
export function useCompletedExamsQuery(
  typeId?: number | string,
  options?: { enabled?: boolean }
) {
  return useQuery<CompletedExamItem[]>({
    queryKey: mockTestKeys.history(typeId),
    queryFn: ({ signal }) => mockTestEndpoints.getCompletedExams(typeId, signal),
    staleTime: 1000 * 60 * 2, // 2 minutes
    enabled: options?.enabled ?? true,
    retry: false,
  });
}

/**
 * Hook to retrieve full exam details, questions, and options for CBT runner
 */
export function useExamDetailsQuery(
  examId: number | string,
  options?: { enabled?: boolean }
) {
  return useQuery<ExamDetail>({
    queryKey: mockTestKeys.detail(examId),
    queryFn: ({ signal }) => mockTestEndpoints.getExamDetails(examId, signal),
    staleTime: 1000 * 60 * 10,
    enabled: (options?.enabled ?? true) && !!examId,
    retry: false,
  });
}

// ==========================================
// Mutations
// ==========================================

/**
 * Hook to submit exam answers and trigger score calculation
 */
export function useSubmitExamMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ExamSubmissionPayload) =>
      mockTestEndpoints.submitExam(payload),
    onSuccess: () => {
      // Invalidate history and lists so scores refresh
      queryClient.invalidateQueries({ queryKey: mockTestKeys.histories() });
      queryClient.invalidateQueries({ queryKey: mockTestKeys.lists() });
    },
  });
}
