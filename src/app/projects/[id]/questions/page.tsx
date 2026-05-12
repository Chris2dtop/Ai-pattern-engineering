import { AppShell } from "@/components/app-shell";
import { QuestionsDemo } from "@/components/screens/questions-demo";

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell projectId={id} title="Clarifying questions" status="Sprint 1C mock AI">
      <QuestionsDemo projectId={id} />
    </AppShell>
  );
}
