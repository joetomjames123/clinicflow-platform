import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { clinics } from "@/lib/sample-data";
import { Search, Plus, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/app/clinics/")({ component: ClinicsPage });

function ClinicsPage() {
  return (
    <>
      <PageHeader title="Clinics" description="All clinics on ClinicFlow."
        actions={<Button asChild><Link to="/app/clinics/new"><Plus className="mr-1.5 h-4 w-4" /> Add Clinic</Link></Button>} />
      <div className="rounded-2xl border bg-card shadow-soft">
        <div className="flex flex-wrap items-center gap-3 border-b p-4">
          <div className="relative min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search clinics, cities…" className="h-10 rounded-xl bg-muted/30 pl-9" />
          </div>
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clinic</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Doctors</TableHead>
                <TableHead className="text-right">Patients</TableHead>
                <TableHead>Renews</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinics.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground text-xs font-bold">
                        {c.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{c.city}</TableCell>
                  <TableCell><Badge variant="outline">{c.plan}</Badge></TableCell>
                  <TableCell className="text-right tabular-nums">{c.doctors}</TableCell>
                  <TableCell className="text-right tabular-nums">{c.patients.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{c.expires}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === "Active" ? "secondary" : c.status === "Expiring" ? "outline" : "destructive"}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right"><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
