import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — ClinicFlow" },
      { name: "description", content: "Simple, transparent pricing for clinics of every size. One plan, everything included." },
      { property: "og:title", content: "Pricing — ClinicFlow" },
      { property: "og:url", content: "https://pulse-clinic-pro.lovable.app/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://pulse-clinic-pro.lovable.app/pricing" }],
  }),
  component: Pricing,
});

const INCLUDED = [
  "Unlimited patients & visits",
  "Unlimited doctors & receptionists",
  "Appointments, calendar & reminders",
  "Branded prescription PDFs",
  "Billing, invoices & UPI receipts",
  "Document & file management",
  "Reports & analytics",
  "Audit logs",
  "Role-based access control",
  "Daily encrypted backups",
  "Email + WhatsApp support",
  "Free onboarding & training",
];

function Pricing() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Pricing</div>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            One simple plan. Everything included.
          </h1>
          <p className="mt-4 text-muted-foreground">
            No tiers, no hidden add-ons. Every clinic gets the full ClinicFlow experience.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border bg-card shadow-pop">
          <div className="bg-gradient-to-br from-primary to-info px-8 py-8 text-primary-foreground">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Most popular
            </div>
            <div className="mt-4 font-display text-2xl font-bold">ClinicFlow Pro</div>
            <div className="mt-1 text-sm text-primary-foreground/85">Everything you need, no surprises.</div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold">₹2,499</span>
              <span className="text-sm text-primary-foreground/85">/ month per clinic</span>
            </div>
            <div className="mt-1 text-xs text-primary-foreground/75">
              Billed annually at ₹24,990 · Save 17% · Includes GST
            </div>
          </div>
          <div className="px-8 py-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-xl px-6 font-semibold">
                <Link to="/subscribe">Start subscription</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-xl px-6 font-semibold">
                <Link to="/request-demo">Book a demo first</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Free onboarding", "Our team migrates your patient data and trains your staff."],
            ["30-day money back", "Not the right fit? Get a full refund within 30 days."],
            ["Cancel anytime", "No long-term contracts. Pause or cancel from settings."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border bg-card p-5 text-center shadow-soft">
              <div className="text-sm font-semibold">{t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
