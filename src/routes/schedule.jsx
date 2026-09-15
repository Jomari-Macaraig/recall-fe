import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/schedule")({
  component: ScheduleComponent,
});

function ScheduleComponent() {
  return <div>Hello "/schedule"!</div>;
}
