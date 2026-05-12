"use client";

import { useState } from "react";
import { useProjectDraft } from "@/components/project-state";
import { StatusBadge } from "@/components/ui/status-badge";
import { runMockAiGatewayJob } from "@/lib/ai/mock-gateway";
import type { AiJobKind } from "@/lib/ai/types";

type MockRegenerateButtonProps = {
  kind: AiJobKind;
  label: string;
};

export function MockRegenerateButton({ kind, label }: MockRegenerateButtonProps) {
  const { draft, replaceDraft } = useProjectDraft();
  const [status, setStatus] = useState<"idle" | "running" | "complete" | "failed">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function regenerate() {
    setStatus("running");
    setMessage("Mock Gemini route running...");

    try {
      const result = await runMockAiGatewayJob(kind, draft);
      replaceDraft(result.draft);
      setStatus("complete");
      setMessage(
        `${result.job.modelName}: ~$${result.usageEvent.estimatedCostUsd.toFixed(4)}`,
      );
    } catch {
      setStatus("failed");
      setMessage("Mock generation failed. Retry is safe.");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={regenerate}
        disabled={status === "running"}
        className="rounded-md border border-line bg-white px-3 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "running" ? "Regenerating..." : label}
      </button>
      {message ? (
        <StatusBadge
          tone={
            status === "complete"
              ? "success"
              : status === "failed"
                ? "danger"
                : "info"
          }
        >
          {message}
        </StatusBadge>
      ) : null}
    </div>
  );
}
