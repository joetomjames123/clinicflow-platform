import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { doctors, receptionists } from "@/lib/sample-data";

export const Route = createFileRoute("/app/users")({ component: UsersPage });

function UsersPage() {
  const all = [
    ...doctors.map(d => ({ id: d.id, name: d.name, email: d.email, role: "Doctor", status: d.status })),
    ...receptionists.map(r => ({ id: r.id, name: r.name, email: r.email, role: "Receptionist", status: r.status })),
    { id: "AD-01", name: "Marcus Lindqvist", email: "marcus@northwood.health", role: "Clinic Admin", status: "Active" },
    { id: "SA-01", name: "Helena Vance", email: "helena@clinicflow.io", role: "Super Admin", status: "Active" },
  ];
  return (
    <>
      <PageHeader title="Users" description="Everyone with access to the platform."
        actions={<Button>Invite user</Button>} />
      <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {all.map(u => (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-info text-primary-foreground text-xs font-semibold">
                      {u.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell><Badge variant="outline">{u.role}</Badge></TableCell>
                <TableCell><Badge variant={u.status === "Active" ? "secondary" : "outline"}>{u.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
