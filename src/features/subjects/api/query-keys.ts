export const subjectsKeys = {
  all: ["subjects"] as const,
  types: () => [...subjectsKeys.all, "types"] as const,
  typeDetail: (typeId: string | number) =>
    [...subjectsKeys.all, "typeDetail", String(typeId)] as const,
  chapters: (subjectId: string | number) =>
    [...subjectsKeys.all, "chapters", String(subjectId)] as const,
  tutorials: (chapterId: string | number, type: number = 1) =>
    [...subjectsKeys.all, "tutorials", String(chapterId), type] as const,
};
