import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/app/clinics/new")({ component: AddClinic });

function Field({ label, children, span = 6 }: { label: string; children: React.ReactNode; span?: number }) {
  return (
    <div className={`md:col-span-${span} space-y-1.5`}>
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function AddClinic() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Add Clinic" description="Onboard a new clinic to ClinicFlow." />
      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Clinic created"); navigate({ to: "/app/clinics" }); }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-display text-base font-semibold">Clinic details</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
              <Field label="Clinic name" span={4}><Input placeholder="Northwood Health" className="h-11 rounded-xl" /></Field>
              <Field label="Plan" span={2}>
                <Input value="ClinicFlow — single plan" disabled className="h-11 rounded-xl" />
              </Field>
              <Field label="Email" span={3}><Input type="email" placeholder="admin@clinic.com" className="h-11 rounded-xl" /></Field>
              <Field label="Phone" span={3}><Input placeholder="+46 ..." className="h-11 rounded-xl" /></Field>
              <Field label="Address" span={6}><Textarea placeholder="Street, city, country" rows={2} className="rounded-xl" /></Field>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-display text-base font-semibold">Primary admin</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
              <Field label="Full name" span={3}><Input className="h-11 rounded-xl" /></Field>
              <Field label="Email" span={3}><Input type="email" className="h-11 rounded-xl" /></Field>
              <Field label="Phone" span={3}><Input className="h-11 rounded-xl" /></Field>
              <Field label="Temporary password" span={3}><Input type="password" className="h-11 rounded-xl" /></Field>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-3 font-display text-base font-semibold">Branding</h2>
            <div className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 grid place-items-center text-xs text-muted-foreground">
              Drop logo or click to upload
            </div>
            <p className="mt-2 text-xs text-muted-foreground">PNG or SVG · up to 2 MB</p>
          </section>
          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-3 font-display text-base font-semibold">Trial</h2>
            <p className="text-sm text-muted-foreground">Includes a 14-day free trial. No card required.</p>
          </section>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate({ to: "/app/clinics" })}>Cancel</Button>
            <Button type="submit" className="flex-1">Create clinic</Button>
          </div>
        </aside>
      </form>
    </>
  );
}
