import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patients } from "@/lib/sample-data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/app/billing/new")({ component: NewBill });

function NewBill() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [consult, setConsult] = useState(50);
  const [treatment, setTreatment] = useState(0);
  const [meds, setMeds] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const subtotal = consult + treatment + meds;
  const total = Math.max(0, subtotal - discount) * (1 + tax / 100);

  return (
    <>
      <PageHeader title="Create bill" description="Issue an invoice to a patient." />
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Bill created"); navigate({ to: "/app/billing" }); }}
        className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
            <div className="space-y-1.5"><Label>Patient</Label>
              <Select><SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Select patient" /></SelectTrigger>
                <SelectContent>{patients.map(p => <SelectItem key={p.id} value={p.id}>{p.name} — {p.id}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Consultation fee (€)</Label><Input type="number" className="h-11 rounded-xl" value={consult} onChange={e => setConsult(+e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Treatment charges (€)</Label><Input type="number" className="h-11 rounded-xl" value={treatment} onChange={e => setTreatment(+e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Medicine charges (€)</Label><Input type="number" className="h-11 rounded-xl" value={meds} onChange={e => setMeds(+e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Discount (€)</Label><Input type="number" className="h-11 rounded-xl" value={discount} onChange={e => setDiscount(+e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Tax (%)</Label><Input type="number" className="h-11 rounded-xl" value={tax} onChange={e => setTax(+e.target.value)} /></div>
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{user?.clinic}</div>
            <h3 className="mt-2 font-display text-lg font-bold">Invoice preview</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Consultation</dt><dd className="tabular-nums">€{consult.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt>Treatment</dt><dd className="tabular-nums">€{treatment.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt>Medicines</dt><dd className="tabular-nums">€{meds.toFixed(2)}</dd></div>
              <div className="flex justify-between text-muted-foreground"><dt>Discount</dt><dd className="tabular-nums">- €{discount.toFixed(2)}</dd></div>
              <div className="flex justify-between text-muted-foreground"><dt>Tax</dt><dd className="tabular-nums">{tax}%</dd></div>
              <div className="my-2 border-t" />
              <div className="flex justify-between font-display text-base font-bold"><dt>Total</dt><dd className="tabular-nums">€{total.toFixed(2)}</dd></div>
            </dl>
          </section>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate({ to: "/app/billing" })}>Cancel</Button>
            <Button type="submit" className="flex-1">Create bill</Button>
          </div>
        </aside>
      </form>
    </>
  );
}
