import { AppShell } from "@/components/app-shell";
import { SprintZeroPanel } from "@/components/sprint-zero-panel";

export default function MakerPage({ params }: { params: { id: string } }) {
  return (
    <AppShell projectId={params.id} title="Maker / Tailor Mode">
      <SprintZeroPanel
        title="Maker / Tailor Mode"
        purpose="Translate approved design intent into editable technical handoff language for sample makers, tailors, and pattern cutters."
        mustBuild={[
          "Technical overview and warnings",
          "Editable POM table",
          "Editable BOM table",
          "Construction steps and pattern piece list",
        ]}
      />
    </AppShell>
  );
}
