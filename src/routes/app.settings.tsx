import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

function SettingsPage() {
  const { user } = useAuth();
  return (
    <>
      <PageHeader title="Settings" description="Manage your clinic preferences and integrations." />
      <Tabs defaultValue="clinic">
        <TabsList className="rounded-xl bg-muted/60 p-1">
          <TabsTrigger value="clinic" className="rounded-lg">Clinic</TabsTrigger>
          <TabsTrigger value="hours" className="rounded-lg">Working hours</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="clinic" className="mt-4 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border bg-card p-6 shadow-soft space-y-4">
            <h3 className="font-display text-base font-semibold">Clinic profile</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5 col-span-2"><Label>Clinic name</Label><Input className="h-11 rounded-xl" defaultValue={user?.clinic} /></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input className="h-11 rounded-xl" defaultValue="+46 8 555 0123" /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input className="h-11 rounded-xl" defaultValue="hello@northwood.health" /></div>
              <div className="space-y-1.5 col-span-2"><Label>Address</Label><Textarea rows={2} className="rounded-xl" defaultValue="Kungsgatan 32, 111 35 Stockholm, Sweden" /></div>
            </div>
            <Button onClick={() => toast.success("Saved")}>Save changes</Button>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="font-display text-base font-semibold">Clinic logo</h3>
            <div className="mt-4 grid place-items-center aspect-square rounded-xl border-2 border-dashed bg-muted/30 text-xs text-muted-foreground">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-primary text-primary-foreground font-display text-2xl font-bold">{user?.clinicLogo}</div>
            </div>
            <Button variant="outline" className="mt-3 w-full">Upload new logo</Button>
          </div>
        </TabsContent>

        <TabsContent value="hours" className="mt-4 rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="font-display text-base font-semibold">Working hours</h3>
          <div className="mt-4 divide-y">
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d, i) => (
              <div key={d} className="grid grid-cols-[120px_1fr_auto_auto] items-center gap-3 py-3">
                <div className="text-sm font-semibold">{d}</div>
                <div className="text-xs text-muted-foreground">{i >= 5 ? "Weekend" : "Weekday"}</div>
                <Input type="time" defaultValue="09:00" className="h-10 w-28 rounded-lg" disabled={i === 6} />
                <Input type="time" defaultValue="18:00" className="h-10 w-28 rounded-lg" disabled={i === 6} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 rounded-2xl border bg-card p-6 shadow-soft space-y-4">
          {["New appointment booked","Payment received","Subscription expiring","Patient signed prescription"].map(t => (
            <div key={t} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
              <div className="text-sm font-medium">{t}</div>
              <Switch defaultChecked />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="security" className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
            <h3 className="font-display text-base font-semibold">Password</h3>
            <div className="space-y-1.5"><Label>Current password</Label><Input type="password" className="h-11 rounded-xl" /></div>
            <div className="space-y-1.5"><Label>New password</Label><Input type="password" className="h-11 rounded-xl" /></div>
            <Button>Update password</Button>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-soft space-y-3">
            <h3 className="font-display text-base font-semibold">Two-factor auth</h3>
            <p className="text-sm text-muted-foreground">Protect your account with a second factor.</p>
            <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
              <span className="text-sm font-medium">Authenticator app</span><Switch />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
