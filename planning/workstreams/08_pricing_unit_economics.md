# Pricing + Unit Economics

## Goal

Price the MVP so an independent builder can launch with low fixed cost, positive gross margin, and clear spend controls from day one. Keep the runtime stack Gemini-first, use cheap validators by default, and make expensive fallback opt-in or plan-gated.

## Recommended Pricing Posture

- Sell outcomes, not tokens. Users should buy credits that map to project actions.
- Keep base infra lean enough that 2-3 paying customers cover monthly fixed cost.
- Make the default experience cheap to run: Gemini 2.5 Flash for multimodal generation, Gemini 2.5 Flash-Lite for validators/cleanup, Gemini 2.5 Pro only for paid escalation or budget-approved fallback.
- Avoid router markup in the default path. Call Gemini directly first; use OpenRouter only as an optional resilience layer later.

## Official Pricing Inputs

| Category | Recommended MVP choice | Current pricing used for planning |
|---|---|---|
| App hosting | Vercel Pro | $20/mo, with $20 included usage credit. Hobby is for personal, non-commercial use. |
| DB/auth/storage | Supabase Pro | $25/mo base. Includes 100 GB storage, 250 GB egress, 2M Edge Function invocations, 100k MAU, then usage overages. |
| Queue/workflows | Trigger.dev Hobby | $10/mo with $10 monthly usage included. |
| Primary AI | Gemini 2.5 Flash | Standard: $0.30 / 1M input tokens, $2.50 / 1M output tokens. Batch/Flex are half-price. |
| Cheap validators | Gemini 2.5 Flash-Lite | Standard: $0.10 / 1M input tokens, $0.40 / 1M output tokens. Batch/Flex are half-price. |
| Expensive fallback | Gemini 2.5 Pro | Standard: $1.25 / 1M input tokens, $10 / 1M output tokens. |
| One-off payments | Stripe Payments | US cards: 2.9% + $0.30 per successful domestic card charge. |
| Subscriptions | Stripe Billing | 0.7% of Billing volume, on top of payment processing. |
| Optional router | OpenRouter | Pay-as-you-go adds a 5.5% platform fee on credit purchases; provider inference pricing is pass-through. |
| Optional AI observability | Helicone | Hobby free with 10,000 requests and 1 GB storage; Pro $79/mo if needed later. |

## Fixed Monthly Cost Target

Recommended launch baseline:

- Vercel Pro: $20
- Supabase Pro: $25
- Trigger.dev Hobby: $10
- Observability: start with built-in app logs + `ai_usage_events`; keep Helicone optional on free

Estimated fixed monthly baseline: **~$55/mo**

That means one modest subscription plus a couple of credit packs can cover fixed infrastructure.

## Unit Cost Assumptions

Use conservative MVP planning assumptions for one successful standard project:

- 3 uploaded images
- 1 analysis pass
- 1 clarification generation pass
- 1 technical package generation pass
- 1 final consistency review
- 2-4 Lite validator/repair calls
- 1 PDF + 1 XLSX export
- No grounding by default
- Pro fallback used on only ~10% of paid jobs

Working cost model per standard successful project:

| Cost bucket | Planned cost |
|---|---:|
| Gemini 2.5 Flash calls | $0.10-$0.18 |
| Gemini 2.5 Flash-Lite validators/repair | $0.01-$0.03 |
| Weighted Gemini 2.5 Pro fallback reserve | $0.02-$0.12 |
| Export/storage/bandwidth reserve | $0.03-$0.07 |
| Total variable cost per standard paid project | **~$0.16-$0.40** |

Use **$0.50/project** as the planning number for standard paid usage. This leaves room for retries, heavier garments, and minor overages while staying safely conservative.

For a complex garment with stronger fallback or extra regenerations, budget **$1.00-$1.50/project** and make that spend user-visible through premium credits.

## Credit System

Define credits around user actions, not raw model usage:

- `10 credits`: full technical package generation from approved project state
- `3 credits`: targeted regeneration of one section group
- `1 credit`: export bundle (`PDF + XLSX`)
- `6 credits`: premium stronger-model review/regeneration using Pro-tier fallback

Do not charge credits for:

- uploads
- answering clarifications
- editing outputs
- schema-repair retries on the same job
- failed jobs that do not save usable output
- export retries from the same approved revision

Credit behavior:

- Subscription credits roll over up to 1x the monthly allotment.
- Purchased pack credits last 12 months.
- Refund credits automatically when a paid generation hard-fails after retries.

## Recommended MVP Offers

### Free Trial

- **12 free credits**
- Enough for 1 first-pass generation plus 1 export or 1 small regen
- Card not required at first use
- Expires after 14 days

### Subscription Tiers

| Tier | Price | Included credits | Best fit |
|---|---:|---:|---|
| Starter | $19/mo | 35 | Light solo use, roughly 3 projects/month with exports |
| Builder | $49/mo | 110 | Regular use, roughly 9-10 projects/month |
| Studio | $99/mo | 260 | Small studio or power user, roughly 20+ projects/month |

Why these levels:

- Gross margin remains strong even with healthy usage.
- The first paid tier is low enough for a freelancer or indie designer.
- The middle tier should become the default plan if the product proves real value.

### Pay-Per-Pack

| Pack | Price | Credits |
|---|---:|---:|
| Mini pack | $9 | 12 |
| Project pack | $19 | 30 |
| Builder pack | $49 | 90 |

Use packs for users with bursty usage and no interest in a subscription. Packs should always be a little worse value than subscriptions on a per-credit basis.

## Expert Review Future Add-On

Not in MVP, but reserve the pricing lane now:

- **AI Premium Review:** `6 credits` or included only on higher tiers
- **Human Expert Review:** start around **$79-$149 per project** depending on scope, turnaround, and whether markup/redline feedback is included

The human add-on should be positioned as optional professional review of assumptions, construction logic, and production risk, not as a guarantee of factory readiness.

## Cost-Control Rules

- Gemini direct first. Do not put all traffic through a router by default.
- Default multimodal generation to `gemini-2.5-flash`.
- Route formatting, schema repair, consistency checks, and table cleanup to `gemini-2.5-flash-lite`.
- Allow `gemini-2.5-pro` only when:
  - two cheaper attempts fail validation,
  - package confidence stays below threshold,
  - garment complexity is high, and
  - the job still has budget or the user explicitly pays for premium review.
- No search grounding by default; it adds avoidable cost and is not core to garment generation.
- Cache normalized intake, image analysis, and approved garment state by project revision.
- Regenerate only the changed section, never the whole pack, unless the source brief materially changed.
- Put hard budget caps in the gateway:
  - per job: `$1` standard, `$2.50` premium
  - per project: `20 credits` without explicit user confirmation
  - per user per month: tied to plan credits plus purchased packs
- Limit image count and resize assets before multimodal calls.
- Use Gemini Batch/Flex for non-urgent validators and overnight maintenance jobs where latency does not matter.
- Store model, prompt version, tokens, estimated cost, retries, and fallback reason in `ai_usage_events`.

## Economics Check

At the planning rate of **$0.50 variable cost per standard paid project**:

- A `Starter` user consuming all 35 credits still has healthy margin.
- A `Builder` user can be heavy without threatening gross margin.
- Fixed infra of about **$55/mo** is covered by roughly:
  - 1 `Builder` customer, or
  - 3 `Starter` customers, or
  - a few small credit-pack purchases

This is the right shape for an independent builder: low fixed burn, strong software margin, and paid upgrades for expensive edge cases instead of silent subsidy.

## Source URLs

- Gemini Developer API pricing: https://ai.google.dev/gemini-api/docs/pricing
- Vercel pricing: https://vercel.com/pricing
- Supabase billing and quotas: https://supabase.com/docs/guides/platform/billing-on-supabase
- Supabase storage pricing: https://supabase.com/docs/guides/storage/management/pricing
- Supabase egress pricing: https://supabase.com/docs/guides/platform/manage-your-usage/egress
- Trigger.dev pricing: https://trigger.dev/pricing
- Stripe Payments pricing: https://stripe.com/us/pricing
- Stripe Billing pricing: https://stripe.com/us/billing/pricing
- OpenRouter pricing: https://openrouter.ai/pricing
- OpenRouter billing FAQ: https://openrouter.ai/docs/faq
- Helicone pricing: https://www.helicone.ai/pricing

## Paths Changed

- `planning/workstreams/08_pricing_unit_economics.md`
