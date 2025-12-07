import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import type { CostCategory, RevenueDataPoint } from "./types.ts";
import { BAR_HEIGHT_MULTIPLIER } from "./constants";

const revenueSeries = [
  {
    key: "revenueScaled",
    label: "Revenue",
    color: "rgb(var(--primary))",
    originalKey: "revenue",
  },
  {
    key: "expensesScaled",
    label: "Cost",
    color: "rgb(var(--error))",
    originalKey: "expenses",
  },
  {
    key: "profitScaled",
    label: "Profit",
    color: "rgb(var(--success))",
    originalKey: "profit",
  },
] as const;

type OverviewTabProps = {
  revenueData: RevenueDataPoint[];
  costCategories: CostCategory[];
};

const revenueChartConfig: ChartConfig = revenueSeries.reduce<ChartConfig>(
  (acc, entry) => {
    acc[entry.key] = { label: entry.label, color: entry.color };
    return acc;
  },
  {}
);

const formatAxisTick = (value: number) =>
  `€${Math.round(value / BAR_HEIGHT_MULTIPLIER / 1000)}k`;

const formatCurrencyValue = (value: number) =>
  `€${value.toLocaleString("en-US")}`;

export function OverviewTab({ revenueData, costCategories }: OverviewTabProps) {
  const revenueChartData = revenueData.map((entry) => ({
    month: entry.month,
    revenue: entry.revenue,
    expenses: entry.expenses,
    profit: entry.profit,
    revenueScaled: entry.revenue * BAR_HEIGHT_MULTIPLIER,
    expensesScaled: entry.expenses * BAR_HEIGHT_MULTIPLIER,
    profitScaled: entry.profit * BAR_HEIGHT_MULTIPLIER,
  }));

  const costChartConfig: ChartConfig = costCategories.reduce<ChartConfig>(
    (acc, category) => {
      acc[category.name] = { label: category.name, color: category.color };
      return acc;
    },
    {}
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <Card className="flex h-full flex-col p-6">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Monthly Revenue and Cost Trends
        </h2>
        <ChartContainer
          config={revenueChartConfig}
          className="grid min-h-[320px] grid-rows-[1fr_auto] gap-2"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueChartData} barCategoryGap={32}>
              <CartesianGrid
                stroke="rgb(var(--border))"
                strokeDasharray="4 4"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgb(var(--text-secondary))", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={formatAxisTick}
                tick={{ fill: "rgb(var(--text-secondary))", fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    valueFormatter={(value, item) => {
                      const dataKey = item.dataKey?.toString() ?? "";
                      const series = revenueSeries.find(
                        (entry) => entry.key === dataKey
                      );
                      if (!series) {
                        return value ?? "-";
                      }

                      const rawValue = item.payload?.[series.originalKey];
                      const numericValue =
                        typeof rawValue === "number"
                          ? rawValue
                          : Number(rawValue);
                      return Number.isFinite(numericValue)
                        ? formatCurrencyValue(numericValue)
                        : value ?? "-";
                    }}
                  />
                }
              />
              {revenueSeries.map((series) => (
                <Bar
                  key={series.key}
                  dataKey={series.key}
                  fill={series.color}
                  radius={[8, 8, 0, 0]}
                  barSize={10}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <ChartLegend className="justify-center text-sm">
            <ChartLegendContent />
          </ChartLegend>
        </ChartContainer>
      </Card>

      <Card className="flex h-full flex-col p-6">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Cost Distribution by Categories
        </h2>
        <ChartContainer
          config={costChartConfig}
          className="grid min-h-[320px] grid-rows-[1fr_auto] justify-items-center gap-2"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={costCategories}
                dataKey="percentage"
                nameKey="name"
                innerRadius={80}
                outerRadius={120}
                stroke="transparent"
                labelLine={false}
              >
                {costCategories.map((category) => (
                  <Cell key={category.name} fill={category.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    valueFormatter={(value, item) => {
                      const amountRaw = item.payload?.amount;
                      const amount =
                        typeof amountRaw === "number"
                          ? amountRaw
                          : Number(amountRaw);
                      const percentageRaw = item.payload?.percentage;
                      const percentage =
                        typeof percentageRaw === "number"
                          ? percentageRaw
                          : Number(percentageRaw);
                      const percentageText = Number.isFinite(percentage)
                        ? `${percentage}%`
                        : value ?? "-";
                      return Number.isFinite(amount)
                        ? `${percentageText} - ${formatCurrencyValue(amount)}`
                        : percentageText;
                    }}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
          <ChartLegend className="flex-wrap justify-center gap-3 text-sm text-text-secondary">
            <ChartLegendContent />
          </ChartLegend>
        </ChartContainer>
      </Card>
    </div>
  );
}
