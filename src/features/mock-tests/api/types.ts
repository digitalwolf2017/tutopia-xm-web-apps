import { z } from 'zod';

// ==========================================
// 1. Exam Category Schema
// ==========================================
export const examCategorySchema = z.object({
  id: z.number(),
  title: z.string(),
});

export type ExamCategory = z.infer<typeof examCategorySchema>;

// ==========================================
// 2. Exam Item Schemas
// ==========================================
export const userComExamSchema = z.object({
  id: z.number(),
  com_exam_id: z.number(),
  lastAttemptedDate: z.string().nullable().optional(),
});

export type UserComExam = z.infer<typeof userComExamSchema>;

export const examItemSchema = z.object({
  id: z.number(),
  com_exam_type_id: z.number().nullable().optional(),
  language_id: z.number().nullable().optional(),
  title: z.string(),
  image: z.string().nullable().optional(),
  instructions: z.string().nullable().optional().default(''),
  questions: z.number().default(0),
  duration: z.number().default(0), // in minutes
  credit: z.number().optional().default(0),
  marks: z.number().default(0),
  correct_marks: z.number().optional().default(1),
  negative_marks: z.number().optional().default(0),
  passing_marks: z.number().optional().default(0),
  language: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .nullable()
    .optional(),
  com_exam_type: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .nullable()
    .optional(),
  user_com_exams: z.array(userComExamSchema).optional().default([]),
});

export type ExamItem = z.infer<typeof examItemSchema>;

// ==========================================
// 3. Completed Exam (History) Schema
// ==========================================
export const completedExamItemSchema = z.object({
  id: z.number(),
  com_exam_id: z.number().optional(),
  user_id: z.number().optional(),
  title: z.string(),
  image: z.string().nullable().optional(),
  instructions: z.string().nullable().optional().default(''),
  questions: z.number().default(0),
  duration: z.number().default(0),
  marks: z.number().default(0),
  correct_marks: z.number().optional().default(1),
  negative_marks: z.number().optional().default(0),
  passing_marks: z.number().optional().default(0),
  aggregate_marks: z.number().default(0),
  attemptedDate: z.string().nullable().optional(),
  language: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .nullable()
    .optional(),
  com_exam_type: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .nullable()
    .optional(),
});

export type CompletedExamItem = z.infer<typeof completedExamItemSchema>;

// ==========================================
// 4. Exam Details & CBT Runner Schemas
// ==========================================
export const examOptionSchema = z.object({
  id: z.number().optional(),
  com_question_id: z.number().optional(),
  option: z.string(),
  option_image: z.string().nullable().optional(),
});

export type ExamOption = z.infer<typeof examOptionSchema>;

export const examQuestionSchema = z.object({
  id: z.number(),
  set_id: z.number().optional(),
  question: z.string(),
  question_image: z.string().nullable().optional(),
  details: z.string().nullable().optional(),
  type: z.number().optional().default(1),
  com_options: z.array(examOptionSchema).default([]),
});

export type ExamQuestion = z.infer<typeof examQuestionSchema>;

export const examSetSchema = z.object({
  id: z.number(),
  language_id: z.number().optional(),
  set_type_id: z.number().optional(),
  title: z.string().optional().default('General Section'),
  details: z.string().nullable().optional(),
  questions: z.number().optional().default(0),
  difficulty: z.number().optional().default(1),
  active: z.number().optional().default(1),
  com_questions: z.array(examQuestionSchema).default([]),
});

export type ExamSet = z.infer<typeof examSetSchema>;

export const examDetailSchema = z.object({
  id: z.number(),
  com_exam_type_id: z.number().nullable().optional(),
  language_id: z.number().nullable().optional(),
  title: z.string(),
  image: z.string().nullable().optional(),
  questions: z.number().default(0),
  duration: z.number().default(0),
  credit: z.number().optional().default(0),
  marks: z.number().default(0),
  correct_marks: z.number().optional().default(1),
  negative_marks: z.number().optional().default(0),
  passing_marks: z.number().optional().default(0),
  aggregate_marks: z.number().optional().default(0),
  attemptedDate: z.string().nullable().optional(),
  com_exam_sets: z
    .array(
      z.object({
        id: z.number().optional(),
        com_exam_id: z.number().optional(),
        set_id: z.number().optional(),
        questions: z.number().optional(),
        set: examSetSchema.optional(),
      })
    )
    .optional()
    .default([]),
});

export type ExamDetail = z.infer<typeof examDetailSchema>;

// ==========================================
// 5. Exam Answer Submission Schema
// ==========================================
export const answerItemSchema = z.object({
  question_id: z.number(),
  option_id: z.number().nullable().optional(),
  time_spent: z.number().optional().default(0),
});

export const examSubmissionPayloadSchema = z.object({
  exam_id: z.number(),
  duration: z.number(), // elapsed time in seconds
  answerLists: z.array(answerItemSchema),
});

export type ExamSubmissionPayload = z.infer<typeof examSubmissionPayloadSchema>;
