import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { subscriptions } from "@/lib/sample-data";

export const Route = createFileRoute("/app/subscriptions")({ component: SubscriptionsPage });

function badgeFor(days: number) {
  if (days < 0) return <Badge variant="destructive">Expired {Math.abs(days)}d ago</Badge>;
  if (days <= 1) return <Badge variant="destructive">1 day left</Badge>;
  if (days <= 3) return <Badge variant="destructive">{days} days left</Badge>;
  if (days <= 7) return <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">{days} days left</Badge>;
  if (days <= 15) return <Badge variant="outline">{days} days left</Badge>;
  return <Badge variant="secondary">{days} days left</Badge>;
}

function SubTable({ rows }: { rows: typeof subscriptions }) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Clinic</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Renews</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((s) => (
            <TableRow key={s.clinic}>
              <TableCell className="font-semibold">{s.clinic}</TableCell>
              <TableCell className="text-right tabular-nums">₹{s.price}</TableCell>
              <TableCell className="text-muted-foreground">{s.renews}</TableCell>
              <TableCell>{badgeFor(s.daysLeft)}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">Send reminder</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SubscriptionsPage() {
  const active = subscriptions.filter(s => s.status === "Active");
  const expiring = subscriptions.filter(s => s.daysLeft >= 0 && s.daysLeft <= 15);
  const expired = subscriptions.filter(s => s.status === "Expired");

  return (
    <>
      <PageHeader title="Subscriptions" description="Active, expiring, expired and renewal history." />
      <Tabs defaultValue="all">
        <TabsList className="rounded-xl bg-muted/60 p-1">
          <TabsTrigger value="all" className="rounded-lg">All ({subscriptions.length})</TabsTrigger>
          <TabsTrigger value="active" className="rounded-lg">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="expiring" className="rounded-lg">Expiring ({expiring.length})</TabsTrigger>
          <TabsTrigger value="expired" className="rounded-lg">Expired ({expired.length})</TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg">Renewal history</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4"><SubTable rows={subscriptions} /></TabsContent>
        <TabsContent value="active" className="mt-4"><SubTable rows={active} /></TabsContent>
        <TabsContent value="expiring" className="mt-4"><SubTable rows={expiring} /></TabsContent>
        <TabsContent value="expired" className="mt-4"><SubTable rows={expired} /></TabsContent>
        <TabsContent value="history" className="mt-4"><SubTable rows={subscriptions} /></TabsContent>
      </Tabs>
    </>
  );
}
