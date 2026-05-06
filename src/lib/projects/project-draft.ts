import {
  bomRows,
  clarificationQuestions,
  constructionSteps,
  demoProject,
  designerDraft,
  exportChecklist,
  pomRows,
} from "@/lib/mock/demo-project";

export const PROJECT_DRAFT_SCHEMA_VERSION = 1;
export const PROJECT_DRAFT_STORAGE_KEY_PREFIX =
  "ai-pattern-engineering/project-draft";

export type ProjectDraftConcept = {
  name: string;
  status: string;
  updatedLabel: string;
  category: string;
  fit: string;
  targetSize: string;
  fabric: string;
  description: string;
};

export type ProjectDraftClarification = {
  id: string;
  group: string;
  question: string;
  recommendation: string;
  required: boolean;
  answer: string;
};

export type ProjectDraftDesignerText = {
  summary: string;
  silhouette: string;
  materials: string;
  specialFeatures: string;
};

export type ProjectDraftPomRow = {
  id: string;
  code: string;
  measurement: string;
  howToMeasure: string;
  sizeValue: string;
  tolerance: string;
};

export type ProjectDraftBomRow = {
  id: string;
  category: string;
  material: string;
  placement: string;
  notes: string;
};

export type ProjectDraftChecklistItem = {
  id: string;
  label: string;
  complete: boolean;
};

export type PersistedProjectDraft = {
  schemaVersion: number;
  projectId: string;
  source: "demo";
  lastSavedAt: string;
  concept: ProjectDraftConcept;
  clarifications: ProjectDraftClarification[];
  designerText: ProjectDraftDesignerText;
  maker: {
    technicalOverview: string;
    pomRows: ProjectDraftPomRow[];
    bomRows: ProjectDraftBomRow[];
    constructionSteps: string[];
  };
  exportReview: {
    checklist: ProjectDraftChecklistItem[];
    warningsAccepted: boolean;
  };
};

const DEFAULT_TECHNICAL_OVERVIEW =
  "Oversized asymmetric jacket with separate left/right front body logic, mixed wool and leather shell panels, full satin lining, detachable lower sleeve modules, hidden zipper/flap attachment, and irregular hem. Pattern maker should verify sleeve attachment circumference, leather panel reinforcement, back body shape, and sculptural collar support.";

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asStringArray(value: unknown, fallback: string[]): string[] {
  return Array.isArray(value)
    ? value.map((item) => asString(item)).filter(Boolean)
    : fallback;
}

function toPomRow(row: unknown, index: number): ProjectDraftPomRow {
  if (typeof row !== "object" || row === null) {
    return createDemoProjectDraft().maker.pomRows[index] ?? emptyPomRow(index);
  }

  const candidate = row as Partial<ProjectDraftPomRow>;

  return {
    id: asString(candidate.id, `pom-${index + 1}`),
    code: asString(candidate.code),
    measurement: asString(candidate.measurement),
    howToMeasure: asString(candidate.howToMeasure),
    sizeValue: asString(candidate.sizeValue),
    tolerance: asString(candidate.tolerance),
  };
}

function toBomRow(row: unknown, index: number): ProjectDraftBomRow {
  if (typeof row !== "object" || row === null) {
    return createDemoProjectDraft().maker.bomRows[index] ?? emptyBomRow(index);
  }

  const candidate = row as Partial<ProjectDraftBomRow>;

  return {
    id: asString(candidate.id, `bom-${index + 1}`),
    category: asString(candidate.category),
    material: asString(candidate.material),
    placement: asString(candidate.placement),
    notes: asString(candidate.notes),
  };
}

function toClarification(
  item: unknown,
  index: number,
): ProjectDraftClarification {
  const fallback = createDemoProjectDraft().clarifications[index];

  if (typeof item !== "object" || item === null) {
    return fallback ?? emptyClarification(index);
  }

  const candidate = item as Partial<ProjectDraftClarification>;

  return {
    id: asString(candidate.id, fallback?.id ?? `q${index + 1}`),
    group: asString(candidate.group, fallback?.group ?? ""),
    question: asString(candidate.question, fallback?.question ?? ""),
    recommendation: asString(
      candidate.recommendation,
      fallback?.recommendation ?? "",
    ),
    required: asBoolean(candidate.required, fallback?.required ?? false),
    answer: asString(candidate.answer, fallback?.answer ?? ""),
  };
}

function toChecklistItem(
  item: unknown,
  index: number,
): ProjectDraftChecklistItem {
  const fallback = createDemoProjectDraft().exportReview.checklist[index];

  if (typeof item !== "object" || item === null) {
    return fallback ?? emptyChecklistItem(index);
  }

  const candidate = item as Partial<ProjectDraftChecklistItem>;

  return {
    id: asString(candidate.id, fallback?.id ?? `check-${index + 1}`),
    label: asString(candidate.label, fallback?.label ?? ""),
    complete: asBoolean(candidate.complete, fallback?.complete ?? false),
  };
}

function emptyPomRow(index: number): ProjectDraftPomRow {
  return {
    id: `pom-${index + 1}`,
    code: "",
    measurement: "",
    howToMeasure: "",
    sizeValue: "",
    tolerance: "",
  };
}

function emptyBomRow(index: number): ProjectDraftBomRow {
  return {
    id: `bom-${index + 1}`,
    category: "",
    material: "",
    placement: "",
    notes: "",
  };
}

function emptyClarification(index: number): ProjectDraftClarification {
  return {
    id: `q${index + 1}`,
    group: "",
    question: "",
    recommendation: "",
    required: false,
    answer: "",
  };
}

function emptyChecklistItem(index: number): ProjectDraftChecklistItem {
  return {
    id: `check-${index + 1}`,
    label: "",
    complete: false,
  };
}

export function buildProjectDraftStorageKey(projectId: string): string {
  return `${PROJECT_DRAFT_STORAGE_KEY_PREFIX}:${projectId}`;
}

export function createDemoProjectDraft(projectId = demoProject.id): PersistedProjectDraft {
  return {
    schemaVersion: PROJECT_DRAFT_SCHEMA_VERSION,
    projectId,
    source: "demo",
    lastSavedAt: new Date(0).toISOString(),
    concept: {
      name: demoProject.name,
      status: demoProject.status,
      updatedLabel: demoProject.updated,
      category: demoProject.category,
      fit: demoProject.fit,
      targetSize: demoProject.targetSize,
      fabric: demoProject.fabric,
      description: demoProject.description,
    },
    clarifications: clarificationQuestions.map((question) => ({
      id: question.id,
      group: question.group,
      question: question.question,
      recommendation: question.recommendation,
      required: question.required,
      answer: question.recommendation,
    })),
    designerText: {
      summary: designerDraft.summary,
      silhouette: designerDraft.silhouette,
      materials: designerDraft.materials,
      specialFeatures: designerDraft.specialFeatures,
    },
    maker: {
      technicalOverview: DEFAULT_TECHNICAL_OVERVIEW,
      pomRows: pomRows.map((row, index) => ({
        id: `pom-${index + 1}`,
        code: row[0],
        measurement: row[1],
        howToMeasure: row[2],
        sizeValue: row[3],
        tolerance: row[4],
      })),
      bomRows: bomRows.map((row, index) => ({
        id: `bom-${index + 1}`,
        category: row[0],
        material: row[1],
        placement: row[2],
        notes: row[3],
      })),
      constructionSteps: [...constructionSteps],
    },
    exportReview: {
      checklist: exportChecklist.map(([label, complete], index) => ({
        id: `check-${index + 1}`,
        label,
        complete,
      })),
      warningsAccepted: false,
    },
  };
}

export function normalizePersistedProjectDraft(
  value: unknown,
  projectId = demoProject.id,
): PersistedProjectDraft {
  const fallback = createDemoProjectDraft(projectId);

  if (typeof value !== "object" || value === null) {
    return fallback;
  }

  const candidate = value as Partial<PersistedProjectDraft>;
  const concept = candidate.concept;
  const designerText = candidate.designerText;
  const maker = candidate.maker;
  const exportReview = candidate.exportReview;

  return {
    schemaVersion:
      typeof candidate.schemaVersion === "number"
        ? candidate.schemaVersion
        : PROJECT_DRAFT_SCHEMA_VERSION,
    projectId: asString(candidate.projectId, projectId),
    source: "demo",
    lastSavedAt: asString(candidate.lastSavedAt, fallback.lastSavedAt),
    concept: {
      name: asString(concept?.name, fallback.concept.name),
      status: asString(concept?.status, fallback.concept.status),
      updatedLabel: asString(
        concept?.updatedLabel,
        fallback.concept.updatedLabel,
      ),
      category: asString(concept?.category, fallback.concept.category),
      fit: asString(concept?.fit, fallback.concept.fit),
      targetSize: asString(concept?.targetSize, fallback.concept.targetSize),
      fabric: asString(concept?.fabric, fallback.concept.fabric),
      description: asString(concept?.description, fallback.concept.description),
    },
    clarifications: Array.isArray(candidate.clarifications)
      ? candidate.clarifications.map(toClarification)
      : fallback.clarifications,
    designerText: {
      summary: asString(designerText?.summary, fallback.designerText.summary),
      silhouette: asString(
        designerText?.silhouette,
        fallback.designerText.silhouette,
      ),
      materials: asString(
        designerText?.materials,
        fallback.designerText.materials,
      ),
      specialFeatures: asString(
        designerText?.specialFeatures,
        fallback.designerText.specialFeatures,
      ),
    },
    maker: {
      technicalOverview: asString(
        maker?.technicalOverview,
        fallback.maker.technicalOverview,
      ),
      pomRows: Array.isArray(maker?.pomRows)
        ? maker.pomRows.map(toPomRow)
        : fallback.maker.pomRows,
      bomRows: Array.isArray(maker?.bomRows)
        ? maker.bomRows.map(toBomRow)
        : fallback.maker.bomRows,
      constructionSteps: asStringArray(
        maker?.constructionSteps,
        fallback.maker.constructionSteps,
      ),
    },
    exportReview: {
      checklist: Array.isArray(exportReview?.checklist)
        ? exportReview.checklist.map(toChecklistItem)
        : fallback.exportReview.checklist,
      warningsAccepted: asBoolean(
        exportReview?.warningsAccepted,
        fallback.exportReview.warningsAccepted,
      ),
    },
  };
}
