"use client";

import { useProjectDraft } from "@/components/project-state";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

export function AiActivityPanel() {
  const { draft } = useProjectDraft();
  const latestJobs = draft.ai.jobs.slice(0, 4);
  const totalCost = draft.ai.usageEvents.reduce(
    (sum, event) => sum + event.estimatedCostUsd,
    0,
  );

  return (
    <SectionCard
      title="AI activity"
      eyebrow="Mock gateway"
      action={
        <StatusBadge tone="info">Total mock cost: ${totalCost.toFixed(4)}</StatusBadge>
      }
    >
      {latestJobs.length === 0 ? (
        <p className="text-sm leading-6 text-ink/60">
          No mock AI jobs yet. Use any regenerate button to simulate a
          Gemini-first routed job.
        </p>
      ) : (
        <div className="grid gap-3">
          {latestJobs.map((job) => {
            const usage = draft.ai.usageEvents.find(
              (event) => event.jobId === job.id,
            );

            return (
              <div
                key={job.id}
                className="rounded-md border border-line bg-paper p-3 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{job.kind.replaceAll("_", " ")}</p>
                  <StatusBadge tone="success">{job.status}</StatusBadge>
                </div>
                <p className="mt-2 text-ink/60">{job.message}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-ink/50">
                  <span>{job.modelName}</span>
                  <span>Tier: {job.modelTier}</span>
                  {usage ? <span>{usage.latencyMs}ms</span> : null}
                  {usage ? (
                    <span>${usage.estimatedCostUsd.toFixed(4)}</span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
}
