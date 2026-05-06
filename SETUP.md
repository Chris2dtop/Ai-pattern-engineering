# Local Setup

## Current Sprint 0 Status

The Next.js MVP scaffold and Sprint 0 foundation files are present. Dependency installation was blocked initially because the machine reported no free disk space during `npm install`.

## Install Commands

Use the real Node.js npm command on this Windows machine:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' install
& 'C:\Program Files\nodejs\npm.cmd' run typecheck
& 'C:\Program Files\nodejs\npm.cmd' run build
& 'C:\Program Files\nodejs\npm.cmd' run dev
```

The app should run at:

```text
http://localhost:3000
```

## Required Environment Variables

Copy `.env.example` to `.env.local` when Supabase/Gemini/Stripe credentials are available.

For the first mocked workflow, Supabase and Gemini can remain unconnected while UI and schema work continue.

## Important Naming Note

This MVP is scaffolded with **Next.js** for the web application. NestJS is a backend framework and can be added later only if the backend grows beyond what Next.js route handlers, workers, and Supabase comfortably support.
