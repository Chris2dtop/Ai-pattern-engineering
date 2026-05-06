# MVP Build Backlog

## Goal

Turn the MVP plan into an implementation-ready first-build backlog for one independent builder. Prioritize the thinnest path from upload to editable technical package to export, while preserving auditability, confidence labeling, and provider-flexible AI orchestration.

## Build Order

### Sprint 0

Focus: establish app skeleton, schema, auth, project lifecycle, storage, queue plumbing, and observability so feature work lands on stable rails.

Priority epics:
- Foundation
- Auth / Projects / Uploads
- Observability
- QA setup

### Sprint 1

Focus: deliver the first end-to-end garment workflow from intake through questions, Designer Mode, Maker/Tailor Mode, Pattern Map, and export.

Priority epics:
- AI Workflow
- Designer Mode
- Maker / Tailor Mode
- Pattern Map
- Exports

### Post-Sprint-1 MVP completion

Finish monetization and operational hardening once the core workflow is usable.

Priority epics:
- Billing / Credits
- Expanded QA
- Deeper observability and cost controls

## Epic 1: Foundation

Acceptance criteria:
- Next.js app shell, route structure, and typed project state are in place.
- Supabase Auth, Postgres, Storage, and RLS are wired for private-by-default projects.
- `GarmentSpec` canonical schema exists in TypeScript/Zod and maps cleanly to DB tables.
- Background job framework is connected and can run idempotent project jobs with status tracking.

Tickets:
- Set up Next.js App Router app shell with project-step navigation for `/projects`, `create`, `questions`, `designer`, `maker`, `pattern-map`, `export`.
- Add shared UI primitives for loading, error, stale, confidence, and assumption states.
- Implement initial Supabase schema and migrations for projects, assets, garment specs, clarifications, generated sections, POM, BOM, construction, pattern pieces, exports, jobs, usage events, and credit ledger.
- Implement RLS policies for user/org-scoped access.
- Add canonical `GarmentSpec` Zod schema plus mappers for normalized child rows.
- Add job status model and queue integration for analysis, clarifications, technical package, pattern map, PDF export, and XLSX export.
- Add environment config, secrets loading, and prompt/model version config scaffolding.

## Epic 2: Auth / Projects / Uploads

Acceptance criteria:
- User can sign up/sign in, create a project, upload garment assets, and reopen saved drafts.
- Upload state is durable and analysis does not start until assets are ready.
- Project list shows thumbnail, status, and last-updated metadata.

Tickets:
- Implement auth screens and protected app shell.
- Build project list with empty, loading, populated, and retry states.
- Build create-project intake screen with image upload, optional concept text, and lightweight garment metadata.
- Implement direct-to-storage uploads with file validation, upload progress, and asset status.
- Persist project draft metadata and initialize first `GarmentSpec` revision.
- Trigger `analyze_garment` job after valid intake submission.

## Epic 3: AI Workflow

Acceptance criteria:
- AI calls run through one server-side gateway with schema validation, retries, and model logging.
- Garment analysis, clarification generation, answer assimilation, and technical generation are split into inspectable steps.
- Failed or partial generations preserve user work and can be retried safely.

Tickets:
- Build AI gateway abstraction with Gemini-first routing and provider adapter interface.
- Add prompt templates and structured response schemas for intake normalization, garment analysis, complexity scoring, clarifications, Designer summary, Maker overview, POM, BOM, construction, pattern pieces, and pattern relationships.
- Implement validation pipeline for schema, consistency, and assumption labeling.
- Implement retry/repair flow for malformed or incomplete structured output.
- Store raw AI responses, prompt versions, model metadata, and usage events separately from editable user-facing sections.
- Add stale-section logic so upstream edits mark downstream sections `Needs refresh` instead of overwriting content.

## Epic 4: Designer Mode

Acceptance criteria:
- User can review plain-language garment interpretation, answer/open unresolved flags, and edit core design intent.
- Major changes mark dependent technical sections stale.
- Confidence and assumptions are visible at section/field level.

Tickets:
- Build clarification questions screen with grouped questions, required blockers, skip/unknown states, and autosave.
- Implement answer assimilation into canonical garment state.
- Build Designer Mode screen with editable summary, silhouette, materials, trims, closures, reversible/detachable logic, and notes.
- Add visual reference panel with uploaded asset preview and AI summary context.
- Add section-level approve/revise interactions for assumptions.

## Epic 5: Maker / Tailor Mode

Acceptance criteria:
- System generates editable technical overview, POM, BOM, construction steps, and technical warnings from approved garment state.
- User edits persist across refreshes and stale states are visible.
- Inferred and low-confidence content is clearly labeled.

Tickets:
- Build Maker/Tailor Mode layout with technical overview, warnings, and readiness indicators.
- Implement editable POM table with blank-safe numeric placeholders, tolerances, and methods.
- Implement editable BOM table with shell, contrast, lining, facing, interfacing, trim, closure, hardware, label, and packaging categories.
- Implement editable construction steps with ordering and dependency support.
- Add section-level regenerate actions for overview, POM, BOM, and construction notes.

## Epic 6: Pattern Map

Acceptance criteria:
- System generates piece inventory, join relationships, construction order groups, and risk flags from approved technical data.
- Users can inspect and edit pieces and joins without implying CAD precision.
- Export consumes the same structured pattern map data.

Tickets:
- Implement pattern piece decomposition pipeline and storage tables.
- Build Pattern Map screen with piece inventory, relationship table, risk flags, and textual/structured map view.
- Add edit support for piece names, cut quantity/instruction, material assignment, symmetry, notes, and join notes.
- Add confidence, basis, and review-required labels on pieces and joins.
- Implement fallback textual map when richer visual rendering is unavailable.

## Epic 7: Exports

Acceptance criteria:
- User can export a PDF tech pack and spreadsheet-compatible tables from saved approved state.
- Export review shows blockers, warnings, and last-generated status.
- Failed exports do not erase prior successful files or consume AI credits.

Tickets:
- Build export review screen with readiness checklist and unresolved assumption summary.
- Implement HTML-to-PDF tech pack export covering overview, clarifications summary, Designer/Maker content, POM, BOM, construction, pattern map, and warnings.
- Implement XLSX export with sheets for POM, BOM, pattern pieces, joins, construction steps, assumptions, and change log.
- Persist export metadata, signed download URLs, and retry states.

## Epic 8: Billing / Credits

Acceptance criteria:
- Credits are tracked in an immutable ledger and only consumed on successful AI generation.
- Stripe checkout and webhook reconciliation are wired for trial credits and top-ups.
- Failed exports and failed AI generations do not bill users.

Tickets:
- Implement credit ledger schema and usage event linkage.
- Add Stripe checkout, customer portal, webhook verification, and payment event storage.
- Apply credit consumption rules to successful analysis/generation jobs.
- Add refund/reconciliation handling for failed billed operations.
- Build minimal billing screen with balance, recent usage, and top-up actions.

## Epic 9: Observability

Acceptance criteria:
- Core app, worker, and export failures are traceable by project/job.
- Builder can inspect AI cost, latency, validation failures, and fallback rate.
- Frontend and backend exceptions are captured in one place.

Tickets:
- Add Sentry to app and worker surfaces.
- Add structured logs for job lifecycle, AI calls, validation failures, export runs, and Stripe webhooks.
- Record `ai_usage_events` with model, prompt version, latency, cost estimate, and validation outcome.
- Add simple internal admin or SQL-friendly dashboard queries for job health, export success, and credit usage.

## Epic 10: QA

Acceptance criteria:
- Core upload-to-export flow is covered by automated smoke tests and manual acceptance scripts.
- Schema validation, section stale behavior, and export generation have regression coverage.
- Complex garment edge cases are represented in seed fixtures.

Tickets:
- Add seeded fixture projects for standard, asymmetric, detachable, reversible, and mixed-material garments.
- Add unit tests for `GarmentSpec` schemas, mappers, validators, and stale-section rules.
- Add integration tests for auth, project creation, upload, question flow, generation states, and export requests.
- Add export snapshot checks for PDF/XLSX structure.
- Write manual QA checklist for tablet review, partial AI failure, retry behavior, and confidence labeling.

## Suggested Sprint Cutline

### Must ship in Sprint 0
- App shell, routes, auth, project CRUD, upload/storage flow
- DB schema + RLS
- Canonical schema + queue/job plumbing
- Logging/Sentry baseline

### Must ship in Sprint 1
- Garment analysis
- Clarification flow
- Designer Mode
- Maker/Tailor Mode core sections
- Pattern Map structured output
- PDF/XLSX export

### Can land after first usable build
- Billing UI polish and paid top-ups
- Premium fallback model routing
- Richer Pattern Map visualization
- Advanced analytics dashboards

## Notes For Independent Builder

- Optimize for section-level generation and regeneration, not one-shot full-package generation.
- Preserve user edits everywhere; never let regeneration silently replace approved content.
- Treat confidence, assumptions, and stale-state handling as MVP features, not polish.
- Prefer functional exports and trustworthy warnings over visually ambitious rendering.

## Paths Changed

- `planning/workstreams/10_mvp_build_backlog.md`
