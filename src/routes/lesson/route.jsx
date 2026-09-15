import { useMemo } from "react";
import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { lessonsQueryOptions, groupLessons } from "../../api/lessons";
import PageLayout from "../../components/layout/PageLayout";

export const Route = createFileRoute("/lesson")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(lessonsQueryOptions()),
  component: LessonComponent,
});

function LessonComponent() {
  const { data: lessons } = useSuspenseQuery(lessonsQueryOptions());
  const groupedLessons = useMemo(() => groupLessons(lessons), [lessons]);

  const matches = useMatches();
  const hasActiveChildRoute = matches.at(-1).routeId !== Route.id;

  let subtitle = "";
  let actions = null;

  if (!hasActiveChildRoute) {
    const subjectCount = new Set(lessons.map((lesson) => lesson.section)).size;
    subtitle = `${lessons.length} lessons across ${subjectCount} sections`;

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
    <>
      {Object.entries(groupedLessons).map(([section, { lessons: directLessons, subsections }]) => (
        <div key={section}>
          <h2>{section}</h2>

          {directLessons.length > 0 && (
            <ul>
              {directLessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link to="./$lessonId" params={{ lessonId: lesson.id }}>
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {Object.entries(subsections).map(([subsection, sectionLessons]) => (
            <div key={subsection}>
              <h3>{subsection}</h3>
              <ul>
                {sectionLessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link to="./$lessonId" params={{ lessonId: lesson.id }}>
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </>
  );

  return (
    <PageLayout title="Lessons" subtitle={subtitle} actions={actions}>
      {content}
    </PageLayout>
  );
}
