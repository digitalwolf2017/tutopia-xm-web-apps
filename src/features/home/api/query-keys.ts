export const homeKeys = {
  all: ["home"] as const,
  feed: () => [...homeKeys.all, "feed"] as const,
};
