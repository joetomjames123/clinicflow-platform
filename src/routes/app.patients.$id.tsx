import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { patients, prescriptions, bills, appointments, labReports } from "@/lib/sample-data";
import { downloadCSV, printDocument } from "@/lib/exporters";
import { sendWhatsApp } from "@/lib/whatsapp";
import { useAuth } from "@/lib/auth";
import {
  Phone, MapPin, MessageCircle, Calendar, AlertTriangle, FileText, Receipt,
  FolderOpen, FlaskConical, Download, Send, Printer, Edit,
} from "lucide-react";

export const Route = createFileRoute("/app/patients/$id")({ component: PatientProfile });

function PatientProfile() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const patient = patients.find(p => p.id === id) ?? patients[0];
  const visits = appointments.filter(a => a.patientId === patient.id);
  const myRx = prescriptions.filter(r => r.patientId === patient.id);
  const myBills = bills.filter(b => b.patient === patient.name);
  const myLabs = labReports.filter(l => l.patientId === patient.id);

  const canEditRx = user?.role === "doctor";
  const canAddLab = user?.role === "doctor" || user?.role === "clinic_admin" || user?.role === "receptionist";

  const exportAll = () => {
    downloadCSV(`${patient.id}-profile.csv`, [{ ...patient }]);
    downloadCSV(`${patient.id}-appointments.csv`, visits);
    downloadCSV(`${patient.id}-prescriptions.csv`, myRx.map(r => ({ ...r, medicines: r.medicines.map(m => m.name).join("; ") })));
    downloadCSV(`${patient.id}-bills.csv`, myBills);
    downloadCSV(`${patient.id}-lab-reports.csv`, myLabs);
  };

  const printRx = (rx: typeof prescriptions[number]) => {
    printDocument(`
      <h2>${user?.clinic ?? "ClinicFlow"}</h2>
      <div class="muted">Prescription ${rx.id} · ${rx.date}</div>
      <div class="card">
        <div class="row"><b>Patient</b><span>${patient.name} (${patient.id})</span></div>
        <div class="row"><b>Doctor</b><span>${rx.doctor}</span></div>
        <div class="row"><b>Diagnosis</b><span>${rx.diagnosis}</span></div>
        ${rx.followUp ? `<div class="row"><b>Follow-up</b><span>${rx.followUp}</span></div>` : ""}
      </div>
      <h3>Medicines</h3>
      <table><thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th></tr></thead>
      <tbody>${rx.medicines.map(m => `<tr><td>${m.name}</td><td>${m.dosage}</td><td>${m.frequency}</td><td>${m.duration}</td></tr>`).join("")}</tbody></table>
    `, `Prescription ${rx.id}`);
  };

  const shareRx = (rx: typeof prescriptions[number]) => {
    const msg = `Hi ${patient.name}, prescription ${rx.id} (${rx.date}):\nDiagnosis: ${rx.diagnosis}\n${rx.medicines.map(m => `• ${m.name} — ${m.dosage} ${m.frequency} × ${m.duration}`).join("\n")}`;
    sendWhatsApp(patient.phone, msg);
  };

  return (
    <>
      <PageHeader title={patient.name} description={`Patient ID ${patient.id} · Registered May 2025`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={exportAll}><Download className="mr-1.5 h-4 w-4" />Download all</Button>
            {canEditRx && <Button asChild variant="outline"><Link to="/app/prescriptions/new">New prescription</Link></Button>}
            <Button asChild><Link to="/app/appointments/new">Book follow-up</Link></Button>
          </div>
        } />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-info text-primary-foreground text-xl font-bold">
              {patient.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0">
              <div className="font-display text-lg font-bold">{patient.name}</div>
              <div className="text-xs text-muted-foreground">{patient.age} y · {patient.gender}</div>
              <Badge variant="outline" className="mt-1">{patient.status}</Badge>
            </div>
          </div>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> <span>{patient.phone}</span></div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <button className="hover:underline text-left" onClick={() => sendWhatsApp(patient.phone, `Hello ${patient.name}, this is ${user?.clinic}.`)}>
                {patient.phone} (WhatsApp)
              </button>
            </div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> <span>Kungsgatan 32, Stockholm</span></div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> <span>Last visit {patient.lastVisit}</span></div>
          </dl>
          <div className="mt-6 rounded-xl bg-warning/15 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-warning-foreground">
              <AlertTriangle className="h-3.5 w-3.5" /> Allergies & alerts
            </div>
            <div className="mt-1 text-sm">Penicillin · Pollen</div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="rx">
            <TabsList className="rounded-xl bg-muted/60 p-1 flex-wrap h-auto">
              <TabsTrigger value="rx" className="rounded-lg"><FileText className="mr-1.5 h-3.5 w-3.5" />Prescriptions</TabsTrigger>
              <TabsTrigger value="labs" className="rounded-lg"><FlaskConical className="mr-1.5 h-3.5 w-3.5" />Lab reports</TabsTrigger>
              <TabsTrigger value="bills" className="rounded-lg"><Receipt className="mr-1.5 h-3.5 w-3.5" />Bills</TabsTrigger>
              <TabsTrigger value="history" className="rounded-lg"><Calendar className="mr-1.5 h-3.5 w-3.5" />Visits</TabsTrigger>
              <TabsTrigger value="docs" className="rounded-lg"><FolderOpen className="mr-1.5 h-3.5 w-3.5" />Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="rx" className="mt-4 space-y-3">
              {myRx.length === 0 && <EmptyCard label="No prescriptions yet" />}
              {myRx.map(r => (
                <div key={r.id} className="rounded-2xl border bg-card p-5 shadow-soft">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">{r.id} · {r.date}</div>
                      <div className="font-display text-base font-semibold">{r.diagnosis}</div>
                      <div className="text-xs text-muted-foreground">{r.doctor}{r.followUp ? ` · Follow-up ${r.followUp}` : ""}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => printRx(r)}><Printer className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => shareRx(r)}><Send className="h-3.5 w-3.5" /></Button>
                      {canEditRx && <Button asChild size="sm" variant="ghost">
                        <Link to="/app/prescriptions/new" search={{ edit: r.id }}><Edit className="h-3.5 w-3.5" /></Link>
                      </Button>}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {r.medicines.map((m, i) => (
                      <li key={i} className="rounded-lg bg-muted/40 px-3 py-2 text-sm">
                        <span className="font-semibold">{m.name}</span>
                        <span className="text-muted-foreground text-xs"> — {m.dosage} · {m.frequency} · {m.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="labs" className="mt-4 space-y-3">
              {myLabs.length === 0 && <EmptyCard label="No lab reports yet" />}
              {myLabs.map(l => (
                <div key={l.id} className="rounded-2xl border bg-card p-5 shadow-soft">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">{l.id} · {l.date}{l.prescriptionId ? ` · linked ${l.prescriptionId}` : ""}</div>
                      <div className="font-display text-base font-semibold">{l.test}</div>
                    </div>
                    <Button size="sm" variant="ghost"
                      onClick={() => sendWhatsApp(patient.phone, `Lab report ${l.id} — ${l.test}: ${l.result} (ref ${l.reference})`)}>
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {l.fileName ? (
                    <div className="mt-3 rounded-lg border bg-muted/30 px-3 py-2 text-sm">📎 {l.fileName}</div>
                  ) : (
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div><div className="text-xs text-muted-foreground">Result</div><div className="font-semibold">{l.result}</div></div>
                      <div><div className="text-xs text-muted-foreground">Reference</div><div>{l.reference}</div></div>
                      {l.notes && <div className="col-span-2 text-xs text-muted-foreground">Note: {l.notes}</div>}
                    </div>
                  )}
                  <div className="mt-3 text-xs text-muted-foreground">Uploaded by {l.uploadedBy}</div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="bills" className="mt-4 rounded-2xl border bg-card shadow-soft">
              <Table>
                <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {myBills.length ? myBills.map(b => (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-xs">{b.id}</TableCell>
                      <TableCell>{b.date}</TableCell>
                      <TableCell className="text-right tabular-nums">₹{b.amount.toFixed(2)}</TableCell>
                      <TableCell><Badge variant={b.status === "Paid" ? "secondary" : b.status === "Overdue" ? "destructive" : "outline"}>{b.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost"
                          onClick={() => sendWhatsApp(patient.phone, `Invoice ${b.id} — ₹${b.amount.toFixed(2)} (${b.status})`)}>
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-6">No bills</TableCell></TableRow>}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="history" className="mt-4 rounded-2xl border bg-card shadow-soft">
              <Table>
                <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Doctor</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {visits.length ? visits.map(v => (
                    <TableRow key={v.id}><TableCell>{v.date} · {v.time}</TableCell><TableCell>{v.doctor}</TableCell><TableCell>{v.type}</TableCell><TableCell><Badge variant="secondary">{v.status}</Badge></TableCell></TableRow>
                  )) : <TableRow><TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-6">No visits yet</TableCell></TableRow>}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="docs" className="mt-4 rounded-2xl border bg-card p-8 text-center shadow-soft">
              <FolderOpen className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Uploaded documents appear here.</p>
              <Button asChild variant="outline" className="mt-3"><Link to="/app/files">Open file manager</Link></Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

function EmptyCard({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground shadow-soft">
      {label}
    </div>
  );
}
