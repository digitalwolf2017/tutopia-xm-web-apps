import { useQuery } from "@tanstack/react-query";
import { subjectsKeys } from "./query-keys";
import { subjectsEndpoints } from "./endpoints";

export function useCompetitiveTypesQuery() {
  return useQuery({
    queryKey: subjectsKeys.types(),
    queryFn: subjectsEndpoints.getCompetitiveTypes,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCompetitiveTypeDetailQuery(typeId: string | number) {
  return useQuery({
    queryKey: subjectsKeys.typeDetail(typeId),
    queryFn: () => subjectsEndpoints.getCompetitiveTypeDetail(typeId),
    staleTime: 5 * 60 * 1000,
    enabled: !!typeId,
  });
}

export function useChaptersQuery(subjectId: string | number) {
  return useQuery({
    queryKey: subjectsKeys.chapters(subjectId),
    queryFn: () => subjectsEndpoints.getChapters(subjectId),
    staleTime: 5 * 60 * 1000,
    enabled: !!subjectId,
  });
}

export function useTutorialsQuery(
  chapterId: string | number,
  type: number = 1
) {
  return useQuery({
    queryKey: subjectsKeys.tutorials(chapterId, type),
    queryFn: () => subjectsEndpoints.getTutorials(chapterId, type),
    staleTime: 5 * 60 * 1000,
    enabled: !!chapterId,
  });
}

export function useVideoPlayQuery(
  tutorialId: string | number | null,
  type: number = 1
) {
  return useQuery({
    queryKey: ["subjects", "video-play", tutorialId, type],
    queryFn: () => subjectsEndpoints.getVideoPlay(tutorialId!, type),
    staleTime: 5 * 60 * 1000,
    enabled: !!tutorialId,
  });
}
