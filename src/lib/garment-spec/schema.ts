import { z } from "zod";

export const ConfidenceLabelSchema = z.enum([
  "high",
  "medium",
  "low",
  "review_required",
]);

export const BasisSchema = z.enum([
  "visible",
  "user_provided",
  "inferred",
  "defaulted",
]);

export const FieldMetaSchema = z.object({
  confidence: z.number().min(0).max(1),
  confidenceLabel: ConfidenceLabelSchema,
  basis: BasisSchema,
  sourceRefs: z.array(z.string()).default([]),
  assumptionId: z.string().optional(),
});

export const ProjectAssetSchema = z.object({
  id: z.string(),
  kind: z.enum(["image", "sketch", "reference", "prompt"]),
  viewType: z.enum(["front", "back", "side", "detail", "unknown"]).default("unknown"),
  storagePath: z.string().optional(),
  description: z.string().optional(),
});

export const PatternPieceSchema = z.object({
  id: z.string(),
  name: z.string(),
  zone: z.enum([
    "front",
    "back",
    "sleeve",
    "collar",
    "cuff",
    "facing",
    "lining",
    "pocket",
    "hem",
    "overlay",
    "detachable",
    "closure",
    "support",
    "trim",
    "custom",
  ]),
  cutQuantity: z.number().int().positive(),
  cutInstruction: z.string(),
  material: z.string(),
  symmetry: z.enum([
    "mirrored",
    "asymmetric_pair",
    "unique_left",
    "unique_right",
    "centered",
    "modular",
    "unknown",
  ]),
  notes: z.string().optional(),
  meta: FieldMetaSchema,
});

export const PatternJoinSchema = z.object({
  id: z.string(),
  fromPieceId: z.string(),
  toPieceId: z.string(),
  seamLocation: z.string(),
  joinType: z.string(),
  finishAssumption: z.string().optional(),
  sequenceDependency: z.string().optional(),
  riskFlags: z.array(z.string()).default([]),
  meta: FieldMetaSchema,
});

export const PomItemSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
  method: z.string().optional(),
  sourceCategory: z.string().optional(),
  isCritical: z.boolean().default(false),
  gradeRuleId: z.string().optional(),
  sourceReference: z.string().optional(),
  sampleValue: z.string().optional(),
  unit: z.enum(["in", "cm"]).default("in"),
  tolerance: z.string().optional(),
  meta: FieldMetaSchema,
});

export const BomItemSchema = z.object({
  id: z.string(),
  category: z.enum([
    "shell",
    "contrast",
    "lining",
    "facing",
    "interfacing",
    "trim",
    "closure",
    "hardware",
    "label",
    "packaging",
    "other",
  ]),
  materialName: z.string(),
  placement: z.string().optional(),
  quantity: z.string().optional(),
  notes: z.string().optional(),
  meta: FieldMetaSchema,
});

export const ConstructionStepSchema = z.object({
  id: z.string(),
  order: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  relatedPieceIds: z.array(z.string()).default([]),
  meta: FieldMetaSchema,
});

export const GarmentSpecSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  revision: z.number().int().positive(),
  status: z.enum(["draft", "needs_input", "review_ready", "export_ready"]),
  title: z.string(),
  assets: z.array(ProjectAssetSchema),
  concept: z.object({
    userDescription: z.string().optional(),
    category: z.string().optional(),
    fitIntent: z.string().optional(),
    targetSize: z.string().optional(),
    fabricIntent: z.string().optional(),
  }),
  designerMode: z.object({
    summary: z.string().default(""),
    silhouette: z.string().default(""),
    materials: z.array(z.string()).default([]),
    specialFeatures: z.array(z.string()).default([]),
  }),
  makerMode: z.object({
    technicalOverview: z.string().default(""),
    warnings: z.array(z.string()).default([]),
    poms: z.array(PomItemSchema).default([]),
    bom: z.array(BomItemSchema).default([]),
    constructionSteps: z.array(ConstructionStepSchema).default([]),
  }),
  patternMap: z.object({
    pieces: z.array(PatternPieceSchema).default([]),
    joins: z.array(PatternJoinSchema).default([]),
    riskFlags: z.array(z.string()).default([]),
    schematicGeometry: z.record(z.string(), z.unknown()).optional(),
  }),
  assumptions: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      description: z.string(),
      status: z.enum(["open", "approved", "rejected", "needs_maker_review"]),
      meta: FieldMetaSchema,
    }),
  ),
});

export type GarmentSpec = z.infer<typeof GarmentSpecSchema>;
