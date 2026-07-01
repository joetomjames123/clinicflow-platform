import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { followUps as INITIAL, type FollowUp } from "@/lib/sample-data";
import { CalendarClock, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/followups")({ component: FollowUpsPage });

function FollowUpsPage() {
  const [rows, setRows] = useState<FollowUp[]>(INITIAL);

  const mark = (id: string, status: FollowUp["status"]) => {
    setRows(rs => rs.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Follow-up ${status.toLowerCase()}`);
  };

  const pending = rows.filter(r => r.status === "Pending").length;

  return (
    <>
      <PageHeader
        title="Follow-ups"
        description={`${pending} pending follow-up${pending === 1 ? "" : "s"} scheduled from your prescriptions.`}
      />
      <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Follow-up</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <CalendarClock className="h-3.5 w-3.5 text-info" />{r.id}
                  </div>
                </TableCell>
                <TableCell>
                  <Link to="/app/patients/$id" params={{ id: r.patientId }} className="font-semibold hover:underline">
                    {r.patient}
                  </Link>
                  <div className="text-xs text-muted-foreground font-mono">{r.patientId}</div>
                </TableCell>
                <TableCell className="text-muted-foreground">{r.reason}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>
                  <Badge variant={r.status === "Done" ? "secondary" : r.status === "Rescheduled" ? "outline" : "default"}>
                    {r.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="sm" variant="ghost" onClick={() => mark(r.id, "Done")}>
                      <Check className="mr-1 h-3.5 w-3.5" />Done
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => mark(r.id, "Rescheduled")}>
                      <RotateCcw className="mr-1 h-3.5 w-3.5" />Reschedule
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
