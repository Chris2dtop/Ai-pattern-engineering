# Figma Wireframe Plan: AI Pattern Engineering Platform MVP

## Goal

Create a Figma-ready wireframe brief for the smallest useful MVP screen set so the team can validate layout, flow, and content hierarchy before spending time on high-fidelity design.

This plan recommends a light Figma pass first, followed quickly by a code prototype in the app shell. The product's risk is in workflow clarity, editability, and confidence signaling, not visual polish.

## Recommended Design Approach

### Figma Scope

Use Figma for:
- low-fidelity frames for 6 core MVP screens
- shared layout blocks and a small component set
- content hierarchy, status states, and responsive behavior notes
- annotations for confidence, assumptions, and refresh states

Do not spend early cycles on:
- polished visual branding
- pixel-perfect tables
- advanced illustration
- complex prototype branching
- detailed design token work beyond basic spacing/type guidance

### Why "Light Figma First + Code Prototype"

- The product already has a clear route model and screen list.
- The biggest UX questions are around review flow, ambiguity handling, and section refresh behavior.
- Maker-mode tables and pattern-map interactions will be easier to validate in code than in a heavy Figma prototype.
- A simple wireframe file plus working UI will be more economical than investing in medium/high-fidelity comps before user feedback.

## Wireframe File Recommendation

Suggested Figma pages:
- `00_Readme`
- `01_Flows`
- `02_Wireframes_MVP`
- `03_Components_Light`

Suggested frame widths:
- Desktop working frame: `1440 px`
- Tablet working frame: `1024 px`

Use grayscale wireframes with one accent color reserved for system state markers:
- confidence
- assumptions
- stale/needs refresh
- blocking issues

## MVP Screen Set

Recommend wireframing 6 screens:
1. Project List
2. Create Project / Upload Intake
3. Clarifying Questions
4. Designer Mode
5. Maker / Tailor Mode
6. Export Review

Detailed Pattern Map should be treated as a Maker-mode expansion for the first wireframe pass, not a fully separate high-investment screen. If the team wants a seventh frame, add Pattern Map as a dedicated follow-up frame after the six above are reviewed.

## Shared App Shell

All core frames should reuse one shell pattern.

### Shell Frame Structure

- top bar with project name, garment status, save state, and primary action
- left navigation on desktop with steps:
  - Create
  - Questions
  - Designer
  - Maker
  - Export
- main content area with max-width content bands
- right-side contextual panel only where needed for confidence, assumptions, or reference image

### Global Components

- top bar
- step nav
- status badge
- confidence badge
- assumption badge
- unresolved flag
- stale/needs refresh banner
- section card
- editable text block
- table block
- reference image panel
- inline regenerate action
- primary/secondary buttons
- empty/loading/error state blocks

## Screen Briefs

## 1. Project List

### Frame Purpose

Help users start or resume a garment project with minimal friction.

### Key Frame Areas

- top bar with page title and new project CTA
- project list area with thumbnail, name, status, updated time
- empty state variant

### Content Priority

1. New project action
2. Existing project list
3. Status visibility
4. Lightweight archive/rename controls

### Primary Components

- page header
- project row/card
- status badge
- search/sort control
- empty state block

### Confidence and Assumption Treatment

This screen does not need garment-level confidence badges. It should only surface project workflow status such as `Questions Pending` or `Export Ready`.

### Tablet Notes

- collapse left nav into a top step switcher or drawer
- switch to a single-column project list
- keep `New Project` pinned at top right or as a full-width action row

## 2. Create Project / Upload Intake

### Frame Purpose

Collect the creative input and set user expectations for AI interpretation.

### Key Frame Areas

- upload zone for image or sketch
- optional concept text field
- optional metadata fields: garment category, wearer, intended use
- asset preview panel
- bottom action area to start interpretation

### Content Priority

1. Upload input
2. Concept description
3. Asset preview
4. AI expectation note
5. Interpret action

### Primary Components

- upload dropzone
- multiline text input
- compact select fields
- image preview tile
- helper text block
- loading/progress state

### Confidence and Assumption Treatment

Use a short note that the system will infer visible garment structure and then ask targeted clarifying questions. Avoid confidence badges here; the system has not generated enough evidence yet.

### Tablet Notes

- stack upload and preview vertically
- maintain a large tap target for upload
- place the primary CTA in a sticky footer when the keyboard is open

## 3. Clarifying Questions

### Frame Purpose

Reduce ambiguity before the technical draft gains authority.

### Key Frame Areas

- garment summary banner at top
- grouped question blocks
- progress summary
- unresolved count
- forward navigation area

### Content Priority

1. Blocking questions
2. Grouped question list
3. Why this matters / confidence reason
4. Progress and save state

### Primary Components

- summary banner
- accordion question groups
- radio/choice controls
- `Unknown` option
- confidence badge
- assumption reason chip
- blocking label
- continue action

### Confidence and Assumption Treatment

This is the first screen where evidence labeling should be visible.

Recommended badge system:
- `High Confidence` for visible garment details
- `Medium Confidence` for likely but unconfirmed interpretation
- `Low Confidence` for hidden or ambiguous construction
- `Assumption` for inferred details the user has not approved
- `Needs Decision` for blocking items

### Tablet Notes

- use stacked question cards instead of wide multi-column groups
- keep section progress visible in a compact sticky header
- avoid hover-only explanation patterns; use inline helper text or tap-to-expand notes

## 4. Designer Mode

### Frame Purpose

Let users refine the garment in plain language before downstream technical output is trusted.

### Key Frame Areas

- garment overview editor
- reference image panel with callouts
- editable sections:
  - silhouette and fit
  - materials
  - trims and closures
  - color/material blocking
  - detachable/reversible logic
  - notes
- unresolved issues panel

### Content Priority

1. Plain-language garment summary
2. Visible reference image
3. Needed decisions
4. Core editable sections
5. Regenerate downstream warning when structure changes

### Primary Components

- editable section card
- reference panel
- confidence badge
- assumption badge
- decision callout
- stale banner
- inline save status

### Confidence and Assumption Treatment

Every generated subsection should display:
- confidence badge at section header
- assumption badges inline beside inferred statements
- `Needs refresh` banner when upstream edits invalidate downstream sections

Recommended visual hierarchy:
- confidence appears beside section title
- assumptions appear inline at sentence or field level
- stale state appears as a full-width section banner

### Tablet Notes

- convert two-pane layout into stacked reference-then-editor layout
- keep the image panel collapsible but easy to reopen
- avoid tiny side annotations; use numbered callout chips below the image

## 5. Maker / Tailor Mode

### Frame Purpose

Translate the approved concept into structured technical guidance for review and export.

### Key Frame Areas

- technical overview
- POM table
- BOM table
- construction notes
- pattern piece list
- technical risks and assumptions panel

### Content Priority

1. Technical overview
2. Risk and assumption visibility
3. Pattern piece list
4. POM/BOM tables
5. Construction sequence

### Primary Components

- technical section card
- editable table
- ordered note list
- risk panel
- confidence badge
- assumption badge
- stale/refresh control
- per-section retry state

### Confidence and Assumption Treatment

This screen needs the strongest confidence language in the product.

Recommended pattern:
- section-level confidence in each major block
- row-level assumption badge in tables when values are inferred
- warning panel for hidden construction or non-visible interior logic
- clear `User Edited` marker once a generated field has been manually changed

### Tablet Notes

- tables should scroll horizontally with sticky first column
- keep section actions visible above each table, not hidden far right
- pattern piece list may collapse into cards on tablet if a wide table becomes unreadable

## 6. Export Review

### Frame Purpose

Show readiness, gaps, and export options without hiding uncertainty.

### Key Frame Areas

- readiness checklist
- unresolved assumptions summary
- export package preview
- export format actions
- version/timestamp block

### Content Priority

1. Ready vs not-ready status
2. Critical blockers
3. Non-blocking warnings
4. Export actions
5. Package contents summary

### Primary Components

- checklist block
- blocker/warning list
- export summary card
- file format buttons
- timestamp/version row

### Confidence and Assumption Treatment

This screen should aggregate uncertainty instead of re-explaining every field.

Recommended summary modules:
- `Critical Missing`
- `Assumptions Included in Export`
- `Low Confidence Sections`
- `Last Refreshed`

### Tablet Notes

- stack checklist above export summary
- use full-width export buttons
- keep warnings near the top so users do not scroll past risk before exporting

## Optional 7th Frame: Pattern Map Expansion

If the team wants one extra frame after the first pass, add a dedicated Pattern Map view derived from Maker Mode.

### Include

- pattern piece grouping panel
- structured relationship map
- evidence vs inference legend
- piece detail drawer
- complexity warning panel

### Keep It Light

Do not attempt a dense CAD-like canvas in the wireframe stage. Use structured zones and expandable piece groups first.

## Component Guidance for Figma

### Minimal Component Set

Build only the components needed to keep frames consistent:
- buttons
- text inputs
- textarea
- select
- badge set
- section card
- table shell
- question row
- checklist row
- banner states

### Component Variants

Useful variants:
- badge: confidence / assumption / blocking / stale / ready
- banner: info / warning / error / refresh needed
- section card: default / loading / error / stale
- table row: default / inferred / user edited / error

## Badge and Annotation System

Use a small, consistent badge system in wireframes so engineering can map it directly into code.

### Confidence Badges

- `High`
- `Medium`
- `Low`

### Assumption Badges

- `Inferred`
- `Needs Decision`
- `User Confirmed`

### Workflow Badges

- `Needs Refresh`
- `Ready`
- `Partial`

Add short annotation notes in Figma only where logic is not obvious. Keep annotation text outside the main frame when possible.

## Layout and Spacing Notes

- prefer full-width content bands over decorative cards
- use cards only for editable sections, tables, and focused panels
- keep page content in a constrained center column with optional secondary side panel
- use stable widths for tables, step navigation, and action rows
- prioritize scanability over visual density

Suggested low-fi spacing baseline:
- 8 px grid
- section spacing: 24-32 px
- card padding: 16-20 px
- table row height sized for editing, not compact read-only display

## Tablet-Responsive Guidance

Tablet behavior should be noted directly beside each frame in Figma.

Global tablet rules:
- left nav becomes drawer or segmented step switcher
- two-column layouts collapse to one column unless a reference panel is essential
- action bars remain pinned or repeated near section ends
- no hover dependency for help, state, or affordance
- wide technical tables need scroll, collapse, or card fallback

## Design Constraints

- keep the experience operational and work-focused, not editorial or marketing-like
- avoid polished fashion-brand aesthetics at the wireframe stage
- do not imply CAD-grade precision where the MVP only provides structured guidance
- uncertainty must always be more visible than decorative styling
- avoid oversized hero layouts, floating section cards, and ornamental UI
- optimize for long-form review and editing, not one-screen novelty
- structure every screen so it can map cleanly into route-based Next.js implementation

## Open Assumptions to Mark in Figma

Tag these with annotation callouts so the team can validate them in code:
- whether Pattern Map is a separate route in MVP v1 UI or a Maker-mode subview
- whether multi-image upload is supported in the first build
- how much of the technical flat is visual versus textual in MVP
- whether POM and BOM editing happens inline or in modal/detail row editing
- whether export readiness blocks only critical missing fields or also low-confidence sections

## Handoff to Code Prototype

After the light Figma pass, the next implementation step should be:
1. build the shared shell
2. build the 6 route-level screen skeletons
3. implement state banners, badges, and editable section blocks
4. prototype Maker-mode tables and refresh flows in code
5. validate tablet behavior in-browser rather than deepening the Figma prototype

## Deliverable Definition

This wireframe brief is complete when:
- 6 MVP frames exist in low fidelity
- each frame shows content hierarchy and primary actions
- confidence, assumption, and stale states are represented consistently
- tablet behavior is annotated
- engineering can map each frame directly to an app route and component set

## Paths Changed

- `planning/workstreams/09_figma_wireframe_plan.md`
