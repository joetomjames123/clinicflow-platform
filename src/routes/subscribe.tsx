import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const Route = createFileRoute("/subscribe")({
  head: () => ({
    meta: [
      { title: "Subscription Request — ClinicFlow" },
      { name: "description", content: "Submit your payment details to activate your ClinicFlow subscription." },
      { property: "og:title", content: "Subscription Request — ClinicFlow" },
      { property: "og:url", content: "https://pulse-clinic-pro.lovable.app/subscribe" },
    ],
    links: [{ rel: "canonical", href: "https://pulse-clinic-pro.lovable.app/subscribe" }],
  }),
  component: Subscribe,
});

function Subscribe() {
  const [done, setDone] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Subscription request submitted. Verification within 24 hours.");
    setDone(true);
  };

  if (done) {
    return (
      <MarketingShell>
        <section className="mx-auto max-w-xl px-4 py-24 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold">Subscription requested</h1>
          <p className="mt-3 text-muted-foreground">
            Our team will verify your payment within 24 hours and activate your clinic workspace.
            You'll receive login details on WhatsApp.
          </p>
        </section>
      </MarketingShell>
    );
  }

  return (
    <MarketingShell>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Subscribe</div>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Activate your clinic.</h1>
          <p className="mt-3 text-muted-foreground">
            Pay via UPI / Bank Transfer and upload your receipt. Our team verifies within 24 hours.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border bg-gradient-to-br from-primary-soft/40 to-card p-6 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payment details</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <div className="text-xs text-muted-foreground">UPI ID</div>
              <div className="font-mono text-sm font-semibold">clinicflow@hdfcbank</div>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <div className="text-xs text-muted-foreground">Bank Account</div>
              <div className="font-mono text-sm font-semibold">HDFC · 50100123456789</div>
              <div className="text-xs text-muted-foreground">IFSC: HDFC0001234</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Amount: <span className="font-semibold text-foreground">₹24,990</span> (annual, incl. GST)
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 rounded-2xl border bg-card p-6 shadow-soft sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="clinic">Clinic name</Label>
              <Input id="clinic" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="owner">Owner name</Label>
              <Input id="owner" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">WhatsApp</Label>
              <Input id="phone" type="tel" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tx">Transaction ID</Label>
              <Input id="tx" required placeholder="UPI ref / UTR" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="amt">Amount paid</Label>
              <Input id="amt" required defaultValue="₹24,990" className="h-11 rounded-xl" />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Payment screenshot</Label>
              <label className="flex h-28 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground transition-colors hover:bg-muted/60">
                <Upload className="h-4 w-4" />
                {file ?? "Click to upload PNG or JPG"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)} />
              </label>
            </div>
          </div>
          <Button type="submit" className="mt-6 h-11 w-full rounded-xl font-semibold">Submit for verification</Button>
        </form>
      </section>
    </MarketingShell>
  );
}
