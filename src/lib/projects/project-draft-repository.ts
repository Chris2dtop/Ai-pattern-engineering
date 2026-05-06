import {
  buildProjectDraftStorageKey,
  normalizePersistedProjectDraft,
  type PersistedProjectDraft,
} from "@/lib/projects/project-draft";

export interface ProjectDraftRepository {
  read(projectId: string): PersistedProjectDraft | null;
  save(draft: PersistedProjectDraft): PersistedProjectDraft;
  clear(projectId: string): void;
}

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export class BrowserLocalProjectDraftRepository
  implements ProjectDraftRepository
{
  read(projectId: string): PersistedProjectDraft | null {
    if (!canUseLocalStorage()) {
      return null;
    }

    const rawValue = window.localStorage.getItem(
      buildProjectDraftStorageKey(projectId),
    );

    if (!rawValue) {
      return null;
    }

    try {
      return normalizePersistedProjectDraft(JSON.parse(rawValue), projectId);
    } catch {
      return null;
    }
  }

  save(draft: PersistedProjectDraft): PersistedProjectDraft {
    const normalizedDraft = normalizePersistedProjectDraft(draft, draft.projectId);
    const savedDraft: PersistedProjectDraft = {
      ...normalizedDraft,
      lastSavedAt: new Date().toISOString(),
    };

    if (!canUseLocalStorage()) {
      return savedDraft;
    }

    window.localStorage.setItem(
      buildProjectDraftStorageKey(savedDraft.projectId),
      JSON.stringify(savedDraft),
    );

    return savedDraft;
  }

  clear(projectId: string): void {
    if (!canUseLocalStorage()) {
      return;
    }

    window.localStorage.removeItem(buildProjectDraftStorageKey(projectId));
  }
}
