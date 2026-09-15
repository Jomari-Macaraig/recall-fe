import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/coach")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/coach"!</div>;
}
