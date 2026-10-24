import { useQuery } from "@tanstack/react-query";
import { homeKeys } from "./query-keys";
import { homeEndpoints } from "./endpoints";

export function useHomeFeedQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: homeKeys.feed(),
    queryFn: homeEndpoints.getHomeFeed,
    staleTime: 5 * 60 * 1000,
    enabled:
      options?.enabled ??
      (typeof window !== "undefined"
        ? !!localStorage.getItem("tutopia_auth_token")
        : true),
  });
}
