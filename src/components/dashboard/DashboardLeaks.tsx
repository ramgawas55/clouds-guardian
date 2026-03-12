```typescript
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ShieldAlert, ExternalLink, AlertCircle, HardDrive } from "lucide-react";
import { toast } from "sonner";

export function DashboardLeaks() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Simulate connecting an environment
    setIsConnected(true);
    toast.success("Environment connected!", {
      description: "Scanning for leaks now. Mock data displayed."
    });
  };

  const mockLeaks = [
    {
      id: "1",
      type: "Unattached Volume",
      resource: "vol-0a1b2c3d4e5f6g7h8",
      region: "us-east-1",
      cost: "$15.00/month",
      link: "#"
    },
    {
      id: "2",
      type: "Idle Instance",
      resource: "i-9j8k7l6m5n4o3p2q1",
      region: "eu-west-1",
      cost: "$50.00/month",
      link: "#"
    },
    {
      id: "3",
      type: "Unused Load Balancer",
      resource: "lb-r1s2t3u4v5w6x7y8z",
      region: "ap-southeast-2",
      cost: "$20.00/month",
      link: "#"
    }
  ];

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
