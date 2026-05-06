# GarmentSpec Schema

## Goal

`GarmentSpec` is the MVP's canonical garment record. It is the editable system of record that sits between upload/analysis, clarification, Designer Mode, Maker/Tailor Mode, and PDF/XLSX export.

It should:
- represent one garment project revision at a time;
- store AI findings, user edits, and assumptions separately but in one shape;
- support complex garments without pretending to be CAD geometry;
- map cleanly to TypeScript/Zod and normalized Supabase/Postgres tables.

## Design Rules

- One canonical schema for app state, AI jobs, and exports.
- Section-level editability: regenerated content must not overwrite approved user edits.
- Every generated fact carries confidence and provenance.
- Unknown and inferred details stay explicit.
- Pattern data is structural, not CAD-grade.
- Tables stay export-friendly for PDF/XLSX generation.

## Top-Level Shape

```ts
type GarmentSpec = {
  id: string
  projectId: string
  orgId: string
  schemaVersion: string
  specRevision: number
  status: "draft" | "needs_input" | "ready_for_review" | "approved_for_export" | "exported"
  editState: EditState
  sourceBundle: SourceBundle
  garmentIdentity: GarmentIdentity
  designIntent: DesignIntent
  visualFindings: VisualFinding[]
  clarifications: ClarificationSet
  designerMode: DesignerModeDraft
  makerMode: MakerModeDraft
  pom: PomSection
  bom: BomSection
  construction: ConstructionSection
  pattern: PatternSection
  assumptions: AssumptionRecord[]
  exports: ExportRecord[]
  validation: ValidationState
  audit: AuditMetadata
}
```

## Shared Metadata Types

Use small reusable wrappers instead of inventing custom metadata per section.

```ts
type Evidence = {
  confidence: number
  basis: "visible" | "user_provided" | "inferred" | "defaulted" | "derived"
  risk: "low" | "medium" | "high" | "requires_review"
  sourceRefs: SourceRef[]
  notes?: string
}

type SourceRef = {
  kind: "asset" | "prompt" | "answer" | "field" | "job"
  refId: string
  label?: string
  region?: "front" | "back" | "left" | "right" | "interior" | "detail" | "unknown"
}

type FieldState = {
  state: "generated" | "user_edited" | "user_confirmed" | "locked" | "stale"
  lastChangedBy: "ai" | "user" | "system"
  updatedAt: string
}

type AuditMetadata = {
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  lastAiJobId?: string
}
```

Recommended rule: leaf fields or rows that matter in production tables should have `evidence` and `fieldState`.

## Versioning And Edit State

```ts
type EditState = {
  currentPhase: "intake" | "analysis" | "clarification" | "designer" | "maker" | "export"
  dirtySections: string[]
  staleSections: string[]
  lockedSections: string[]
  approvedSections: string[]
}
```

- `schemaVersion` tracks structural compatibility for code and migrations.
- `specRevision` increments when approved source inputs or answers change.
- `dirtySections` are edited since last save/export.
- `staleSections` are outputs that should be regenerated because upstream inputs changed.

## Source Bundle

```ts
type SourceBundle = {
  assets: SourceAsset[]
  promptText?: string
  userNotes?: string
  intakeSummary?: string
}

type SourceAsset = {
  id: string
  kind: "image" | "sketch" | "reference_board" | "text_attachment"
  storagePath: string
  viewLabel?: "front" | "back" | "side" | "detail" | "unknown"
  status: "uploading" | "ready" | "failed" | "deleted"
}
```

## Garment Identity And Design Inputs

```ts
type GarmentIdentity = {
  category: "jacket" | "coat" | "dress" | "top" | "shirt" | "skirt" | "trouser" | "set" | "other"
  subcategory?: string
  displayName: string
  sizeBase?: string
  fitIntent?: string
  targetWearContext?: string
  complexityScore?: number
  complexityTags: string[]
}

type DesignIntent = {
  styleSummary: string
  silhouette: SilhouetteProfile
  materialsIntent: MaterialIntent[]
  colorIntent: string[]
  closureIntent: ClosureIntent[]
  featureIntent: FeatureIntent[]
}

type SilhouetteProfile = {
  shape: string
  lengthClass?: string
  volumeNotes?: string
  asymmetryType?: "none" | "left_right" | "front_back" | "diagonal" | "irregular_hem" | "other"
  exaggeratedAreas: string[]
  reversible: boolean
  detachableElements: string[]
}

type MaterialIntent = {
  name: string
  role?: "shell" | "contrast" | "lining" | "facing" | "interfacing" | "trim" | "other"
  placement?: string
  notes?: string
}

type ClosureIntent = {
  type: string
  placement: string
  detachableRelated?: boolean
}

type FeatureIntent = {
  name: string
  description?: string
}
```

This is where the product stores creative intent before it becomes a technical statement.

## Visual Findings

```ts
type VisualFinding = {
  id: string
  area: string
  observation: string
  findingType: "component" | "material" | "closure" | "construction" | "silhouette" | "unknown"
  visible: boolean
  evidence: Evidence
}
```

Visual findings should stay atomic. Example: "left sleeve appears detachable with exposed zipper" is one finding; "shell appears wool suiting" is another.

## Clarifications

```ts
type ClarificationSet = {
  questions: ClarificationQuestion[]
  unresolvedCount: number
}

type ClarificationQuestion = {
  id: string
  group: "design" | "fit" | "materials" | "closure" | "lining" | "detachable" | "reversible" | "production"
  prompt: string
  reason: string
  priority: "required" | "recommended" | "optional"
  status: "open" | "answered" | "waived"
  answer?: ClarificationAnswer
}

type ClarificationAnswer = {
  text: string
  structuredValue?: Record<string, unknown>
  answeredBy: "user" | "maker" | "system"
  answeredAt: string
  evidence: Evidence
}
```

Answers should update the canonical spec, but the original Q/A record should remain auditable.

## Designer Mode

Designer Mode is plain-language and creative, but still structured.

```ts
type DesignerModeDraft = {
  summary: SectionText
  featureCards: FeatureCard[]
  editableNotes: string[]
  openFlags: string[]
}

type SectionText = {
  text: string
  evidence: Evidence
  fieldState: FieldState
}

type FeatureCard = {
  id: string
  label: string
  description: string
  evidence: Evidence
  fieldState: FieldState
}
```

## Maker/Tailor Mode

Maker Mode translates intent into conservative technical language.

```ts
type MakerModeDraft = {
  technicalOverview: SectionText
  technicalFlats: TechnicalFlat[]
  makerWarnings: string[]
  reviewChecklist: string[]
}

type TechnicalFlat = {
  id: string
  view: "front" | "back" | "left" | "right" | "interior" | "detail"
  format: "image" | "structured_description"
  assetId?: string
  description?: string
  evidence: Evidence
  fieldState: FieldState
}
```

## POM

```ts
type PomSection = {
  baseSize?: string
  measurementUnit: "cm" | "in"
  items: PomItem[]
}

type PomItem = {
  id: string
  code?: string
  name: string
  description: string
  method?: string
  sampleValue?: number | null
  tolerancePlus?: number | null
  toleranceMinus?: number | null
  sizeValues?: Record<string, number | null>
  area?: string
  evidence: Evidence
  fieldState: FieldState
}
```

POM values may be blank in MVP when the image does not justify numeric claims. Blank plus explanation is better than false precision.

## BOM

```ts
type BomSection = {
  items: BomItem[]
}

type BomItem = {
  id: string
  category: "shell" | "contrast" | "lining" | "facing" | "interfacing" | "trim" | "closure" | "hardware" | "label" | "packaging" | "other"
  itemName: string
  placement?: string
  quantity?: string
  unit?: string
  materialNotes?: string
  colorNotes?: string
  supplierNotes?: string
  optional: boolean
  evidence: Evidence
  fieldState: FieldState
}
```

This structure must cover mixed materials, facings, interfacings, and reversible builds without forcing everything into "fabric."

## Construction Steps

```ts
type ConstructionSection = {
  steps: ConstructionStep[]
}

type ConstructionStep = {
  id: string
  stepNumber: number
  title: string
  instruction: string
  dependsOnStepIds: string[]
  pieceIds: string[]
  bomItemIds: string[]
  operationTags: string[]
  evidence: Evidence
  fieldState: FieldState
}
```

## Pattern Pieces And Detailed Pattern Map

Pattern data should separate the piece inventory from the relationship map.

```ts
type PatternSection = {
  pieces: PatternPiece[]
  map: PatternConnection[]
  patternNotes: string[]
}

type PatternPiece = {
  id: string
  name: string
  pieceType: "shell" | "lining" | "facing" | "interfacing" | "support" | "pocketing" | "trim_base" | "other"
  quantity: number
  cutOnFold: boolean
  mirrored: boolean
  side?: "left" | "right" | "pair" | "center" | "all"
  detachable: boolean
  reversibleRole?: "face_a" | "face_b" | "shared" | "internal"
  parentPieceId?: string
  materialRef?: string
  grainlineIntent?: string
  shapeNotes?: string
  symmetryNotes?: string
  dependencyNotes?: string
  evidence: Evidence
  fieldState: FieldState
}

type PatternConnection = {
  id: string
  fromPieceId: string
  toPieceId: string
  relationship: "joins" | "overlaps" | "contains" | "detaches_from" | "reverses_with" | "is_faced_by" | "is_lined_by" | "is_fused_by"
  seamType?: string
  locationNote: string
  constructionNote?: string
  evidence: Evidence
}
```

This covers:
- asymmetry: use `side`, `mirrored = false`, and explicit left/right pieces;
- detachable parts: `detachable = true` plus `detaches_from`;
- reversible garments: `reversibleRole` and `reverses_with`;
- mixed materials: piece-level `materialRef`;
- linings/facings/interfacing: `pieceType` plus relationship rows;
- exaggerated silhouettes: `shapeNotes` and `grainlineIntent` without fake geometry.

## Assumptions, Validation, And Exports

```ts
type AssumptionRecord = {
  id: string
  topic: string
  statement: string
  impact: "low" | "medium" | "high"
  status: "open" | "approved" | "rejected" | "needs_maker_review"
  evidence: Evidence
}

type ValidationState = {
  packageConfidence: number
  blockers: string[]
  warnings: string[]
  lastValidatedAt?: string
}

type ExportRecord = {
  id: string
  format: "pdf" | "xlsx" | "json"
  status: "queued" | "running" | "failed" | "complete"
  specRevision: number
  filePath?: string
  createdAt: string
}
```

## Table Mapping

Canonical object in code can be nested; database storage should be hybrid.

| GarmentSpec section | Primary table(s) | Notes |
|---|---|---|
| identity, design intent, edit state, validation | `garment_specs` | Main row with stable ids, status, version fields, and small JSONB columns for low-churn metadata. |
| source bundle assets | `project_assets` | Asset file metadata already belongs with project storage. |
| visual findings | `garment_analyses` or `garment_visual_findings` | Prefer child rows per finding for traceability and filtering. |
| clarifications | `clarification_questions`, `clarification_answers` | Keep Q/A normalized for workflow and audit. |
| Designer Mode, Maker Mode section text | `generated_sections` | One row per section/view with state, content JSONB, and evidence. |
| POM | `pom_items` | One row per measurement item. |
| BOM | `bom_items` | One row per material/trim item. |
| construction | `construction_steps` | Ordered rows. |
| pattern pieces | `pattern_pieces` | One row per piece. |
| pattern map relationships | `pattern_connections` | Add this table for seam/join/detach/lining/facing relationships. |
| assumptions | `assumptions` | One row per assumption/warning. |
| exports | `exports` | Existing export tracking. |
| AI provenance and cost | `ai_jobs`, `ai_usage_events` | Link job ids in `sourceRefs`. |

Recommended `garment_specs` columns:

```ts
id uuid pk
project_id uuid
org_id uuid
schema_version text
spec_revision int
status text
category text
display_name text
edit_state jsonb
design_intent jsonb
validation jsonb
audit jsonb
created_at timestamptz
updated_at timestamptz
```

Use normalized rows for POM, BOM, construction, pattern pieces, clarifications, and assumptions because they are edited, exported, filtered, and version-sensitive.

## Zod/TypeScript Guidance

- Keep enums narrow and string-based for Postgres compatibility.
- Use reusable `EvidenceSchema` and `FieldStateSchema` across sections.
- Use nullable numeric fields for unknown POM values instead of fake defaults.
- Store free-text notes where geometry would otherwise be overclaimed.
- Prefer JSONB only for small nested metadata and section payloads that do not need heavy relational querying.

## Compact JSON Example

Example is intentionally compact; repetitive `fieldState` and `evidence` metadata is omitted on some rows for readability.

```json
{
  "id": "gspec_01",
  "projectId": "proj_01",
  "schemaVersion": "1.0.0",
  "specRevision": 3,
  "status": "ready_for_review",
  "garmentIdentity": {
    "category": "jacket",
    "displayName": "Asymmetric detachable moto jacket",
    "complexityTags": ["asymmetry", "detachable_sleeve", "mixed_materials", "lining"]
  },
  "designIntent": {
    "styleSummary": "Cropped moto jacket with exaggerated right shoulder and detachable left sleeve.",
    "silhouette": {
      "shape": "cropped structured jacket",
      "asymmetryType": "left_right",
      "exaggeratedAreas": ["right_shoulder"],
      "reversible": false,
      "detachableElements": ["left_sleeve"]
    },
    "materialsIntent": [
      { "name": "black wool suiting" },
      { "name": "black leather on collar and right sleeve panel" }
    ]
  },
  "visualFindings": [
    {
      "id": "vf_1",
      "area": "left sleeve",
      "observation": "Sleeve appears detachable at armhole with exposed zipper.",
      "findingType": "closure",
      "visible": true,
      "evidence": { "confidence": 0.83, "basis": "visible", "risk": "medium", "sourceRefs": [{ "kind": "asset", "refId": "asset_front" }] }
    }
  ],
  "pom": {
    "measurementUnit": "cm",
    "items": [
      {
        "id": "pom_1",
        "name": "Center back length",
        "sampleValue": null,
        "evidence": { "confidence": 0.42, "basis": "inferred", "risk": "requires_review", "sourceRefs": [{ "kind": "field", "refId": "silhouette.length" }] }
      }
    ]
  },
  "bom": {
    "items": [
      { "id": "bom_1", "category": "shell", "itemName": "Wool suiting", "placement": "main body" },
      { "id": "bom_2", "category": "contrast", "itemName": "Leather", "placement": "collar and right sleeve panel" },
      { "id": "bom_3", "category": "lining", "itemName": "Satin lining", "placement": "body and attached sleeve interior" },
      { "id": "bom_4", "category": "closure", "itemName": "Separating zipper", "placement": "left detachable sleeve armhole" }
    ]
  },
  "pattern": {
    "pieces": [
      { "id": "pp_1", "name": "Front body left", "pieceType": "shell", "quantity": 1, "mirrored": false, "side": "left", "detachable": false },
      { "id": "pp_2", "name": "Front body right", "pieceType": "shell", "quantity": 1, "mirrored": false, "side": "right", "detachable": false },
      { "id": "pp_3", "name": "Sleeve left", "pieceType": "shell", "quantity": 1, "mirrored": false, "side": "left", "detachable": true }
    ],
    "map": [
      { "id": "pc_1", "fromPieceId": "pp_3", "toPieceId": "pp_1", "relationship": "detaches_from", "locationNote": "left armhole via exposed zipper" }
    ]
  },
  "assumptions": [
    {
      "id": "as_1",
      "topic": "lining_extent",
      "statement": "Left detachable sleeve is assumed to be fully lined to zipper edge.",
      "impact": "high",
      "status": "open"
    }
  ]
}
```

## MVP Recommendation

Implement `GarmentSpec` as:
- one TypeScript/Zod canonical schema in app and worker code;
- one `garment_specs` parent table;
- normalized child tables for rows that users edit, export, or review individually;
- explicit evidence metadata on all AI-generated technical facts.

That gives the MVP enough structure for trust, editing, regeneration, and export without claiming CAD precision.

## Paths Changed

- `planning/workstreams/06_garment_spec_schema.md`
