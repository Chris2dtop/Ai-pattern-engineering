"use client";

import Link from "next/link";
import { useProjectDraft } from "@/components/project-state";
import { EditableTextarea } from "@/components/ui/editable-textarea";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

type DesignerDemoProps = {
  projectId: string;
};

export function DesignerDemo({ projectId }: DesignerDemoProps) {
  const { draft, updateDesignerText } = useProjectDraft();

  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <SectionCard
        title="Reference panel"
        eyebrow="Image context"
        action={<StatusBadge tone="warning">Back view missing</StatusBadge>}
      >
        <div className="rounded-lg border border-dashed border-line bg-paper p-8 text-center">
          <p className="font-medium">Concept image preview placeholder</p>
          <p className="mt-2 text-sm leading-6 text-ink/60">
            This panel will show uploaded images and AI callouts. Sprint 1A keeps
            it mocked to focus on workflow.
          </p>
        </div>
        <div className="mt-4 grid gap-2">
          {["Detachable sleeve inferred", "Asymmetric hem visible", "Satin lining user-confirmed"].map(
            (item) => (
              <StatusBadge key={item} tone="info">
                {item}
              </StatusBadge>
            ),
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Editable designer interpretation"
        eyebrow="Plain language"
        action={<StatusBadge tone="success">Draft ready</StatusBadge>}
      >
        <div className="grid gap-4">
          <EditableTextarea
            label="Garment summary"
            value={draft.designerText.summary}
            onChange={(summary) => updateDesignerText({ summary })}
          />
          <EditableTextarea
            label="Silhouette and fit"
            value={draft.designerText.silhouette}
            onChange={(silhouette) => updateDesignerText({ silhouette })}
          />
          <EditableTextarea
            label="Materials"
            value={draft.designerText.materials}
            onChange={(materials) => updateDesignerText({ materials })}
          />
          <EditableTextarea
            label="Special features"
            value={draft.designerText.specialFeatures}
            onChange={(specialFeatures) =>
              updateDesignerText({ specialFeatures })
            }
          />
          <Link
            href={`/projects/${projectId}/maker`}
            className="w-fit rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper"
          >
            Convert to maker mode
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
