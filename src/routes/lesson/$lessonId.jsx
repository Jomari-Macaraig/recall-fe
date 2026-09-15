import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lesson/$lessonId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { lessonId } = Route.useParams();
  return <div>{`Hello from lesson/${lessonId}`}</div>;
}
