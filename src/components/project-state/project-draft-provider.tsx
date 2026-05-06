"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import {
  BrowserLocalProjectDraftRepository,
  createDemoProjectDraft,
  normalizePersistedProjectDraft,
  type PersistedProjectDraft,
  type ProjectDraftBomRow,
  type ProjectDraftClarification,
  type ProjectDraftDesignerText,
  type ProjectDraftPomRow,
  type ProjectDraftRepository,
} from "@/lib/projects";

type ProjectDraftContextValue = {
  draft: PersistedProjectDraft;
  hydrated: boolean;
  hasStoredDraft: boolean;
  replaceDraft: (draft: PersistedProjectDraft) => void;
  resetDraft: () => void;
  updateConcept: (updates: Partial<PersistedProjectDraft["concept"]>) => void;
  setClarificationAnswer: (questionId: string, answer: string) => void;
  setClarifications: (clarifications: ProjectDraftClarification[]) => void;
  updateDesignerText: (updates: Partial<ProjectDraftDesignerText>) => void;
  updateMaker: (updates: Partial<PersistedProjectDraft["maker"]>) => void;
  setPomRows: (rows: ProjectDraftPomRow[]) => void;
  setBomRows: (rows: ProjectDraftBomRow[]) => void;
  setConstructionSteps: (steps: string[]) => void;
  setExportWarningsAccepted: (accepted: boolean) => void;
  updateChecklistItem: (itemId: string, complete: boolean) => void;
};

type ProjectDraftProviderProps = PropsWithChildren<{
  projectId?: string;
  initialDraft?: PersistedProjectDraft;
  repository?: ProjectDraftRepository;
}>;

const ProjectDraftContext = createContext<ProjectDraftContextValue | null>(null);

function persistWithRepository(
  repository: ProjectDraftRepository,
  nextDraft: PersistedProjectDraft,
): PersistedProjectDraft {
  return repository.save(nextDraft);
}

export function ProjectDraftProvider({
  children,
  projectId = "demo",
  initialDraft,
  repository,
}: ProjectDraftProviderProps) {
  const resolvedRepositoryRef = useRef<ProjectDraftRepository>(
    repository ?? new BrowserLocalProjectDraftRepository(),
  );
  const baseDraft = useMemo(
    () =>
      normalizePersistedProjectDraft(
        initialDraft ?? createDemoProjectDraft(projectId),
        projectId,
      ),
    [initialDraft, projectId],
  );
  const [draft, setDraft] = useState<PersistedProjectDraft>(baseDraft);
  const [hydrated, setHydrated] = useState(false);
  const [hasStoredDraft, setHasStoredDraft] = useState(false);

  const commitDraft = useCallback(
    (
      update:
        | PersistedProjectDraft
        | ((currentDraft: PersistedProjectDraft) => PersistedProjectDraft),
      options?: {
        hasStoredDraft?: boolean;
      },
    ) => {
      setDraft((currentDraft) => {
        const nextDraft =
          typeof update === "function"
            ? update(currentDraft)
            : update;

        return persistWithRepository(
          resolvedRepositoryRef.current,
          normalizePersistedProjectDraft(nextDraft, projectId),
        );
      });

      if (typeof options?.hasStoredDraft === "boolean") {
        setHasStoredDraft(options.hasStoredDraft);
      } else {
        setHasStoredDraft(true);
      }
    },
    [projectId],
  );

  useEffect(() => {
    const storedDraft = resolvedRepositoryRef.current.read(projectId);

    if (storedDraft) {
      setDraft(storedDraft);
      setHasStoredDraft(true);
      setHydrated(true);
      return;
    }

    const seededDraft = resolvedRepositoryRef.current.save(baseDraft);
    setDraft(seededDraft);
    setHasStoredDraft(false);
    setHydrated(true);
  }, [baseDraft, projectId]);

  const replaceDraft = useCallback((nextDraft: PersistedProjectDraft) => {
    commitDraft(nextDraft);
  }, [commitDraft]);

  const resetDraft = useCallback(() => {
    const nextDraft = createDemoProjectDraft(projectId);
    resolvedRepositoryRef.current.clear(projectId);
    setDraft(nextDraft);
    setHasStoredDraft(false);
  }, [projectId]);

  const updateConcept = useCallback(
    (updates: Partial<PersistedProjectDraft["concept"]>) => {
      commitDraft((currentDraft) => ({
        ...currentDraft,
        concept: {
          ...currentDraft.concept,
          ...updates,
        },
      }));
    },
    [commitDraft],
  );

  const setClarificationAnswer = useCallback((questionId: string, answer: string) => {
    commitDraft((currentDraft) => ({
      ...currentDraft,
      clarifications: currentDraft.clarifications.map((item) =>
        item.id === questionId ? { ...item, answer } : item,
      ),
    }));
  }, [commitDraft]);

  const setClarifications = useCallback((clarifications: ProjectDraftClarification[]) => {
    commitDraft((currentDraft) => ({
      ...currentDraft,
      clarifications,
    }));
  }, [commitDraft]);

  const updateDesignerText = useCallback(
    (updates: Partial<ProjectDraftDesignerText>) => {
      commitDraft((currentDraft) => ({
        ...currentDraft,
        designerText: {
          ...currentDraft.designerText,
          ...updates,
        },
      }));
    },
    [commitDraft],
  );

  const updateMaker = useCallback(
    (updates: Partial<PersistedProjectDraft["maker"]>) => {
      commitDraft((currentDraft) => ({
        ...currentDraft,
        maker: {
          ...currentDraft.maker,
          ...updates,
        },
      }));
    },
    [commitDraft],
  );

  const setPomRows = useCallback((rows: ProjectDraftPomRow[]) => {
    commitDraft((currentDraft) => ({
      ...currentDraft,
      maker: {
        ...currentDraft.maker,
        pomRows: rows,
      },
    }));
  }, [commitDraft]);

  const setBomRows = useCallback((rows: ProjectDraftBomRow[]) => {
    commitDraft((currentDraft) => ({
      ...currentDraft,
      maker: {
        ...currentDraft.maker,
        bomRows: rows,
      },
    }));
  }, [commitDraft]);

  const setConstructionSteps = useCallback((steps: string[]) => {
    commitDraft((currentDraft) => ({
      ...currentDraft,
      maker: {
        ...currentDraft.maker,
        constructionSteps: steps,
      },
    }));
  }, [commitDraft]);

  const setExportWarningsAccepted = useCallback((accepted: boolean) => {
    commitDraft((currentDraft) => ({
      ...currentDraft,
      exportReview: {
        ...currentDraft.exportReview,
        warningsAccepted: accepted,
      },
    }));
  }, [commitDraft]);

  const updateChecklistItem = useCallback((itemId: string, complete: boolean) => {
    commitDraft((currentDraft) => ({
      ...currentDraft,
      exportReview: {
        ...currentDraft.exportReview,
        checklist: currentDraft.exportReview.checklist.map((item) =>
          item.id === itemId ? { ...item, complete } : item,
        ),
      },
    }));
  }, [commitDraft]);

  const value = useMemo<ProjectDraftContextValue>(
    () => ({
      draft,
      hydrated,
      hasStoredDraft,
      replaceDraft,
      resetDraft,
      updateConcept,
      setClarificationAnswer,
      setClarifications,
      updateDesignerText,
      updateMaker,
      setPomRows,
      setBomRows,
      setConstructionSteps,
      setExportWarningsAccepted,
      updateChecklistItem,
    }),
    [
      draft,
      hasStoredDraft,
      hydrated,
      replaceDraft,
      resetDraft,
      setBomRows,
      setClarificationAnswer,
      setClarifications,
      setConstructionSteps,
      setExportWarningsAccepted,
      setPomRows,
      updateChecklistItem,
      updateConcept,
      updateDesignerText,
      updateMaker,
    ],
  );

  return (
    <ProjectDraftContext.Provider value={value}>
      {children}
    </ProjectDraftContext.Provider>
  );
}

export function useProjectDraft(): ProjectDraftContextValue {
  const context = useContext(ProjectDraftContext);

  if (!context) {
    throw new Error("useProjectDraft must be used within a ProjectDraftProvider");
  }

  return context;
}
