import { AppShell } from "@/components/app-shell";
import { SprintZeroPanel } from "@/components/sprint-zero-panel";

export default function DesignerPage({ params }: { params: { id: string } }) {
  return (
    <AppShell projectId={params.id} title="Designer Mode">
      <SprintZeroPanel
        title="Designer Mode"
        purpose="Let nontechnical designers refine the garment interpretation in plain language before maker-facing sections are trusted."
        mustBuild={[
          "Editable garment summary and silhouette",
          "Materials, trims, closures, color blocking, detachable and reversible logic",
          "Reference image panel",
          "Confidence, assumption, and stale-section badges",
        ]}
      />
    </AppShell>
  );
}
