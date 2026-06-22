import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, ArrowRight, CalendarDays, CheckCircle2, FileText, Receipt, Shield,
  Sparkles, Stethoscope, UsersRound, Star, Zap, Globe, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClinicFlow — Modern Clinic Management Software for India" },
      { name: "description", content: "Run a calmer clinic. ClinicFlow is premium clinic management software for doctors, receptionists and clinic owners — patients, appointments, prescriptions, billing." },
      { property: "og:title", content: "ClinicFlow — Modern Clinic Management Software" },
      { property: "og:description", content: "Premium clinic management for clinics across India." },
      { property: "og:url", content: "https://pulse-clinic-pro.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://pulse-clinic-pro.lovable.app/" }],
  }),
  component: Home,
});

const CLINIC_TYPES = [
  "General", "Multi-Specialty", "Dental", "Physiotherapy", "Dermatology",
  "ENT", "Orthopedic", "Pediatric", "Ayurveda", "Homeopathy", "Diagnostic", "Private Practice",
];

const FEATURES = [
  { icon: UsersRound, title: "Patient Management", desc: "Auto-generated patient IDs, medical history, allergies, timeline & documents — all in one premium profile." },
  { icon: CalendarDays, title: "Smart Appointments", desc: "Daily, weekly and calendar views. Book, reschedule and cancel in two clicks." },
  { icon: FileText, title: "Beautiful Prescriptions", desc: "Branded prescription PDFs with clinic logo, doctor signature and download/print built in." },
  { icon: Receipt, title: "Billing & Invoices", desc: "Consultation, treatment and medicine charges. Discounts, taxes and payment status tracked." },
  { icon: Shield, title: "Role-Based Access", desc: "Super Admin, Clinic Admin, Doctor and Receptionist — each with their own workspace." },
  { icon: Stethoscope, title: "Doctor Workspace", desc: "Today's patients, follow-ups, medical history and private doctor notes per patient." },
];

const STATS = [
  { v: "340+", l: "Clinics" },
  { v: "1.2M+", l: "Patients" },
  { v: "99.99%", l: "Uptime" },
  { v: "4.9★", l: "Rating" },
];

const TESTIMONIALS = [
  { name: "Dr. Rohan Mehta", role: "Founder, Mehta Multi-Specialty", body: "We moved from paper files to ClinicFlow in a weekend. The prescription PDFs alone saved us hours every day." },
  { name: "Sister Priya Nair", role: "Front Desk, Aster Dental", body: "Registering a new patient takes under a minute. The team picked it up without any training." },
  { name: "Dr. Anjali Singh", role: "Dermatologist, Skinology Clinic", body: "I finally have one place for medical history, allergies and follow-ups. It feels built for doctors, not accountants." },
];

function Home() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary-soft via-background to-background blur-3xl opacity-70" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New · Multi-clinic dashboards, prescription PDFs and billing
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Run a calmer clinic.<br />
              <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                The all-in-one clinic OS.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              ClinicFlow is the modern clinic management platform for India — patients, appointments,
              prescriptions, billing and reports, all in one beautifully simple workspace.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-12 rounded-xl px-6 text-sm font-semibold shadow-soft">
                <Link to="/request-demo">Request a demo <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-6 text-sm font-semibold">
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
              No credit card required · 14-day onboarding support · Cancel anytime
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="rounded-2xl border bg-card p-5 text-center shadow-soft">
                <div className="font-display text-2xl font-bold">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Product mock */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="relative rounded-3xl border bg-gradient-to-br from-card to-muted/40 p-3 shadow-pop">
              <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-2 border-b pb-3">
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">NH</div>
                  <div className="text-sm font-semibold">Northwood Health</div>
                  <div className="ml-auto flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <div className="h-2 w-2 rounded-full bg-warning" />
                    <div className="h-2 w-2 rounded-full bg-destructive" />
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  {[
                    ["Today's revenue", "₹ 48,200"],
                    ["Appointments", "23"],
                    ["New patients", "7"],
                    ["Pending bills", "4"],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-xl border bg-background p-4">
                      <div className="text-xs text-muted-foreground">{l}</div>
                      <div className="mt-1 font-display text-lg font-bold">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="sm:col-span-2 rounded-xl border bg-background p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today's queue</div>
                    <div className="mt-3 space-y-2">
                      {[
                        ["Aarav Sharma", "10:30 AM", "Consultation"],
                        ["Meera Iyer", "10:45 AM", "Follow-up"],
                        ["Vikram Joshi", "11:00 AM", "Dermatology"],
                      ].map(([n, t, k]) => (
                        <div key={n} className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2">
                          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-primary text-xs font-semibold">
                            {n.split(" ").map((p) => p[0]).join("")}
                          </div>
                          <div className="text-sm font-medium">{n}</div>
                          <div className="ml-auto text-xs text-muted-foreground">{t} · {k}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Revenue</div>
                    <div className="mt-3 flex h-32 items-end gap-1.5">
                      {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary to-info" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic types */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Built for every kind of clinic
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {CLINIC_TYPES.map((t) => (
              <div key={t} className="rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium shadow-soft">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Features</div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your clinic runs on, in one place.
          </h2>
          <p className="mt-3 text-muted-foreground">
            From the front desk to the consulting room — ClinicFlow brings every workflow together.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="group rounded-2xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/features">Explore all features <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-muted/30 border-y">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              A workspace tailored to every role.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Each person on your team sees exactly what they need — no clutter, no confusion.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, role: "Super Admin", desc: "Manage clinics, subscriptions and platform-wide analytics." },
              { icon: Building2, role: "Clinic Admin", desc: "Doctors, receptionists, billing and clinic-wide reports." },
              { icon: Stethoscope, role: "Doctor", desc: "Patient history, prescriptions and private clinical notes." },
              { icon: UsersRound, role: "Receptionist", desc: "Registrations, appointments and front-desk billing." },
            ].map((r) => {
              const I = r.icon;
              return (
                <div key={r.role} className="rounded-2xl border bg-card p-6 shadow-soft">
                  <I className="h-6 w-6 text-primary" />
                  <div className="mt-3 font-display text-base font-semibold">{r.role}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{r.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by clinics across India.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-warning">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed">"{t.body}"</p>
              <div className="mt-5 border-t pt-4">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Shield, t: "Bank-grade security", d: "ISO 27001 certified, end-to-end encryption" },
              { icon: Zap, t: "Lightning fast", d: "<100ms response across 99.99% uptime" },
              { icon: Globe, t: "Built for India", d: "Hindi-friendly, GST-aware, UPI receipts" },
            ].map((x) => {
              const I = x.icon;
              return (
                <div key={x.t} className="flex items-start gap-3 rounded-2xl border bg-card p-5">
                  <I className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <div className="text-sm font-semibold">{x.t}</div>
                    <div className="text-xs text-muted-foreground">{x.d}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-info p-10 text-center text-primary-foreground shadow-pop sm:p-16">
          <Activity className="mx-auto h-10 w-10" strokeWidth={2.5} />
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to modernize your clinic?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Join 340+ clinics that switched to ClinicFlow. Set up in under a day.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-xl px-6 text-sm font-semibold">
              <Link to="/request-demo">Request a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-white/30 bg-white/10 px-6 text-sm font-semibold text-primary-foreground hover:bg-white/20">
              <Link to="/subscribe">Start subscription</Link>
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-primary-foreground/80">
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> No credit card</span>
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Free onboarding</span>
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Cancel anytime</span>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
