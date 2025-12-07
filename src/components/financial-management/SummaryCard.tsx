import { Euro, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { SummaryCardData } from "./types.ts";

export function SummaryCard({ title, value, trend }: SummaryCardData) {
  return (
    <Card className="p-6">
      <div className="mb-2 flex items-center gap-2">
        <Euro className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
      </div>
      <p className="mb-2 text-2xl font-bold text-text-primary">{value}</p>
      <div
        className={`flex items-center gap-1 text-sm ${
          trend.positive ? "text-semantic-success" : "text-semantic-error"
        }`}
      >
        {trend.positive ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}
        <span>{trend.value}</span>
      </div>
    </Card>
  );
}
