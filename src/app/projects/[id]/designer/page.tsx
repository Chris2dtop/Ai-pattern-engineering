import { AppShell } from "@/components/app-shell";
import { DesignerDemo } from "@/components/screens/designer-demo";

export default async function DesignerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell projectId={id} title="Designer Mode" status="Sprint 1C mock AI">
      <DesignerDemo projectId={id} />
    </AppShell>
  );
}
