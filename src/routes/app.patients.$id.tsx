import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { patients, prescriptions, bills, appointments } from "@/lib/sample-data";
import { Phone, MapPin, MessageCircle, Calendar, AlertTriangle, FileText, Receipt, FolderOpen } from "lucide-react";

export const Route = createFileRoute("/app/patients/$id")({ component: PatientProfile });

function PatientProfile() {
  const { id } = Route.useParams();
  const patient = patients.find(p => p.id === id) ?? patients[0];
  const visits = appointments.filter(a => a.patientId === patient.id);
  const myRx = prescriptions.filter(r => r.patient === patient.name);
  const myBills = bills.filter(b => b.patient === patient.name);

  return (
    <>
      <PageHeader title={patient.name} description={`Patient ID ${patient.id} · Registered May 2025`}
        actions={
          <>
            <Button asChild variant="outline"><Link to="/app/prescriptions/new">New prescription</Link></Button>
            <Button asChild><Link to="/app/appointments/new">Book follow-up</Link></Button>
          </>
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
            <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-muted-foreground" /> <span>{patient.phone} (WhatsApp)</span></div>
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
          <Tabs defaultValue="history">
            <TabsList className="rounded-xl bg-muted/60 p-1">
              <TabsTrigger value="history" className="rounded-lg"><Calendar className="mr-1.5 h-3.5 w-3.5" />Visits</TabsTrigger>
              <TabsTrigger value="rx" className="rounded-lg"><FileText className="mr-1.5 h-3.5 w-3.5" />Prescriptions</TabsTrigger>
              <TabsTrigger value="bills" className="rounded-lg"><Receipt className="mr-1.5 h-3.5 w-3.5" />Bills</TabsTrigger>
              <TabsTrigger value="docs" className="rounded-lg"><FolderOpen className="mr-1.5 h-3.5 w-3.5" />Documents</TabsTrigger>
            </TabsList>
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
            <TabsContent value="rx" className="mt-4 rounded-2xl border bg-card shadow-soft">
              <Table>
                <TableHeader><TableRow><TableHead>RX</TableHead><TableHead>Date</TableHead><TableHead>Diagnosis</TableHead><TableHead>Medicines</TableHead></TableRow></TableHeader>
                <TableBody>
                  {myRx.length ? myRx.map(r => (
                    <TableRow key={r.id}><TableCell className="font-mono text-xs">{r.id}</TableCell><TableCell>{r.date}</TableCell><TableCell>{r.diagnosis}</TableCell><TableCell>{r.medicines}</TableCell></TableRow>
                  )) : <TableRow><TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-6">No prescriptions</TableCell></TableRow>}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="bills" className="mt-4 rounded-2xl border bg-card shadow-soft">
              <Table>
                <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {myBills.length ? myBills.map(b => (
                    <TableRow key={b.id}><TableCell className="font-mono text-xs">{b.id}</TableCell><TableCell>{b.date}</TableCell><TableCell className="text-right tabular-nums">€{b.amount.toFixed(2)}</TableCell><TableCell><Badge variant={b.status === "Paid" ? "secondary" : b.status === "Overdue" ? "destructive" : "outline"}>{b.status}</Badge></TableCell></TableRow>
                  )) : <TableRow><TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-6">No bills</TableCell></TableRow>}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="docs" className="mt-4 rounded-2xl border bg-card p-8 text-center shadow-soft">
              <FolderOpen className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Lab reports and uploaded documents appear here.</p>
              <Button asChild variant="outline" className="mt-3"><Link to="/app/files">Open file manager</Link></Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
