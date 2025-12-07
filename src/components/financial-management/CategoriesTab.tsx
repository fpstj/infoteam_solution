import { Card } from "@/components/ui/card";
import type { CostCategory } from "./types.ts";

const TREND_PLACEHOLDER = "-2.5%";

export function CategoriesTab({
  costCategories,
}: {
  costCategories: CostCategory[];
}) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold text-text-primary">
        Detailed Cost Analysis by Categories
      </h2>
      <div className="space-y-3">
        {costCategories.map((category) => (
          <div
            key={category.name}
            className="cursor-pointer rounded-lg bg-surfaceMuted px-4 py-2 transition-colors hover:bg-surfaceHover"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    {category.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {category.percentage}% of total costs
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-text-primary">
                  €{category.amount.toLocaleString("en-US")}
                </p>
                <span className="text-sm text-semantic-success">
                  {TREND_PLACEHOLDER}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
