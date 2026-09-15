import { useMemo } from "react";
import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { lessonsQueryOptions, groupLessons } from "../../api/lessons";
import PageLayout from "../../components/layout/PageLayout";
import Subtitle from "../../components/ui/Subtitle";
import { sub } from "motion/react-client";

export const Route = createFileRoute("/lesson")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(lessonsQueryOptions()),
  component: LessonComponent,
});

function LessonComponent() {
  const { data: lessons } = useSuspenseQuery(lessonsQueryOptions());
  const groupedLessons = useMemo(() => groupLessons(lessons), [lessons]);
  console.log(groupedLessons);

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
    <div className="flex flex-col gap-2">
      {Object.entries(groupedLessons).map(([section, { lessons: directLessons, subsections }]) => (
        <div key={section} className="flex flex-col gap-2 p-2">
          <div className="flex justify-between items-center gap-3">
            <h2>{section}</h2>
            <span className="block h-px flex-1 max-w-full border-b border-line"></span>
            <Subtitle>
              {directLessons.length + Object.entries(subsections).reduce((sum, [, value]) => sum + value.length, 0)} lessons
            </Subtitle>
          </div>

          {directLessons.length > 0 && (
            <ul className="flex flex-col gap-2 border-l border-line rounded-bl">
              {directLessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    to="./$lessonId"
                    params={{ lessonId: lesson.id }}
                    className="block text-sm border-line border-b rounded p-2"
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {Object.entries(subsections).map(([subsection, sectionLessons]) => (
            <div key={subsection} className="flex flex-col gap-1">
              <Subtitle>{subsection}</Subtitle>
              <ul className="flex flex-col gap-2 border-l border-line rounded-bl">
                {sectionLessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      to="./$lessonId"
                      params={{ lessonId: lesson.id }}
                      className="block text-sm border-line border-b rounded p-2"
                    >
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <PageLayout title="Lessons" subtitle={subtitle} actions={actions}>
      {content}
    </PageLayout>
  );
}
