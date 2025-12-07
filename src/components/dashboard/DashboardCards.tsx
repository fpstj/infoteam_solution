import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  Flame,
  Leaf,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  type: "error" | "warning" | "success";
  title: string;
  subtitle: string;
}

export function AlertCard({ type, title, subtitle }: AlertCardProps) {
  const colors = {
    error: {
      container:
        "border-l-red-500 bg-red-50/80 dark:border-l-red-400 dark:bg-red-900/30",
      icon: "text-red-600 dark:text-red-300",
      heading: "text-red-900 dark:text-red-100",
      subtext: "text-red-900/80 dark:text-red-200/80",
      Icon: AlertTriangle,
    },
    warning: {
      container:
        "border-l-yellow-500 bg-yellow-50/80 dark:border-l-yellow-400 dark:bg-yellow-900/30",
      icon: "text-yellow-600 dark:text-yellow-300",
      heading: "text-yellow-900 dark:text-yellow-100",
      subtext: "text-yellow-900/80 dark:text-yellow-200/80",
      Icon: Flame,
    },
    success: {
      container:
        "border-l-green-500 bg-green-50/80 dark:border-l-green-400 dark:bg-green-900/30",
      icon: "text-green-600 dark:text-green-300",
      heading: "text-green-900 dark:text-green-100",
      subtext: "text-green-900/80 dark:text-green-200/80",
      Icon: Leaf,
    },
  };

  const config = colors[type];
  const Icon = config.Icon;

  return (
    <Card className={cn("p-4 border-l-4", config.container)}>
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 flex-shrink-0", config.icon)} />
        <div>
          <h3 className={cn("text-sm font-semibold", config.heading)}>
            {title}
          </h3>
          <p className={cn("mt-1 text-xs", config.subtext)}>{subtitle}</p>
        </div>
      </div>
    </Card>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  subtitle?: string;
}

export function MetricCard({
  icon,
  title,
  value,
  trend,
  subtitle,
}: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surfaceMuted text-primary">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-bold text-text-primary">{value}</p>

        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm",
              trend.positive ? "text-semantic-success" : "text-semantic-error"
            )}
          >
            {trend.positive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{trend.value}</span>
          </div>
        )}

        {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
      </div>
    </Card>
  );
}
