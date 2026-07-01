import { createFileRoute, Navigate } from "@tanstack/react-router";

// Deprecated route — replaced by /app/followups for doctors.
export const Route = createFileRoute("/app/medical-history")({
  component: () => <Navigate to="/app/followups" replace />,
});
