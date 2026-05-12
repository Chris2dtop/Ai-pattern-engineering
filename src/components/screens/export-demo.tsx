"use client";

import { useState } from "react";
import { AiActivityPanel } from "@/components/ai/ai-activity-panel";
import { useProjectDraft } from "@/components/project-state";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

export function ExportDemo() {
  const {
    draft,
    setExportWarningsAccepted,
    updateChecklistItem,
  } = useProjectDraft();
  const [exportState, setExportState] = useState<"idle" | "running" | "done">(
    "idle",
  );

  function runMockExport() {
    setExportState("running");
    window.setTimeout(() => setExportState("done"), 900);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
      <SectionCard
        title="Readiness checklist"
        eyebrow="Final review"
        action={<StatusBadge tone="warning">Exports include warnings</StatusBadge>}
      >
        <div className="grid gap-3">
          {draft.exportReview.checklist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-md border border-line p-3"
            >
              <label className="flex items-center gap-3 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={item.complete}
                  onChange={(event) =>
                    updateChecklistItem(item.id, event.target.checked)
                  }
                />
                {item.label}
              </label>
              <StatusBadge tone={item.complete ? "success" : "warning"}>
                {item.complete ? "Ready" : "Warning"}
              </StatusBadge>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-5">
        <SectionCard title="Mock export package" eyebrow="PDF / XLSX">
          <div className="grid gap-3">
            {[
              "PDF tech pack",
              "XLSX POM and BOM workbook",
              "Pattern Map sheet",
              "Assumptions and review warnings",
            ].map((item) => (
              <div key={item} className="rounded-md border border-line bg-paper p-3">
                {item}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={runMockExport}
            className="mt-5 rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper"
          >
            {exportState === "idle"
              ? "Generate mock exports"
              : exportState === "running"
                ? "Generating..."
                : "Exports generated"}
          </button>

          <label className="mt-4 flex items-center gap-3 rounded-md border border-line p-3 text-sm">
            <input
              type="checkbox"
              checked={draft.exportReview.warningsAccepted}
              onChange={(event) =>
                setExportWarningsAccepted(event.target.checked)
              }
            />
            I accept unresolved Pattern Map and back-view warnings for this mock
            export.
          </label>

          {exportState === "done" ? (
            <p className="mt-4 rounded-md border border-moss/30 bg-moss/10 p-3 text-sm text-moss">
              Mock export complete. Real Sprint 1B/1C exports will generate files
              from saved GarmentSpec data.
            </p>
          ) : null}
        </SectionCard>

        <AiActivityPanel />
      </div>
    </div>
  );
}
