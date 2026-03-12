import { useState, useEffect } from "react";
import { FileText, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DashboardReports({ isConnected }: { isConnected?: boolean }) {

  const handleExport = (type: string) => {
    toast.info(`Generating ${type} report...`, {
      description: "Your report will be ready to download in a few seconds."
    });
  };

  if (isConnected) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Compliance Reports</h1>
            <p className="text-sm text-muted-foreground">Historical cost analytics and security compliance audits.</p>
          </div>
          <Button onClick={() => handleExport("Latest")}>Generate Current State</Button>
        </div>

        <div className="space-y-3">
          {[
            { id: 1, name: "Weekly Cost Audit - March 12", date: "2 hours ago", size: "1.2 MB", type: "PDF" },
            { id: 2, name: "Security Compliance Scorecard", date: "Yesterday", size: "840 KB", type: "CSV" },
            { id: 3, name: "Infrastructure Mapping Report", date: "Mar 08, 2024", size: "2.4 MB", type: "PDF" },
          ].map((report) => (
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
              <Button variant="outline" size="sm" onClick={() => handleExport(report.type)}>
                <Download className="h-3 w-3 mr-2" /> {report.type}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        <h2 className="text-lg font-semibold text-foreground mb-2">No Reports Available</h2>
        <p className="text-sm text-muted-foreground max-w-md text-center mb-8">
          Reports are generated automatically after a successful cost analysis scan. Please wait for your first scan to complete.
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
