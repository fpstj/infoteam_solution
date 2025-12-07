import { AlertTriangle, CheckCircle2, CircleDashed, Info } from "lucide-react";

import { cn } from "@/lib/utils";

type NotificationSeverity = "critical" | "warning" | "info" | "maintenance";

type NotificationItem = {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  severity: NotificationSeverity;
};

const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Air conditioning not working in lobby",
    category: "hvac",
    timestamp: "2 days ago",
    severity: "critical",
  },
  {
    id: "2",
    title: "Flickering lights in hallway",
    category: "electrical",
    timestamp: "2 days ago",
    severity: "warning",
  },
  {
    id: "3",
    title: "Leaky faucet in office kitchen",
    category: "plumbing",
    timestamp: "4 days ago",
    severity: "info",
  },
  {
    id: "4",
    title: "Air conditioning not working in lobby",
    category: "hvac",
    timestamp: "5 days ago",
    severity: "critical",
  },
  {
    id: "5",
    title: "Flickering lights in hallway",
    category: "electrical",
    timestamp: "7 days ago",
    severity: "warning",
  },
  {
    id: "6",
    title: "Leaky faucet in office kitchen",
    category: "plumbing",
    timestamp: "12 days ago",
    severity: "info",
  },
];

const severityConfig: Record<
  NotificationSeverity,
  {
    icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
    badgeClass: string;
  }
> = {
  critical: {
    icon: AlertTriangle,
    iconClass: "text-semantic-error",
    badgeClass: "bg-semantic-error/10 text-semantic-error",
  },
  warning: {
    icon: Info,
    iconClass: "text-semantic-warning",
    badgeClass: "bg-semantic-warning/10 text-semantic-warning",
  },
  info: {
    icon: CheckCircle2,
    iconClass: "text-semantic-success",
    badgeClass: "bg-semantic-success/10 text-semantic-success",
  },
  maintenance: {
    icon: CircleDashed,
    iconClass: "text-text-secondary",
    badgeClass: "bg-surfaceMuted text-text-secondary",
  },
};

export function NotificationsPanel() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="rounded-lg border border-border bg-surfaceMuted/60 p-4 shadow-inner">
        <h3 className="text-sm font-semibold text-text-primary">
          Notifications
        </h3>
        <p className="text-xs text-text-secondary">
          Latest maintenance and tenant alerts
        </p>
        <div className="mt-4 space-y-3">
          {notifications.map((notification) => {
            const config = severityConfig[notification.severity];
            const Icon = config?.icon ?? Info;

            return (
              <article
                key={notification.id}
                className="flex gap-3 rounded-md border border-transparent bg-surface px-3 py-3 transition-colors hover:border-border hover:bg-surfaceHover"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    config?.badgeClass
                  )}
                >
                  <Icon className={cn("h-4 w-4", config?.iconClass)} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {notification.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-text-secondary">
                    <span className="uppercase tracking-wide">
                      Category: {notification.category}
                    </span>
                    <span className="text-text-secondary">•</span>
                    <span>{notification.timestamp}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
