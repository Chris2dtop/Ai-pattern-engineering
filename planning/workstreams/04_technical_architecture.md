# Technical Architecture: MVP

## Architecture Decision

Build the MVP as a Next.js web app backed by Supabase, with a small AI gateway, queue-backed background workers, and export workers for PDF/Excel generation. The default architecture should stay inexpensive for an independent builder while preserving clear upgrade paths for higher volume, stricter reliability, and later 3D/CAD capabilities.

The MVP should optimize for:
- Low fixed monthly cost.
- Fast iteration by one builder or a small team.
- Provider-flexible AI routing with Gemini as the default runtime model family.
- Durable project state and resumable jobs.
- Honest failure states, retries, and user-editable outputs.
- Clean separation between MVP technical-package generation and later CAD/3D systems.

## Recommended Stack

### Web App

Default: Next.js App Router with TypeScript.

Use Next.js for upload, project review, Designer Mode, Maker/Tailor Mode, exports, billing screens, and authenticated app UI. Keep server actions/API routes thin and push long-running work to background jobs.

Economical deployment: Vercel Hobby/Pro or Cloudflare Pages plus a small worker service. Start with Vercel if speed of development matters most.

Upgrade when:
- Long-running API route limits become painful.
- Export and AI jobs need more predictable compute.
- The app needs region control or lower infrastructure cost at sustained traffic.

Upgrade target: Fly.io, Render, Railway, or a small container on Google Cloud Run for workers and API services.

### Auth, Database, And Storage

Default: Supabase Auth, Postgres, Row Level Security, and Supabase Storage.

Use Supabase for:
- Email/password and OAuth auth.
- User profiles and organizations.
- Projects, garments, generated sections, clarifications, exports, credits, and audit logs.
- Source image uploads and generated export files.
- Signed URLs for private files.

Store uploaded images and generated exports in Supabase Storage buckets:
- `project-assets` for user uploads and AI-generated reference images.
- `exports` for generated PDFs/XLSX files.

Upgrade when:
- Storage bandwidth or file lifecycle controls exceed Supabase needs.
- Larger media workflows, video, or many generated images become core.

Upgrade target: S3/R2-compatible object storage with lifecycle policies, while keeping Supabase Postgres as system of record.

### AI Gateway And Model Router

Default: internal AI gateway module/service called by jobs, not directly by the browser.

The gateway should normalize requests, model capabilities, costs, retries, and response schemas across providers. Gemini should be the first-choice runtime for multimodal garment analysis and structured generation because cost matters for this product. Keep provider interfaces for OpenAI, Anthropic, and other models available behind feature flags or routing policy.

Routing policy:
- Use Gemini-first for image understanding, garment analysis, clarification questions, and draft technical outputs.
- Use a cheaper text model for formatting, cleanup, and simple transformations.
- Use expensive models only for fallback, retries after validation failure, or user-paid premium regeneration.
- Log model, prompt version, token/image cost estimate, latency, validation status, and fallback reason.

Required gateway behavior:
- JSON-schema or Zod validation for every structured AI response.
- Prompt/version tracking for reproducibility.
- Budget guards per job, per user, and per project.
- Retry with repair prompt before escalating to a more expensive model.
- Store raw AI responses separately from user-facing edited sections for auditability.

Upgrade when:
- Multiple model providers are used frequently.
- Routing decisions need experimentation, model scoring, or cache-aware selection.
- Enterprise customers require provider controls.

Upgrade target: standalone AI gateway service with queue integration, evaluation harness, and per-provider circuit breakers.

## Background Jobs And Queue

Default: start with a managed queue that is easy to operate from Next.js.

Good economical choices:
- Inngest for event-driven jobs with retries and local developer ergonomics.
- Trigger.dev for workflow-style jobs and dashboard visibility.
- Supabase Edge Functions plus scheduled jobs only for very small early prototypes.

Recommended MVP default: Inngest or Trigger.dev, because AI generation and export flows need retries, status visibility, and step-level failure handling.

Job types:
- `analyze_garment`: image/prompt analysis and ambiguity detection.
- `generate_clarifications`: targeted questions grouped by design, fit, materials, closures, lining, production intent, and risk.
- `generate_technical_package`: Designer/Maker sections, POM, BOM, construction notes, pattern piece list, and detailed pattern map.
- `generate_visual_flats`: optional AI-assisted flat descriptions or images, clearly labeled as inferred.
- `export_pdf`: render tech pack PDF from approved project state.
- `export_xlsx`: generate Excel-compatible POM, BOM, pattern pieces, and construction tables.
- `usage_rollup`: reconcile credits, costs, and payment events.

Upgrade when:
- Queue volume grows beyond managed free/low tiers.
- Jobs need strict ordering, custom worker scaling, or high-throughput batch processing.

Upgrade target: Redis/BullMQ, Cloud Tasks/Pub/Sub, or Temporal for complex durable workflows.

## Exports

Default: server-side export worker.

PDF:
- Render a structured tech pack template from stored project data.
- Use Playwright/Chromium HTML-to-PDF or React PDF depending on layout needs.
- Prefer HTML-to-PDF first for speed of iteration and visual control.

Excel:
- Use a Node XLSX library to create separate sheets for POM, BOM, pattern pieces, construction steps, assumptions, and change log.
- Keep tables editable and simple; avoid locked, overdesigned spreadsheets in MVP.

Failure handling:
- Exports should be repeatable from saved project state.
- Failed exports should not consume additional AI credits.
- Keep last successful export available while a new export is regenerating.

Upgrade when:
- Export styling becomes complex.
- Users need branded templates, comments, redlines, or multi-language exports.
- Export jobs become CPU-heavy.

Upgrade target: dedicated export service with template versioning and isolated worker containers.

## Data Model

Core tables:
- `users` and `organizations`
- `projects`
- `project_assets`
- `garment_analyses`
- `clarification_questions`
- `clarification_answers`
- `generated_sections`
- `pattern_pieces`
- `pom_items`
- `bom_items`
- `construction_steps`
- `assumptions`
- `exports`
- `ai_jobs`
- `ai_usage_events`
- `credit_ledger`
- `payment_events`

Important rules:
- Treat AI output as draft data, not final truth.
- Store user edits separately or with revision history so regenerated content does not silently overwrite approved edits.
- Attach confidence and assumption metadata to generated sections.
- Keep prompt/model version references on AI-generated records.
- Use RLS so users can access only their own organization/project data.

## Data Flow

1. User signs in through Supabase Auth.
2. User creates a project and uploads image/sketch/reference assets to Supabase Storage.
3. App creates an `analyze_garment` job and shows queued/running status.
4. Worker fetches signed asset URL, calls AI gateway, validates structured output, stores analysis, assumptions, and confidence labels.
5. Worker creates clarification questions. User answers in Designer Mode.
6. App triggers `generate_technical_package` after required ambiguity is resolved or explicitly accepted.
7. Worker generates editable sections, POM, BOM, construction notes, pattern piece list, and detailed pattern map.
8. User reviews Designer Mode and Maker/Tailor Mode, edits output, and accepts assumptions.
9. User requests PDF/XLSX export.
10. Export worker reads approved project state, renders files, stores them in Supabase Storage, and records export metadata.
11. User downloads via signed URL.

## Failure Handling

AI failures:
- Validate every AI response before saving user-facing records.
- On schema failure, retry with a repair prompt using the same economical model.
- On repeated failure, route to fallback model only if the job budget and user plan allow it.
- If fallback is unavailable, preserve the project and show a clear retry state.

Upload failures:
- Use direct-to-storage uploads where possible.
- Record asset status as `uploading`, `ready`, `failed`, or `deleted`.
- Do not start analysis until assets are confirmed ready.

Job failures:
- Store job status as `queued`, `running`, `needs_input`, `failed`, `cancelled`, or `complete`.
- Make jobs idempotent using project ID, job type, and input revision.
- Allow user retry without duplicating credits when no successful AI output was produced.

Partial generation:
- Save completed sections independently.
- Let users continue editing successful sections even if a later section fails.
- Clearly mark stale sections when source answers or assets change.

Export failures:
- Keep export status visible.
- Preserve prior successful exports.
- Allow retry from the same approved project revision.

Payment failures:
- Use webhook-driven credit ledger updates.
- Never trust client-side payment success alone.
- If webhook processing fails, retry and reconcile from payment provider events.

## Observability

Default:
- Vercel logs or platform logs for app/runtime issues.
- Supabase logs for database and auth.
- Sentry for frontend and backend exceptions.
- Queue dashboard for job status and retries.
- Simple `ai_usage_events` table for cost, latency, model, and validation tracking.

Track:
- Upload-to-analysis time.
- Analysis success/failure rate.
- Clarification completion rate.
- Generation cost per project.
- Fallback model rate.
- Export success/failure rate.
- Credit consumption and refund events.

Upgrade when:
- Debugging AI quality requires systematic evaluation.
- Costs become hard to attribute.
- Users report inconsistent outputs.

Upgrade target: structured tracing with OpenTelemetry, model evaluation datasets, prompt regression tests, and dashboards in PostHog/Metabase/Grafana.

## Payments And Credits

Default: Stripe Checkout, Stripe Customer Portal, and a credit ledger in Postgres.

Use credits because AI and export costs vary by garment complexity. Plans can include monthly credits plus paid top-ups.

Credit rules:
- Charge credits when a generation succeeds and produces saved output.
- Do not charge for upload, editing, viewing, or failed export retries.
- Consider charging a small amount for premium fallback/regeneration if the user explicitly requests it.
- Keep ledger entries immutable: grant, consume, refund, expire, adjust.

MVP pricing architecture:
- Free trial credits.
- Pay-as-you-go top-ups.
- Optional monthly plan after usage patterns are known.

Upgrade when:
- Teams need seats, shared credits, invoices, or enterprise billing.
- Model routing supports premium tiers.

## Deployment

Economical default:
- Next.js app on Vercel.
- Supabase hosted project for Auth/Postgres/Storage.
- Inngest or Trigger.dev for jobs.
- Worker deployed as Vercel functions if job duration fits, otherwise Fly.io/Render/Railway.
- Stripe for payments.
- Sentry for errors.

Keep environments simple:
- `local`
- `preview`
- `production`

Required production basics:
- Separate Supabase projects or schemas for preview and production.
- Environment-specific storage buckets.
- Database migrations in version control.
- RLS policies tested before launch.
- Webhook signature verification for Stripe.
- AI provider keys only on server/worker environments.

Upgrade path:
- Move workers to containers when job duration, memory, or dependency size outgrows serverless.
- Move storage to R2/S3 if file cost or lifecycle policy needs exceed Supabase.
- Add Redis or durable workflow engine if job orchestration becomes complex.
- Add dedicated AI gateway service when provider routing becomes a product capability.

## Security And Privacy

MVP requirements:
- Private projects by default.
- Signed URLs for all private assets and exports.
- RLS on all user/project tables.
- Server-side AI calls only.
- No public exposure of provider keys.
- Basic audit trail for generated output, edits, exports, and credit usage.
- Clear user notice that AI outputs require professional review before production.

Avoid sending unnecessary user/payment data to AI providers. Send only garment context, image references, answers, and relevant project metadata.

## 3D/CAD Future Compatibility

The MVP should not generate production CAD files or perform full 3D simulation. Leave room for later by modeling pattern-related data structurally:
- Pattern pieces have names, quantities, material layer, symmetry, grainline intent, seam relationships, and confidence.
- Pattern maps describe relationships and assumptions without claiming CAD-grade geometry.
- Exports include inferred vs user-confirmed labels.
- Project data can later feed CAD/3D services through a dedicated integration layer.

Future services can add:
- CAD-grade pattern drafting integrations.
- DXF/AAMA/ASTM export.
- CLO/Browzwear/Gerber/Lectra workflows.
- 3D fit simulation and grading.

These should be separate services, not hidden inside the MVP generator.

## MVP Defaults Summary

- App: Next.js App Router on Vercel.
- Auth/database/storage: Supabase.
- AI: Gemini-first internal gateway with provider-flexible adapters.
- Jobs: Inngest or Trigger.dev.
- Exports: server-side HTML-to-PDF plus XLSX worker.
- Observability: Sentry, queue dashboard, Supabase/platform logs, AI usage table.
- Payments: Stripe Checkout, Customer Portal, webhook-backed credit ledger.
- Deployment: Vercel + Supabase + managed queue, with workers moved to containers when needed.

## Paths Changed

- `planning/workstreams/04_technical_architecture.md`
