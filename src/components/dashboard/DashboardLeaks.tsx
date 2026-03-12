import { useState, useEffect } from "react";
import { ShieldAlert, ExternalLink, AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DashboardLeaks() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ccl-connected-integrations");
    if (saved) {
      const list = JSON.parse(saved);
      setIsConnected(list.length > 0);
    }
  }, []);

  if (isConnected) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Security & Cost Leaks</h1>
          <p className="text-sm text-muted-foreground">Identified vulnerabilities and orphaned resources requiring attention.</p>
        </div>

        <div className="space-y-4">
          {[
            { id: 1, title: "Unattached EBS Volume", severity: "Medium", cost: "$45/mo", resource: "vol-0f2e8..." },
            { id: 2, title: "Public S3 Bucket", severity: "High", cost: "$0/mo", resource: "cg-prod-logs" },
            { id: 3, title: "Idle Load Balancer", severity: "Low", cost: "$18/mo", resource: "api-lb-internal" },
            { id: 4, title: "Provisioned Throughput Overhead", severity: "Medium", cost: "$120/mo", resource: "dynamodb-audit-table" },
          ].map((leak) => (
            <div key={leak.id} className="bg-card border border-border rounded-lg p-5 flex items-center justify-between hover:border-primary/20">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${leak.severity === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{leak.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border font-mono">{leak.resource}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{leak.severity}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{leak.cost}</p>
                <Button variant="ghost" size="sm" className="h-7 text-[10px] mt-1">Resolve</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        <Button variant="outline" onClick={() => toast.info("Navigate to Integrations to connect an account.")}>
          Connect Infrastructure
        </Button>
      </div>
    </div>
  );
}
