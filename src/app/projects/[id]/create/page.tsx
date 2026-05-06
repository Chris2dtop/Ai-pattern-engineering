import { AppShell } from "@/components/app-shell";
import { SprintZeroPanel } from "@/components/sprint-zero-panel";

export default function CreateProjectPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AppShell projectId={params.id} title="Create garment project">
      <SprintZeroPanel
        title="Upload / Intake"
        purpose="Capture the user's fashion image, sketch, references, and plain-language concept before AI interpretation begins."
        mustBuild={[
          "Image upload with validation and progress",
          "Concept description field",
          "Garment category, fit, fabric, and intended maker fields",
          "Trigger analyze_garment job only after assets are ready",
        ]}
      />
    </AppShell>
  );
}
