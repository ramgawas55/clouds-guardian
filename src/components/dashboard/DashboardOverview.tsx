import { Button } from "@/components/ui/button";
import { Cloud, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function DashboardOverview() {
  const handleScan = () => {
    toast.info("No cloud providers connected.", {
      description: "Please connect an AWS, Azure, or GCP account in Integrations first."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">Overview</h1>
          <p className="text-xs text-muted-foreground">Cloud cost analysis across all connected accounts</p>
        </div>
        <Button onClick={handleScan} size="sm">
          Run New Scan
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center p-12 mt-8 border border-dashed border-border rounded-xl bg-card">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Cloud className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">No Cloud Accounts Connected</h2>
        <p className="text-sm text-muted-foreground max-w-md text-center mb-6">
          Connect your AWS, Azure, or GCP environments to start detecting cost leaks, oversized instances, and unattached volumes.
        </p>
        <div className="flex gap-4">
          <Button onClick={handleScan}>
            Connect Cloud Provider
          </Button>
        </div>
      </div>
    </div>
  );
}
