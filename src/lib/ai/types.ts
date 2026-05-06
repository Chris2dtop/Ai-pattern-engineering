import { z } from "zod";

export const ModelTierSchema = z.enum(["lite", "flash", "pro", "human"]);

export const AiJobKindSchema = z.enum([
  "analyze_garment",
  "generate_clarifications",
  "assimilate_answers",
  "generate_designer_draft",
  "generate_maker_package",
  "generate_pattern_map",
  "export_pdf",
  "export_xlsx",
  "usage_rollup",
]);

export type ModelTier = z.infer<typeof ModelTierSchema>;
export type AiJobKind = z.infer<typeof AiJobKindSchema>;

export type AiRoutePolicy = {
  defaultTier: ModelTier;
  fallbackTier?: ModelTier;
  maxRetries: number;
  consumeCreditsOnSuccess: boolean;
};

export const defaultAiRoutePolicy: Record<AiJobKind, AiRoutePolicy> = {
  analyze_garment: {
    defaultTier: "flash",
    fallbackTier: "pro",
    maxRetries: 2,
    consumeCreditsOnSuccess: true,
  },
  generate_clarifications: {
    defaultTier: "flash",
    fallbackTier: "pro",
    maxRetries: 2,
    consumeCreditsOnSuccess: true,
  },
  assimilate_answers: {
    defaultTier: "lite",
    fallbackTier: "flash",
    maxRetries: 1,
    consumeCreditsOnSuccess: false,
  },
  generate_designer_draft: {
    defaultTier: "flash",
    fallbackTier: "pro",
    maxRetries: 2,
    consumeCreditsOnSuccess: true,
  },
  generate_maker_package: {
    defaultTier: "flash",
    fallbackTier: "pro",
    maxRetries: 2,
    consumeCreditsOnSuccess: true,
  },
  generate_pattern_map: {
    defaultTier: "flash",
    fallbackTier: "pro",
    maxRetries: 2,
    consumeCreditsOnSuccess: true,
  },
  export_pdf: {
    defaultTier: "lite",
    maxRetries: 1,
    consumeCreditsOnSuccess: false,
  },
  export_xlsx: {
    defaultTier: "lite",
    maxRetries: 1,
    consumeCreditsOnSuccess: false,
  },
  usage_rollup: {
    defaultTier: "lite",
    maxRetries: 1,
    consumeCreditsOnSuccess: false,
  },
};
