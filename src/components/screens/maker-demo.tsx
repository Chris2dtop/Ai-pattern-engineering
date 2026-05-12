"use client";

import Link from "next/link";
import { MockRegenerateButton } from "@/components/ai/mock-regenerate-button";
import { useProjectDraft } from "@/components/project-state";
import { EditableTable } from "@/components/ui/editable-table";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

type MakerDemoProps = {
  projectId: string;
};

export function MakerDemo({ projectId }: MakerDemoProps) {
  const { draft, setBomRows, setPomRows } = useProjectDraft();
  const pomRows = draft.maker.pomRows.map((row) => [
    row.code,
    row.measurement,
    row.howToMeasure,
    row.sizeValue,
    row.tolerance,
  ]);
  const bomRows = draft.maker.bomRows.map((row) => [
    row.category,
    row.material,
    row.placement,
    row.notes,
  ]);

  return (
    <div className="grid gap-5">
      <SectionCard
        title="Technical overview"
        eyebrow="Maker language"
        action={
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="warning">Review required</StatusBadge>
            <MockRegenerateButton
              kind="generate_maker_package"
              label="Regenerate maker package"
            />
          </div>
        }
      >
        <p className="max-w-4xl leading-7 text-ink/70">
          {draft.maker.technicalOverview}
        </p>
      </SectionCard>

      <SectionCard title="POM chart" eyebrow="Editable">
        <EditableTable
          columns={["Code", "Measurement", "How to measure", "Size M", "Tolerance"]}
          rows={pomRows}
          onRowsChange={(rows) =>
            setPomRows(
              rows.map((row, index) => ({
                id: draft.maker.pomRows[index]?.id ?? `pom-${index + 1}`,
                code: row[0] ?? "",
                measurement: row[1] ?? "",
                howToMeasure: row[2] ?? "",
                sizeValue: row[3] ?? "",
                tolerance: row[4] ?? "",
              })),
            )
          }
        />
      </SectionCard>

      <SectionCard title="BOM" eyebrow="Editable">
        <EditableTable
          columns={["Category", "Material", "Placement", "Notes"]}
          rows={bomRows}
          onRowsChange={(rows) =>
            setBomRows(
              rows.map((row, index) => ({
                id: draft.maker.bomRows[index]?.id ?? `bom-${index + 1}`,
                category: row[0] ?? "",
                material: row[1] ?? "",
                placement: row[2] ?? "",
                notes: row[3] ?? "",
              })),
            )
          }
        />
      </SectionCard>

      <SectionCard title="Construction notes" eyebrow="Draft sequence">
        <ol className="grid gap-3">
          {draft.maker.constructionSteps.map((step, index) => (
            <li key={step} className="rounded-md border border-line bg-paper p-3">
              <span className="mr-2 font-semibold">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </SectionCard>

      <div className="flex justify-end">
        <Link
          href={`/projects/${projectId}/pattern-map`}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Inspect pattern map
        </Link>
      </div>
    </div>
  );
}
