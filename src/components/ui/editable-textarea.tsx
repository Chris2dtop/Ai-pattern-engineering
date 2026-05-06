"use client";

import { useState } from "react";

type EditableTextareaProps = {
  label: string;
  value: string;
  rows?: number;
};

export function EditableTextarea({
  label,
  value,
  rows = 4,
}: EditableTextareaProps) {
  const [draft, setDraft] = useState(value);

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink/70">{label}</span>
      <textarea
        className="min-h-24 w-full resize-y rounded-md border border-line bg-paper px-3 py-2 text-sm leading-6 outline-none focus:border-denim"
        rows={rows}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
    </label>
  );
}
