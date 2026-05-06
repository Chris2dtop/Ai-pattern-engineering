import { AppShell } from "@/components/app-shell";
import { QuestionsDemo } from "@/components/screens/questions-demo";

export default function QuestionsPage({ params }: { params: { id: string } }) {
  return (
    <AppShell projectId={params.id} title="Clarifying questions" status="Sprint 1A mock">
      <QuestionsDemo projectId={params.id} />
    </AppShell>
  );
}
