import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard } from "@/components/layout/stat-card";
import { bills } from "@/lib/sample-data";
import { Receipt, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/app/billing/")({ component: BillingPage });

function BillingPage() {
  const paid = bills.filter(b => b.status === "Paid").reduce((s, b) => s + b.amount, 0);
  const pending = bills.filter(b => b.status === "Pending").reduce((s, b) => s + b.amount, 0);
  const overdue = bills.filter(b => b.status === "Overdue").reduce((s, b) => s + b.amount, 0);

  return (
    <>
      <PageHeader title="Billing" description="Invoices, payments and reconciliations."
        actions={<Button asChild><Link to="/app/billing/new">Create bill</Link></Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Collected (June)" value={`€${paid.toFixed(2)}`} tone="success" icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Pending" value={`€${pending.toFixed(2)}`} tone="warning" icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Overdue" value={`€${overdue.toFixed(2)}`} tone="destructive" icon={<AlertCircle className="h-4 w-4" />} />
        <StatCard label="Invoices issued" value={bills.length} icon={<Receipt className="h-4 w-4" />} />
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border bg-card shadow-soft">
        <Table>
          <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Patient</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Method</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {bills.map(b => (
              <TableRow key={b.id}>
                <TableCell className="font-mono text-xs">{b.id}</TableCell>
                <TableCell className="font-semibold">{b.patient}</TableCell>
                <TableCell className="text-muted-foreground">{b.date}</TableCell>
                <TableCell className="text-right tabular-nums">€{b.amount.toFixed(2)}</TableCell>
                <TableCell>{b.method}</TableCell>
                <TableCell><Badge variant={b.status === "Paid" ? "secondary" : b.status === "Overdue" ? "destructive" : "outline"}>{b.status}</Badge></TableCell>
                <TableCell className="text-right"><Button variant="ghost" size="sm">View</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
