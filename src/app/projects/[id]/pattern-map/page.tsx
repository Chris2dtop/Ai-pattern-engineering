import { AppShell } from "@/components/app-shell";
import { PatternMapDemo } from "@/components/screens/pattern-map-demo";

export default async function PatternMapPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell projectId={id} title="Pattern Map" status="Sprint 1C mock AI">
      <PatternMapDemo projectId={id} />
    </AppShell>
  );
}
