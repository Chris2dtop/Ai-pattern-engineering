import { cn } from "@/lib/utils";

type SectionCardProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
};

export function SectionCard({
  title,
  eyebrow,
  children,
  className,
  action,
}: SectionCardProps) {
  return (
    <section className={cn("rounded-lg border border-line bg-white p-5", className)}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          {eyebrow ? (
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-moss">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
