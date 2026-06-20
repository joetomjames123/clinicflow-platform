import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      // small delay so hydration has a chance to read localStorage
      const t = setTimeout(() => {
        if (!localStorage.getItem("cf_user")) navigate({ to: "/login", replace: true });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="text-sm text-muted-foreground">Loading workspace…</div>
      </div>
    );
  }
  return <AppShell><Outlet /></AppShell>;
}
