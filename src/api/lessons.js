export const lessonKeys = {
  all: ["content", "lessons"],
  list: () => [...lessonKeys.all, "list"],
};

export function lessonsQueryOptions() {
  return {
    queryKey: lessonKeys.list(),
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/content/lesson`);
      if (!res.ok) throw new Error("Failed to fetch lessons");
      return res.json();
    },
  };
}

export function groupLessons(lessons) {
  const bySection = {};
  for (const lesson of lessons) {
    bySection[lesson.section] ??= { lessons: [], subsections: [] };

    if (lesson.subsection) {
      bySection[lesson.section].subsections[lesson.subsection] ??= [];
      bySection[lesson.section].subsections[lesson.subsection].push(lesson);
    } else {
      bySection[lesson.section].lessons.push(lesson);
    }
  }
  return bySection;
}
