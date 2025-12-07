import { MainLayout } from "@/components/layout/MainLayout";
import { AlertCard, MetricCard } from "@/components/dashboard/DashboardCards";
import { BuildingStatusPanel } from "@/components/dashboard/BuildingStatusPanel";
import { RecentTicketsPanel } from "@/components/dashboard/RecentTicketsPanel";
import { Zap, Ticket, Users, Euro } from "lucide-react";

const PANEL_HEIGHT = "h-[560px]";

function Dashboard() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Alert Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AlertCard
            type="error"
            title="Critical Error"
            subtitle="Building 3 - Floor 6 - Sector A"
          />
          <AlertCard
            type="warning"
            title="Maintenance Required"
            subtitle="7 utilities for inspection"
          />
          <AlertCard
            type="success"
            title="ESG Goal Achieved"
            subtitle="Energy efficiency +12%"
          />
        </div>

        {/* Metrics Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={<Zap className="w-5 h-5" />}
            title="Energy Consumption"
            value="12,450.8 kWh"
            trend={{ value: "-8.2% from last month", positive: true }}
          />
          <MetricCard
            icon={<Ticket className="w-5 h-5" />}
            title="Active Tickets"
            value="7"
            trend={{ value: "+3 from yesterday", positive: false }}
          />
          <MetricCard
            icon={<Users className="w-5 h-5" />}
            title="Space Occupancy"
            value="88.1%"
            subtitle="137 of 156 spaces"
          />
          <MetricCard
            icon={<Euro className="w-5 h-5" />}
            title="Monthly Costs"
            value="€18,750"
            trend={{ value: "-4.1% from plan", positive: true }}
          />
        </div>

        {/* Building Status & Recent Tickets */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className={`flex ${PANEL_HEIGHT} flex-col lg:col-span-2`}>
            <BuildingStatusPanel className="flex-1" />
          </div>
          <div className={`flex ${PANEL_HEIGHT} flex-col`}>
            <RecentTicketsPanel className="flex-1" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
