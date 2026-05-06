# Product Spec Brief: AI Pattern Engineering Platform MVP

## Audience

Primary users are independent fashion designers, inexperienced designers, fashion students, small studios, and emerging brands who can generate or sketch strong fashion concepts but do not yet know how to translate those concepts into technical garment instructions.

Secondary users are tailors, sample makers, pattern cutters, and small manufacturers who receive unclear visual concepts from designers and need structured construction guidance before quoting, sampling, or producing.

Consumers are a later audience. The MVP should be built for designer-to-maker collaboration first.

## Problem

AI image tools can produce compelling fashion imagery, sketches, and silhouettes, but the output is not directly usable by a tailor or manufacturer. Designers still need to explain garment structure, pattern logic, materials, closures, measurements, trims, seams, layers, finishing, and construction order.

This gap is especially painful for complex garments: asymmetric jackets, detachable sleeves, reversible pieces, exaggerated silhouettes, mixed-material garments, shearling/leather/satin combinations, sculptural collars, irregular hems, overlays, and non-standard openings. Without translation, makers must guess, ask many follow-up questions, or reject the concept as too ambiguous.

## Value Proposition

The platform turns a fashion image, sketch, or prompt into a structured technical interpretation that a designer can refine and a maker can understand. It does not claim to replace a professional pattern cutter in the MVP; it helps both sides get from concept to a clear, reviewable technical package faster.

Core promise: upload a garment concept, answer targeted clarification questions, review AI-generated technical breakdowns, and export a maker-ready PDF/Excel package containing the garment analysis, technical flats, POM chart, BOM, construction notes, pattern piece list, detailed pattern map, and handoff assumptions.

## Product Flow

1. Upload: user uploads an AI fashion image, sketch, reference board, or concept prompt.
2. AI interpretation: the system identifies garment type, silhouette, visible components, material cues, construction features, ambiguity, and risk areas.
3. Clarification: the system asks targeted questions about hidden details, size range, fit intent, closures, lining, reversibility, detachable elements, materials, trims, seam preferences, and production context.
4. Designer Mode: the designer reviews and edits the creative and technical interpretation in plain language.
5. Maker/Tailor Mode: the same garment is presented as structured technical instructions, measurements, materials, construction notes, and maker assumptions.
6. Detailed Pattern Map: the system creates a visual and textual map of required pattern pieces, seam relationships, grainline intent, layers, panels, facing/lining logic, and complexity notes.
7. Export: the user exports a PDF tech pack and Excel-compatible tables for POM, BOM, pattern pieces, and construction steps.

## Product Modes

### Designer Mode

Designer Mode is the creative control surface. It should use accessible language and let users refine the AI interpretation without requiring patternmaking expertise.

MVP capabilities:
- Upload and store garment references.
- Show AI garment summary, silhouette, material interpretation, and visible construction features.
- Ask clarification questions grouped by design, fit, materials, closures, lining, detachable/reversible features, and production intent.
- Allow user edits to garment description, style intent, materials, colors, trims, and notes.
- Flag unresolved ambiguities before export.

### Maker/Tailor Mode

Maker/Tailor Mode is the technical handoff surface. It should convert the approved interpretation into structured, practical production guidance.

MVP capabilities:
- Technical garment overview.
- Technical flats generated or described from front/back/side assumptions where possible.
- POM chart with editable measurement names, descriptions, tolerance fields, and sample values or placeholders.
- BOM for shell, contrast materials, lining, interfacing, trims, closures, hardware, labels, and packaging where relevant.
- Construction notes with ordered assembly guidance.
- Pattern piece list with piece names, quantities, cut material, lining/fusing requirements, symmetry notes, and dependency notes.
- Detailed Pattern Map describing how pieces relate, where seams connect, what areas need professional interpretation, and which parts are inferred from the image.
- Exportable PDF and Excel-compatible tables.

## MVP Scope

The MVP should support a single garment project from upload through export. It should prioritize clarity, editability, and honest confidence over automation claims.

Included:
- Image/sketch upload and prompt input.
- AI garment analysis for silhouette, category, components, visible construction, likely materials, closures, trims, and complexity.
- Clarification question engine that reduces ambiguity before technical output.
- Designer Mode and Maker/Tailor Mode views.
- Editable generated sections for garment overview, POM, BOM, construction notes, pattern piece list, and detailed pattern map.
- Technical flats as AI-assisted visual outputs or structured flat descriptions, with clear assumptions.
- Export to PDF tech pack.
- Export or download of Excel-compatible tables for POM, BOM, pattern pieces, and construction steps.
- Confidence labels and assumption flags for generated technical content.
- Project save/load for in-progress garment briefs.
- Gemini-first runtime AI architecture with provider flexibility for cost, quality, latency, and fallback.

## Explicit Non-Scope

The MVP must not promise:
- Full 3D garment simulation.
- Production-certified DXF, ASTM, Gerber, Lectra, CLO, Browzwear, or editable CAD-grade pattern files generated from one image.
- Guaranteed factory-ready patterns without professional review.
- Automatic grading across full size ranges.
- Fabric physics simulation, drape validation, shrinkage prediction, or fit guarantee.
- Automated costing, supplier sourcing, factory matching, or order placement.
- Consumer-facing customization marketplace.
- Multi-garment collection management beyond basic project organization.

3D visualization, CAD-grade editable pattern generation, grading, fit simulation, and direct manufacturing integrations belong on the roadmap after the MVP proves that designers and makers trust the technical interpretation workflow.

## Success Criteria

The MVP is successful when:
- A designer can upload a complex garment image and complete an exportable technical package without prior patternmaking expertise.
- A maker can read the exported PDF/Excel package and understand the garment intent, required pieces, materials, measurements, and construction assumptions well enough to give informed feedback or a sampling quote.
- The clarification flow catches major ambiguity before export instead of burying uncertainty in confident output.
- Generated outputs are editable, auditable, and visibly labeled where inferred.
- At least 70% of pilot users report that the tool reduces back-and-forth between designer and maker.
- At least 60% of pilot makers say the exported package is clearer than the original image/prompt alone.
- Median time from upload to first complete draft tech pack is under 20 minutes for a single garment.

## Assumptions

- Users will accept AI-assisted technical drafts if uncertainty is clearly labeled and editable.
- The highest-value MVP output is not a perfect pattern file; it is a structured technical bridge between creative concept and professional patternmaking.
- Complex garments require interactive clarification, not one-shot generation.
- Runtime product AI should start Gemini-first for cost and multimodal capability, while preserving provider flexibility for routing, fallback, and future model improvements.
- Planning and specification work may use GPT-5.5, but production architecture should not be locked to one model provider.
- Makers will prefer conservative, explicit assumptions over visually impressive but unverifiable outputs.
- Export quality matters: PDF and Excel outputs must be clean enough to share externally.

## Paths Changed

- `planning/workstreams/01_product_spec_brief.md`
