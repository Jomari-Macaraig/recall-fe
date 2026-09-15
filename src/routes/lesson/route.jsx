import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { lessonsQueryOptions } from "../../api/lessons";
import PageLayout from "../../components/layout/PageLayout";

export const Route = createFileRoute("/lesson")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(lessonsQueryOptions()),
  component: LessonComponent,
});

function LessonComponent() {
  const { data: lessons } = useSuspenseQuery(lessonsQueryOptions());
  const matches = useMatches();
  const hasActiveChildRoute = matches.at(-1).routeId !== Route.id;
  let subtitle = "";
  let actions = null;

  if (!hasActiveChildRoute) {
    const subjectCount = new Set(lessons.map((lesson) => lesson.subject)).size;
    subtitle = `${lessons.length} lessons across ${subjectCount} subjects`;

    actions = (
      <>
        <button type="button" className="text-muted text-sm rounded-md border-line border px-2">
          Export CSV
        </button>
        <button type="button" className="text-ink text-sm rounded-md border-line border px-2 bg-accent">
          New Lessons
        </button>
      </>
    );
  }

  const content = hasActiveChildRoute ? (
    <Outlet />
  ) : (
    <ul>
      {lessons.map((lesson) => (
        <li key={lesson.id}>
          <Link to="./$lessonId" params={{ lessonId: lesson.id }}>
            {lesson.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <PageLayout title="Lessons" subtitle={subtitle} actions={actions}>
      {content}
    </PageLayout>
  );
}
