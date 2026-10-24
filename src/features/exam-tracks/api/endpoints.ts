import { apiClient } from "@/lib/api-client";
import {
  GraphFeedData,
  GraphDataPoint,
  graphFeedResponseSchema,
  graphDataPointSchema,
} from "./types";

function parseDataPoints(raw: unknown): GraphDataPoint[] {
  if (Array.isArray(raw)) {
    return raw.map((item) => {
      const parsed = graphDataPointSchema.safeParse(item);
      return parsed.success ? parsed.data : { total: Number(item?.total) || 0, date: item?.date, dateFormat: item?.dateFormat };
    });
  }
  if (typeof raw === "string") {
    try {
      const normalized = raw.replace(/'/g, '"');
      const parsed = JSON.parse(normalized);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => ({
          total: Number(item?.total) || 0,
          date: item?.date,
          dateFormat: item?.dateFormat,
        }));
      }
    } catch {
      return [];
    }
  }
  return [];
}

export const examTracksEndpoints = {
  getGraphFeed: async (
    type: number = 2,
    subjectId?: number | null
  ): Promise<GraphFeedData | null> => {
    try {
      const queryParams = new URLSearchParams({ type: String(type) });
      if (subjectId) {
        queryParams.set("subject_id", String(subjectId));
      }

      const raw = await apiClient.get<unknown>(`v1/graph?${queryParams.toString()}`);
      const dataObj =
        raw && typeof raw === "object" && "data" in raw
          ? (raw as { data: unknown }).data
          : raw;

      if (!dataObj || typeof dataObj !== "object") return null;

      const typedData = dataObj as Record<string, any>;

      return {
        totalVideo: typedData.totalVideo
          ? {
              ...typedData.totalVideo,
              data: parseDataPoints(typedData.totalVideo.data),
              total: Number(typedData.totalVideo.total) || 0,
              totalWatchedVideo: Number(typedData.totalVideo.totalWatchedVideo) || 0,
            }
          : null,
        graphTotalWatched: typedData.graphTotalWatched
          ? {
              ...typedData.graphTotalWatched,
              data: parseDataPoints(typedData.graphTotalWatched.data),
              total: Number(typedData.graphTotalWatched.total) || 0,
              totalWatchedVideo: Number(typedData.graphTotalWatched.totalWatchedVideo) || 0,
            }
          : null,
        graphAttemptedQuestion: typedData.graphAttemptedQuestion
          ? {
              ...typedData.graphAttemptedQuestion,
              data: parseDataPoints(typedData.graphAttemptedQuestion.data),
              total: Number(typedData.graphAttemptedQuestion.total) || 0,
              totalAttempted: Number(typedData.graphAttemptedQuestion.totalAttempted) || 0,
            }
          : null,
        graphMockTest: typedData.graphMockTest
          ? {
              ...typedData.graphMockTest,
              data: parseDataPoints(typedData.graphMockTest.data),
              total: Number(typedData.graphMockTest.total) || 0,
              totalAttempted: Number(typedData.graphMockTest.totalAttempted) || 0,
            }
          : null,
      };
    } catch {
      return null;
    }
  },
};
