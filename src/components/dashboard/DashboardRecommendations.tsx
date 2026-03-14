import { CalendarClock, Scaling, HardDrive, Camera, Ship, Globe, AlertCircle, RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const priorityColor: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-500",
  High: "bg-yellow-500/10 text-yellow-500",
  Medium: "bg-primary/10 text-primary",
  Low: "bg-muted text-muted-foreground",
};

const iconMap: Record<string, any> = {
  CalendarClock,
  Scaling,
  HardDrive,
  Camera,
  Ship,
  Globe
};

export function DashboardRecommendations({ isConnected }: { isConnected?: boolean }) {
  const { data: recommendations, isLoading, error, refetch } = useQuery({
    queryKey: ['aws-dashboard-recommendations'],
    queryFn: async () => {
      const response = await fetch('/api/aws-recommendations');
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations.');
      }
      return response.json();
    },
    enabled: !!isConnected,
    retry: 1
  });

  if (!isConnected) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Recommendations</h1>
          <p className="text-xs text-muted-foreground">Prioritized actions to reduce cloud waste</p>
        </div>
        <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Scaling className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Recommendations Available</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Connect your AWS or Azure accounts to receive automated suggestions for rightsizing and cost optimization.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px] bg-red-500/5 rounded-xl border border-red-500/20 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Recommendations</h2>
        <p className="text-muted-foreground max-w-md mb-6">{error instanceof Error ? error.message : "An unknown error occurred"}</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCcw className="w-4 h-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div>
        <h1 className="text-xl font-bold text-foreground">Recommendations</h1>
        <p className="text-xs text-muted-foreground">Prioritized actions to reduce cloud waste</p>
      </div>

      <div className="grid gap-3">
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((r: any) => {
            const IconComponent = iconMap[r.icon] || Scaling;
            return (
              <div key={r.title} className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-all flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColor[r.priority] || priorityColor.Medium}`}>
                        {r.priority}
                      </span>
                      <span className="text-sm font-bold text-success">{r.impact}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="text-[10px] bg-primary text-primary-foreground px-3 py-1 rounded-md font-medium hover:bg-primary/90">
                      Review Recommendation
                    </button>
                    <button className="text-[10px] text-muted-foreground hover:text-foreground px-3 py-1 rounded-md border border-border">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-2">No Recommendations At This Time</h3>
            <p className="text-sm text-muted-foreground">Your infrastructure is fully optimized.</p>
          </div>
        )}
      </div>
    </div>
  );
}

