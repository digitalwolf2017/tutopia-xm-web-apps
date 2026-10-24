import { z } from "zod";

export const homeSliderSchema = z.object({
  image_url: z.string(),
});

export const homeCategoryTypeSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string().optional().nullable(),
});

export const homeFeedItemSchema = z.object({
  id: z.number(),
  title: z.string().nullable().optional(),
  type: z.number(),
  feed_type: z.number().optional().default(0),
  sort: z.number().optional().default(0),
  active: z.number().optional().default(1),
  sliders: z.array(homeSliderSchema).optional(),
  mcq: z.boolean().optional(),
  competitive_exam: z.boolean().optional(),
  types: z.array(homeCategoryTypeSchema).optional(),
});

export const homeResponseSchema = z.object({
  status: z.boolean(),
  data: z.array(homeFeedItemSchema).default([]),
  error: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export type HomeSlider = z.infer<typeof homeSliderSchema>;
export type HomeCategoryType = z.infer<typeof homeCategoryTypeSchema>;
export type HomeFeedItem = z.infer<typeof homeFeedItemSchema>;
export type HomeResponse = z.infer<typeof homeResponseSchema>;
