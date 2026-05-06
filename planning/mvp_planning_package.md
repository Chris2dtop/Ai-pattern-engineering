# MVP Planning Package: AI Pattern Engineering Platform

## Executive Summary

Build an AI-first garment interpretation tool that turns a fashion image, sketch, reference board, or prompt into an editable technical package a maker can review. The MVP can include editable schematic pattern-map geometry, but it is not production-certified CAD, 3D simulation, grading, sourcing, or production certification. Its job is the missing middle between creative AI fashion output and a tailor/sample-maker-readable brief.

The wedge is strongest for independent designers, fashion students, emerging brands, and small studios who have compelling garment concepts but lack patternmaking vocabulary. The product should help them clarify intent, expose hidden assumptions, and export a practical PDF/XLSX package containing garment overview, POM, BOM, construction notes, pattern piece inventory, Pattern Map, warnings, and assumptions.

The independent-builder strategy is: ship a narrow single-garment workflow, keep fixed infrastructure near $55/month, route AI Gemini-first, make expensive fallback opt-in or validation-gated, and treat confidence/assumption handling as a core product feature rather than polish.

## Product Definition

### Core Promise

Upload a garment concept, answer targeted clarification questions, review AI-generated technical interpretation, edit the draft, inspect a structured Pattern Map, and export a maker-ready review package.

"Maker-ready" must mean "clear enough for maker review, quoting, sampling discussion, or patternmaker interpretation." It must not imply production-certified patterns or factory-ready files.

### Product Positioning

The product is:

- an AI translation layer from image/sketch/prompt to technical garment logic
- a guided clarification workflow for ambiguous fashion concepts
- a dual-mode review tool for designer language and maker language
- a structured export system for PDF and Excel-compatible handoff
- a conservative Pattern Map for pieces, relationships, materials, joins, risk, and editable schematic draft pieces

The product is not:

- a creative fashion image generator
- a PLM
- a professional pattern CAD system
- a 3D garment simulation tool
- a grading engine
- a factory marketplace
- a production certification service

### Defensible Differentiation

Adjacent tools solve different parts of the workflow. Creative AI tools generate visuals. Tech pack tools document known decisions. CAD and 3D tools serve trained experts. PLM coordinates established teams. This MVP owns the gap where a designer has an unclear or unusual concept and needs a structured technical interpretation before a maker can help.

The defensible features are:

- image/sketch-to-technical interpretation for non-pattern experts
- clarification questions that reduce ambiguity before generation
- Designer Mode and Maker/Tailor Mode from the same canonical garment state
- Pattern Map that separates visible evidence, user-provided facts, and AI inference
- strong support for unusual garments: asymmetry, detachable modules, reversible logic, sculptural volume, irregular hems, and mixed materials

## Target Audience

### Primary Users

- independent fashion designers
- inexperienced designers with strong visual taste but limited technical vocabulary
- fashion students
- small studios and emerging brands
- creators using AI imagery as a starting point for physical garments

### Secondary Users

- tailors
- sample makers
- pattern cutters
- small manufacturers

Secondary users benefit when incoming concepts are clearer, but the MVP should be built around designer-to-maker collaboration rather than a maker-only professional tool.

### Later Audience

Consumers and mass customization users are later. Do not shape the MVP around consumer marketplace flows.

## Core Modes

### Upload / Intake

Purpose: capture the starting concept with minimal friction.

MVP inputs:

- image, sketch, or reference upload
- optional text prompt or design notes
- optional garment category, target wearer, and intended use
- one primary garment project at a time

The system should normalize the input, identify whether the image contains one or multiple garments, and avoid generating technical certainty when source material is insufficient.

### Clarification Mode

Purpose: reduce ambiguity before technical outputs appear authoritative.

Question groups:

- design and silhouette
- fit and size base
- materials and color blocking
- closures and openings
- lining and interior
- detachable elements
- reversible logic
- asymmetry and irregular features
- production context

Questions should be targeted, not exhaustive. Required questions block progress only when unresolved answers would create high construction risk.

### Designer Mode

Purpose: let the designer refine the garment in plain language.

Include editable sections for:

- garment summary
- silhouette and fit intent
- materials and placements
- colors and material blocking
- trims and closures
- detachable/reversible logic
- special notes
- open questions and assumptions

Designer Mode should be readable by someone without patternmaking expertise. Major structure edits should mark downstream technical sections as stale instead of silently regenerating over user work.

### Maker / Tailor Mode

Purpose: translate approved intent into technical handoff language.

Include:

- technical overview
- technical flats or structured flat descriptions
- editable POM table
- editable BOM table
- ordered construction notes
- pattern piece list
- technical warnings and review checklist
- clear inferred/user-confirmed labels

This mode should be conservative. Unknown numeric measurements can be blank with notes; false precision is worse than an empty editable cell.

### Pattern Map Mode

Purpose: explain how the garment decomposes into pieces, materials, joins, layers, and dependencies, while allowing editable schematic/vector pattern drafts that are clearly labeled for pattern-maker review.

Include:

- piece inventory
- seam/join relationship map
- material assignment per piece
- construction order groups
- risk flags
- editable schematic piece shapes when enough information exists
- optional simple visual map plus text fallback

Pattern Map can start as a dedicated route or a Maker Mode subview. If time is tight, ship structured tables and a simple grouped visual before investing in a richer canvas. The canvas can evolve into editable CAD-grade geometry later, but MVP exports must label any generated shapes as draft pattern guidance, not production-ready pattern files.

### Export Review

Purpose: confirm readiness, expose gaps, and generate shareable files.

Include:

- readiness checklist
- blockers and warnings
- unresolved assumptions summary
- package contents preview
- PDF and XLSX export actions
- revision/version metadata

Exports should be allowed with non-blocking warnings if the user explicitly accepts them. Critical stale/missing data should block export.

## MVP Scope

### In Scope

- authenticated project workspace
- single-garment project lifecycle
- image/sketch upload and prompt intake
- AI garment analysis for category, silhouette, visible construction, materials, closures, trims, complexity, and ambiguity
- grouped clarification questions
- editable Designer Mode
- editable Maker/Tailor Mode
- POM, BOM, construction notes, pattern piece list
- detailed Pattern Map with pieces, joins, materials, confidence, assumptions, and optional editable schematic draft geometry
- confidence labels and basis metadata on generated technical facts
- stale-section handling after upstream edits
- PDF tech pack export
- Excel-compatible workbook export
- private saved assets and exports
- credit ledger and basic payment/top-up architecture
- logging of AI usage, prompt versions, model, cost estimate, latency, retries, and validation status

### Explicit Non-Scope

- production-certified pattern files
- DXF, ASTM, AAMA, Gerber, Lectra, CLO, Browzwear, or CAD-grade exports
- automatic grading across size ranges
- exact production pattern geometry from a single image
- full 3D garment simulation
- fabric physics, drape, shrinkage, or fit guarantees
- factory certification
- automated costing, sourcing, supplier matching, or purchase orders
- consumer marketplace
- multi-garment collection management beyond basic project organization
- human expert review marketplace

## Recommended Tech Stack

### Default MVP Stack

- App: Next.js App Router with TypeScript
- Auth/database/storage: Supabase Auth, Postgres, RLS, Supabase Storage
- Jobs: Inngest or Trigger.dev
- AI: internal Gemini-first gateway with provider-flexible adapters
- Exports: server-side HTML-to-PDF plus Node XLSX generation
- Payments: Stripe Checkout, Customer Portal, webhook-backed credit ledger
- Observability: Sentry, queue dashboard, Supabase/platform logs, `ai_usage_events`
- Deployment: Vercel plus Supabase plus managed queue; move workers to Fly.io/Render/Railway/Cloud Run when serverless duration becomes painful

### Core Data Tables

Start with:

- `users`
- `organizations`
- `projects`
- `project_assets`
- `garment_specs`
- `garment_visual_findings`
- `clarification_questions`
- `clarification_answers`
- `generated_sections`
- `pom_items`
- `bom_items`
- `construction_steps`
- `pattern_pieces`
- `pattern_connections`
- `assumptions`
- `exports`
- `ai_jobs`
- `ai_usage_events`
- `credit_ledger`
- `payment_events`

Use RLS from the beginning. All assets and exports are private by default and downloaded through signed URLs.

### Job Types

- `analyze_garment`
- `generate_clarifications`
- `assimilate_answers`
- `generate_designer_draft`
- `generate_maker_package`
- `generate_pattern_map`
- `export_pdf`
- `export_xlsx`
- `usage_rollup`

Jobs must be idempotent by project id, job type, and input/spec revision. Partial section success should be saved, and failed sections should be retryable.

## AI / Model Routing Strategy

### Routing Principles

Use small, inspectable calls rather than one large magic generation. Each call returns structured JSON with evidence, confidence, basis, risk, and source references.

Default model tiers:

- Lite: cheap text cleanup, formatting, validation, schema repair, table normalization
- Flash: default multimodal and structured generation for analysis, questions, Designer/Maker drafts, pattern map
- Pro: stronger fallback only when validation fails, confidence is low, garment complexity is high, or the user pays for premium review
- Human: external maker/patternmaker review, represented as warnings/checklists in MVP

### Suggested Call Chain

1. Intake normalization
2. Image garment detection
3. Concept synthesis
4. Complexity and risk scoring
5. Clarifying question generation
6. Answer assimilation
7. Designer Mode draft
8. Maker/Tailor technical overview
9. Pattern piece decomposition
10. Pattern relationship map
11. POM draft
12. BOM draft
13. Construction sequence
14. Export assembly validation
15. Final consistency and risk review

### Confidence Rules

Every generated field that affects production understanding should include:

- `confidence`: 0.0 to 1.0
- `basis`: visible, user_provided, inferred, defaulted, or derived
- `source_refs`: image, prompt, answer, field, or job reference
- `risk`: low, medium, high, or requires_review

Threshold behavior:

- >= 0.80: normal editable output
- 0.60-0.79: assumption label
- 0.40-0.59: clarification or unresolved flag
- < 0.40: do not present as technical fact; ask, warn, or route to review

Pattern map and construction logic should weigh heavily in package-level confidence.

### Validation

Validate after each major AI step:

- schema validity
- garment/component coverage
- internal consistency across POM, BOM, construction, pattern pieces, and joins
- assumption labeling
- non-standard garment coverage
- export readiness

Repair only failed fields when possible. Never silently overwrite user-edited or locked fields.

### Cost Controls

- Gemini direct first; avoid a router by default
- Flash for image and structured generation
- Flash-Lite for validators, repair, formatting, and cleanup
- Pro only after two cheap attempts fail or when user pays for premium review
- cache image analysis and approved garment state by revision
- regenerate section-level outputs, not the whole package
- downscale images and crop regions where practical
- set budget caps: about $1 standard job, $2.50 premium job, and explicit user confirmation above 20 credits/project
- log prompt version, model, tokens, estimated cost, latency, retry count, validation outcome, and fallback reason

## GarmentSpec / Data Model Summary

`GarmentSpec` is the canonical editable garment record. It sits between upload, AI analysis, clarification, Designer Mode, Maker Mode, Pattern Map, and export.

Top-level sections:

- identity and revision metadata
- edit state
- source bundle
- garment identity
- design intent
- visual findings
- clarifications
- Designer Mode draft
- Maker Mode draft
- POM
- BOM
- construction
- pattern data
- assumptions
- exports
- validation state
- audit metadata

Important implementation rules:

- one canonical TypeScript/Zod schema in app and worker code
- normalized child rows for editable/exported tables
- JSONB only for low-churn nested metadata or section payloads
- evidence and field state on all important generated facts
- user edits must survive regeneration
- `specRevision` increments when approved source inputs or answers change
- stale downstream sections are marked explicitly

Key shared metadata:

- `Evidence`: confidence, basis, risk, source refs, notes
- `FieldState`: generated, user_edited, user_confirmed, locked, stale
- `EditState`: current phase, dirty sections, stale sections, locked sections, approved sections

MVP database mapping:

- `garment_specs` parent row for identity, design intent, edit state, validation, audit
- child rows for clarifications, POM, BOM, construction, pattern pieces, pattern connections, assumptions, and exports
- `ai_jobs` and `ai_usage_events` for provenance and cost

## Pattern Map Definition

Pattern Map is a structured technical map, not a pattern file.

It includes three linked outputs:

1. piece inventory
2. seam/join relationship map
3. construction order and risk explanation

### Piece Inventory

Each piece row should capture:

- piece id and name
- garment zone
- piece type
- cut quantity
- cut instruction
- material assignment
- visible side or reversible role
- symmetry
- grainline/nap intent
- fusing/support
- detachable flag
- confidence, basis, field state, notes

Dimensions are optional placeholders unless supplied by the user or measurement data.

### Relationship Map

Each join should capture:

- from/to piece ids
- relationship type: joins, overlaps, contains, detaches_from, reverses_with, is_faced_by, is_lined_by, is_fused_by
- seam location
- join type
- finish assumption
- sequence dependency
- risk flag
- evidence

This must be queryable and exportable, not only prose.

### Risk Categories

Pattern Map must flag:

- hidden construction
- asymmetry
- detachable logic
- reversible logic
- mixed material joins
- sculptural support
- irregular hem
- grain or nap
- fit volume
- low visual confidence

### Visual Strategy

The first visual map should show grouped pieces, materials, quantities, major joins, and badges. It should not show exact drafting outlines, notches, seam allowance geometry, grading nests, or CAD controls.

If the visual renderer fails or slips the schedule, ship the structured tables and textual map. That still satisfies the MVP promise better than a misleading CAD-like diagram.

## UX / Screens / Figma Approach

### Route Model

Recommended routes:

- `/projects`
- `/projects/[id]/create`
- `/projects/[id]/questions`
- `/projects/[id]/designer`
- `/projects/[id]/maker`
- `/projects/[id]/pattern-map`
- `/projects/[id]/export`

Use a persistent project shell with project title, status, save state, and step navigation.

### Core Screens

1. Project List
2. Create Project / Upload Intake
3. Clarifying Questions
4. Designer Mode
5. Maker / Tailor Mode
6. Pattern Map
7. Export Review

If design time is constrained, wireframe six screens first and treat Pattern Map as a Maker Mode expansion. In code, keep it as a separate route if implementation cost is low.

### UX Rules

- reveal technical depth progressively
- make uncertainty visible before export
- use autosave and visible save/error states
- support partial generation and per-section retry
- preserve previous successful output during regeneration
- mark stale sections after upstream edits
- use standard forms and accessible tables before custom canvas-heavy UI
- make tablet behavior real: stacked layouts, scrollable tables, no hover-only controls

### Figma Approach

Use light Figma first, then code prototype quickly.

Figma deliverables:

- low-fidelity frames for Project List, Intake, Questions, Designer, Maker, Export
- optional seventh Pattern Map frame
- shared shell and minimal components
- confidence/assumption/stale badges
- tablet annotations

Avoid early investment in polished branding, dense prototypes, decorative visuals, or CAD-like pattern diagrams. The key UX risk is whether users understand, edit, and trust the workflow.

## Pricing / Credits / Unit Economics

### Fixed Cost Target

Recommended launch baseline:

- Vercel Pro: about $20/month
- Supabase Pro: about $25/month
- Trigger.dev Hobby: about $10/month
- Sentry/platform logs/usage tables first; paid AI observability later

Estimated fixed monthly baseline: about $55/month.

### Variable Cost Planning

Use $0.50 as the conservative variable cost target for one standard paid project. Complex garments with premium fallback can budget $1.00-$1.50 and should consume more credits or require user approval.

### Credit Rules

Credits should map to user-visible actions:

- 10 credits: full technical package generation
- 3 credits: targeted regeneration of one section group
- 1 credit: export bundle
- 6 credits: premium stronger-model review/regeneration

Do not charge for:

- uploads
- answering questions
- editing
- failed jobs that save no usable output
- schema repair retries inside the same job
- export retries from the same approved revision

Consume credits only when generation succeeds and stores usable output.

### MVP Offers

Free trial:

- 12 credits
- enough for first-pass generation plus export or a small regeneration
- no card required
- 14-day expiry

Subscriptions:

- Starter: $19/month, 35 credits
- Builder: $49/month, 110 credits
- Studio: $99/month, 260 credits

Credit packs:

- Mini: $9, 12 credits
- Project: $19, 30 credits
- Builder: $49, 90 credits

Keep packs slightly worse value than subscriptions. Add human expert review later as a separate $79-$149/project lane, not as an MVP dependency.

## Export System

Exports are deterministic packaging from saved approved state, not a new AI generation pass.

### Outputs

PDF tech pack:

- cover page
- export summary and disclaimer
- garment overview
- Designer intent
- Maker/Tailor technical overview
- source-view summary
- technical flats or structured descriptions
- POM
- BOM
- construction steps
- pattern piece inventory
- Pattern Map summary
- visual callout or text fallback
- warnings and assumptions
- change/export metadata

Excel-compatible workbook:

- Summary
- POM
- BOM
- Pattern Pieces
- Pattern Joins
- Construction Steps
- Assumptions
- Warnings
- Change Log

Optional export package:

- `tech-pack.pdf`
- `workbook.xlsx`
- `pattern-map.png` or `pattern-map.pdf`
- `manifest.json`
- optional zip bundle

### Readiness Rules

Allow export when:

- saved `GarmentSpec` exists
- core sections exist
- source assets are ready
- current spec revision is approved or unresolved warnings are explicitly accepted

Block export when:

- assets are still processing
- spec is stale relative to accepted clarification answers
- required records are missing
- an export for the same revision is already running

Warn but allow when:

- POM values are blank
- flats are textual
- pattern joins require review
- assumptions remain open but are accepted for export

### Worker Implementation

Use one queue-backed `export_package` job for MVP:

1. create `exports` row
2. load persisted project/spec data
3. validate readiness
4. build export view model
5. render simple pattern map or text fallback
6. render HTML templates
7. generate PDF
8. generate XLSX via `exceljs`
9. create manifest
10. upload private files
11. update export metadata and signed download references

Failed exports do not consume AI credits and should preserve the last successful export.

## First-Build Backlog

### Sprint 0: Foundation

Goal: stable rails for the full workflow.

Ship:

- Next.js App Router shell and routes
- protected project workspace
- Supabase Auth/Postgres/Storage/RLS
- direct-to-storage image upload
- initial database migrations
- canonical `GarmentSpec` Zod schema
- job queue integration
- AI gateway skeleton
- Sentry/logging baseline
- shared UI states: loading, error, confidence, assumption, stale

### Sprint 1: First End-to-End Workflow

Goal: upload to export for one garment project.

Ship:

- garment analysis job
- clarification question generation and autosave
- answer assimilation into canonical state
- Designer Mode editable draft
- Maker/Tailor Mode technical overview, POM, BOM, construction
- Pattern Map structured output and edit table
- PDF/XLSX export from saved state
- readiness checklist and warnings
- partial retry behavior for failed generated sections

### Post-Sprint-1 Hardening

Ship:

- Stripe checkout and customer portal
- immutable credit ledger
- usage rollups and refund/reconciliation rules
- premium fallback routing
- richer Pattern Map visualization
- seed fixtures for standard, asymmetric, detachable, reversible, and mixed-material garments
- automated tests for schema, stale logic, generation states, and export structure
- simple internal admin/SQL dashboard for job health and AI cost

## Risks And Mitigations

### Overclaiming Production Readiness

Risk: users believe exports are certified patterns or factory-ready instructions.

Mitigation: use "reviewable technical draft" language, visible disclaimers, inferred labels, professional-review warnings, and no CAD/DXF/grading claims.

### AI Invents Hidden Construction

Risk: the system states hidden seams, supports, linings, or closures as facts.

Mitigation: require basis metadata, ask clarifications for low-confidence fields, warn on high-impact inferred construction, and validate non-standard garments explicitly.

### Confidence Labels Become Decorative

Risk: low confidence appears but does not affect behavior.

Mitigation: tie thresholds to UX: clarify, block critical export, require explicit approval, or mark as maker-review needed.

### AI Cost Creep

Risk: repeated regenerations, large images, and Pro fallback destroy margin.

Mitigation: section-level regeneration, caching by revision, image limits/resizing, budget caps, Flash/Lite defaults, Pro opt-in or validation-gated.

### Lost Work Or Duplicate Charges

Risk: jobs fail mid-flow, overwrite edits, or double-consume credits.

Mitigation: idempotent jobs, saved revisions, partial section saves, credit consumption only on successful saved output, immutable ledger, no-charge failed export retries.

### Inconsistent Technical Package

Risk: POM, BOM, construction, pattern pieces, and joins contradict each other.

Mitigation: shared canonical schema, consistency validators, export readiness checks, and final package review.

### Privacy And Asset Exposure

Risk: private garment images or exports leak.

Mitigation: RLS, private buckets, signed URLs, server-side provider calls, minimal AI payloads, no public export links.

### UX Trust Gap

Risk: designers feel outputs are confidently wrong and makers still find packages ambiguous.

Mitigation: pilot with both designers and makers, optimize for conservative clarity over fluent prose, and surface unresolved questions early.

## Success Criteria

MVP succeeds when:

- a designer can complete a single-garment export without patternmaking expertise
- a maker can understand intent, pieces, materials, measurements, construction assumptions, and open risks
- clarification catches important ambiguity before export
- generated content is editable, auditable, and labeled as visible/user-provided/inferred
- at least 70% of pilot designers say the tool reduces back-and-forth
- at least 60% of pilot makers say the package is clearer than image/prompt alone
- median upload-to-first-complete-draft is under 20 minutes
- standard paid project variable cost stays around or below $0.50

## Immediate Next Steps

1. Create the repo foundation: Next.js, Supabase, migrations, RLS, storage buckets, protected routes, and environment config.
2. Implement `GarmentSpec` Zod schema and normalized table mappers before building AI prompts.
3. Build the project shell and six core screen skeletons with confidence, assumption, and stale-state components.
4. Wire the queue and AI gateway with mock responses first, then Gemini Flash/Lite calls behind schemas.
5. Implement upload-to-analysis and clarification flow as the first real vertical slice.
6. Add Maker Mode tables and Pattern Map structured tables before investing in richer visuals.
7. Build deterministic PDF/XLSX export from saved mock data, then connect it to generated project state.
8. Add credit ledger rules before public trial usage, even if billing UI is minimal.
9. Create seed projects for standard, asymmetric, detachable, reversible, and mixed-material garments.
10. Run pilot review with one designer and one maker before adding non-MVP features.

## Paths Changed

- `planning/mvp_planning_package.md`
