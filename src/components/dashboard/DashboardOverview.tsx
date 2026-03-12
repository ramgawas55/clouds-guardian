import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cloud, ShieldCheck, AlertTriangle, Zap, Search } from "lucide-react";
import { toast } from "sonner";

export function DashboardOverview({ onConnectClick }: { onConnectClick?: () => void }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ccl-connected-integrations");
    if (saved) {
      const list = JSON.parse(saved);
      setIsConnected(list.length > 0);
    }
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    toast.info("Scan in progress...", {
      description: "Auditing cloud resources for cost leaks and security gaps."
    });

    setTimeout(() => {
      setIsScanning(false);
      toast.success("Scan complete", {
        description: "Found 12 cost-saving opportunities and 4 security risks."
      });
    }, 2000);
  };

  if (isConnected) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Infrastructure Overview</h1>
            <p className="text-sm text-muted-foreground">Real-time audit results across connected cloud environments.</p>
          </div>
          <Button onClick={handleScan} disabled={isScanning}>
            {isScanning ? <><Zap className="mr-2 h-4 w-4 animate-pulse text-yellow-400" /> Scanning...</> : "Run Full Audit"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Potential Savings</p>
            </div>
            <p className="text-3xl font-bold text-foreground">$1,240<span className="text-sm font-normal text-muted-foreground ml-1">/mo</span></p>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Security Risks</p>
            </div>
            <p className="text-3xl font-bold text-foreground">14</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
            </div>
            <p className="text-3xl font-bold text-foreground">842</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center border-dashed">
          <p className="text-sm text-muted-foreground italic">Detailed breakdown of leaks and recommendations are available in the sidebar.</p>
        </div>
      </div>
    );
  }

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
