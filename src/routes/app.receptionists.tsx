import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { receptionists } from "@/lib/sample-data";

export const Route = createFileRoute("/app/receptionists")({ component: ReceptionistsPage });

function ReceptionistsPage() {
  return (
    <>
      <PageHeader title="Receptionists" description="Front-desk staff at your clinic."
        actions={<Button>Add receptionist</Button>} />
      <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receptionists.map(r => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-info text-primary-foreground text-xs font-semibold">
                      {r.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                    <div className="font-semibold">{r.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{r.email}</TableCell>
                <TableCell>{r.phone}</TableCell>
                <TableCell>{r.shift}</TableCell>
                <TableCell><Badge variant="secondary">{r.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
