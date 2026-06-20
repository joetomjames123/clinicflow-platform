import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { patients } from "@/lib/sample-data";
import { useAuth } from "@/lib/auth";
import { Activity, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/prescriptions/new")({ component: NewPrescription });

type Med = { name: string; dosage: string; frequency: string; duration: string };

function NewPrescription() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meds, setMeds] = useState<Med[]>([{ name: "Amoxicillin 500 mg", dosage: "1 tab", frequency: "3× per day", duration: "5 days" }]);
  const [patient, setPatient] = useState(patients[0]);
  const [diagnosis, setDiagnosis] = useState("Seasonal allergic rhinitis");
  const [notes, setNotes] = useState("Rest and hydration. Avoid known triggers.");
  const [followup, setFollowup] = useState("");

  const update = (i: number, k: keyof Med, v: string) =>
    setMeds(meds.map((m, idx) => (idx === i ? { ...m, [k]: v } : m)));

  return (
    <>
      <PageHeader title="New prescription" description="Compose and sign a prescription." />
      <div className="grid gap-6 lg:grid-cols-5">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Prescription saved"); navigate({ to: "/app/prescriptions" }); }}
          className="lg:col-span-3 space-y-6">
          <section className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
            <div className="space-y-1.5"><Label>Patient</Label>
              <Select value={patient.id} onValueChange={(v) => setPatient(patients.find(p => p.id === v) ?? patient)}>
                <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>{patients.map(p => <SelectItem key={p.id} value={p.id}>{p.name} — {p.id}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Diagnosis</Label><Input className="h-11 rounded-xl" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Treatment notes</Label><Textarea rows={3} className="rounded-xl" value={notes} onChange={e => setNotes(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Follow-up date</Label><Input type="date" className="h-11 rounded-xl" value={followup} onChange={e => setFollowup(e.target.value)} /></div>
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold">Medicines</h2>
              <Button type="button" size="sm" variant="outline" onClick={() => setMeds([...meds, { name: "", dosage: "", frequency: "", duration: "" }])}>
                <Plus className="mr-1 h-3.5 w-3.5" /> Add medicine
              </Button>
            </div>
            <div className="space-y-3">
              {meds.map((m, i) => (
                <div key={i} className="grid grid-cols-1 gap-2 rounded-xl border bg-muted/30 p-3 md:grid-cols-[2fr_1fr_1.2fr_1fr_auto]">
                  <Input placeholder="Medicine" className="h-10 rounded-lg" value={m.name} onChange={e => update(i, "name", e.target.value)} />
                  <Input placeholder="Dosage" className="h-10 rounded-lg" value={m.dosage} onChange={e => update(i, "dosage", e.target.value)} />
                  <Input placeholder="Frequency" className="h-10 rounded-lg" value={m.frequency} onChange={e => update(i, "frequency", e.target.value)} />
                  <Input placeholder="Duration" className="h-10 rounded-lg" value={m.duration} onChange={e => update(i, "duration", e.target.value)} />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setMeds(meds.filter((_, idx) => idx !== i))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate({ to: "/app/prescriptions" })}>Cancel</Button>
            <Button type="submit" className="flex-1">Save & sign</Button>
          </div>
        </form>

        {/* Preview */}
        <aside className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-card">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-info text-primary-foreground">
                <Activity className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-display text-base font-bold">{user?.clinic}</div>
                <div className="text-xs text-muted-foreground">Kungsgatan 32, Stockholm · +46 8 555 0123</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div><div className="text-muted-foreground">Patient</div><div className="font-semibold">{patient.name}</div></div>
              <div><div className="text-muted-foreground">Patient ID</div><div className="font-mono">{patient.id}</div></div>
              <div><div className="text-muted-foreground">Age / Gender</div><div>{patient.age} · {patient.gender}</div></div>
              <div><div className="text-muted-foreground">Date</div><div>{new Date().toISOString().slice(0, 10)}</div></div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Diagnosis</div>
              <div className="mt-1 text-sm">{diagnosis}</div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rx</div>
              <ol className="mt-1 space-y-1.5 text-sm">
                {meds.map((m, i) => (
                  <li key={i} className="rounded-lg bg-muted/40 px-3 py-2">
                    <div className="font-semibold">{m.name || "—"}</div>
                    <div className="text-xs text-muted-foreground">{m.dosage} · {m.frequency} · {m.duration}</div>
                  </li>
                ))}
              </ol>
            </div>
            {notes && <div className="mt-4"><div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</div><div className="mt-1 text-sm">{notes}</div></div>}
            {followup && <div className="mt-3 text-sm"><span className="text-muted-foreground">Follow-up:</span> <span className="font-semibold">{followup}</span></div>}
            <div className="mt-8 border-t pt-4">
              <div className="ml-auto w-48 text-right">
                <div className="border-b pb-6 font-display italic text-muted-foreground/70">Dr. signature</div>
                <div className="mt-2 text-xs"><div className="font-semibold">{user?.name}</div><div className="text-muted-foreground">Reg. SE-MED-104821</div></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
