import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { doctors, patients } from "@/lib/sample-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/appointments/new")({ component: NewAppointment });

function NewAppointment() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Book appointment" description="Schedule a new visit." />
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Appointment booked"); navigate({ to: "/app/appointments" }); }}
        className="max-w-2xl space-y-6">
        <section className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
          <div className="space-y-1.5"><Label>Patient</Label>
            <Select><SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Search patient…" /></SelectTrigger>
              <SelectContent>{patients.map(p => <SelectItem key={p.id} value={p.id}>{p.name} — {p.id}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5"><Label>Doctor</Label>
            <Select><SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Select doctor" /></SelectTrigger>
              <SelectContent>{doctors.map(d => <SelectItem key={d.id} value={d.id}>{d.name} · {d.specialty}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Date</Label><Input type="date" className="h-11 rounded-xl" /></div>
            <div className="space-y-1.5"><Label>Time</Label><Input type="time" className="h-11 rounded-xl" /></div>
          </div>
          <div className="space-y-1.5"><Label>Type</Label>
            <Select defaultValue="consultation"><SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
                <SelectItem value="checkup">Check-up</SelectItem>
                <SelectItem value="procedure">Procedure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5"><Label>Notes</Label><Textarea rows={3} className="rounded-xl" placeholder="Reason for visit, prep notes…" /></div>
        </section>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1" onClick={() => navigate({ to: "/app/appointments" })}>Cancel</Button>
          <Button type="submit" className="flex-1">Book appointment</Button>
        </div>
      </form>
    </>
  );
}
