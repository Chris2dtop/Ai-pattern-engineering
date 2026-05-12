import { AppShell } from "@/components/app-shell";
import { CreateIntakeDemo } from "@/components/screens/create-intake-demo";

export default async function CreateProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell projectId={id} title="Create garment project" status="Sprint 1C mock AI">
      <CreateIntakeDemo projectId={id} />
    </AppShell>
  );
}
