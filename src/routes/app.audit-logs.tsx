import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auditLogs } from "@/lib/sample-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/app/audit-logs")({ component: AuditLogs });

function AuditLogs() {
  return (
    <>
      <PageHeader title="Audit logs" description="Every action taken in the platform, signed and timestamped." />
      <div className="rounded-2xl border bg-card shadow-soft">
        <div className="border-b p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by user or action…" className="h-10 rounded-xl bg-muted/30 pl-9" />
          </div>
        </div>
        <Table>
          <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Date</TableHead><TableHead>Time</TableHead></TableRow></TableHeader>
          <TableBody>
            {auditLogs.map((l, i) => (
              <TableRow key={i}>
                <TableCell className="font-semibold">{l.user}</TableCell>
                <TableCell>{l.action}</TableCell>
                <TableCell className="text-muted-foreground">{l.date}</TableCell>
                <TableCell className="font-mono text-xs">{l.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
