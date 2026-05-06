"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { clarificationQuestions } from "@/lib/mock/demo-project";

type QuestionsDemoProps = {
  projectId: string;
};

export function QuestionsDemo({ projectId }: QuestionsDemoProps) {
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      clarificationQuestions.map((question) => [
        question.id,
        question.recommendation,
      ]),
    ),
  );

  const requiredAnswered = clarificationQuestions
    .filter((question) => question.required)
    .every((question) => answers[question.id]?.trim());

  return (
    <div className="grid gap-5">
      <SectionCard
        title="AI clarification pass"
        eyebrow="Mock questions"
        action={
          <StatusBadge tone={requiredAnswered ? "success" : "warning"}>
            {requiredAnswered ? "Required answered" : "Needs input"}
          </StatusBadge>
        }
      >
        <p className="mb-5 max-w-3xl leading-7 text-ink/70">
          These questions show how the app avoids guessing hidden garment
          construction. In the real flow, Gemini generates this list from the
          uploaded image, prompt, and risk flags.
        </p>

        <div className="grid gap-4">
          {clarificationQuestions.map((question) => (
            <div key={question.id} className="rounded-lg border border-line p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <StatusBadge tone="info">{question.group}</StatusBadge>
                {question.required ? (
                  <StatusBadge tone="warning">Required</StatusBadge>
                ) : (
                  <StatusBadge>Optional</StatusBadge>
                )}
              </div>
              <label className="block">
                <span className="block font-medium">{question.question}</span>
                <input
                  className="mt-3 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-denim"
                  value={answers[question.id] ?? ""}
                  onChange={(event) =>
                    setAnswers((current) => ({
                      ...current,
                      [question.id]: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Link
          href={`/projects/${projectId}/designer`}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Generate designer draft
        </Link>
      </div>
    </div>
  );
}
