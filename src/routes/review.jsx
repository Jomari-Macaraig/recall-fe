import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/review")({
  component: ReviewComponent,
});

function ReviewComponent() {
  return <div>Hello "/review"!</div>;
}
