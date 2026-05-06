import type { AiJobKind } from "@/lib/ai/types";

export type JobStatus =
  | "queued"
  | "running"
  | "needs_input"
  | "failed"
  | "cancelled"
  | "complete";

export type ProjectJob = {
  id: string;
  projectId: string;
  kind: AiJobKind;
  status: JobStatus;
  inputRevision: number;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
};
