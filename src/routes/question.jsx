import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/question")({
  component: QuestionComponent,
});

function QuestionComponent() {
  return <div>Hello "/question"!</div>;
}
