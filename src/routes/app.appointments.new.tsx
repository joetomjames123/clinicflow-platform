import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EntityPicker, patientOptions, doctorOptions, type PatientOption, type DoctorOption } from "@/components/forms/entity-picker";
import { Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/appointments/new")({ component: NewAppointment });

// Rounded to next 5-min slot in local time.
function nowDefaults() {
  const d = new Date();
  const mins = d.getMinutes();
  d.setMinutes(mins + (5 - (mins % 5 || 5)));
  d.setSeconds(0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

function NewAppointment() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<PatientOption | null>(null);
  const [doctor, setDoctor] = useState<DoctorOption | null>(null);
  const initial = nowDefaults();
  const [date, setDate] = useState(initial.date);
  const [time, setTime] = useState(initial.time);

  const resetToNow = () => {
    const n = nowDefaults();
    setDate(n.date); setTime(n.time);
    toast.success("Set to current time");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) { toast.error("Please select a patient"); return; }
    if (!doctor) { toast.error("Please select a doctor"); return; }
    toast.success("Appointment booked");
    navigate({ to: "/app/appointments" });
  };

  return (
    <>
      <PageHeader title="Book appointment" description="Schedule a new visit. Date & time default to now — change if needed." />
      <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
        <section className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
          <div className="space-y-1.5">
            <Label>Patient <span className="text-destructive">*</span></Label>
            <EntityPicker options={patientOptions} value={patient} onChange={setPatient}
              placeholder="Search by name, patient ID or phone…" />
          </div>
          <div className="space-y-1.5">
            <Label>Doctor <span className="text-destructive">*</span></Label>
            <EntityPicker options={doctorOptions} value={doctor} onChange={setDoctor}
              placeholder="Search by name, doctor ID or phone…" />
          </div>
          <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
            <div className="space-y-1.5"><Label>Date</Label>
              <Input type="date" className="h-11 rounded-xl" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5"><Label>Time</Label>
              <Input type="time" className="h-11 rounded-xl" value={time} onChange={e => setTime(e.target.value)} />
            </div>
            <Button type="button" variant="outline" className="h-11 rounded-xl" onClick={resetToNow}>
              <Clock className="mr-1.5 h-4 w-4" />Now
            </Button>
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
