# UX Flow + Screen List: AI Pattern Engineering Platform MVP

## Goal

Define the smallest screen set that can take a user from vague garment concept to a reviewable, exportable technical package without making the product feel like intimidating CAD software.

The experience should feel guided, confidence-aware, and progressive. The system should reveal technical depth in layers, not dump it all at once.

## UX Principles

- Start from the creative input the user already has: AI image, sketch, reference image, or plain-language description.
- Translate complexity into guided review steps.
- Show confidence, assumptions, and unresolved ambiguity clearly.
- Keep Designer Mode readable for inexperienced users.
- Keep Maker/Tailor Mode structured enough for technical review and export.
- Support unusual garments without forcing a rigid symmetric template.

## Navigation Model

Use a single project-based application shell in Next.js with left navigation on desktop and a compact top bar plus section switcher on tablet.

Recommended route structure:
- `/projects`
- `/projects/[id]/create`
- `/projects/[id]/questions`
- `/projects/[id]/designer`
- `/projects/[id]/maker`
- `/projects/[id]/pattern-map`
- `/projects/[id]/export`

Recommended shell behavior:
- Persistent project title and garment status in the top bar.
- Step navigation that shows progress: Create, Questions, Designer, Maker, Pattern Map, Export.
- Users can move backward freely.
- Forward movement should be allowed when the minimum required fields for the next step are satisfied.
- Major edits in Designer Mode should mark downstream technical sections as "Needs refresh" rather than silently overwriting them.

## Core MVP Screens

### 1. Project Home / Project List

Purpose:
Give users a simple place to start a garment project or return to saved drafts.

Must show:
- Project list with garment thumbnail, project name, last updated time, and status.
- Primary CTA to start a new project.
- Empty-state guidance for first-time users.
- Lightweight status labels such as Draft, Questions Pending, Review Ready, Export Ready.

Must do:
- Create a new project.
- Open an existing project.
- Rename or archive a project.

Key states:
- Empty: first project prompt with one clear CTA.
- Populated: sortable list or compact cards.
- Loading: skeleton rows/cards.
- Error: failed project fetch with retry.

### 2. Create Project / Upload Intake

Purpose:
Capture the starting concept with as little friction as possible.

Must show:
- Upload area for image, sketch, or reference.
- Optional text field for concept description.
- Optional fields for garment category, target wearer, and intended use.
- Preview of uploaded assets.
- A short explanation of what the AI will infer next.

Must do:
- Accept image upload and plain-text concept input.
- Allow multiple references for one garment concept in MVP if technically easy; otherwise allow one primary image and optional notes.
- Trigger AI garment interpretation.

Key states:
- Empty: drag-and-drop or browse prompt plus example helper text.
- Uploading: file progress.
- Interpreting: blocking or semi-blocking analysis state with progress messaging.
- Validation error: unsupported file, oversize file, or missing required input.
- AI failure: preserve upload and allow retry.

### 3. Clarifying Questions

Purpose:
Reduce ambiguity before the system generates technical outputs that look more certain than they are.

Must show:
- AI-detected garment summary at the top.
- Grouped questions by area: silhouette and fit, openings and closures, lining and interior, materials, detachable or reversible features, asymmetry, production assumptions.
- Confidence and reason tags on questions when helpful, such as "hidden from image" or "critical for construction."
- Option to answer now, skip, or mark unknown.

Must do:
- Save partial answers.
- Dynamically ask follow-up questions when the garment is unusual or incomplete.
- Highlight required blocking questions before the user can move on.

Key states:
- Initial loading: questions being generated.
- In progress: some answered, some unresolved.
- Sparse-input fallback: if the image is vague, ask more plain-language questions instead of pretending certainty.
- Error: failed question generation with retry and preserved project data.

### 4. Designer Mode

Purpose:
Let inexperienced designers review and refine the garment in accessible language before technical conversion is treated as trustworthy.

Must show:
- Plain-English garment overview.
- Visual reference panel with uploaded image and any AI-derived annotated callouts.
- Editable sections for silhouette, fit intent, materials, trims, color/material blocking, closures, reversible or detachable logic, and special notes.
- Confidence indicators and assumption flags.
- "Needs your decision" callouts for unresolved issues.

Must do:
- Edit the garment interpretation without technical jargon.
- Approve or revise AI assumptions.
- Trigger downstream refresh when user changes key garment structure.

Key states:
- First draft generated.
- Edited but not refreshed downstream.
- High ambiguity warning if essential details remain unresolved.
- Empty subsection fallback if AI could not infer a section.

### 5. Maker / Tailor Mode

Purpose:
Translate the approved garment concept into structured technical information suitable for a tailor, sample maker, or pattern cutter review.

Must show:
- Technical overview of the garment.
- Editable POM table.
- Editable BOM table.
- Construction notes in ordered steps.
- Pattern piece list with quantities, cut instructions, symmetry/asymmetry notes, lining/fusing notes, and inferred elements clearly marked.
- Technical assumption and risk panel.

Must do:
- Support manual edits to technical fields.
- Keep inferred fields visibly labeled.
- Show sections that are ready versus sections needing refresh after Designer Mode changes.

Key states:
- Loading generation state for technical draft.
- Partial generation if one section fails while others succeed.
- No-confidence warning for highly inferred outputs.
- Inline error/retry for individual sections such as POM or BOM.

### 6. Detailed Pattern Map

Purpose:
Give users the clearest possible breakdown of how the garment is composed without pretending to deliver CAD-grade patterns.

Must show:
- Visual or structured map of pattern pieces and relationships.
- Front, back, sleeve, collar, facing, lining, panel, overlay, and detachable component groupings as applicable.
- Connection notes: seam joins, openings, fold intent, grainline intent, mirrored versus unique pieces.
- Complexity warnings for sculptural, exaggerated, asymmetric, reversible, or mixed-material sections.
- Clear distinction between visible evidence and AI inference.

Must do:
- Let the user inspect piece-level logic.
- Support manual notes on specific pieces or joins.
- Feed pattern map data into export.

Key states:
- Standard garment view.
- Complex garment expanded view with more piece groups.
- Incomplete map state when hidden construction cannot be confidently inferred.
- Error state with fallback to textual pattern piece outline.

### 7. Export / Final Review

Purpose:
Help the user confirm readiness, see gaps, and export a clean handoff package.

Must show:
- Readiness checklist with unresolved assumptions and missing fields.
- Export summary covering overview, POM, BOM, construction notes, pattern piece list, and pattern map.
- Export format options: PDF tech pack and spreadsheet-compatible tables.
- Last-generated timestamp and version note.

Must do:
- Block "ready" status only for critical missing items.
- Allow export with warnings for non-blocking uncertainty.
- Generate downloadable assets.

Key states:
- Ready to export.
- Export in progress.
- Export succeeded with file list.
- Export failed with retry and clear reason if available.

## Key Cross-Screen UI States

### Confidence and Assumptions

Every major generated section should support:
- Confidence label: High, Medium, Low.
- Assumption badge for inferred details.
- Unresolved flag for items requiring human confirmation.

These should be visible in Designer Mode, Maker/Tailor Mode, Pattern Map, and Export Review.

### Save and Draft Status

- Auto-save after edits.
- Visible saved/saving/error status in shell.
- Restore the last valid draft when generation fails.

### Refresh Model

When upstream edits affect downstream output:
- Mark dependent sections as stale.
- Offer section-level regenerate actions.
- Never silently replace user-edited technical fields without confirmation.

## Empty, Loading, and Error State Guidance

### Empty

- Use plain-language prompts and one primary action.
- Show example garment types or sample prompts only as supportive hints.
- Avoid dense onboarding copy.

### Loading

- Prefer step-specific skeletons over generic spinners.
- Use honest progress language such as "Interpreting silhouette and visible construction" or "Drafting pattern piece relationships."
- Preserve prior user input on screen while background generation runs where possible.

### Error

- Separate input validation errors from AI/service errors.
- Offer retry in place.
- Preserve uploaded assets, answers, and edits.
- When generation is partial, show usable sections instead of hard-failing the whole screen.

## Tablet-Friendly Notes

Tablet is important because designers and tailors may review garments beside physical references or while moving between desk and workshop.

Guidance:
- Use a two-pane layout only when width allows; otherwise stack content vertically.
- Collapse left navigation into a step switcher or drawer.
- Keep primary actions pinned at the bottom or top-right for thumb reach.
- Tables in Maker/Tailor Mode should support horizontal scroll with sticky row headers where possible.
- Pattern Map should support zoom, pan, and expandable piece groups without relying on hover.
- Avoid requiring drag-heavy interactions for core tasks.

## Next.js Implementation Notes

- Use route-per-screen navigation for clarity, shareability, and recoverability.
- Store project state server-side with draft persistence and section status metadata.
- Model generated sections independently so each can load, error, and regenerate without blocking the rest of the project.
- Keep screen components modular: project shell, step header, state banners, editable section blocks, generation panels, export panel.
- Favor standard form patterns and accessible tables over custom canvas-heavy UI for MVP.
- Treat Pattern Map as structured data first, with optional visual rendering layered on top.

## Suggested MVP Flow Summary

1. User creates a project and uploads an image or sketch plus description.
2. System interprets the garment and generates targeted clarification questions.
3. User answers questions and reviews the plain-language Designer Mode draft.
4. System generates Maker/Tailor Mode technical sections.
5. User reviews the Detailed Pattern Map.
6. User exports the package with warnings or confirmations as needed.

## Paths Changed

- `planning/workstreams/03_ux_flow_screen_list.md`
