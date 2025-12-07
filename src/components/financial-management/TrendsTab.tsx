import { Card } from "@/components/ui/card";

export function TrendsTab() {
  return (
    <Card className="p-6">
      <h2 className="mb-2 text-lg font-semibold text-text-primary">
        Annual Financial Trends
      </h2>
      <p className="mb-6 text-sm text-text-secondary">
        Long-term financial trend analysis over multiple years
      </p>
      <div className="flex h-96 items-center justify-center rounded-lg bg-surfaceMuted">
        <p className="text-text-secondary">
          Multi-year trend chart would be displayed here
        </p>
      </div>
    </Card>
  );
}
