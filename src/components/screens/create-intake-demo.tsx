"use client";

import Link from "next/link";
import { useState } from "react";
import { useProjectDraft } from "@/components/project-state";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { uploadedAssets } from "@/lib/mock/demo-project";

type CreateIntakeDemoProps = {
  projectId: string;
};

export function CreateIntakeDemo({ projectId }: CreateIntakeDemoProps) {
  const { draft, hasStoredDraft, hydrated, resetDraft, updateConcept } =
    useProjectDraft();
  const [selectedFileName, setSelectedFileName] = useState("");

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <SectionCard
        title="Concept Intake"
        eyebrow={hydrated ? "Browser-saved demo" : "Loading draft"}
        action={
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={hasStoredDraft ? "success" : "info"}>
              {hasStoredDraft ? "Saved locally" : "Seed draft"}
            </StatusBadge>
            <button
              type="button"
              onClick={resetDraft}
              className="rounded-md border border-line px-3 py-1 text-xs font-medium"
            >
              Reset
            </button>
          </div>
        }
      >
        <div className="grid gap-4">
          <div className="rounded-lg border border-dashed border-line bg-paper p-8 text-center">
            <p className="text-sm font-semibold">Primary concept image</p>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              Add a local file name to test intake behavior. Real storage lands
              when Supabase credentials are connected.
            </p>
            <input
              className="mt-4 max-w-full text-sm"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setSelectedFileName(event.target.files?.[0]?.name ?? "")
              }
            />
            {selectedFileName ? (
              <p className="mt-3 text-sm font-medium text-moss">
                Selected: {selectedFileName}
              </p>
            ) : null}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="block rounded-md border border-line p-3">
              <span className="text-xs uppercase tracking-wide text-ink/50">
                Project name
              </span>
              <input
                className="mt-2 w-full bg-transparent font-medium outline-none"
                value={draft.concept.name}
                onChange={(event) => updateConcept({ name: event.target.value })}
              />
            </label>
            <label className="block rounded-md border border-line p-3">
              <span className="text-xs uppercase tracking-wide text-ink/50">
                Category
              </span>
              <input
                className="mt-2 w-full bg-transparent font-medium outline-none"
                value={draft.concept.category}
                onChange={(event) =>
                  updateConcept({ category: event.target.value })
                }
              />
            </label>
            <label className="block rounded-md border border-line p-3">
              <span className="text-xs uppercase tracking-wide text-ink/50">
                Target size
              </span>
              <input
                className="mt-2 w-full bg-transparent font-medium outline-none"
                value={draft.concept.targetSize}
                onChange={(event) =>
                  updateConcept({ targetSize: event.target.value })
                }
              />
            </label>
            <label className="block rounded-md border border-line p-3">
              <span className="text-xs uppercase tracking-wide text-ink/50">
                Fabric
              </span>
              <input
                className="mt-2 w-full bg-transparent font-medium outline-none"
                value={draft.concept.fabric}
                onChange={(event) => updateConcept({ fabric: event.target.value })}
              />
            </label>
            <label className="block rounded-md border border-line p-3 md:col-span-2">
              <span className="text-xs uppercase tracking-wide text-ink/50">
                Concept description
              </span>
              <textarea
                className="mt-2 min-h-28 w-full resize-y bg-transparent leading-7 text-ink/70 outline-none"
                value={draft.concept.description}
                onChange={(event) =>
                  updateConcept({ description: event.target.value })
                }
              />
            </label>
          </div>

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
