import { z } from "zod";

export const graphDataPointSchema = z.object({
  date: z.string().optional().nullable(),
  dateFormat: z.string().optional().nullable(),
  total: z.number().default(0),
});

export const graphMetricGroupSchema = z.object({
  data: z.union([z.array(graphDataPointSchema), z.string()]).default([]),
  total: z.number().default(0),
  totalWatchedVideo: z.number().optional().nullable(),
  totalAttempted: z.number().optional().nullable(),
  totalVideos: z.number().optional().nullable(),
  type: z.number().optional().nullable(),
});

export const graphFeedDataSchema = z.object({
  totalVideo: graphMetricGroupSchema.optional().nullable(),
  graphTotalWatched: graphMetricGroupSchema.optional().nullable(),
  graphAttemptedQuestion: graphMetricGroupSchema.optional().nullable(),
  graphMockTest: graphMetricGroupSchema.optional().nullable(),
});

export const graphFeedResponseSchema = z.object({
  status: z.boolean().default(true),
  data: graphFeedDataSchema.optional().nullable(),
  error: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export type GraphDataPoint = z.infer<typeof graphDataPointSchema>;
export type GraphMetricGroup = z.infer<typeof graphMetricGroupSchema>;
export type GraphFeedData = z.infer<typeof graphFeedDataSchema>;
export type GraphFeedResponse = z.infer<typeof graphFeedResponseSchema>;

export type GraphTimeframe = 1 | 2 | 3; // 1: 24h, 2: 7d, 3: 30d
