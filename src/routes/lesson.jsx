import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { lessonsQueryOptions } from "../api/lessons";
import PageLayout from "../components/layout/PageLayout";

export const Route = createFileRoute("/lesson")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(lessonsQueryOptions()),
  component: LessonComponent,
});

function LessonComponent() {
  const { data: lessons } = useSuspenseQuery(lessonsQueryOptions());

  const actions = (
    <>
      <button type="button" className="text-muted text-sm rounded-md border-line border px-2">
        Export CSV
      </button>
      <button type="button" className="text-ink text-sm rounded-md border-line border px-2 bg-accent">
        New Lessons
      </button>
    </>
  );
  return (
    <PageLayout title="Lessons" subtitle="1,284 lessons accross 14 subjects" actions={actions}>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>
    </PageLayout>
  );
}
