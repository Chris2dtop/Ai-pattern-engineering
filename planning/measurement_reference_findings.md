# Measurement and Tech-Pack Reference Findings

## Sources Reviewed

- `G:\My Drive\Afro Districts\Clothing Designs\Fashion Design Books and Tutorials\Techpacks, Guides And Accessories\Apparel and Accessories How to Measure Guide.pdf`
- `G:\My Drive\Afro Districts\Clothing Designs\Fashion Design Books and Tutorials\Techpacks, Guides And Accessories\Apparel Tech Packs`

The Apparel Tech Packs folder contains 115 relevant files: 111 `.xls` workbooks, 1 `.xlsx` workbook, and 3 PDFs. The templates/samples cover mens, missy/junior, plus size, childrens, costing, line sheets, button sizing, and fraction-decimal conversion.

## Product Lessons

The platform should not treat measurements as a generic AI text section. It needs a structured measurement/POM system:

- Category-aware POM libraries for jackets, outerwear, shirts, pants, dresses, skirts, knits, bodysuits, childrenswear, plus size, and accessories.
- Measurement methods attached to each POM, not only names and values.
- Sample spec, first-fit, approved spec, and grade data as separate concepts.
- Size-run/grade tables that can differ by audience: mens alpha sizing, mens waist sizing, missy/junior alpha/numeric, plus alpha/numeric, childrens age ranges.
- Fit comments and pre-production comments as first-class sections.
- Utility references for buttons, fractions/decimals, inches/mm, and hardware measurements.

## Tech-Pack Workbook Pattern

Representative workbooks use a repeated structure:

- `SPEC`: style metadata, sample request form, POM rows, sample size, first fit, approved spec, sketch area.
- `DETAILS`: detailed technical sketch and trims/hardware/color information.
- `GRADE` or `GRADE A` / `GRADE B`: grading increments calculated from the approved spec.

This supports a product architecture where the app stores:

- the base sample spec;
- fit/sample measurements;
- approved measurements;
- generated grade rules;
- export-specific views.

## Measurement Guide Categories

The how-to-measure guide includes category-specific POM methods for:

- Knit tops and sweaters
- Woven sport shirts and dress shirts
- Bottoms
- Dress clothing jackets and sportcoats
- Vests
- Outerwear
- Swim
- Underwear
- Robes
- Socks
- Ties
- Belts

For this product, jackets/outerwear should be the first robust category because it overlaps strongly with Anieze-style garments.

## Jacket and Outerwear MVP POM Concepts

Default jacket/outerwear POMs should include:

- chest below armhole;
- across shoulder;
- across front/back from HPS;
- body length from HPS or CBN;
- waist and sweep;
- shoulder slope/drop;
- sleeve length from CBN;
- armhole curved or straight;
- bicep/upper arm;
- sleeve opening;
- collar height/length;
- pocket placement and pocket dimensions;
- lapel measurements when relevant;
- vent length when relevant;
- hood measurements when relevant;
- detachable-module measurements for experimental garments.

For non-standard garments, the app must add custom POMs such as:

- detachable sleeve seam circumference;
- sleeve flap width;
- zipper length;
- asymmetric front extension length;
- irregular hem drop;
- leather panel placement;
- modular overlap depth;
- reversible layer opening measurement.

## Measurement UX Implications

The MVP should add a future “How to Measure” helper pattern:

- Each POM row can open a method drawer.
- The method drawer explains where to start, where to end, and whether to measure straight, along a seam, around a circumference, relaxed, or extended.
- Unknown measurements can remain blank with placeholders and review warnings.
- The app should label whether a POM is standard, category-derived, custom AI-added, or user-added.
- The app should avoid fake precision for AI-generated measurements. If no reliable base measurement exists, generate the POM row and method, but leave the value blank or marked for review.

## Schema/Build Implications

Add these fields to POM-related data:

- `method`: human-readable measurement method.
- `sourceCategory`: garment category source such as `outerwear`, `pants`, `knits`.
- `isCritical`: whether missing value blocks reliable export.
- `basis`: standard library, user-provided, inferred, defaulted, or custom.
- `gradeRuleId`: optional link to grading behavior.
- `sourceReference`: optional reference to a measurement guide/template source.

## Immediate MVP Recommendation

Use the reference library to improve Sprint 1B and Sprint 1C:

1. Add a category POM seed library for outerwear/jackets.
2. Let the mock Maker Mode show a measurement method column.
3. In the AI workflow, make Gemini select from the POM library first, then add custom POMs only for experimental features.
4. Defer automated grading until the base spec and approved spec workflow is stable.
