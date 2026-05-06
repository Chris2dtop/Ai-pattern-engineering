# Detailed Pattern Map Spec: MVP

## Purpose

Pattern Map Mode is the MVP screen and export section that explains how a garment concept breaks into pattern pieces, materials, seam relationships, layers, and construction dependencies.

It is not a production pattern file. It is a structured technical map, with optional editable schematic/vector draft pieces, that helps a designer, tailor, sample maker, or pattern cutter understand what must be drafted, reviewed, sampled, or clarified before production.

For complex Anieze-style garments, Pattern Map Mode must support:
- Asymmetric coats and jackets.
- Detachable sleeves, collars, panels, or overlays.
- Reversible shirts, jackets, and hybrid garments.
- Exaggerated silhouettes, engineered volume, dropped shoulders, oversized bodies, and sculptural shapes.
- Mixed leather, shearling, satin, wool, lining, facing, interfacing, and hardware zones.
- Sculptural collars, irregular hems, split layers, overlays, vents, and non-standard openings.

## MVP Definition

Pattern Map Mode includes three linked outputs:

1. A visual diagram or structured visual layout of pattern piece groups, optionally backed by editable schematic vector shapes.
2. A piece-level inventory with quantities, material assignments, symmetry notes, and confidence.
3. A relationship map that explains what joins to what, in what order, and where human review is required.

The map should be editable, auditable, and confidence-labeled. Every major piece and join should indicate whether it is based on visible image evidence, user-provided answers, or AI inference.

## Included Data

### Piece Inventory

Each pattern piece row must include:
- `piece_id`
- `piece_name`
- `garment_zone`: front, back, sleeve, collar, cuff, facing, lining, pocket, hem, overlay, detachable part, closure, support, or trim
- `cut_quantity`
- `cut_instruction`: cut 1, cut 2, cut pair, cut on fold, cut mirror pair, cut unique left, cut unique right
- `material`: shell, contrast shell, leather, shearling, satin, lining, facing, interfacing, rib, tape, binding, hardware backing, or user-defined
- `visible_side`: outer, inner, reversible side A, reversible side B, hidden support, or unknown
- `symmetry`: mirrored, asymmetric pair, unique left, unique right, centered, modular, or unknown
- `grainline_intent`: straight grain, cross grain, bias, nap direction, fur/shearling direction, leather hide orientation, or review needed
- `fusing_or_support`: none, fusible, canvas, stay tape, shoulder pad, boning/channel, reinforcement patch, unknown
- `confidence_label`: High, Medium, Low, or Review Required
- `basis`: visible, user_provided, inferred, or defaulted
- `notes`

For MVP, dimensions are optional placeholders unless supplied by the user or POM. The map may include editable schematic shapes and approximate proportional outlines, but it must not imply production-certified CAD geometry.

### Cut Quantity Rules

Cut quantity must be explicit because complex garments often break normal symmetry rules.

Examples:
- Standard sleeve: `cut 2 mirrored shell`, plus lining if relevant.
- Asymmetric coat front: `left front cut 1 shell`, `right front cut 1 shell`, not `cut pair`.
- Detachable sleeve: shell, lining, cuff, zipper/placket, and attachment reinforcement are separate pieces.
- Reversible shirt front: side A and side B pieces must be listed separately if materials or seam finishing differ.
- Shearling collar: nap or pile direction must be flagged as review needed when orientation is uncertain.

### Material Assignment

The pattern map must connect each piece to the BOM material logic.

Required behavior:
- Assign shell, contrast, lining, facing, interfacing, and reinforcement materials per piece.
- Label mixed-material joins such as leather-to-satin, shearling-to-wool, or satin-to-lining.
- Flag material stress risks where heavy, rigid, slippery, thick, or pile materials meet.
- Support reversible garments with side A and side B material columns.
- Preserve unknown material assignments as unresolved instead of inventing certainty.

### Seam Relationships

Each join must be represented as a relationship, not buried in prose.

Relationship fields:
- `join_id`
- `from_piece_id`
- `to_piece_id`
- `seam_location`: shoulder, side seam, armhole, sleeve underarm, collar neckline, center front, hem, pocket opening, zipper edge, detachable edge, lining bag-out, overlay edge, or custom
- `join_type`: sewn seam, lapped seam, bound edge, faced edge, bagged lining, topstitched seam, zipper join, snap/button attachment, tab/buckle join, hidden support, or review needed
- `finish_assumption`: overlock, bound, clean-finished, turned, raw edge, leather edge paint, shearling exposed edge, hand tack, topstitch, unknown
- `sequence_dependency`: before lining, after lining, before sleeve insertion, after shell assembly, before reversible closure, final operation, or custom
- `confidence_label`
- `risk_flag`

The UI should allow users to inspect joins from either direction: selecting a piece shows its connected pieces, and selecting a join shows the seam and finish assumptions.

### Construction Order

Pattern Map Mode does not replace full construction notes, but it must expose the assembly logic that makes the pattern relationships understandable.

Minimum order groups:
- Prepare support pieces, fusing, stay tape, reinforcement, and detachable hardware zones.
- Assemble shell body panels.
- Assemble sleeves or detachable modules.
- Assemble collar, lapel, hood, or sculptural neckline.
- Add pockets, overlays, straps, or hardware.
- Join body to sleeves, collar, and major modules.
- Assemble lining, reversible side, or interior layer.
- Close reversible/bagged areas and finish openings.
- Finish hems, edges, closures, and final topstitching.

For complex garments, construction order should explicitly call out dependencies such as "attach zipper tape before closing sleeve lining" or "resolve collar support before neckline seam is finalized."

### Risk Flags

Pattern Map Mode must show risk flags at piece, join, and package level.

Required risk categories:
- `hidden_construction`: important details are not visible from uploaded references.
- `asymmetry`: left/right pieces cannot be mirrored safely.
- `detachable_logic`: attachment method, reinforcement, or closure is unresolved.
- `reversible_logic`: side A/side B construction, clean finishing, or closure compatibility is unresolved.
- `mixed_material_join`: incompatible thickness, stretch, pile, slip, or durability risk.
- `sculptural_support`: collar, shoulder, volume, boning, padding, or internal support requires patternmaker judgment.
- `irregular_hem`: hem shape or finishing cannot be reduced to a standard straight hem.
- `grain_or_nap`: leather, satin sheen, shearling pile, stripe, plaid, or directional fabric needs confirmation.
- `fit_volume`: exaggerated silhouette or engineered volume may need muslin/toile validation.
- `low_visual_confidence`: image angle, pose, occlusion, or styling hides key structure.

Risk flags should include plain-language explanations and recommended human action.

## Visual Diagram Requirements

The MVP diagram should prioritize clarity over drafting precision.

Must show:
- Piece groups arranged by garment zone: front, back, sleeves, collar/neck, lining/facing, detachable modules, trims/hardware.
- Unique left/right pieces for asymmetric garments.
- Material swatches or labels on each piece group.
- Cut quantities on each piece.
- Simple connection lines for major seam relationships.
- Badges for inferred, unresolved, and review-required items.
- Expand/collapse behavior for dense groups such as reversible layers or detachable sleeves.

Should support:
- Front/back/side groupings when available.
- Layer toggles: shell, lining, reversible side A/B, facing/support, detachable modules.
- Zoom and pan on tablet and desktop.
- Text fallback when the visual renderer fails.

Must not show:
- Exact pattern outlines that imply production-ready dimensions unless manually supplied and professionally reviewed.
- Grading nests, seam allowance geometry, notch placement, drill holes, or CAD export controls in MVP.
- Decorative visuals that obscure confidence, material, or join information.

## UI Behavior

### Entry State

The Pattern Map screen appears after Maker/Tailor Mode has generated a technical overview and pattern piece decomposition. If upstream Designer Mode or Maker/Tailor fields are stale, show a "Needs refresh" banner and section-level regenerate actions.

### Layout

Recommended desktop layout:
- Left pane: visual pattern map with layer toggles and zoom controls.
- Right pane: selected piece or join details.
- Bottom or tabbed section: piece inventory table, seam relationships table, construction order, and risk flags.

Recommended tablet layout:
- Stacked visual map and details panel.
- Persistent tabs for Pieces, Joins, Order, Risks.
- No hover-only interactions.

### Editing

Users must be able to:
- Rename pieces.
- Change cut quantity and cut instruction.
- Assign or correct materials.
- Mark pieces as unique left/right, mirrored, or unknown.
- Add manual notes to pieces and joins.
- Approve, reject, or mark AI assumptions as needs maker review.
- Regenerate only the selected section or the whole map after confirmation.

User edits must be preserved during regeneration. Regenerated content should update around locked user-approved fields.

### Confidence Labels

Use the same thresholds as the AI workflow:
- High: `>= 0.80`, visible or user-confirmed, shown as normal editable output.
- Medium: `0.60-0.79`, shown with an assumption badge.
- Low: `0.40-0.59`, shown as unresolved or needing clarification.
- Review Required: `< 0.40` or high-impact inferred technical content, not treated as fact.

Labels should appear on:
- Each piece.
- Each seam relationship.
- Each material assignment.
- Each construction order group.
- Package-level pattern map readiness.

## AI Generation Behavior

Pattern Map generation should be a structured call sequence, not one freeform answer.

Required steps:
1. Use approved garment state, image findings, clarification answers, Maker/Tailor overview, BOM, and construction notes as inputs.
2. Generate piece inventory as structured JSON.
3. Validate coverage: every visible major component must map to at least one piece or unresolved note.
4. Generate seam relationships from the validated piece list.
5. Validate consistency against garment type, BOM, lining, reversibility, detachable logic, and construction notes.
6. Generate construction order groups from the piece and join graph.
7. Generate risk flags and human-review triggers.
8. Generate diagram instructions from structured data.

The model must avoid:
- Claiming exact pattern dimensions from a single fashion image.
- Inventing hidden closures, linings, support structures, or reversible clean finishes as confirmed.
- Collapsing asymmetric pieces into mirrored pairs.
- Treating detachable parts as normal fixed seams.
- Treating leather, shearling, satin, and stretch/woven joins as low-risk by default.

Escalate to a stronger model tier or human-review warning when validation fails twice, pattern map confidence is below `0.70`, or high-risk construction remains unresolved.

## Human-Review Triggers

Pattern Map Mode should require prominent review warnings when:
- Any critical seam, closure, lining, reversible, detachable, or support detail is unresolved.
- The garment contains sculptural collars, engineered volume, corsetry, boning, heavy padding, or unusual shoulder structures.
- Leather, shearling, satin, or mixed-material stress joins affect load-bearing seams.
- Irregular hems, overlays, or asymmetric panels cannot be inferred from available views.
- Back, side, or interior views are missing for a garment whose construction depends on those views.
- The user asks for CAD/DXF, grading, fit guarantee, or production certification.
- The map includes high-impact inferred fields not approved by the user.

Export may proceed with warnings, but the package must clearly state that professional patternmaker review is required.

## Out Of Scope For MVP

Pattern Map Mode does not include:
- Production-certified CAD, DXF, ASTM, Gerber, Lectra, CLO, Browzwear, or editable pattern files.
- Full pattern drafting from measurements.
- Automatic seam allowance, notches, drill holes, grading rules, marker planning, or nesting.
- Full grading across size ranges.
- Fit guarantee, drape simulation, fabric physics, shrinkage prediction, or wear testing.
- Factory certification or claim that the map is ready for production without professional review.
- Automated costing, supplier sourcing, or factory matching.

## Examples

### Asymmetric Shearling Coat

Expected map behavior:
- Separate left front and right front shell pieces.
- Separate shearling collar, undercollar, facing, and support pieces.
- Material assignments for wool/leather shell, shearling collar, lining, and reinforcement.
- Seam relationships for asymmetric front opening, collar-to-neckline, lining bag-out, and irregular hem.
- Risk flags for asymmetry, shearling nap direction, sculptural collar support, and hidden interior construction.

### Detachable Sleeve Jacket

Expected map behavior:
- Sleeve module includes upper sleeve, under sleeve, sleeve lining, cuff, zipper or snap tape, and reinforcement.
- Armhole join is labeled as detachable attachment, not fixed sleeve insertion.
- Construction order calls out attachment hardware before sleeve lining is closed.
- Human review triggers if attachment method or load reinforcement is unknown.

### Reversible Satin Shirt

Expected map behavior:
- Side A and side B body pieces are distinct when materials, finishes, or closures differ.
- Clean-finished edges and closure compatibility are flagged.
- Button/placket, snap, or tie closure assumptions are labeled.
- Construction order includes reversible assembly and final closure opening.

### Exaggerated Irregular-Hem Coat

Expected map behavior:
- Oversized body panels and hem facings are listed separately from standard coat blocks.
- Irregular hem is represented as unique front/back or left/right pieces, not a generic straight hem.
- Fit-volume risk calls for muslin/toile review.
- Diagram shows hem zones and unresolved hidden shaping.

## Export Requirements

The exported PDF should include:
- Visual pattern map or textual fallback.
- Piece inventory table.
- Seam relationship table.
- Material assignment summary.
- Construction order summary.
- Risk flags and unresolved assumptions.
- Human-review recommendation when triggered.

Excel-compatible exports should include separate tabs or tables for:
- Pattern pieces.
- Seam relationships.
- Material assignments.
- Construction order.
- Risk flags.

## Paths Changed

- `planning/workstreams/07_pattern_map_spec.md`
