import { z } from "zod";

export const competitiveTypeSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().optional().nullable(),
});

export const subjectItemSchema = z.object({
  id: z.number(),
  subject_category_id: z.number().optional().nullable(),
  type_id: z.number().optional().nullable(),
  com_exam_type_id: z.number().optional().nullable(),
  subject_name: z.string(),
  subject_image: z.string().optional().nullable(),
  total_chapters: z.number().default(0),
  total_tutorials: z.number().default(0),
  total_notes: z.number().default(0),
  total_duration: z.string().optional().nullable(),
  sort: z.number().optional().nullable(),
  active: z.number().optional().nullable(),
});

export const subjectCategorySchema = z.object({
  id: z.number(),
  type_id: z.number().optional().nullable(),
  com_exam_type_id: z.number().optional().nullable(),
  title: z.string(),
  sort: z.number().optional().nullable(),
  active: z.number().optional().nullable(),
  com_subjects: z.array(subjectItemSchema).default([]),
});

export const examTrackSchema = z.object({
  id: z.number(),
  type_id: z.number().optional().nullable(),
  title: z.string(),
  active: z.number().optional().nullable(),
  com_subject_categories: z.array(subjectCategorySchema).default([]),
});

export const competitiveTypeDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().optional().nullable(),
  com_exam_types: z.array(examTrackSchema).default([]),
});

export const chapterItemSchema = z.object({
  id: z.number(),
  com_subject_id: z.number().optional().nullable(),
  chapter_name: z.string(),
  chapter_image: z.string().optional().nullable(),
  total_tutorials: z.number().default(0),
  practice_q_count: z.number().default(0),
  test_duration: z.union([z.string(), z.number()]).optional().nullable(),
  sort: z.number().optional().nullable(),
  active: z.number().optional().nullable(),
});

export const chaptersDataSchema = z.object({
  parent: z
    .object({
      comExamTypeId: z.number().optional().nullable(),
      title: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  subject: z
    .object({
      id: z.number(),
      subject_name: z.string(),
      subject_image: z.string().optional().nullable(),
      total_chapters: z.number().default(0),
      total_tutorials: z.number().default(0),
      subject_category: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  subjects: z.array(subjectItemSchema).default([]),
  chapters: z.array(chapterItemSchema).default([]),
});

export const tutorialItemSchema = z.object({
  id: z.number(),
  com_subject_id: z.number().optional().nullable(),
  com_chapter_id: z.number().optional().nullable(),
  tutorial_name: z.string(),
  summary_heading: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  thumb_url: z.string().optional().nullable(),
  duration: z.union([z.string(), z.number()]).default("0"),
  transcode_status: z.number().optional().nullable(),
  is_free: z.number().default(0),
  sort: z.number().optional().nullable(),
});

export const videoPlayResponseSchema = z.object({
  id: z.number(),
  chapter_id: z.number().optional().nullable(),
  subject_id: z.number().optional().nullable(),
  plus_category_id: z.number().optional().nullable(),
  tutorial_name: z.string().optional().nullable(),
  summary_heading: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  plus_access: z.number().optional().nullable(),
  thumb_url: z.string().optional().nullable(),
  audio_url: z.string().optional().nullable(),
  video_url: z.string().optional().nullable(),
  duration: z.union([z.string(), z.number()]).optional().nullable(),
  is_free: z.number().optional().nullable(),
});

export const chapterNoteItemSchema = z.object({
  id: z.number(),
  com_chapter_id: z.number().optional().nullable(),
  vendor_id: z.number().optional().nullable(),
  heading: z.string().default("Chapter Notes"),
  description: z.string().optional().nullable(),
  file: z.string(),
});

export const practiceOptionSchema = z.object({
  id: z.number(),
  com_practice_id: z.number().optional().nullable(),
  option: z.string().default(""),
  image_url: z.string().optional().nullable(),
  correct: z.number().default(0),
});

export const practiceQuestionSchema = z.object({
  id: z.number(),
  com_subject_id: z.number().optional().nullable(),
  com_chapter_id: z.number().optional().nullable(),
  question: z.string().default(""),
  question_image: z.string().optional().nullable(),
  explanation_image: z.string().optional().nullable(),
  explanation_details: z.string().optional().nullable(),
  type: z.number().optional().nullable(),
  active: z.number().optional().nullable(),
  com_practice_options: z.array(practiceOptionSchema).default([]),
});

export const chapterPracticesResponseSchema = z.object({
  data: z.array(practiceQuestionSchema).default([]),
  chapter: z.record(z.string(), z.any()).optional().nullable(),
  parent: z.record(z.string(), z.any()).optional().nullable(),
  chapters: z.array(z.record(z.string(), z.any())).optional().nullable(),
});

export type CompetitiveType = z.infer<typeof competitiveTypeSchema>;
export type SubjectItem = z.infer<typeof subjectItemSchema>;
export type SubjectCategory = z.infer<typeof subjectCategorySchema>;
export type ExamTrack = z.infer<typeof examTrackSchema>;
export type CompetitiveTypeDetail = z.infer<typeof competitiveTypeDetailSchema>;
export type ChapterItem = z.infer<typeof chapterItemSchema>;
export type ChaptersData = z.infer<typeof chaptersDataSchema>;
export type TutorialItem = z.infer<typeof tutorialItemSchema>;
export type VideoPlayData = z.infer<typeof videoPlayResponseSchema>;
export type ChapterNoteItem = z.infer<typeof chapterNoteItemSchema>;
export type PracticeOption = z.infer<typeof practiceOptionSchema>;
export type PracticeQuestion = z.infer<typeof practiceQuestionSchema>;
export type ChapterPracticesResponse = z.infer<typeof chapterPracticesResponseSchema>;

export interface VideoLessonItem {
  id: string | number;
  title: string;
  durationFormatted?: string;
  facultyName?: string;
  isLocked?: boolean;
  videoUrl?: string;
  thumbUrl?: string;
}

