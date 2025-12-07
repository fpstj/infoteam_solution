import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import type { ReportItem } from "./types.ts";

export function ReportsTab({ reports }: { reports: ReportItem[] }) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold text-text-primary">
        ESG and Financial Reports
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <div
            key={report.name}
            className="flex cursor-pointer items-center justify-between rounded-lg bg-surfaceMuted p-4 transition-colors hover:bg-surfaceHover"
          >
            <div>
              <h3 className="mb-1 text-sm font-medium text-text-primary">
                {report.name}
              </h3>
              <p className="text-xs text-text-secondary">
                {report.description}
              </p>
            </div>
            <Download className="h-5 w-5 text-primary" />
          </div>
        ))}
      </div>
    </Card>
  );
}
