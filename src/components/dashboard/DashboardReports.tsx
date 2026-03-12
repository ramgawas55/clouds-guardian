import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";

export function DashboardReports() {
  const handleExport = (type: string) => {
    toast.error("Export Failed", {
      description: `Cannot generate ${type} report without active scan data.`
    });
  };

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
