import { AppShell } from "@/components/app-shell";
import { PatternMapDemo } from "@/components/screens/pattern-map-demo";

export default function PatternMapPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AppShell projectId={params.id} title="Pattern Map" status="Sprint 1A mock">
      <PatternMapDemo projectId={params.id} />
    </AppShell>
  );
}
