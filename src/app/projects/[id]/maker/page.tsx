import { AppShell } from "@/components/app-shell";
import { MakerDemo } from "@/components/screens/maker-demo";

export default function MakerPage({ params }: { params: { id: string } }) {
  return (
    <AppShell projectId={params.id} title="Maker / Tailor Mode" status="Sprint 1A mock">
      <MakerDemo projectId={params.id} />
    </AppShell>
  );
}
