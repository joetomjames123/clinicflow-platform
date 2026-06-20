import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { notifications } from "@/lib/sample-data";
import { BellRing, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/notifications")({ component: NotificationsPage });

function NotificationsPage() {
  const toneMap = {
    warning: "bg-warning/20 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
    info: "bg-info/10 text-info",
    success: "bg-success/15 text-success",
  } as const;
  return (
    <>
      <PageHeader title="Notifications" description="Subscription, payment and platform alerts."
        actions={<Button variant="outline"><CheckCheck className="mr-1.5 h-4 w-4" /> Mark all read</Button>} />
      <div className="divide-y rounded-2xl border bg-card shadow-soft">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-3 p-4">
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${toneMap[n.type as keyof typeof toneMap]}`}>
              <BellRing className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold">{n.title}</div>
              <div className="text-xs text-muted-foreground">{n.time}</div>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        ))}
      </div>
    </>
  );
}
