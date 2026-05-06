# Sprint 0 Execution Guide

## Plain-English Rule

Serial work defines shared contracts. Parallel work fills in independent surfaces that use those contracts.

For this MVP, the contracts are:

- Next.js route structure
- Supabase schema and RLS model
- `GarmentSpec` TypeScript/Zod schema
- AI job kinds and routing policy
- project/job/export statuses

Once those exist, separate agents or builders can work concurrently without guessing.

## Sprint 0 Serial Path

1. Scaffold Next.js app shell.
2. Add route skeleton for the product flow.
3. Add Supabase migration and storage/auth assumptions.
4. Add `GarmentSpec` schema and AI job types.
5. Verify the app builds and typechecks.

## Sprint 0 Parallel Lanes After Contracts

| Lane | Can Run Concurrently? | Owns | Must Not Touch |
|---|---|---|---|
| Auth / Projects / Uploads | Yes | auth screens, project list, upload intake, Supabase client calls | AI prompts, Pattern Map UI |
| AI Gateway | Yes | model router, prompt schemas, job execution helpers | visual screen layouts |
| Designer Mode UI | Yes | designer route and editable plain-language fields | DB migrations without coordination |
| Maker Mode UI | Yes | POM, BOM, construction section UI | AI provider routing |
| Pattern Map UI | Yes | piece inventory, join table, schematic canvas placeholder | export worker internals |
| Export Worker | Yes | PDF/XLSX generation from saved state | AI generation logic |
| QA / Fixtures | Yes | mock GarmentSpec fixtures and smoke tests | production secrets |

## Codex Workflow For You

Ask Codex for one lane at a time, or explicitly ask it to spawn agents for independent lanes.

Good request:

> Implement the Auth / Projects / Uploads lane. Only edit auth, project, upload, and Supabase client files. Do not change the AI gateway or Pattern Map files.

Good concurrent request:

> Run three workers concurrently: one for Auth / Projects / Uploads, one for AI Gateway placeholders, and one for Pattern Map UI. Give each worker disjoint file ownership.

## Blocking Dependencies

- Do not implement real Gemini calls before the AI gateway interface and schemas are stable.
- Do not build final exports before the `GarmentSpec` and export data shape are stable.
- Do not add billing before credit ledger rules and generation success rules are implemented.
- Do not build CAD-grade pattern export until the MVP proves users trust the Pattern Map workflow.

## First Useful Demo Target

The first demo should use mocked AI data:

Upload placeholder -> generated questions -> Designer Mode draft -> Maker Mode draft -> Pattern Map draft -> PDF/XLSX placeholder export.

This is cheaper and safer than connecting paid models before the workflow is proven.
