import { AppShell } from "@/components/app-shell";
import { MakerDemo } from "@/components/screens/maker-demo";

export default async function MakerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell projectId={id} title="Maker / Tailor Mode" status="Sprint 1C mock AI">
      <MakerDemo projectId={id} />
    </AppShell>
  );
}
