export type SummaryTrend = {
  value: string;
  positive: boolean;
};

export type SummaryCardData = {
  title: string;
  value: string;
  trend: SummaryTrend;
};

export type RevenueDataPoint = {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
};

export type CostCategory = {
  name: string;
  percentage: number;
  amount: number;
  color: string;
};

export type ReportItem = {
  name: string;
  description: string;
};

export type EsgMetric = {
  name: string;
  current: number;
  target: number;
  color: string;
};
