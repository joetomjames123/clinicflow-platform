import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const Route = createFileRoute("/request-demo")({
  head: () => ({
    meta: [
      { title: "Request a Demo — ClinicFlow" },
      { name: "description", content: "Book a 20-minute personalized walkthrough of ClinicFlow for your clinic." },
      { property: "og:title", content: "Request a Demo — ClinicFlow" },
      { property: "og:url", content: "https://pulse-clinic-pro.lovable.app/request-demo" },
    ],
    links: [{ rel: "canonical", href: "https://pulse-clinic-pro.lovable.app/request-demo" }],
  }),
  component: Demo,
});

const TYPES = ["General Clinic","Multi-Specialty","Dental","Physiotherapy","Dermatology","ENT","Orthopedic","Pediatric","Ayurveda","Homeopathy","Diagnostic Center","Private Practice"];

function Demo() {
  const [done, setDone] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Demo request received. Our team will reach out within 1 business day.");
    setDone(true);
  };

  if (done) {
    return (
      <MarketingShell>
        <section className="mx-auto max-w-xl px-4 py-24 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold">Thank you!</h1>
          <p className="mt-3 text-muted-foreground">
            Your demo request has been received. Our team will contact you on WhatsApp within 1 business day to confirm a time.
          </p>
        </section>
      </MarketingShell>
    );
  }

  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Request a demo</div>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            See ClinicFlow in your clinic.
          </h1>
          <p className="mt-4 text-muted-foreground">
            A friendly product expert will walk you through ClinicFlow in 20 minutes — tailored to your
            specialty and clinic size. No slides, no pressure.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Personalized for your specialty",
              "Live walkthrough of the workflow your team would use daily",
              "Honest answers about pricing, migration and support",
              "No card required, no commitment",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {x}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-6 shadow-soft sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clinic">Clinic name</Label>
              <Input id="clinic" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input id="phone" type="tel" required className="h-11 rounded-xl" />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Clinic type</Label>
              <Select>
                <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>{TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="notes">Anything we should know? (optional)</Label>
              <Textarea id="notes" rows={3} className="rounded-xl" placeholder="Team size, current software, urgency…" />
            </div>
          </div>
          <Button type="submit" className="mt-5 h-11 w-full rounded-xl font-semibold">Request demo</Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">We'll never share your details. One-click unsubscribe.</p>
        </form>
      </section>
    </MarketingShell>
  );
}
