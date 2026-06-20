import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, LifeBuoy, Clock } from "lucide-react";

export const Route = createFileRoute("/app/support")({ component: SupportPage });

function SupportPage() {
  return (
    <>
      <PageHeader title="Support" description="We're here to help, 24/7." />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary"><LifeBuoy className="h-6 w-6" /></div>
          <h3 className="mt-4 font-display text-lg font-bold">ClinicFlow Care</h3>
          <p className="text-sm text-muted-foreground">Your dedicated support team for onboarding, integrations and day-to-day help.</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Response under 1 hour</div>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-soft space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reach us</div>
          <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /><div><div className="text-sm font-semibold">+46 8 555 0199</div><div className="text-xs text-muted-foreground">Phone · Mon–Fri 8am–8pm CET</div></div></div>
          <div className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-primary" /><div><div className="text-sm font-semibold">+46 70 884 1010</div><div className="text-xs text-muted-foreground">WhatsApp · 24/7</div></div></div>
          <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /><div><div className="text-sm font-semibold">care@clinicflow.io</div><div className="text-xs text-muted-foreground">Email · replies within 2 hours</div></div></div>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="font-display text-base font-semibold">Open a ticket</h3>
          <p className="text-sm text-muted-foreground">Tell us what's going on and we'll dispatch the right specialist.</p>
          <Button className="mt-4 w-full">New support request</Button>
        </div>
      </div>
    </>
  );
}
