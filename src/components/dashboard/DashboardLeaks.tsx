import { Button } from "@/components/ui/button";
import { Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function DashboardLeaks() {
  const handleConnect = () => {
    toast.info("No cloud providers connected.", {
      description: "Navigate to Integrations to connect your first provider."
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Leak Findings</h1>
        <p className="text-xs text-muted-foreground">All detected cost leaks across connected accounts</p>
      </div>

      <div className="flex flex-col items-center justify-center p-12 mt-4 border border-dashed border-border rounded-xl bg-card">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">No active leaks detected</h2>
        <p className="text-sm text-muted-foreground max-w-md text-center mb-6">
          We haven't found any unattached volumes or idle instances. Connect an environment to begin scanning.
        </p>
        <Button variant="outline" onClick={handleConnect}>
          Connect Infrastructure
        </Button>
      </div>
    </div>
  );
}
