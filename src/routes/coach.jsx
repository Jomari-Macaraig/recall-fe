import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/coach")({
  component: CoachComponent,
});

function CoachComponent() {
  return <div>Hello "/coach"!</div>;
}
