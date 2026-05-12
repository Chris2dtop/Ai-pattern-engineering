import {
  defaultAiRoutePolicy,
  type AiJobKind,
  type ModelTier,
} from "@/lib/ai/types";
import {
  experimentalPomLibrary,
  outerwearPomLibrary,
} from "@/lib/measurements/pom-library";
import type {
  PersistedProjectDraft,
  ProjectDraftAiJob,
  ProjectDraftAiUsageEvent,
  ProjectDraftBomRow,
  ProjectDraftPomRow,
} from "@/lib/projects";

export type MockAiJobResult = {
  draft: PersistedProjectDraft;
  job: ProjectDraftAiJob;
  usageEvent: ProjectDraftAiUsageEvent;
};

function nowIso() {
  return new Date().toISOString();
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function estimateCost(kind: AiJobKind, tier: ModelTier) {
  const baseCosts: Record<ModelTier, number> = {
    lite: 0.0002,
    flash: 0.0012,
    pro: 0.009,
    human: 0,
  };
  const multipliers: Partial<Record<AiJobKind, number>> = {
    generate_maker_package: 1.4,
    generate_pattern_map: 1.5,
    generate_clarifications: 0.8,
  };

  return Number((baseCosts[tier] * (multipliers[kind] ?? 1)).toFixed(4));
}

function modelNameForTier(tier: ModelTier) {
  if (tier === "lite") {
    return "mock-gemini-flash-lite";
  }

  if (tier === "pro") {
    return "mock-gemini-pro-fallback";
  }

  if (tier === "human") {
    return "human-review";
  }

  return "mock-gemini-flash";
}

function createJob(kind: AiJobKind, tier: ModelTier): ProjectDraftAiJob {
  const startedAt = nowIso();

  return {
    id: `job-${Date.now()}-${kind}`,
    kind,
    status: "running",
    modelTier: tier,
    modelName: modelNameForTier(tier),
    message: "Mock AI job running",
    startedAt,
  };
}

function completeJob(
  job: ProjectDraftAiJob,
  message: string,
): ProjectDraftAiJob {
  return {
    ...job,
    status: "complete",
    message,
    completedAt: nowIso(),
  };
}

function appendJobAndUsage(
  draft: PersistedProjectDraft,
  job: ProjectDraftAiJob,
  latencyMs: number,
): PersistedProjectDraft {
  const usageEvent: ProjectDraftAiUsageEvent = {
    id: `usage-${Date.now()}-${job.kind}`,
    jobId: job.id,
    kind: job.kind,
    modelName: job.modelName,
    modelTier: job.modelTier,
    estimatedCostUsd: estimateCost(job.kind, job.modelTier),
    latencyMs,
    createdAt: nowIso(),
  };

  return {
    ...draft,
    ai: {
      jobs: [job, ...draft.ai.jobs].slice(0, 8),
      usageEvents: [usageEvent, ...draft.ai.usageEvents].slice(0, 20),
    },
  };
}

function buildDesignerDraft(draft: PersistedProjectDraft): PersistedProjectDraft {
  const detachableAnswer =
    draft.clarifications.find((item) => item.group === "Detachable sleeve")
      ?.answer ?? "detachable lower sleeve module";
  const materialAnswer =
    draft.clarifications.find((item) => item.group === "Materials")?.answer ??
    draft.concept.fabric;

  return {
    ...draft,
    designerText: {
      summary: `${draft.concept.name} interpreted as ${draft.concept.description}`,
      silhouette: `${draft.concept.fit}. The draft keeps the asymmetric front and oversized dropped-shoulder volume as intentional design choices.`,
      materials: `${draft.concept.fabric}. Material decision note: ${materialAnswer}.`,
      specialFeatures: `Key engineered details: ${detachableAnswer}; separate left/right front body logic; irregular hem; sculptural collar; full lining assumptions marked for maker review.`,
    },
  };
}

function buildPomRows(draft: PersistedProjectDraft): ProjectDraftPomRow[] {
  const standardRows = outerwearPomLibrary.slice(0, 7).map((item, index) => ({
    id: `pom-lib-${index + 1}`,
    code: item.code,
    measurement: item.name,
    howToMeasure: item.method,
    sizeValue: draft.maker.pomRows[index]?.sizeValue ?? "",
    tolerance: item.defaultTolerance ?? "Review",
  }));
  const customRows = experimentalPomLibrary.slice(0, 4).map((item, index) => ({
    id: `pom-exp-${index + 1}`,
    code: item.code,
    measurement: item.name,
    howToMeasure: item.method,
    sizeValue: draft.maker.pomRows[index + 7]?.sizeValue ?? "",
    tolerance: item.defaultTolerance ?? "Review",
  }));

  return [...standardRows, ...customRows];
}

function buildBomRows(draft: PersistedProjectDraft): ProjectDraftBomRow[] {
  return [
    {
      id: "bom-shell",
      category: "Shell",
      material: draft.concept.fabric.includes("wool")
        ? "Black wool coating"
        : draft.concept.fabric,
      placement: "Main body shell",
      notes: "Confirm weight and drape before sampling",
    },
    {
      id: "bom-contrast",
      category: "Contrast",
      material: "Dark leather",
      placement: "Front/sleeve panels",
      notes: "Review thickness and stitch reinforcement",
    },
    {
      id: "bom-lining",
      category: "Lining",
      material: "Black satin lining",
      placement: "Body and sleeve lining",
      notes: "Full lining assumed from clarification",
    },
    {
      id: "bom-closure",
      category: "Closure",
      material: "Hidden zipper",
      placement: "Detachable sleeve seam",
      notes: "Exact zipper length must be confirmed",
    },
  ];
}

function buildMakerPackage(draft: PersistedProjectDraft): PersistedProjectDraft {
  return {
    ...draft,
    maker: {
      technicalOverview: `${draft.concept.name}: oversized outerwear with separate asymmetric front pieces, mixed material joins, detachable lower sleeve module, hidden zipper/flap construction, satin lining, and irregular hem. AI confidence is medium because the back/inside views are not confirmed.`,
      pomRows: buildPomRows(draft),
      bomRows: buildBomRows(draft),
      constructionSteps: [
        "Confirm front/back views and lock asymmetry before drafting.",
        "Draft left and right front bodies separately; do not mirror by default.",
        "Prepare leather panels and reinforce leather-to-wool joins.",
        "Construct upper and lower sleeve modules before inserting the detachable closure.",
        "Install hidden zipper under flap before closing sleeve lining.",
        "Assemble satin lining and bag into shell after major shell seams are approved.",
        "Finish irregular hem and document any maker-approved simplifications.",
      ],
    },
  };
}

function buildClarifications(draft: PersistedProjectDraft): PersistedProjectDraft {
  return {
    ...draft,
    clarifications: draft.clarifications.map((item) => ({
      ...item,
      answer:
        item.answer.trim() ||
        item.recommendation ||
        "Needs designer or maker confirmation",
    })),
  };
}

function buildPatternMap(draft: PersistedProjectDraft): PersistedProjectDraft {
  return {
    ...draft,
    patternMap: {
      pieces: draft.patternMap.pieces.map((piece) => ({
        ...piece,
        confidence:
          piece.risk === "Review required" || piece.risk === "Back view missing"
            ? "Medium"
            : piece.confidence,
      })),
      joins: draft.patternMap.joins.map((join) => ({
        ...join,
        join:
          join.risk === "High risk"
            ? `${join.join}; reinforcement and maker review required`
            : join.join,
      })),
      lastRegeneratedAt: nowIso(),
    },
  };
}

function applyMockGeneration(
  kind: AiJobKind,
  draft: PersistedProjectDraft,
): PersistedProjectDraft {
  if (kind === "generate_clarifications") {
    return buildClarifications(draft);
  }

  if (kind === "generate_designer_draft") {
    return buildDesignerDraft(draft);
  }

  if (kind === "generate_maker_package") {
    return buildMakerPackage(draft);
  }

  if (kind === "generate_pattern_map") {
    return buildPatternMap(draft);
  }

  return draft;
}

export async function runMockAiGatewayJob(
  kind: AiJobKind,
  draft: PersistedProjectDraft,
): Promise<MockAiJobResult> {
  const policy = defaultAiRoutePolicy[kind];
  const tier = policy.defaultTier;
  const job = createJob(kind, tier);
  const latencyMs = 650 + Math.round(Math.random() * 450);

  await wait(latencyMs);

  const generatedDraft = applyMockGeneration(kind, draft);
  const completedJob = completeJob(
    job,
    `${modelNameForTier(tier)} regenerated ${kind.replaceAll("_", " ")}.`,
  );
  const nextDraft = appendJobAndUsage(generatedDraft, completedJob, latencyMs);
  const usageEvent = nextDraft.ai.usageEvents[0];

  return {
    draft: nextDraft,
    job: completedJob,
    usageEvent,
  };
}
