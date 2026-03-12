import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const integrationTypes = [
  { name: "AWS", description: "Connect via read-only IAM role" },
  { name: "Azure", description: "Connect via Service Principal" },
  { name: "GCP", description: "Connect via Service Account" },
  { name: "Slack", description: "Send alerts to a Slack channel" },
  { name: "Microsoft Teams", description: "Send alerts to MS Teams" },
  { name: "Webhooks", description: "Custom HTTP endpoints for alerts" },
];

export function DashboardIntegrations() {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (name: string) => {
    setConnecting(name);
    // Simulate connection flow delay
    setTimeout(() => {
      setConnecting(null);
      toast.info("Connection Setup Started", {
        description: `The admin configuration panel for ${name} will open shortly.`
      });
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Integrations</h1>
        <p className="text-xs text-muted-foreground">Connect your cloud providers and notification channels</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {integrationTypes.map((i) => (
          <div key={i.name} className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">{i.name}</h3>
                <span className="text-[10px] font-medium text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                  Disconnected
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">{i.description}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled={connecting === i.name}
              onClick={() => handleConnect(i.name)}
            >
              {connecting === i.name ? "Connecting..." : "Connect"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
