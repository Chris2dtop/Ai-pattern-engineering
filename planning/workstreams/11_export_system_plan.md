# Export System Plan: MVP

## Goal

Define a cheap, reliable export system that turns an approved garment project revision into a maker-shareable package:

- PDF tech pack
- Excel-compatible workbook
- visual callout/pattern map sheet
- versioned export package with warnings and assumptions

The export system should be deterministic from saved project state, not a fresh AI generation pass. Exports are a packaging layer over approved or explicitly accepted data.

## MVP Principles

- Export only from a saved `GarmentSpec` revision and its normalized child records.
- Keep the rendering stack simple: server-side HTML-to-PDF plus Node XLSX generation.
- Do not spend new AI credits during export.
- Preserve uncertainty honestly with warnings, confidence, and assumptions instead of hiding gaps.
- Keep regeneration idempotent so failed export jobs can be retried cheaply.
- Favor plain, editable outputs over visually elaborate but brittle templates.

## Export Outputs

### 1. PDF Tech Pack

The PDF is the primary handoff artifact for a tailor, sample maker, or small manufacturer.

Required sections:
- cover page with project name, garment name, export revision, export date, and approval status
- garment overview
- designer intent summary
- maker/tailor technical overview
- source-view summary listing what references were provided
- technical flats or structured flat descriptions
- POM table
- BOM table
- construction steps
- pattern piece inventory
- detailed pattern map summary
- visual callout sheet
- warnings, assumptions, and review-required items
- export metadata and revision history summary

PDF rules:
- label inferred or unresolved data clearly
- show blanks where numeric values are unknown rather than inventing precision
- include page numbers and export revision on every page footer
- include a prominent professional-review disclaimer when high-impact assumptions remain open

### 2. Excel-Compatible Workbook

Generate one `.xlsx` workbook that opens cleanly in Excel, Google Sheets, and LibreOffice.

Required sheets:
- `Summary`
- `POM`
- `BOM`
- `Pattern Pieces`
- `Pattern Joins`
- `Construction Steps`
- `Assumptions`
- `Warnings`
- `Change Log`

Workbook rules:
- one header row per sheet
- plain tables, no macros, no locked cells, no advanced formatting dependencies
- frozen top row on main sheets
- stable column naming so downstream users can sort/filter reliably
- include `confidence_label`, `basis`, and `field_state` columns where applicable

### 3. Visual Callout / Pattern Map Sheet

For MVP, this should be a rendered sheet included:
- as one or more pages inside the PDF
- as an image file in the export package
- as a reference sheet noted from the workbook `Summary` tab

The callout sheet should show:
- garment zones and major piece groups
- left/right asymmetry where relevant
- piece labels
- material labels
- major join/callout numbers
- badges for `inferred`, `review required`, and `detachable/reversible`

Cheap MVP rule:
- render from structured pattern-map data and simple diagram instructions
- use textual fallback if the visual renderer fails
- do not attempt CAD-style outlines or exact drafting geometry

### 4. Versioned Export Package

Every successful export should produce a package record and stored files for one project revision.

Recommended package contents:
- `tech-pack.pdf`
- `workbook.xlsx`
- `pattern-map.png` or `pattern-map.pdf`
- `manifest.json`

Optional packaging:
- bundle into a `.zip` for single-click download
- also keep individual files downloadable

`manifest.json` should include:
- export id
- project id
- garment spec revision
- export template version
- schema version
- created at timestamp
- file list with storage paths and checksums
- warning counts
- assumption counts

## Export Readiness Rules

Allow export when:
- the project has a persisted `GarmentSpec`
- required core sections exist: overview, POM container, BOM container, construction, pattern data, assumptions
- the current spec revision is marked `approved_for_export` or the user explicitly accepts unresolved warnings

Block export when:
- source assets are still processing
- the spec is stale relative to accepted clarification answers
- required project records are missing
- an export for the same revision is already `running`

Warn but still allow export when:
- POM values are partially blank
- technical flats are structured descriptions instead of images
- pattern map contains review-required joins
- assumptions remain open but explicitly accepted for export

## Data Requirements

The export worker should read only persisted data, not in-memory UI state.

Minimum required inputs:
- `garment_specs`
- `generated_sections`
- `pom_items`
- `bom_items`
- `construction_steps`
- `pattern_pieces`
- `pattern_connections`
- `assumptions`
- `project_assets`
- `exports` metadata

Important export fields:
- project name and garment display name
- spec revision and schema version
- section text with evidence and field state
- POM names, descriptions, sample/tolerance values, units
- BOM category, item name, placement, quantity, notes
- construction ordering and dependencies
- pattern piece labels, quantities, materials, symmetry, detachable/reversible flags
- pattern join relationship, seam location, finish assumption, sequence dependency
- warning and assumption status with impact level

Recommended derived fields during export:
- `confidence_label` from numeric confidence thresholds
- package-level readiness summary
- unresolved warning counts by category
- human-review trigger summary

## PDF Structure

Recommended page order:

1. Cover
2. Export summary and disclaimer
3. Garment overview
4. Technical overview
5. Technical flats
6. Measurement spec / POM
7. BOM
8. Construction steps
9. Pattern pieces
10. Pattern joins / pattern map notes
11. Visual callout / pattern map sheet
12. Assumptions and warnings
13. Change log / export metadata

Presentation rules:
- use a restrained technical template, not a marketing layout
- keep tables readable in grayscale printing
- avoid dense decorative backgrounds
- repeat garment name, export revision, and page number in footer
- surface critical warnings early, not only at the end

## Workbook Sheet Definitions

### `Summary`

Columns:
- project_name
- garment_name
- export_id
- spec_revision
- export_template_version
- exported_at
- status
- package_confidence
- unresolved_warning_count
- open_assumption_count
- reviewer_disclaimer

### `POM`

Columns:
- pom_id
- code
- name
- description
- method
- area
- measurement_unit
- sample_value
- tolerance_plus
- tolerance_minus
- confidence_label
- basis
- field_state
- notes

### `BOM`

Columns:
- bom_id
- category
- item_name
- placement
- quantity
- unit
- material_notes
- color_notes
- supplier_notes
- optional
- confidence_label
- basis
- field_state

### `Pattern Pieces`

Columns:
- piece_id
- name
- garment_zone
- piece_type
- quantity
- cut_instruction
- cut_on_fold
- mirrored
- side
- detachable
- reversible_role
- material_ref
- grainline_intent
- fusing_or_support
- shape_notes
- symmetry_notes
- confidence_label
- basis
- field_state

### `Pattern Joins`

Columns:
- join_id
- from_piece_id
- to_piece_id
- relationship
- seam_location
- join_type
- finish_assumption
- sequence_dependency
- risk_flag
- confidence_label
- basis
- notes

### `Construction Steps`

Columns:
- step_id
- step_number
- title
- instruction
- depends_on
- piece_refs
- bom_refs
- operation_tags
- confidence_label
- basis
- field_state

### `Assumptions`

Columns:
- assumption_id
- topic
- statement
- impact
- status
- confidence_label
- basis
- notes

### `Warnings`

Columns:
- warning_id
- category
- severity
- message
- affected_section
- recommended_action
- export_blocking

### `Change Log`

Columns:
- change_type
- changed_at
- actor
- target_section
- summary

For MVP, the `Change Log` may be populated from export metadata plus latest revision/approval events rather than full row-level diff history.

## Warnings And Assumptions

Warnings are part of the export contract, not a side note.

Required warning categories:
- hidden construction
- low visual confidence
- asymmetry
- detachable logic unresolved
- reversible logic unresolved
- mixed material join risk
- sculptural support required
- irregular hem review needed
- grain or nap confirmation required
- fit/volume validation recommended
- missing numeric measurements

Rules:
- warnings should appear in PDF summary, detailed warning section, and workbook `Warnings` sheet
- high-impact assumptions should appear both inline near the affected section and in the dedicated assumptions section
- open assumptions must be labeled `needs maker review` or `accepted for export`
- the export package must never imply production certification

## Versioning Model

Each export should be versioned against:
- `spec_revision`
- `export_template_version`
- `schema_version`

Recommended export identity:
- `export_id`
- `project_id`
- `spec_revision`
- `sequence_number` within the project

Versioning rules:
- multiple exports can exist for the same `spec_revision`
- the latest successful export is the default download
- prior successful exports remain available for audit/history
- when the spec revision changes, old exports remain attached to their original revision and are marked stale for current use

Recommended file naming:
- `{project-slug}--rev-{specRevision}--export-{sequence}.pdf`
- `{project-slug}--rev-{specRevision}--export-{sequence}.xlsx`
- `{project-slug}--rev-{specRevision}--export-{sequence}--pattern-map.png`
- `{project-slug}--rev-{specRevision}--export-{sequence}.zip`

## Worker Implementation

### Architecture Choice

Use a background export worker triggered from the app through the existing queue/workflow system described in the technical architecture.

Recommended MVP implementation:
- Next.js app requests export
- app creates `exports` row with `queued` status
- queue job `export_package` is enqueued with `export_id`, `project_id`, `spec_revision`
- worker loads persisted data, validates readiness, renders files, uploads files, updates `exports` row

### Worker Steps

1. Load export record and verify idempotency key.
2. Load project revision data and required child rows.
3. Run readiness validation.
4. Build a normalized export view model from canonical records.
5. Render visual callout / pattern map sheet.
6. Render HTML templates for PDF sections.
7. Generate PDF via Playwright/Chromium.
8. Generate XLSX workbook via a Node library such as `exceljs`.
9. Write `manifest.json`.
10. Upload files to private storage.
11. Optionally zip the package.
12. Mark export `complete` and store file metadata.

### Implementation Notes

- Prefer one worker job that orchestrates substeps in process for MVP.
- Keep template code versioned in the repo.
- Keep the export view model separate from DB row shapes so templates stay stable.
- Use signed private storage URLs only for download, never public buckets.
- Store last successful file references on the export record.

### Suggested Data Shape For Export Record

Recommended `exports` fields:
- `id`
- `project_id`
- `spec_revision`
- `sequence_number`
- `format_bundle` (`pdf+xlsx+assets`)
- `status` (`queued`, `running`, `failed`, `complete`, `cancelled`)
- `template_version`
- `schema_version`
- `started_at`
- `completed_at`
- `failure_code`
- `failure_message`
- `file_manifest_json`
- `retry_count`

## Failure And Retry Rules

Exports should be safe to retry because they do not create new AI content.

### Failure Classes

1. `validation_failure`
   - missing required data
   - stale revision
   - blocked approval state

2. `render_failure`
   - HTML template crash
   - PDF generation failure
   - diagram renderer failure without fallback success

3. `storage_failure`
   - upload failed
   - checksum mismatch
   - signed URL generation failure

4. `system_failure`
   - worker timeout
   - transient queue/runtime issue

### Retry Policy

- `validation_failure`: do not auto-retry; mark failed with actionable user message
- `render_failure`: auto-retry up to 2 times if transient, then fail
- `storage_failure`: auto-retry up to 3 times with backoff
- `system_failure`: auto-retry up to 3 times with backoff

Backoff recommendation:
- attempt 1: immediate or within 15 seconds
- attempt 2: 1 minute
- attempt 3: 5 minutes

### Idempotency Rules

- one active export job per `export_id`
- dedupe by `project_id + spec_revision + template_version + requested_at_bucket` if needed
- rerunning a job for the same `export_id` should overwrite temporary artifacts but not corrupt prior successful exports

### User-Facing Rules

- failed exports do not consume additional AI credits
- the latest successful prior export remains downloadable while retry is running
- show a clear failure reason and retry action
- if only the visual sheet fails, attempt textual fallback before failing the whole package

## Practical Cost Controls

Keep export cheap by design:

- no AI call during default export path
- HTML/CSS templates instead of third-party enterprise PDF systems
- simple workbook formatting only
- render diagrams from existing structured pattern data
- store files in existing Supabase storage buckets
- reuse the current queue system instead of introducing a dedicated export service in MVP

Expected cost profile:
- mostly worker CPU time, storage, and bandwidth
- small enough that export can be bundled into low credit pricing without margin risk

## Security And Access

- export files are private by default
- downloads use signed URLs with short expiration
- only project/org members can request or download exports
- manifest and metadata should avoid exposing provider secrets or internal prompts
- audit export creation, retry, and download events

## Not Included In MVP

The export system does not include:
- CAD-grade pattern exports such as DXF, AAMA, ASTM, Gerber, Lectra, CLO, or Browzwear
- editable vector pattern drafting with exact geometry
- automatic grading across size ranges
- branded multi-template theming for many customer templates
- multi-language export generation
- redline/comment workflows inside the PDF
- email sending or supplier dispatch automation
- factory API integrations
- OCR ingestion of external tech packs
- live collaborative workbook editing
- guarantee that the package is production-ready without professional review

## MVP Recommendation

Ship the export system as a deterministic packaging worker over approved garment data:

- HTML-to-PDF for the tech pack
- `exceljs` workbook for structured tables
- simple structured pattern-map/callout renderer with text fallback
- private versioned export bundle with manifest
- explicit warnings and assumptions on every package

That keeps the export experience practical, auditable, and cheap while matching the product's core promise: a clear technical bridge from concept to maker review, not a fake CAD pipeline.

## Paths Changed

- `planning/workstreams/11_export_system_plan.md`
