import { AppShell } from "@/components/app-shell";
import { SprintZeroPanel } from "@/components/sprint-zero-panel";

export default function QuestionsPage({ params }: { params: { id: string } }) {
  return (
    <AppShell projectId={params.id} title="Clarifying questions">
      <SprintZeroPanel
        title="Clarification Mode"
        purpose="Ask only the questions that materially reduce construction risk before technical generation."
        mustBuild={[
          "Grouped questions for silhouette, fit, materials, closures, lining, asymmetry, and detachable logic",
          "Required, optional, skip, and unknown states",
          "Autosave answers",
          "Assimilate answers into GarmentSpec revision",
        ]}
      />
    </AppShell>
  );
}
