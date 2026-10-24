import { apiClient } from "@/lib/api-client";
import { z } from "zod";
import {
  CompetitiveType,
  CompetitiveTypeDetail,
  ChaptersData,
  TutorialItem,
  ChapterItem,
  VideoPlayData,
  ChapterNoteItem,
  competitiveTypeSchema,
  competitiveTypeDetailSchema,
  chaptersDataSchema,
  chapterItemSchema,
  tutorialItemSchema,
  videoPlayResponseSchema,
  chapterNoteItemSchema,
} from "./types";

export const subjectsEndpoints = {
  getCompetitiveTypes: async (): Promise<CompetitiveType[]> => {
    const raw = await apiClient.get<unknown>("v1/competitive-types");
    const target = Array.isArray(raw)
      ? raw
      : (raw as { data?: unknown })?.data;

    if (Array.isArray(target)) {
      const parsed = z.array(competitiveTypeSchema).safeParse(target);
      if (parsed.success) return parsed.data;
      return target as CompetitiveType[];
    }
    return [];
  },

  getCompetitiveTypeDetail: async (
    typeId: string | number
  ): Promise<CompetitiveTypeDetail | null> => {
    const raw = await apiClient.get<unknown>(
      `v1/competitive-type-details/${typeId}`
    );
    const target =
      raw && typeof raw === "object" && "data" in raw
        ? (raw as { data: unknown }).data
        : raw;

    const parsed = competitiveTypeDetailSchema.safeParse(target);
    if (parsed.success) return parsed.data;
    if (target && typeof target === "object" && "id" in target) {
      return target as CompetitiveTypeDetail;
    }
    return null;
  },

  getChapters: async (
    subjectId: string | number
  ): Promise<ChaptersData | null> => {
    const raw = await apiClient.get<unknown>(`v1/chapters/${subjectId}`);
    const target =
      raw && typeof raw === "object" && "data" in raw
        ? (raw as { data: unknown }).data
        : raw;

    if (Array.isArray(target)) {
      const parsedChapters = z.array(chapterItemSchema).safeParse(target);
      return {
        parent: null,
        subject: null,
        subjects: [],
        chapters: parsedChapters.success
          ? parsedChapters.data
          : (target as ChapterItem[]),
      };
    }

    const parsed = chaptersDataSchema.safeParse(target);
    if (parsed.success) return parsed.data;
    if (target && typeof target === "object") {
      return target as ChaptersData;
    }
    return null;
  },

  getTutorials: async (
    chapterId: string | number,
    type: number = 1
  ): Promise<TutorialItem[]> => {
    const raw = await apiClient.get<unknown>(
      `v1/chapter-tutorials/${chapterId}/${type}`
    );
    const target = Array.isArray(raw)
      ? raw
      : (raw as { data?: unknown })?.data;

    if (Array.isArray(target)) {
      const parsed = z.array(tutorialItemSchema).safeParse(target);
      if (parsed.success) return parsed.data;
      return target as TutorialItem[];
    }
    return [];
  },

  getVideoPlay: async (
    tutorialId: string | number,
    type: number = 1
  ): Promise<VideoPlayData | null> => {
    const raw = await apiClient.get<unknown>(
      `v1/video-play/${tutorialId}/${type}`
    );
    const target =
      raw && typeof raw === "object" && "data" in raw
        ? (raw as { data: unknown }).data
        : raw;

    const parsed = videoPlayResponseSchema.safeParse(target);
    if (parsed.success) return parsed.data;
    if (target && typeof target === "object") {
      return target as VideoPlayData;
    }
    return null;
  },

  getChapterNotes: async (
    chapterId: string | number
  ): Promise<ChapterNoteItem[]> => {
    const raw = await apiClient.get<unknown>(`v1/chapter-notes/${chapterId}`);
    const target =
      raw && typeof raw === "object" && "data" in raw
        ? (raw as { data: unknown }).data
        : raw;

    if (Array.isArray(target)) {
      const parsed = z.array(chapterNoteItemSchema).safeParse(target);
      if (parsed.success) return parsed.data;
      return target as ChapterNoteItem[];
    }
    return [];
  },
};
