import { apiClient } from '@/lib/api-client';
import {
  CompletedExamItem,
  ExamCategory,
  ExamDetail,
  ExamItem,
  ExamSubmissionPayload,
} from './types';

/**
 * Pure API endpoints for Mock Tests & Competitive Exams
 * Adheres strictly to Rule 05
 */
export const mockTestEndpoints = {
  // 1. Fetch available mock tests list (optional filter by type_id)
  getExams: (typeId?: number | string, signal?: AbortSignal) =>
    apiClient.get<ExamItem[]>('/v1/exams', {
      params: typeId !== undefined && typeId !== 'ALL' && typeId !== '' ? { type_id: typeId } : undefined,
      signal,
    }),

  // 2. Fetch competitive exam categories (SSC, RAIL, WBCS, etc.)
  getExamCategories: (signal?: AbortSignal) =>
    apiClient.get<ExamCategory[]>('/v1/exam-categories', { signal }),

  // 3. Fetch completed exam scorecards and history
  getCompletedExams: (typeId?: number | string, signal?: AbortSignal) =>
    apiClient.get<CompletedExamItem[]>('/v1/completed-exams', {
      params: typeId !== undefined && typeId !== 'ALL' && typeId !== '' ? { type_id: typeId } : undefined,
      signal,
    }),

  // 4. Fetch full exam details, questions, and option choices for CBT Runner
  getExamDetails: (id: number | string, signal?: AbortSignal) =>
    apiClient.get<ExamDetail>(`/v1/exam-details/${id}`, { signal }),

  // 5. Submit completed exam answers
  submitExam: (payload: ExamSubmissionPayload, signal?: AbortSignal) =>
    apiClient.post<{ status: boolean; message?: string }>(
      '/v1/set-answer-to-exam',
      payload,
      { signal }
    ),
};
