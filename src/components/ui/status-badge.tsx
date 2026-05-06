import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
};

const tones = {
  neutral: "border-line bg-white text-ink/70",
  success: "border-moss/30 bg-moss/10 text-moss",
  warning: "border-clay/30 bg-clay/10 text-clay",
  danger: "border-red-300 bg-red-50 text-red-700",
  info: "border-denim/30 bg-denim/10 text-denim",
};

export function StatusBadge({ children, tone = "neutral" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
