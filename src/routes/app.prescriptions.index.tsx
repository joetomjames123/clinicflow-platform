import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prescriptions } from "@/lib/sample-data";
import { Plus, FileText } from "lucide-react";

export const Route = createFileRoute("/app/prescriptions/")({ component: PrescriptionsPage });

function PrescriptionsPage() {
  return (
    <>
      <PageHeader title="Prescriptions" description="Issued prescriptions and templates."
        actions={<Button asChild><Link to="/app/prescriptions/new"><Plus className="mr-1.5 h-4 w-4" />New prescription</Link></Button>} />
      <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
        <Table>
          <TableHeader><TableRow><TableHead>RX</TableHead><TableHead>Patient</TableHead><TableHead>Doctor</TableHead><TableHead>Diagnosis</TableHead><TableHead className="text-right">Medicines</TableHead><TableHead>Date</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {prescriptions.map(r => (
              <TableRow key={r.id}>
                <TableCell><div className="flex items-center gap-2 font-mono text-xs"><FileText className="h-3.5 w-3.5 text-info" />{r.id}</div></TableCell>
                <TableCell className="font-semibold">{r.patient}</TableCell>
                <TableCell>{r.doctor}</TableCell>
                <TableCell className="text-muted-foreground">{r.diagnosis}</TableCell>
                <TableCell className="text-right tabular-nums">{r.medicines}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost">PDF preview</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
