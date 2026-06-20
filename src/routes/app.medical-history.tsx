import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { patients } from "@/lib/sample-data";
import { Activity } from "lucide-react";

export const Route = createFileRoute("/app/medical-history")({ component: MedicalHistory });

function MedicalHistory() {
  return (
    <>
      <PageHeader title="Medical history" description="Patient diagnoses, conditions and chronic care." />
      <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
        <Table>
          <TableHeader><TableRow><TableHead>Patient</TableHead><TableHead>Condition</TableHead><TableHead>Diagnosed</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {patients.slice(0, 6).map((p, i) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-info" />
                    <div className="font-semibold">{p.name}</div>
                  </div>
                </TableCell>
                <TableCell>{["Hypertension stage 1","Type 2 diabetes","Asthma","Migraine","Hypothyroidism","GERD"][i]}</TableCell>
                <TableCell className="text-muted-foreground">{["2023-04","2022-11","2021-06","2024-02","2020-09","2023-12"][i]}</TableCell>
                <TableCell><Badge variant={i % 3 === 0 ? "secondary" : "outline"}>{i % 3 === 0 ? "Stable" : "Monitoring"}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
