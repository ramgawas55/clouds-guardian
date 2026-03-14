import { useState } from "react";
import { MOCK_API } from "@/lib/api-mocks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IntegrationConnectModal } from "./IntegrationConnectModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCcw, AlertCircle } from "lucide-react";

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

  const queryClient = useQueryClient();

  const { data: connectedList = [], isLoading, error, refetch } = useQuery({
    queryKey: ['connected-integrations'],
    queryFn: async () => {
      const response: any = await MOCK_API.get('integrations');
      // Format the mock response properly so the dashboard reads it
      if (Array.isArray(response)) {
        return response.map((r: any) => r.name);
      }
      return [];
    },
    retry: 1,
    staleTime: Infinity
  });

  const handleConnected = () => {
    if (activeModal) {
      queryClient.setQueryData(['connected-integrations'], (old: string[] = []) => [...old, activeModal]);
    }
    setActiveModal(null);
  };

  const handleDisconnect = async (name: string) => {
    try {
      await MOCK_API.post('integrations-disconnect', { integration: name });
      toast.success(`${name} disconnected`);
      queryClient.setQueryData(['connected-integrations'], (old: string[] = []) => old.filter((n) => n !== name));
    } catch (err: any) {
      toast.error(`Failed to disconnect ${name}`, { description: err.message });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading integrations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px] bg-red-500/5 rounded-xl border border-red-500/20 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Integrations</h2>
        <p className="text-muted-foreground max-w-md mb-6">{(error as Error).message || "An unknown error occurred"}</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCcw className="w-4 h-4" /> Try Again
        </Button>
      </div>
    );
  }

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

