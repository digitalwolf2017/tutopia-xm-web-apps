export const examTracksKeys = {
  all: ["exam-tracks"] as const,
  graphs: (type: number, subjectId?: number | null) =>
    [...examTracksKeys.all, "graph", type, subjectId ?? "all"] as const,
};
