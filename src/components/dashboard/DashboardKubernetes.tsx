import { Button } from "@/components/ui/button";
import { Ship } from "lucide-react";
import { toast } from "sonner";

export function DashboardKubernetes() {
  const handleConnect = () => {
    toast.info("No clusters detected.", {
      description: "Ensure your connected cloud accounts contain active EKS, AKS, or GKE clusters."
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Kubernetes</h1>
        <p className="text-xs text-muted-foreground">Cluster utilization and waste analysis</p>
      </div>

      <div className="flex flex-col items-center justify-center p-12 mt-4 border border-dashed border-border rounded-xl bg-card">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Ship className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">No Kubernetes Clusters Found</h2>
        <p className="text-sm text-muted-foreground max-w-md text-center mb-6">
          Connect a cloud provider to automatically detect and scan Kubernetes clusters for overprovisioned nodes and idle namespaces.
        </p>
        <Button variant="outline" onClick={handleConnect}>
          Scan for Clusters
        </Button>
      </div>
    </div>
  );
}
