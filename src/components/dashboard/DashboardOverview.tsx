import { Button } from "@/components/ui/button";
import { Cloud } from "lucide-react";
import { toast } from "sonner";

export function DashboardOverview({ onConnectClick }: { onConnectClick?: () => void }) {
  const handleScan = () => {
    toast.info("No cloud providers connected.", {
      description: "Please connect an AWS, Azure, or GCP account in Integrations first."
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
          <Cloud className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">No Cloud Providers Connected</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Cloud Guardian needs access to your cloud environment to identify unattached resources and security leaks.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={onConnectClick}>
            Connect Cloud Provider
          </Button>
        </div>
      </div>
    </div>
  );
}
