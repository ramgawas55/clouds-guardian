import { useState } from "react";
import { FileText, Download, Clock, AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export function DashboardReports({ isConnected }: { isConnected?: boolean }) {
  const { data: reports, isLoading, error, refetch } = useQuery({
    queryKey: ['aws-dashboard-reports'],
    queryFn: async () => {
      const response = await fetch('/api/aws-reports');
      if (!response.ok) {
        throw new Error('Failed to fetch reports.');
      }
      return response.json();
    },
    enabled: !!isConnected,
    retry: 1
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async (type: string, reportId?: string) => {
    toast.info(`Generating ${type} report...`, {
      description: "Your report is being prepared."
    });

    try {
      // Simulate real API request
      const response = await MOCK_API.post('aws-reports-export', {})
      });
      if (!response.ok) throw new Error('Failed to export');

      toast.success("Report ready!", {
        description: `Your ${type} report has been generated successfully.`
      });
    } catch (err) {
      toast.error("Generation failed", {
        description: "Failed to generate the report. Please try again."
      });
    }
  };

  const handleGenerateCurrent = async () => {
    setIsGenerating(true);
    toast.info("Generating Current State report...");
    try {
      const response = await MOCK_API.post('aws-reports-generate', {});
      if (!response.ok) throw new Error('Generation failed');

      toast.success("Success", { description: "Current State report generated." });
      refetch();
    } catch (err: any) {
      toast.error("Failed", { description: err.message || "Failed to generate." });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Reports</h1>
          <p className="text-xs text-muted-foreground">Savings summaries and exportable reports</p>
        </div>

        <div className="flex flex-col items-center justify-center p-12 mt-4 border border-dashed border-border rounded-xl bg-card">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">No Cloud Connection</h2>
          <p className="text-sm text-muted-foreground max-w-md text-center mb-8">
            Connect an AWS or Azure account to automatically generate compliance audits and cost summaries.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" disabled onClick={() => handleExport('PDF')}>
              <Download className="w-4 h-4 mr-2" /> PDF
            </Button>
            <Button variant="outline" disabled onClick={() => handleExport('CSV')}>
              <Download className="w-4 h-4 mr-2" /> CSV
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
        <p className="text-muted-foreground">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px] bg-red-500/5 rounded-xl border border-red-500/20 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Reports</h2>
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
          <h1 className="text-2xl font-bold text-foreground">Compliance Reports</h1>
          <p className="text-sm text-muted-foreground">Historical cost analytics and security compliance audits.</p>
        </div>
        <Button onClick={handleGenerateCurrent} disabled={isGenerating}>
          {isGenerating ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : null}
          Generate Current State
        </Button>
      </div>

      <div className="space-y-3">
        {reports && reports.length > 0 ? (
          reports.map((report: any) => (
            <div key={report.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{report.name}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleExport(report.type, report.id)}>
                <Download className="h-3 w-3 mr-2" /> {report.type}
              </Button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-12 mt-4 border border-dashed border-border rounded-xl bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-2">No Reports Generated Yet</h2>
            <p className="text-sm text-muted-foreground max-w-md text-center">
              Click 'Generate Current State' to create your first compliance and cost audit report.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

