import { AppShell } from "@/components/app-shell";
import { DesignerDemo } from "@/components/screens/designer-demo";

export default function DesignerPage({ params }: { params: { id: string } }) {
  return (
    <AppShell projectId={params.id} title="Designer Mode" status="Sprint 1A mock">
      <DesignerDemo projectId={params.id} />
    </AppShell>
  );
}
