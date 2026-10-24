import { apiClient } from "@/lib/api-client";
import { z } from "zod";
import {
  HomeFeedItem,
  HomeResponse,
  homeFeedItemSchema,
  homeResponseSchema,
} from "./types";

export const homeEndpoints = {
  getHomeFeed: async (): Promise<HomeFeedItem[]> => {
    const raw = await apiClient.get<unknown>("v1/home");

    // apiClient automatically unwraps `data` property if present
    if (Array.isArray(raw)) {
      const parsedArray = z.array(homeFeedItemSchema).safeParse(raw);
      if (parsedArray.success) {
        return parsedArray.data;
      }
      return raw as HomeFeedItem[];
    }

    if (
      raw &&
      typeof raw === "object" &&
      "data" in raw &&
      Array.isArray((raw as { data: unknown }).data)
    ) {
      const parsed = homeResponseSchema.safeParse(raw);
      if (parsed.success) {
        return parsed.data.data;
      }
      return (raw as { data: HomeFeedItem[] }).data;
    }

    return [];
  },
};
