import { Button } from "@/components/ui/button";
import { Ship, Shield, AlertCircle, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export function DashboardKubernetes({ isConnected }: { isConnected?: boolean }) {
  const { data: clusters, isLoading, error, refetch } = useQuery({
    queryKey: ['aws-dashboard-kubernetes'],
    queryFn: async () => {
      const response = await fetch('/api/aws-kubernetes');
      if (!response.ok) {
        throw new Error('Failed to fetch Kubernetes cluster data.');
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
          <h1 className="text-xl font-bold text-foreground">Kubernetes</h1>
          <p className="text-xs text-muted-foreground">Cluster utilization and waste analysis</p>
        </div>

        <div className="flex flex-col items-center justify-center p-12 mt-4 border border-dashed border-border rounded-xl bg-card">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
            <Ship className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">No Clusters Detected</h2>
          <p className="text-sm text-muted-foreground max-w-md text-center mb-6">
            Connect an environment containing EKS, AKS, or GKE clusters to begin analyzing node utilization and cost leaks.
          </p>
          <Button variant="outline" onClick={() => toast.info("Go to Integrations to connect an account.")}>
            Connect Provider
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading cluster data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px] bg-red-500/5 rounded-xl border border-red-500/20 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Clusters</h2>
        <p className="text-muted-foreground max-w-md mb-6">{error instanceof Error ? error.message : "An unknown error occurred"}</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCcw className="w-4 h-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Kubernetes Clusters</h1>
        <p className="text-sm text-muted-foreground">Resource utilization and cost analysis across active clusters.</p>
      </div>

      <div className="grid gap-4">
        {clusters && clusters.length > 0 ? (
          clusters.map((cluster: any) => (
            <div key={cluster.name} className="bg-card border border-border rounded-xl p-6 hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Ship className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{cluster.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase">{cluster.type} • {cluster.nodes} Nodes</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cluster.status === 'Healthy' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                  {cluster.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Resource Utilization</span>
                  <span className="font-medium">{cluster.utilization}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${cluster.utilization < 20 ? 'bg-warning' : 'bg-primary'}`}
                    style={{ width: `${cluster.utilization}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[10px] text-muted-foreground italic">Approx. savings: {cluster.waste}</span>
                  <Button size="sm" variant="outline" className="h-8 text-[10px]" onClick={() => {
                    toast.promise(fetch('/api/aws-kubernetes-optimize', { method: 'POST', body: JSON.stringify({ cluster: cluster.name }) }), {
                      loading: `Analyzing ${cluster.name}...`,
                      success: 'Optimization recommendations generated!',
                      error: 'Failed to generate recommendations'
                    });
                  }}>Optimize Nodes</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-12 mt-4 border border-dashed border-border rounded-xl bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-2">No Active Clusters Detected</h2>
            <p className="text-sm text-muted-foreground max-w-md text-center">
              Your connected accounts don't currently have any active Kubernetes (EKS/AKS/GKE) resources running.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

