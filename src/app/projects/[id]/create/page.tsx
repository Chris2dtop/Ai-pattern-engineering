import { AppShell } from "@/components/app-shell";
import { CreateIntakeDemo } from "@/components/screens/create-intake-demo";

export default function CreateProjectPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AppShell projectId={params.id} title="Create garment project" status="Sprint 1A mock">
      <CreateIntakeDemo projectId={params.id} />
    </AppShell>
  );
}
