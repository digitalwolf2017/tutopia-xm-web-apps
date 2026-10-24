import { useQuery } from "@tanstack/react-query";
import { examTracksKeys } from "./query-keys";
import { examTracksEndpoints } from "./endpoints";

export function useGraphFeedQuery(
  type: number = 2,
  subjectId?: number | null,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: examTracksKeys.graphs(type, subjectId),
    queryFn: () => examTracksEndpoints.getGraphFeed(type, subjectId),
    staleTime: 2 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}
