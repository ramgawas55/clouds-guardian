import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IntegrationConnectModal } from "./IntegrationConnectModal";

const integrationTypes = [
  { name: "AWS", description: "Connect via read-only IAM role" },
  { name: "Azure", description: "Connect via Service Principal" },
  { name: "GCP", description: "Connect via Service Account" },
  { name: "Slack", description: "Send alerts to a Slack channel" },
  { name: "Microsoft Teams", description: "Send alerts to MS Teams" },
  { name: "Webhooks", description: "Custom HTTP endpoints for alerts" },
];

export function DashboardIntegrations() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [connectedList, setConnectedList] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("ccl-connected-integrations");
    if (saved) setConnectedList(JSON.parse(saved));
  }, []);

  const handleConnected = (name: string) => {
    const newList = [...connectedList, name];
    setConnectedList(newList);
    localStorage.setItem("ccl-connected-integrations", JSON.stringify(newList));
    window.dispatchEvent(new Event("storage"));
    setActiveModal(null);
  };

  const handleDisconnect = (name: string) => {
    const newList = connectedList.filter(i => i !== name);
    setConnectedList(newList);
    localStorage.setItem("ccl-connected-integrations", JSON.stringify(newList));
    window.dispatchEvent(new Event("storage"));
    toast.success(`${name} disconnected`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Integrations</h1>
        <p className="text-xs text-muted-foreground">Connect your cloud providers and notification channels</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {integrationTypes.map((i) => {
          const isConnected = connectedList.includes(i.name);
          return (
            <div key={i.name} className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{i.name}</h3>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${isConnected ? "text-success border-success/30 bg-success/5" : "text-muted-foreground border-border"
                    }`}>
                    {isConnected ? "Connected" : "Disconnected"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">{i.description}</p>
              </div>

              {isConnected ? (
                <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDisconnect(i.name)}>
                  Disconnect
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveModal(i.name)}>
                  Connect
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <IntegrationConnectModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        integrationName={activeModal}
        onConnected={handleConnected}
      />
    </div>
  );
}
