import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, ArrowRight, Building2, ShieldCheck, Stethoscope, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, type Role, ROLE_LABELS } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — ClinicFlow" },
      { name: "description", content: "Sign in to ClinicFlow, the modern clinic management platform." },
    ],
  }),
  component: Login,
});

const ROLE_ICONS: Record<Role, React.ComponentType<{ className?: string }>> = {
  super_admin: ShieldCheck,
  clinic_admin: Building2,
  doctor: Stethoscope,
  receptionist: UserCog,
};

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("clinic_admin");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate({ to: "/app" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary to-info p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 80%, white 0, transparent 40%)",
        }} />
        <div className="relative flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <Activity className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-lg font-bold">ClinicFlow</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80">Healthcare OS</div>
          </div>
        </div>

        <div className="relative">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Run a calmer clinic.
          </h1>
          <p className="mt-4 max-w-md text-base text-primary-foreground/85">
            From patient registration to prescriptions and billing — ClinicFlow gives every role the clarity they need to deliver better care.
          </p>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              ["340+", "clinics"],
              ["1.2M", "patients"],
              ["99.99%", "uptime"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold">{v}</div>
                <div className="text-xs uppercase tracking-wider opacity-75">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs opacity-75">
          HIPAA & GDPR aligned · ISO 27001 certified
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center bg-background p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div className="font-display text-lg font-bold">ClinicFlow</div>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue to your clinic workspace.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email" type="email" placeholder="you@clinic.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="h-11 rounded-xl" defaultValue="demo-password" />
            </div>

            <div className="space-y-2">
              <Label>Sign in as (demo)</Label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(ROLE_LABELS) as Role[]).map((r) => {
                  const Icon = ROLE_ICONS[r];
                  const active = role === r;
                  return (
                    <button
                      type="button" key={r} onClick={() => setRole(r)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                        active
                          ? "border-primary bg-primary-soft text-primary shadow-soft"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="font-medium">{ROLE_LABELS[r]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button type="submit" className="h-11 w-full rounded-xl text-sm font-semibold">
              Sign in <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By signing in you agree to ClinicFlow's Terms & Privacy Policy.
            </p>
          </form>

          <div className="mt-8 rounded-xl border bg-muted/40 p-4 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Demo mode:</span> no real authentication — pick a role to explore the matching dashboard. <Link to="/" className="underline">Back home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
