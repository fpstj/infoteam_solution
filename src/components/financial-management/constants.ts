import type {
  SummaryCardData,
  RevenueDataPoint,
  CostCategory,
  ReportItem,
  EsgMetric,
} from "./types.ts";

export const BAR_HEIGHT_MULTIPLIER = 3;

export const summaryCards: SummaryCardData[] = [
  {
    title: "Revenue",
    value: "€271,600",
    trend: { value: "+11.01%", positive: true },
  },
  {
    title: "Cost",
    value: "€174,548",
    trend: { value: "-6.11%", positive: false },
  },
  {
    title: "Profit",
    value: "€97,052",
    trend: { value: "+11.01%", positive: true },
  },
  {
    title: "Margin",
    value: "14%",
    trend: { value: "+11.01%", positive: true },
  },
];

export const revenueData: RevenueDataPoint[] = [
  { month: "Jan", revenue: 47000, expenses: 39500, profit: 7500 },
  { month: "Feb", revenue: 51000, expenses: 41500, profit: 9500 },
  { month: "Mar", revenue: 52000, expenses: 40500, profit: 11500 },
  { month: "Apr", revenue: 53000, expenses: 41200, profit: 11800 },
  { month: "May", revenue: 54000, expenses: 41800, profit: 12200 },
  { month: "Jun", revenue: 55000, expenses: 42500, profit: 12500 },
  { month: "Jul", revenue: 56000, expenses: 43000, profit: 13000 },
  { month: "Aug", revenue: 57000, expenses: 43800, profit: 13200 },
  { month: "Sep", revenue: 58000, expenses: 44000, profit: 14000 },
  { month: "Oct", revenue: 59000, expenses: 45000, profit: 14000 },
  { month: "Nov", revenue: 60000, expenses: 45800, profit: 14200 },
  { month: "Dec", revenue: 61000, expenses: 46500, profit: 14500 },
];

export const costCategories: CostCategory[] = [
  { name: "Energy", percentage: 34, amount: 8450, color: "#3B82F6" },
  { name: "Maintenance", percentage: 25, amount: 6230, color: "#22C55E" },
  { name: "Security", percentage: 20, amount: 4890, color: "#EAB308" },
  { name: "Cleaning", percentage: 13, amount: 3210, color: "#8B5CF6" },
  { name: "Other", percentage: 8, amount: 1990, color: "#EF4444" },
];

export const esgMetrics: EsgMetric[] = [
  { name: "Energy Efficiency", current: 85, target: 90, color: "#22C55E" },
  { name: "Waste Reduction", current: 78, target: 80, color: "#3B82F6" },
  { name: "Water Conservation", current: 92, target: 95, color: "#8B5CF6" },
  { name: "Carbon Footprint", current: 74, target: 85, color: "#EAB308" },
];

export const reportItems: ReportItem[] = [
  { name: "Monthly Report", description: "Latest monthly financial results" },
  { name: "ESG Report", description: "Sustainability and compliance overview" },
  { name: "Tax Report", description: "Tax statement and deductions" },
  { name: "Annual Report", description: "Full-year performance and outlook" },
];
