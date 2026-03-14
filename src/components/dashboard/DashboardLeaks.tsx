import { useState } from "react";
import { ShieldAlert, ExternalLink, AlertCircle, Search, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LeakResolveModal } from "./LeakResolveModal";
import { useQuery } from "@tanstack/react-query";

export function DashboardLeaks({ isConnected }: { isConnected?: boolean }) {
  const [selectedLeak, setSelectedLeak] = useState<any | null>(null);

  const { data: leaks, isLoading, error, refetch } = useQuery({
    queryKey: ['aws-dashboard-leaks'],
    queryFn: async () => {
      const response = await fetch('/api/aws-leaks');
      if (!response.ok) {
        throw new Error('Failed to fetch leak data.');
      }
      return response.json();
    },
    enabled: !!isConnected,
    retry: 1
  });

  if (isConnected) {
    if (isLoading) {
      return (
        <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px]">
          <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading leak detection data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px] bg-red-500/5 rounded-xl border border-red-500/20 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Leaks</h2>
          <p className="text-muted-foreground max-w-md mb-6">{error instanceof Error ? error.message : "An unknown error occurred"}</p>
          <Button onClick={() => refetch()} variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" /> Try Again
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Security & Cost Leaks</h1>
          <p className="text-sm text-muted-foreground">Identified vulnerabilities and orphaned resources requiring attention.</p>
        </div>

        <div className="space-y-4">
          {leaks && leaks.length > 0 ? (
            leaks.map((leak: any) => (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[10px] mt-1"
                    onClick={() => setSelectedLeak(leak)}
                  >
                    Resolve
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 mt-4 border border-dashed border-border rounded-xl bg-card">
              <ShieldAlert className="w-8 h-8 text-green-500 mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">All Clear!</h2>
              <p className="text-sm text-muted-foreground text-center">
                We haven't found any active leaks in your connected infrastructure.
              </p>
            </div>
          )}
        </div>

        <LeakResolveModal
          isOpen={!!selectedLeak}
          onClose={() => setSelectedLeak(null)}
          leak={selectedLeak}
        />
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
