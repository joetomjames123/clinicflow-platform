import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/forms/file-uploader";
import { toast } from "sonner";

export const Route = createFileRoute("/app/patients/new")({ component: NewPatient });

function Field({ label, span = 6, children }: { label: string; span?: number; children: React.ReactNode }) {
  return (
    <div className={`md:col-span-${span} space-y-1.5`}>
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function NewPatient() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Register patient" description="Capture demographic, contact and medical info." />
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Patient registered"); navigate({ to: "/app/patients" }); }}
        className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-display text-base font-semibold">Personal information</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
              <Field label="Full name" span={4}><Input className="h-11 rounded-xl" placeholder="Liam Andersson" /></Field>
              <Field label="Date of birth" span={2}><Input type="date" className="h-11 rounded-xl" /></Field>
              <Field label="Age" span={2}><Input className="h-11 rounded-xl" placeholder="34" /></Field>
              <Field label="Gender" span={2}>
                <Select><SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Male</SelectItem>
                    <SelectItem value="f">Female</SelectItem>
                    <SelectItem value="o">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Blood group" span={2}>
                <Select><SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Occupation" span={6}><Input className="h-11 rounded-xl" /></Field>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-display text-base font-semibold">Contact</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
              <Field label="Phone" span={3}><Input className="h-11 rounded-xl" /></Field>
              <Field label="WhatsApp" span={3}><Input className="h-11 rounded-xl" /></Field>
              <Field label="Address" span={6}><Textarea rows={2} className="rounded-xl" /></Field>
              <Field label="Emergency contact name" span={3}><Input className="h-11 rounded-xl" /></Field>
              <Field label="Emergency contact phone" span={3}><Input className="h-11 rounded-xl" /></Field>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-display text-base font-semibold">Medical</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
              <Field label="Allergies" span={3}><Input className="h-11 rounded-xl" placeholder="None / penicillin / …" /></Field>
              <Field label="Existing conditions" span={3}><Input className="h-11 rounded-xl" placeholder="Hypertension, asthma…" /></Field>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-3 font-display text-base font-semibold">Patient photo</h2>
            <div className="aspect-square rounded-xl border-2 border-dashed bg-muted/30 grid place-items-center text-xs text-muted-foreground">Upload photo</div>
          </section>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate({ to: "/app/patients" })}>Cancel</Button>
            <Button type="submit" className="flex-1">Save patient</Button>
          </div>
        </aside>
      </form>
    </>
  );
}
