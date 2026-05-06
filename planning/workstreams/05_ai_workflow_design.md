# AI Workflow Design

## Workflow Principles

The AI system should be a chain of small, inspectable calls rather than one large generation. Each call should return structured JSON plus human-readable notes, confidence scores, assumptions, and source references back to the uploaded image, sketch, prompt, or user answer.

Default runtime should be Gemini Flash/Lite class models for cheap multimodal analysis and text generation. Stronger multimodal or reasoning models should be used only when confidence is low, the garment is complex, validation fails, or export risk is high.

The product must be honest: it translates a concept into a reviewable technical package, not certified production patterns.

## Model Tier Labels

- `Lite`: cheapest text cleanup, classification, formatting, table normalization, simple validation.
- `Flash`: default multimodal and structured generation tier for image understanding, garment interpretation, questions, and draft technical outputs.
- `Pro`: stronger multimodal or reasoning tier for low-confidence complex garments, contradictory inputs, dense non-standard construction, final risk review, and user-requested escalation.
- `Human`: designer, maker, pattern cutter, or internal reviewer.

## Small Model Calls

| Step | Purpose | Inputs | Outputs | Default Tier | Escalate When |
|---|---|---|---|---|---|
| 1. Intake normalization | Convert upload, prompt, and metadata into a clean project brief. | Images, sketch, references, user description, target garment category if provided. | Normalized brief, image inventory, missing input flags, language/style cleanup. | Lite | Images are low quality, multiple garments are detected, or prompt contradicts image. |
| 2. Image garment detection | Identify garment type, views, visible regions, silhouette, components, closures, trims, material cues. | Normalized brief, images. | Structured visual findings with per-region confidence and visible/inferred labels. | Flash | Asymmetry, layered garments, detachable parts, reversible design, mixed materials, or confidence below threshold. |
| 3. Concept synthesis | Merge image findings and text into a single garment interpretation. | Visual findings, user description, references. | Designer-facing garment summary, style intent, design features, contradiction list. | Flash | Image and text conflict, multiple plausible interpretations exist, or high-complexity score. |
| 4. Complexity and risk scoring | Classify construction difficulty and ambiguity. | Visual findings, concept synthesis. | Complexity score, ambiguity score, risk tags, required clarification topics. | Lite | Risk tags include reversible, detachable, sculptural, asymmetric, oversized engineered shape, leather/shearling, or mixed-material seam joins. |
| 5. Clarifying question generation | Ask only questions that materially improve technical output. | Concept synthesis, risk tags, known/unknown fields. | Grouped questions for design, fit, closure, materials, lining, detachability, reversibility, production intent. | Flash | Questions are vague, too many, or fail coverage validation. |
| 6. Answer assimilation | Merge user answers into canonical garment state. | Prior garment state, answers, edits. | Updated garment schema, resolved assumptions, remaining unknowns. | Lite | Answers contradict earlier approved choices or introduce new complex features. |
| 7. Designer Mode draft | Produce editable plain-language design summary. | Canonical garment state, approved assumptions. | Designer Mode summary, feature list, material/color notes, unresolved ambiguity flags. | Flash | User requests premium wording or summary conflicts with schema. |
| 8. Maker/Tailor technical overview | Convert approved concept into technical handoff language. | Canonical garment state, Designer Mode approval, ambiguity flags. | Maker overview, construction logic, seam/finish assumptions, maker warnings. | Flash | High ambiguity, novel silhouette, or professional-review flags. |
| 9. Pattern piece decomposition | Generate pattern piece list and relationships. | Technical overview, silhouette/components, material/lining/closure data. | Piece names, quantities, cut material, lining/fusing, symmetry, dependencies, inferred status. | Flash | Non-standard geometry, detachable/reversible elements, engineered asymmetry, or validation failures. |
| 10. Detailed pattern map | Explain how pieces connect and where patternmaker judgment is required. | Piece list, technical overview, risk tags. | Textual pattern map, seam relationships, grainline intent, layer/facing logic, hard assumption notes. | Flash | Pattern map omits critical components or claims CAD-grade precision. |
| 11. POM draft | Generate measurement table with editable placeholders. | Garment category, fit intent, size/sample target, components. | POM names, descriptions, sample values/placeholders, tolerance fields, measurement method notes. | Lite/Flash | Exaggerated silhouette, unclear fit intent, or values seem physically inconsistent. |
| 12. BOM draft | Generate bill of materials. | Garment state, material cues, trims, closures, lining/fusing needs. | Shell, contrast, lining, interfacing, trims, hardware, labels, packaging rows. | Lite/Flash | Mixed materials, specialty hardware, reversible garment, or incompatible material joins. |
| 13. Construction sequence | Draft ordered construction notes. | Technical overview, pattern map, BOM, closures, finishing choices. | Numbered assembly sequence, special operations, machine/handwork notes, dependencies. | Flash | Sequence contradicts pattern map or omits detachable/reversible assembly logic. |
| 14. Export assembly | Convert approved sections into PDF and Excel-compatible tables. | Approved Designer/Maker content, POM, BOM, pattern pieces, construction notes. | Export-ready package sections and table payloads. | Lite | Schema validation fails or unresolved high-risk flags remain. |
| 15. Final AI review | Check consistency, uncertainty labeling, and export readiness. | Full package draft, source garment state, validation report. | Readiness score, blocker list, human-review recommendation, export warnings. | Flash, Pro for high risk | Any critical inconsistency, low confidence, or professional-review trigger. |

## Confidence Scoring

Every generated field should include:

- `confidence`: `0.0-1.0`.
- `basis`: `visible`, `user_provided`, `inferred`, or `defaulted`.
- `source_refs`: image id, prompt section, user answer id, or prior approved field.
- `risk`: `low`, `medium`, `high`, or `requires_review`.

Suggested thresholds:

- `>= 0.80`: show as normal editable output.
- `0.60-0.79`: show with assumption label.
- `0.40-0.59`: ask clarification or keep as unresolved.
- `< 0.40`: do not include as technical fact; route to clarification or human review.

Package-level confidence should be a weighted score across garment interpretation, materials, closures, pattern decomposition, POM, BOM, construction sequence, and unresolved ambiguity. Pattern map and construction logic should carry the highest weight because they create the greatest maker risk.

## Validation

Use cheap validators after each major generation step:

- Schema validation: all required fields, enums, ids, units, and table columns are valid.
- Consistency validation: garment category, components, BOM, pattern pieces, POM, and construction notes do not contradict each other.
- Coverage validation: each visible major component has at least one corresponding technical note and pattern/BOM entry when relevant.
- Assumption validation: inferred fields are labeled and not presented as confirmed.
- Non-standard garment validation: asymmetry, detachable parts, reversible logic, exaggerated silhouette, and mixed materials are explicitly represented when detected.
- Export validation: PDF/Excel content uses approved fields only and carries unresolved warnings.

Validation failures should return targeted repair prompts, not regenerate the whole package.

## Cost Controls

- Cache image analysis, normalized briefs, user answers, and approved garment state by project version.
- Route text-only cleanup, schema repair, table formatting, and validators to `Lite`.
- Keep multimodal calls short: use downscaled images plus cropped regions when possible.
- Generate only the next needed section, not the full tech pack at every edit.
- Use deterministic JSON schemas and constrained outputs to reduce retries.
- Batch low-risk table normalization tasks together.
- Escalate to `Pro` only for specific failing steps, never the whole workflow by default.
- Let users request a paid stronger-model review before export for complex garments.

## Retry and Fallback Behavior

- Retry once on malformed JSON with a schema-repair prompt on the same tier.
- Retry once with narrower context when the model ignores instructions or overgenerates.
- Fall back from provider A to provider B on timeout, rate limit, or provider outage using the same schema contract.
- Escalate tier when two cheap attempts fail validation or when confidence remains below threshold after clarification.
- Preserve prior approved fields during retries; repair only failed fields.
- Never silently overwrite user edits with regenerated content.

## Human-Review Triggers

Trigger human review or prominent export warnings when:

- Final package confidence is below `0.75`.
- Pattern map confidence is below `0.70`.
- Any critical closure, seam, lining, detachable, reversible, or support-structure detail remains unresolved.
- The garment uses complex asymmetry, engineered volume, corsetry, boning, specialty leather/shearling, heavy hardware, or mixed-material stress joins.
- The system detects possible physical impossibility or unsafe construction assumptions.
- User requests CAD-grade files, grading, fit guarantee, or production certification.
- Maker/Tailor Mode contains high-impact inferred details that the user has not approved.

## MVP Human-in-the-Loop UX

The MVP should require user approval before moving from interpretation to technical package generation and before export. Unresolved ambiguity should remain visible in both Designer Mode and Maker/Tailor Mode. The user should be able to mark an AI assumption as approved, rejected, or needs maker review.

For professional review, the MVP can provide a clear checklist and export warning. It does not need to provide an internal expert marketplace.

## What Not To Automate In MVP

- CAD-grade production pattern files, DXF/ASTM/Gerber/Lectra/CLO/Browzwear outputs.
- Automatic grading across size ranges.
- Fit guarantee, fabric physics simulation, drape simulation, shrinkage prediction, or wear testing.
- Factory certification or claim that outputs are manufacturing-ready without professional review.
- Automated supplier sourcing, costing, factory matching, or purchase orders.
- Fully automatic technical flats from a single image when back/side views are unknown; use labeled assumptions or structured flat descriptions instead.
- One-click final export with unresolved high-risk ambiguity.
- Automatic override of user edits during regeneration.

## Paths Changed

- `planning/workstreams/05_ai_workflow_design.md`
