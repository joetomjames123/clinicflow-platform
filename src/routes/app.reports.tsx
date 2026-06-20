import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/layout/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { revenueByMonth, visitsByWeek, doctors } from "@/lib/sample-data";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Users, Stethoscope, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/reports")({ component: ReportsPage });

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <h3 className="mb-4 font-display text-base font-semibold">{title}</h3>
      <div className="h-72">{children}</div>
    </div>
  );
}

function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Operational and financial insights." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue (6mo)" value="€167,550" tone="success" icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+18%", up: true }} />
        <StatCard label="Visits (week)" value="311" tone="info" icon={<Calendar className="h-4 w-4" />} />
        <StatCard label="New patients" value="84" icon={<Users className="h-4 w-4" />} trend={{ value: "+12%", up: true }} />
        <StatCard label="Doctor utilization" value="86%" tone="warning" icon={<Stethoscope className="h-4 w-4" />} />
      </div>
      <Tabs defaultValue="revenue" className="mt-6">
        <TabsList className="rounded-xl bg-muted/60 p-1">
          <TabsTrigger value="revenue" className="rounded-lg">Revenue</TabsTrigger>
          <TabsTrigger value="patients" className="rounded-lg">Patients</TabsTrigger>
          <TabsTrigger value="doctors" className="rounded-lg">Doctors</TabsTrigger>
          <TabsTrigger value="appointments" className="rounded-lg">Appointments</TabsTrigger>
          <TabsTrigger value="subscriptions" className="rounded-lg">Subscriptions</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card title="Monthly revenue">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByMonth} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs><linearGradient id="r2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--color-muted-foreground)" tickFormatter={(v) => `€${v/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" fill="url(#r2)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Revenue mix">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: "Consultation", value: 45 }, { name: "Procedures", value: 30 }, { name: "Medicines", value: 15 }, { name: "Lab", value: 10 }]} dataKey="value" innerRadius={50} outerRadius={90} paddingAngle={4}>
                  {COLORS.slice(0, 4).map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Legend /><Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="patients" className="mt-4">
          <Card title="New vs returning patients">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ m: "Jan", New: 32, Returning: 88 }, { m: "Feb", New: 41, Returning: 95 }, { m: "Mar", New: 38, Returning: 101 }, { m: "Apr", New: 54, Returning: 112 }, { m: "May", New: 61, Returning: 118 }, { m: "Jun", New: 72, Returning: 124 }]}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="m" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Legend />
                <Bar dataKey="New" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Returning" fill="var(--color-info)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="doctors" className="mt-4">
          <Card title="Patients per doctor">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={doctors} margin={{ left: 32 }}>
                <CartesianGrid stroke="var(--color-border)" horizontal={false} strokeDasharray="3 3" />
                <XAxis type="number" fontSize={12} /><YAxis dataKey="name" type="category" fontSize={11} width={140} />
                <Tooltip />
                <Bar dataKey="patients" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="appointments" className="mt-4">
          <Card title="Visits this week">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitsByWeek}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
                <Line type="monotone" dataKey="visits" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="subscriptions" className="mt-4">
          <Card title="Plan distribution">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: "Starter", value: 2 }, { name: "Pro", value: 3 }, { name: "Enterprise", value: 1 }]} dataKey="value" outerRadius={100}>
                  {COLORS.slice(0, 3).map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Legend /><Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
