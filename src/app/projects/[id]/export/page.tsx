import { AppShell } from "@/components/app-shell";
import { ExportDemo } from "@/components/screens/export-demo";

export default async function ExportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell projectId={id} title="Export Review" status="Sprint 1C mock AI">
      <ExportDemo />
    </AppShell>
  );
}
