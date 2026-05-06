import { ProjectDraftProvider } from "@/components/project-state";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  return (
    <ProjectDraftProviderFromParams params={params}>
      {children}
    </ProjectDraftProviderFromParams>
  );
}

async function ProjectDraftProviderFromParams({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProjectDraftProvider projectId={id}>{children}</ProjectDraftProvider>;
}
