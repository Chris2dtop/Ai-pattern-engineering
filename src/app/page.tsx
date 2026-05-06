import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper px-6 py-10 text-ink">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-moss">
            Sprint 0 Foundation
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight">
            AI-first garment translation from concept image to maker-ready
            technical draft.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-ink/70">
            This scaffold is the working shell for upload, clarification,
            Designer Mode, Maker/Tailor Mode, Pattern Map, and export.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper"
            href="/projects"
          >
            Open projects
          </Link>
          <Link
            className="rounded-md border border-line px-4 py-2 text-sm font-medium"
            href="/projects/demo/create"
          >
            View MVP flow
          </Link>
        </div>
      </section>
    </main>
  );
}
