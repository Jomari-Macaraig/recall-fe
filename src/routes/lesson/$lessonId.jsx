import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { lessonQueryOptions } from "../../api/lessons";
import Markdown from "react-markdown";

export const Route = createFileRoute("/lesson/$lessonId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { lessonId } = Route.useParams();
  const { data: lesson } = useSuspenseQuery(lessonQueryOptions(lessonId));
  console.log(lesson);
  return (
    <div>
      <h1>{lesson.title}</h1>
      <div className="prose prose-invert">
        <Markdown>{lesson.content}</Markdown>
      </div>
    </div>
  );
}
