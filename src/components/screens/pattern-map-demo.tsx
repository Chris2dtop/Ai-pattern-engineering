"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { patternJoins, patternPieces } from "@/lib/mock/demo-project";

type PatternMapDemoProps = {
  projectId: string;
};

export function PatternMapDemo({ projectId }: PatternMapDemoProps) {
  const [selectedPiece, setSelectedPiece] = useState(patternPieces[0]);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <SectionCard
        title="Schematic pattern map"
        eyebrow="Editable draft"
        action={<StatusBadge tone="warning">Not production CAD</StatusBadge>}
      >
        <div className="relative min-h-[360px] rounded-lg border border-line bg-paper p-5">
          <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-3">
            {patternPieces.map((piece, index) => (
              <button
                key={piece.id}
                type="button"
                onClick={() => setSelectedPiece(piece)}
                className={[
                  "flex min-h-28 flex-col justify-between rounded-lg border p-3 text-left transition",
                  selectedPiece.id === piece.id
                    ? "border-denim bg-white shadow-sm"
                    : "border-line bg-white/70",
                  index % 2 === 0 ? "rotate-1" : "-rotate-1",
                ].join(" ")}
              >
                <span className="text-sm font-semibold">{piece.name}</span>
                <span className="text-xs text-ink/60">{piece.cut}</span>
                <StatusBadge
                  tone={
                    piece.confidence === "High"
                      ? "success"
                      : piece.confidence === "Medium"
                        ? "info"
                        : "warning"
                  }
                >
                  {piece.confidence}
                </StatusBadge>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-ink/60">
          These shapes are schematic placeholders. The MVP can make them
          editable vector drafts, but they must remain labeled for pattern-maker
          review until CAD-grade drafting and validation exists.
        </p>
      </SectionCard>

      <div className="grid gap-5">
        <SectionCard title="Selected piece" eyebrow="Piece detail">
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="font-semibold">Name</dt>
              <dd className="mt-1 text-ink/70">{selectedPiece.name}</dd>
            </div>
            <div>
              <dt className="font-semibold">Material</dt>
              <dd className="mt-1 text-ink/70">{selectedPiece.material}</dd>
            </div>
            <div>
              <dt className="font-semibold">Cut instruction</dt>
              <dd className="mt-1 text-ink/70">{selectedPiece.cut}</dd>
            </div>
            <div>
              <dt className="font-semibold">Risk</dt>
              <dd className="mt-1 text-ink/70">{selectedPiece.risk}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Join relationships" eyebrow="Construction logic">
          <div className="grid gap-3">
            {patternJoins.map(([from, to, join, risk]) => (
              <div key={`${from}-${to}`} className="rounded-md border border-line p-3">
                <p className="font-medium">
                  {from} {"->"} {to}
                </p>
                <p className="mt-1 text-sm text-ink/60">{join}</p>
                <div className="mt-2">
                  <StatusBadge tone={risk === "High risk" ? "danger" : "warning"}>
                    {risk}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <Link
          href={`/projects/${projectId}/export`}
          className="w-fit rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Review export package
        </Link>
      </div>
    </div>
  );
}
