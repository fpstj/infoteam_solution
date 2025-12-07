import { useState } from "react";
import { Download } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  summaryCards,
  revenueData,
  costCategories,
  reportItems,
} from "@/components/financial-management/constants";
import { SummaryCard } from "@/components/financial-management/SummaryCard";
import { OverviewTab } from "@/components/financial-management/OverviewTab";
import { CategoriesTab } from "@/components/financial-management/CategoriesTab";
import { TrendsTab } from "@/components/financial-management/TrendsTab";
import { ReportsTab } from "@/components/financial-management/ReportsTab";

type TabId = "overview" | "categories" | "trends" | "reports";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "categories", label: "Categories" },
  { id: "trends", label: "Trends" },
  { id: "reports", label: "Reports" },
];

const timeRangeOptions = [
  { value: "last-week", label: "Last Week" },
  { value: "last-month", label: "Last Month" },
  { value: "last-quarter", label: "Last Quarter" },
  { value: "last-year", label: "Last Year" },
];

function FinancialManagement() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [timePeriod, setTimePeriod] = useState("last-month");

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-text-primary">
              Finance Management
            </h1>
            <p className="text-sm text-text-secondary">
              Overview of costs, revenues and financial analytics
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <select
              value={timePeriod}
              onChange={(event) => setTimePeriod(event.target.value)}
              className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm text-text-primary transition-colors focus:outline-none focus:ring-0 sm:w-auto"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.title} {...card} />
          ))}
        </div>

        <div className="border-b border-border">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-1 pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "overview" && (
          <OverviewTab
            revenueData={revenueData}
            costCategories={costCategories}
          />
        )}
        {activeTab === "categories" && (
          <CategoriesTab costCategories={costCategories} />
        )}
        {activeTab === "trends" && <TrendsTab />}
        {activeTab === "reports" && <ReportsTab reports={reportItems} />}
      </div>
    </MainLayout>
  );
}

export default FinancialManagement;
