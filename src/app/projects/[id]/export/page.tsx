import { AppShell } from "@/components/app-shell";
import { ExportDemo } from "@/components/screens/export-demo";

export default function ExportPage({ params }: { params: { id: string } }) {
  return (
    <AppShell projectId={params.id} title="Export Review" status="Sprint 1A mock">
      <ExportDemo />
    </AppShell>
  );
}
