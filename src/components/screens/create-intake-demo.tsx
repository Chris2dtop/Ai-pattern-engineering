import Link from "next/link";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { demoProject, uploadedAssets } from "@/lib/mock/demo-project";

type CreateIntakeDemoProps = {
  projectId: string;
};

export function CreateIntakeDemo({ projectId }: CreateIntakeDemoProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <SectionCard
        title="Concept Intake"
        eyebrow="Mock upload"
        action={<StatusBadge tone="info">No AI cost</StatusBadge>}
      >
        <div className="grid gap-4">
          <div className="rounded-lg border border-dashed border-line bg-paper p-8 text-center">
            <p className="text-sm font-semibold">Primary concept image</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              Sprint 1A uses a mocked Anieze-style concept so we can validate
              the workflow before paid image analysis.
            </p>
          </div>

          <dl className="grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-line p-3">
              <dt className="text-xs uppercase tracking-wide text-ink/50">
                Category
              </dt>
              <dd className="mt-1 font-medium">{demoProject.category}</dd>
            </div>
            <div className="rounded-md border border-line p-3">
              <dt className="text-xs uppercase tracking-wide text-ink/50">
                Target size
              </dt>
              <dd className="mt-1 font-medium">{demoProject.targetSize}</dd>
            </div>
            <div className="rounded-md border border-line p-3 md:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-ink/50">
                Concept description
              </dt>
              <dd className="mt-1 leading-7 text-ink/70">{demoProject.description}</dd>
            </div>
          </dl>

          <Link
            href={`/projects/${projectId}/questions`}
            className="w-fit rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper"
          >
            Continue to questions
          </Link>
        </div>
      </SectionCard>

      <SectionCard title="Assets" eyebrow="Input status">
        <div className="grid gap-3">
          {uploadedAssets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-start justify-between gap-3 rounded-md border border-line p-3"
            >
              <div>
                <p className="font-medium">{asset.label}</p>
                <p className="mt-1 text-sm text-ink/60">{asset.view}</p>
              </div>
              <StatusBadge
                tone={
                  asset.status === "Ready"
                    ? "success"
                    : asset.status === "Missing"
                      ? "danger"
                      : "warning"
                }
              >
                {asset.status}
              </StatusBadge>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
