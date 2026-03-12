import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardLeaks } from "@/components/dashboard/DashboardLeaks";
import { DashboardRecommendations } from "@/components/dashboard/DashboardRecommendations";
import { DashboardKubernetes } from "@/components/dashboard/DashboardKubernetes";
import { DashboardReports } from "@/components/dashboard/DashboardReports";
import { DashboardIntegrations } from "@/components/dashboard/DashboardIntegrations";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import { DashboardResources } from "@/components/dashboard/DashboardResources";
import { DashboardTeams } from "@/components/dashboard/DashboardTeams";

const pages: Record<string, React.ComponentType> = {
  overview: DashboardOverview,
  leaks: DashboardLeaks,
  recommendations: DashboardRecommendations,
  kubernetes: DashboardKubernetes,
  reports: DashboardReports,
  integrations: DashboardIntegrations,
  settings: DashboardSettings,
  resources: DashboardResources,
  teams: DashboardTeams,
};

const DashboardPage = () => {
  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const ActiveComponent = pages[activePage] || DashboardOverview;

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar
        active={activePage}
        onNavigate={setActivePage}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {activePage === 'overview' ? (
            <DashboardOverview
              onConnectClick={() => setActivePage('integrations')}
              onNavigate={(page) => setActivePage(page)}
            />
          ) : (
            <ActiveComponent />
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
