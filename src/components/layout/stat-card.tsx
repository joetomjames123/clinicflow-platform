import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({
  label, value, icon, trend, tone = "primary",
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; up?: boolean };
  tone?: "primary" | "success" | "warning" | "info" | "destructive";
}) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    info: "bg-info/15 text-info",
    destructive: "bg-destructive/10 text-destructive",
  } as const;

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft transition-shadow hover:shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className={cn("grid h-9 w-9 place-items-center rounded-xl", tones[tone])}>{icon}</div>
      </div>
      <div className="mt-3 font-display text-2xl font-bold tracking-tight">{value}</div>
      {trend && (
        <div className="mt-1 flex items-center gap-1 text-xs">
          <span className={cn("inline-flex items-center gap-0.5 font-semibold",
            trend.up ? "text-success" : "text-destructive")}>
            {trend.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend.value}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}
