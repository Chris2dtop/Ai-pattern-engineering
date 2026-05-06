export const demoProject = {
  id: "demo",
  name: "Asymmetric detachable jacket",
  status: "Mock demo",
  updated: "Sprint 1A",
  category: "Outerwear jacket",
  fit: "Oversized, dropped shoulder, engineered asymmetry",
  targetSize: "Sample size M",
  fabric: "Black wool body, dark leather panels, satin lining",
  description:
    "Oversized asymmetric street-lux jacket with a curved front seam, detachable lower sleeve section, hidden zipper under a sleeve flap, sculptural collar, irregular hem, satin lining, and mixed wool/leather shell.",
};

export const uploadedAssets = [
  {
    id: "front",
    label: "Primary concept image",
    view: "Front view",
    status: "Ready",
  },
  {
    id: "back",
    label: "Back reference",
    view: "Back view requested",
    status: "Missing",
  },
  {
    id: "detail",
    label: "Sleeve detail",
    view: "Detail view inferred",
    status: "Needs confirmation",
  },
];

export const clarificationQuestions = [
  {
    id: "q1",
    group: "Detachable sleeve",
    question:
      "Should the lower sleeve detach with a hidden zipper, visible zipper, snaps, or a decorative flap only?",
    recommendation: "Hidden zipper under sleeve flap",
    required: true,
  },
  {
    id: "q2",
    group: "Asymmetry",
    question:
      "Should the left and right front bodies be drafted as unique pieces rather than mirrored pieces?",
    recommendation: "Yes, unique left and right fronts",
    required: true,
  },
  {
    id: "q3",
    group: "Lining",
    question: "Should the satin lining be full body and sleeve lining?",
    recommendation: "Full lining with separate sleeve lining",
    required: false,
  },
  {
    id: "q4",
    group: "Materials",
    question:
      "Should the leather panels be structural/load-bearing or decorative overlays?",
    recommendation: "Decorative overlays with reinforced seam joins",
    required: true,
  },
];

export const designerDraft = {
  summary:
    "An oversized asymmetric jacket with a black wool shell, dark leather paneling, detachable sleeve module, hidden sleeve zipper, curved front seam, irregular hem, sculptural collar, and satin lining.",
  silhouette:
    "Relaxed body volume with dropped shoulders, wide sleeves, extended asymmetric front, and a slightly longer back hem.",
  materials:
    "Main shell in black wool. Contrast panels in dark leather. Interior lining in black satin. Reinforcement at detachable sleeve seam and leather-to-wool joins.",
  specialFeatures:
    "Detachable lower sleeve, hidden zipper under flap, curved front seam, irregular hem, sculptural collar, asymmetric left/right front pattern logic.",
};

export const pomRows = [
  ["JKT-001", "Chest circumference", "48 in", "+/- 0.5 in"],
  ["JKT-002", "Across shoulder", "22 in", "+/- 0.375 in"],
  ["JKT-003", "Front body length from HSP", "27 in", "+/- 0.5 in"],
  ["JKT-004", "Back body length from HSP", "28 in", "+/- 0.5 in"],
  ["JKT-005", "Sleeve length from HSP", "34 in", "+/- 0.5 in"],
  ["JKT-006", "Detachable sleeve seam circumference", "15 in", "+/- 0.25 in"],
  ["JKT-007", "Sleeve flap width", "1.25 in", "+/- 0.125 in"],
  ["JKT-008", "Asymmetric front extension length", "4 in", "Review"],
];

export const bomRows = [
  ["Shell", "Black wool coating", "Body shell", "TBD"],
  ["Contrast", "Dark leather", "Front/sleeve panels", "Review thickness"],
  ["Lining", "Black satin lining", "Body and sleeve lining", "Full lining"],
  ["Closure", "Hidden zipper", "Detachable sleeve seam", "Needs spec"],
  ["Support", "Reinforcement tape/patch", "Detachable seam and leather joins", "Required"],
];

export const constructionSteps = [
  "Confirm asymmetric front body shape and curved seam placement before drafting.",
  "Prepare leather panels and reinforce leather-to-wool join areas.",
  "Assemble shell body panels, keeping left and right fronts separate.",
  "Construct upper and lower sleeve modules before inserting detachable closure.",
  "Install hidden zipper under sleeve flap before closing sleeve lining.",
  "Assemble satin lining separately, then bag lining into shell.",
  "Finish irregular hem and topstitch visible panel seams as approved.",
];

export const patternPieces = [
  {
    id: "front-left",
    name: "Left front body",
    material: "Black wool shell",
    cut: "Cut 1 unique left",
    confidence: "High",
    risk: "Asymmetry",
  },
  {
    id: "front-right",
    name: "Right front body",
    material: "Black wool shell",
    cut: "Cut 1 unique right",
    confidence: "High",
    risk: "Asymmetry",
  },
  {
    id: "back",
    name: "Back body",
    material: "Black wool shell",
    cut: "Cut 1 on fold or cut pair after review",
    confidence: "Medium",
    risk: "Back view missing",
  },
  {
    id: "upper-sleeve",
    name: "Upper sleeve",
    material: "Wool shell with leather panel",
    cut: "Cut mirrored pair",
    confidence: "Medium",
    risk: "Mixed material join",
  },
  {
    id: "lower-sleeve",
    name: "Detachable lower sleeve",
    material: "Wool shell and satin lining",
    cut: "Cut mirrored pair",
    confidence: "Medium",
    risk: "Detachable logic",
  },
  {
    id: "sleeve-flap",
    name: "Sleeve zipper flap",
    material: "Leather or wool facing",
    cut: "Cut 2 plus reinforcement",
    confidence: "Low",
    risk: "Review required",
  },
  {
    id: "lining",
    name: "Body and sleeve lining",
    material: "Black satin",
    cut: "Separate lining set",
    confidence: "Medium",
    risk: "Hidden construction",
  },
];

export const patternJoins: Array<[string, string, string, string]> = [
  ["Left front", "Right/front closure zone", "Curved front seam", "Review"],
  ["Upper sleeve", "Lower sleeve", "Hidden zipper under flap", "High risk"],
  ["Leather panel", "Wool shell", "Topstitched reinforced seam", "Medium"],
  ["Shell body", "Satin lining", "Bagged lining", "Medium"],
  ["Collar", "Neckline", "Sculptural support join", "Review"],
];

export const exportChecklist: Array<[string, boolean]> = [
  ["Garment interpretation approved", true],
  ["Required clarification questions answered", true],
  ["POM chart has sample values or placeholders", true],
  ["BOM includes shell, contrast, lining, closures, and support", true],
  ["Pattern Map warnings accepted", false],
  ["Back view or maker review requested", false],
];
