import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";

const steps = [
  { href: "create", label: "Create" },
  { href: "questions", label: "Questions" },
  { href: "designer", label: "Designer" },
  { href: "maker", label: "Maker" },
  { href: "pattern-map", label: "Pattern Map" },
  { href: "export", label: "Export" },
];

type AppShellProps = {
  projectId?: string;
  title: string;
  status?: string;
  children: React.ReactNode;
};

export function AppShell({
  projectId = "demo",
  title,
  status = "Sprint 0 scaffold",
  children,
}: AppShellProps) {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-white/80 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/projects" className="text-sm font-semibold">
              AI Pattern Engineering
            </Link>
            <StatusBadge tone="info">{status}</StatusBadge>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/50">
                Project
              </p>
              <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
            <nav className="flex gap-2 overflow-x-auto">
              {steps.map((step) => (
                <Link
                  key={step.href}
                  href={`/projects/${projectId}/${step.href}`}
                  className="whitespace-nowrap rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-ink/70"
                >
                  {step.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-6">{children}</section>
    </main>
  );
}
