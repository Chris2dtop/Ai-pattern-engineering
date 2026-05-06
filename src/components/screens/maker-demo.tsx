import Link from "next/link";
import { EditableTable } from "@/components/ui/editable-table";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { bomRows, constructionSteps, pomRows } from "@/lib/mock/demo-project";

type MakerDemoProps = {
  projectId: string;
};

export function MakerDemo({ projectId }: MakerDemoProps) {
  return (
    <div className="grid gap-5">
      <SectionCard
        title="Technical overview"
        eyebrow="Maker language"
        action={<StatusBadge tone="warning">Review required</StatusBadge>}
      >
        <p className="max-w-4xl leading-7 text-ink/70">
          Oversized asymmetric jacket with separate left/right front body logic,
          mixed wool and leather shell panels, full satin lining, detachable
          lower sleeve modules, hidden zipper/flap attachment, and irregular hem.
          Pattern maker should verify sleeve attachment circumference, leather
          panel reinforcement, back body shape, and sculptural collar support.
        </p>
      </SectionCard>

      <SectionCard title="POM chart" eyebrow="Editable">
        <EditableTable
          columns={["Code", "Measurement", "Size M", "Tolerance"]}
          rows={pomRows}
        />
      </SectionCard>

      <SectionCard title="BOM" eyebrow="Editable">
        <EditableTable
          columns={["Category", "Material", "Placement", "Notes"]}
          rows={bomRows}
        />
      </SectionCard>

      <SectionCard title="Construction notes" eyebrow="Draft sequence">
        <ol className="grid gap-3">
          {constructionSteps.map((step, index) => (
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
