import { StatusBadge } from "@/components/ui/status-badge";

type SprintZeroPanelProps = {
  title: string;
  purpose: string;
  mustBuild: string[];
};

export function SprintZeroPanel({
  title,
  purpose,
  mustBuild,
}: SprintZeroPanelProps) {
  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-2 max-w-2xl leading-7 text-ink/70">{purpose}</p>
        </div>
        <StatusBadge tone="warning">Placeholder</StatusBadge>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {mustBuild.map((item) => (
          <li
            key={item}
            className="rounded-md border border-line bg-paper px-3 py-2 text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
