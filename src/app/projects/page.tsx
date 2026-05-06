import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { demoProject } from "@/lib/mock/demo-project";

const demoProjects = [
  {
    id: demoProject.id,
    name: demoProject.name,
    status: demoProject.status,
    updated: demoProject.updated,
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-paper px-6 py-8 text-ink">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-moss">
              Projects
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Garment drafts</h1>
          </div>
          <Link
            href="/projects/demo/create"
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper"
          >
            New project
          </Link>
        </div>

        <div className="grid gap-3">
          {demoProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}/create`}
              className="rounded-lg border border-line bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold">{project.name}</h2>
                  <p className="mt-1 text-sm text-ink/60">
                    Last updated: {project.updated}
                  </p>
                </div>
                <StatusBadge tone="success">{project.status}</StatusBadge>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
