import { AppShell } from "@/components/app-shell";
import { SprintZeroPanel } from "@/components/sprint-zero-panel";

export default function PatternMapPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AppShell projectId={params.id} title="Pattern Map">
      <SprintZeroPanel
        title="Editable Schematic Pattern Map"
        purpose="Show piece inventory, joins, materials, layers, risk, and draft schematic vector pieces without claiming production-certified CAD."
        mustBuild={[
          "Piece inventory with cut quantity, material, symmetry, confidence, and basis",
          "Join relationship table",
          "Risk flags for asymmetry, detachable logic, mixed materials, hidden construction, and sculptural support",
          "Editable schematic piece view as the path toward future CAD geometry",
        ]}
      />
    </AppShell>
  );
}
