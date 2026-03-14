import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cloud, ShieldCheck, AlertTriangle, Zap, Search, Shield, TrendingUp, ArrowRight, AlertCircle, CalendarClock, Scaling, HardDrive, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface Props {
  onConnectClick?: () => void;
  onNavigate?: (page: string) => void;
  isConnected?: boolean;
}

export function DashboardOverview({ onConnectClick, onNavigate, isConnected }: Props) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['aws-dashboard-overview'],
    queryFn: async () => {
      const response = await fetch('/.netlify/functions/aws-dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch AWS data. Make sure your AWS credentials are valid.');
      }
      return response.json();
    },
    enabled: !!isConnected,
    retry: 1
  });

  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    toast.info("Scan in progress...", {
      description: "Analyzing your connected cloud environments."
    });

    try {
      const response = await fetch('/.netlify/functions/aws-scan', { method: 'POST' });
      if (!response.ok) throw new Error('Scan failed');

      const resData = await response.json();
      toast.success("Scan complete", {
        description: `Scan finished successfully. Found ${resData?.risks || 0} risks.`
      });
      refetch();
    } catch (err: any) {
      toast.error("Scan failed", {
        description: err.message || "Could not complete the audit."
      });
    } finally {
      setIsScanning(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <Cloud className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">No Cloud Providers Connected</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Connect your AWS account to view cloud cost and infrastructure data.
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

  if (isLoading) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading your cloud infrastructure data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px] bg-red-500/5 rounded-xl border border-red-500/20 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Error Loading AWS Data</h2>
        <p className="text-muted-foreground max-w-md mb-6">{error instanceof Error ? error.message : "An unknown error occurred"}</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCcw className="w-4 h-4" /> Try Again
        </Button>
      </div>
    );
  }

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
          <p className="text-3xl font-bold text-foreground">${data?.potentialSavings || 0}<span className="text-sm font-normal text-muted-foreground ml-1">/mo</span></p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Security Risks</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{data?.securityRisks || 0}</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{data?.totalResources || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Leak Findings</h3>
            <Button variant="ghost" size="sm" className="text-primary text-xs" onClick={() => onNavigate?.('leaks')}>
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {data?.recentLeaks?.length ? data.recentLeaks.map((leak: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <Shield className={`w-4 h-4 ${leak.severity === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />
                  <span className="text-sm font-medium">{leak.title}</span>
                </div>
                <span className="text-xs font-bold">{leak.cost || '-'}</span>
              </div>
            )) : <p className="text-sm text-muted-foreground text-center py-4">No recent leaks found.</p>}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Recommendations</h3>
            <Button variant="ghost" size="sm" className="text-primary text-xs" onClick={() => onNavigate?.('recommendations')}>
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {data?.recommendations?.length ? data.recommendations.map((rec: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{rec.title}</span>
                </div>
                <span className="text-xs font-bold text-success">{rec.impact}</span>
              </div>
            )) : <p className="text-sm text-muted-foreground text-center py-4">No active recommendations.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
