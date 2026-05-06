create extension if not exists "pgcrypto";

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  status text not null default 'draft',
  garment_type text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  kind text not null,
  view_type text not null default 'unknown',
  storage_path text,
  description text,
  status text not null default 'ready',
  created_at timestamptz not null default now()
);

create table public.garment_specs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  revision integer not null default 1,
  status text not null default 'draft',
  spec jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, revision)
);

create table public.generated_sections (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  garment_spec_id uuid references public.garment_specs(id) on delete set null,
  section_key text not null,
  status text not null default 'draft',
  content jsonb not null default '{}'::jsonb,
  prompt_version text,
  model_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ai_jobs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  job_kind text not null,
  status text not null default 'queued',
  input_revision integer not null default 1,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ai_usage_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  ai_job_id uuid references public.ai_jobs(id) on delete set null,
  provider text not null,
  model_name text not null,
  prompt_version text,
  estimated_cost_usd numeric(12, 6),
  latency_ms integer,
  validation_status text,
  created_at timestamptz not null default now()
);

create table public.exports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  garment_spec_id uuid references public.garment_specs(id) on delete set null,
  export_type text not null,
  status text not null default 'queued',
  storage_path text,
  warnings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  entry_type text not null,
  credits integer not null,
  reason text,
  created_at timestamptz not null default now()
);

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.projects enable row level security;
alter table public.project_assets enable row level security;
alter table public.garment_specs enable row level security;
alter table public.generated_sections enable row level security;
alter table public.ai_jobs enable row level security;
alter table public.ai_usage_events enable row level security;
alter table public.exports enable row level security;
alter table public.credit_ledger enable row level security;

create policy "members can read their organizations"
  on public.organizations for select
  using (
    exists (
      select 1 from public.organization_members m
      where m.organization_id = id and m.user_id = auth.uid()
    )
  );

create policy "members can read organization members"
  on public.organization_members for select
  using (user_id = auth.uid());

create policy "members can manage projects"
  on public.projects for all
  using (
    exists (
      select 1 from public.organization_members m
      where m.organization_id = projects.organization_id
      and m.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.organization_members m
      where m.organization_id = projects.organization_id
      and m.user_id = auth.uid()
    )
  );

create policy "members can manage project assets"
  on public.project_assets for all
  using (
    exists (
      select 1
      from public.projects p
      join public.organization_members m on m.organization_id = p.organization_id
      where p.id = project_assets.project_id and m.user_id = auth.uid()
    )
  );

create policy "members can manage garment specs"
  on public.garment_specs for all
  using (
    exists (
      select 1
      from public.projects p
      join public.organization_members m on m.organization_id = p.organization_id
      where p.id = garment_specs.project_id and m.user_id = auth.uid()
    )
  );

create policy "members can manage generated sections"
  on public.generated_sections for all
  using (
    exists (
      select 1
      from public.projects p
      join public.organization_members m on m.organization_id = p.organization_id
      where p.id = generated_sections.project_id and m.user_id = auth.uid()
    )
  );

create policy "members can read ai jobs"
  on public.ai_jobs for select
  using (
    exists (
      select 1
      from public.projects p
      join public.organization_members m on m.organization_id = p.organization_id
      where p.id = ai_jobs.project_id and m.user_id = auth.uid()
    )
  );

create policy "members can read exports"
  on public.exports for select
  using (
    exists (
      select 1
      from public.projects p
      join public.organization_members m on m.organization_id = p.organization_id
      where p.id = exports.project_id and m.user_id = auth.uid()
    )
  );
