import { AppShell } from "@/components/app-shell";
import { SprintZeroPanel } from "@/components/sprint-zero-panel";

export default function ExportPage({ params }: { params: { id: string } }) {
  return (
    <AppShell projectId={params.id} title="Export Review">
      <SprintZeroPanel
        title="PDF / XLSX Export"
        purpose="Generate deterministic maker handoff files from saved approved project state, with assumptions and warnings included."
        mustBuild={[
          "Readiness checklist and blocker warnings",
          "PDF tech pack export",
          "XLSX workbook for POM, BOM, pattern pieces, joins, construction, and assumptions",
          "Versioned export metadata and signed downloads",
        ]}
      />
    </AppShell>
  );
}
