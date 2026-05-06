export type PomDefinition = {
  code: string;
  name: string;
  category: "outerwear" | "jacket" | "pants" | "knit" | "custom";
  method: string;
  isCritical: boolean;
  defaultTolerance?: string;
};

export const outerwearPomLibrary: PomDefinition[] = [
  {
    code: "1-1",
    name: "Chest below armhole",
    category: "outerwear",
    method:
      "Measure straight across the garment below the armhole from side seam to side seam.",
    isCritical: true,
    defaultTolerance: "+/- 0.5 in",
  },
  {
    code: "1-8",
    name: "Across shoulder",
    category: "outerwear",
    method:
      "Measure straight across the highest armhole points from shoulder seam to shoulder seam.",
    isCritical: true,
    defaultTolerance: "+/- 0.375 in",
  },
  {
    code: "1-11",
    name: "Front length from HPS",
    category: "outerwear",
    method:
      "Measure from high point shoulder straight down to the front bottom edge.",
    isCritical: true,
    defaultTolerance: "+/- 0.5 in",
  },
  {
    code: "1-13",
    name: "Back length from CBN",
    category: "outerwear",
    method:
      "Measure from center back neck seam straight down to the back bottom edge.",
    isCritical: true,
    defaultTolerance: "+/- 0.5 in",
  },
  {
    code: "1-22",
    name: "Sleeve length from CBN",
    category: "outerwear",
    method:
      "Measure from center back neck to shoulder point, then continue along the outside sleeve fold to the sleeve opening.",
    isCritical: true,
    defaultTolerance: "+/- 0.5 in",
  },
  {
    code: "1-26",
    name: "Upper arm below armhole",
    category: "outerwear",
    method:
      "Measure across the sleeve below the armhole, perpendicular to the sleeve fold.",
    isCritical: true,
    defaultTolerance: "+/- 0.375 in",
  },
  {
    code: "1-29",
    name: "Sleeve opening",
    category: "outerwear",
    method: "Measure edge to edge along the bottom sleeve opening.",
    isCritical: true,
    defaultTolerance: "+/- 0.25 in",
  },
  {
    code: "1-45",
    name: "Collar height",
    category: "outerwear",
    method:
      "Measure at center back from collar join seam to the top collar edge.",
    isCritical: false,
    defaultTolerance: "+/- 0.125 in",
  },
  {
    code: "1-53",
    name: "Pocket placement from center front",
    category: "outerwear",
    method: "Measure from center front to the top pocket corner.",
    isCritical: false,
    defaultTolerance: "+/- 0.25 in",
  },
  {
    code: "1-54",
    name: "Pocket placement from HPS",
    category: "outerwear",
    method:
      "Measure straight down from high point shoulder to the top pocket or flap edge.",
    isCritical: false,
    defaultTolerance: "+/- 0.25 in",
  },
];

export const experimentalPomLibrary: PomDefinition[] = [
  {
    code: "EXP-001",
    name: "Detachable sleeve seam circumference",
    category: "custom",
    method:
      "Measure around the sleeve attachment seam where the upper and lower sleeve modules connect.",
    isCritical: true,
    defaultTolerance: "+/- 0.25 in",
  },
  {
    code: "EXP-002",
    name: "Sleeve flap width",
    category: "custom",
    method:
      "Measure across the flap that covers the detachable sleeve closure.",
    isCritical: true,
    defaultTolerance: "+/- 0.125 in",
  },
  {
    code: "EXP-003",
    name: "Hidden zipper length",
    category: "custom",
    method:
      "Measure the full functional zipper length used for the detachable module.",
    isCritical: true,
    defaultTolerance: "+/- 0.25 in",
  },
  {
    code: "EXP-004",
    name: "Asymmetric front extension length",
    category: "custom",
    method:
      "Measure from the standard front hem reference to the lowest asymmetric extension point.",
    isCritical: true,
    defaultTolerance: "Review",
  },
  {
    code: "EXP-005",
    name: "Irregular hem drop",
    category: "custom",
    method:
      "Measure the vertical difference between the highest and lowest hem points.",
    isCritical: false,
    defaultTolerance: "Review",
  },
];

export const jacketMvpPomLibrary = [
  ...outerwearPomLibrary,
  ...experimentalPomLibrary,
];
