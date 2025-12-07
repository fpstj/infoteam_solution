import * as React from "react";
import { Tooltip } from "recharts";
import { cn } from "@/lib/utils";

type ChartConfigItem = {
  label: string;
  color: string;
};

export type ChartConfig = Record<string, ChartConfigItem>;

interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChartContext() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("Chart components must be used within a <ChartContainer>");
  }
  return context;
}

export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("grid gap-4", className)} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  );
}

export interface ChartLegendProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ChartLegend({
  className,
  children,
  ...props
}: ChartLegendProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 text-sm text-text-secondary",
        className
      )}
      {...props}
    >
      {children ?? <ChartLegendContent />}
    </div>
  );
}

export interface ChartLegendContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ChartLegendContent({
  className,
  ...props
}: ChartLegendContentProps) {
  const { config } = useChartContext();

  if (!config || Object.keys(config).length === 0) {
    return null;
  }

  return (
    <div
      className={cn("flex flex-wrap items-center gap-4", className)}
      {...props}
    >
      {Object.entries(config).map(([key, item]) => (
        <div key={key} className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
            aria-hidden
          />
          <span className="text-sm text-text-secondary">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export interface ChartTooltipProps
  extends Omit<React.ComponentProps<typeof Tooltip>, "content"> {
  content?: React.ComponentProps<typeof Tooltip>["content"];
}

export function ChartTooltip({ content, ...props }: ChartTooltipProps) {
  const fallbackContent = <ChartTooltipContent />;
  return <Tooltip {...props} content={content ?? fallbackContent} />;
}

type ValueFormatter = (
  value: number | string | undefined,
  item: TooltipDataItem
) => React.ReactNode;

type TooltipDataItem = {
  dataKey?: string | number;
  color?: string;
  name?: string;
  value?: number | string;
  payload?: {
    name?: string;
    [key: string]: unknown;
  };
};

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: TooltipDataItem[];
  label?: string | number;
  className?: string;
  indicator?: "dot" | "line";
  valueFormatter?: ValueFormatter;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  indicator = "dot",
  valueFormatter,
}: ChartTooltipContentProps) {
  const { config } = useChartContext();

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const items = payload.filter((item): item is TooltipDataItem =>
    Boolean(item && item.dataKey)
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-md border border-border bg-surface px-3 py-2 text-xs shadow-[0_12px_30px_rgba(var(--shadow-rgb),0.18)]",
        className
      )}
    >
      {label && <p className="mb-1 font-medium text-text-primary">{label}</p>}
      <div className="space-y-1">
        {items.map((item) => {
          const key = String(item.dataKey);
          const payloadName = item.payload?.name;
          const payloadKey =
            typeof payloadName === "string" ? payloadName : undefined;
          const configItem =
            (payloadKey ? config[payloadKey] : undefined) ?? config[key];
          const color =
            configItem?.color ?? item.color ?? "rgb(var(--text-primary))";
          const name = configItem?.label ?? payloadKey ?? item.name ?? key;
          const value = item.value;
          const formattedValue = valueFormatter
            ? valueFormatter(value, item)
            : value;

          return (
            <div key={key} className="flex items-center gap-2">
              <Marker indicator={indicator} color={color} />
              <span className="text-text-secondary">{name}</span>
              <span className="font-semibold text-text-primary">
                {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface MarkerProps {
  indicator: "dot" | "line";
  color: string;
}

function Marker({ indicator, color }: MarkerProps) {
  if (indicator === "line") {
    return (
      <span
        className="h-2 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
    );
  }

  return (
    <span
      className="h-2.5 w-2.5 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}
