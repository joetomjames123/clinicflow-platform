import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EntityPicker, patientOptions, doctorOptions, type PatientOption, type DoctorOption } from "@/components/forms/entity-picker";
import { toast } from "sonner";

export const Route = createFileRoute("/app/appointments/new")({ component: NewAppointment });

function NewAppointment() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<PatientOption | null>(null);
  const [doctor, setDoctor] = useState<DoctorOption | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) { toast.error("Please select a patient"); return; }
    if (!doctor) { toast.error("Please select a doctor"); return; }
    toast.success("Appointment booked");
    navigate({ to: "/app/appointments" });
  };

  return (
    <>
      <PageHeader title="Book appointment" description="Schedule a new visit." />
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
