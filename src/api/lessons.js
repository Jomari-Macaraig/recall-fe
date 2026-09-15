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
