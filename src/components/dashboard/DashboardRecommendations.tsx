import { CalendarClock, Scaling, HardDrive, Camera, Ship, Globe } from "lucide-react";

const recommendations = [
  { icon: CalendarClock, title: "Shut down dev environments at night", impact: "$1,240/mo", priority: "High", desc: "You've got 15 dev instances running around the clock. Turn them off from 8pm to 8am and you'll cut non-prod compute costs in half." },
  { icon: Scaling, title: "Downsize 7 oversized EC2 instances", impact: "$890/mo", priority: "High", desc: "These instances are averaging under 15% CPU. Dropping from m5.xlarge to m5.large would save you real money with zero performance impact." },
  { icon: HardDrive, title: "Clean up 23 orphaned EBS volumes", impact: "$420/mo", priority: "Medium", desc: "These volumes lost their instances weeks ago. The data's already backed up — they're just sitting there costing you." },
  { icon: Camera, title: "Deal with 47 old snapshots", impact: "$310/mo", priority: "Medium", desc: "Snapshots older than 90 days that nobody's looked at. Either move them to Glacier or delete them if the data exists elsewhere." },
  { icon: Ship, title: "Scale down your Kubernetes node pools", impact: "$1,640/mo", priority: "Critical", desc: "Three node pools running at 18% utilization. You could go from 12 nodes to 6 and still have plenty of headroom." },
  { icon: Globe, title: "Consider cheaper regions for staging", impact: "$380/mo", priority: "Low", desc: "Your staging workloads are in ap-south-1. Moving them to us-east-1 would save about 22% on compute and egress." },
];

const priorityColor: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
  Low: "bg-secondary text-muted-foreground",
};

export function DashboardRecommendations({ isConnected }: { isConnected?: boolean }) {
  if (!isConnected) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">Recommendations</h1>
          <p className="text-xs text-muted-foreground">Prioritized actions to reduce cloud waste</p>
        </div>
        <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Scaling className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Recommendations Available</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Connect your AWS or Azure accounts to receive automated suggestions for rightsizing and cost optimization.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div>
        <h1 className="text-xl font-bold text-foreground">Recommendations</h1>
        <p className="text-xs text-muted-foreground">Prioritized actions to reduce cloud waste</p>
      </div>

      <div className="grid gap-3">
        {recommendations.map((r) => (
          <div key={r.title} className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-all flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <r.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColor[r.priority]}`}>
                    {r.priority}
                  </span>
                  <span className="text-sm font-bold text-success">{r.impact}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
              <div className="flex items-center gap-2 mt-3">
                <button className="text-[10px] bg-primary text-primary-foreground px-3 py-1 rounded-md font-medium hover:bg-primary/90">
                  Review Recommendation
                </button>
                <button className="text-[10px] text-muted-foreground hover:text-foreground px-3 py-1 rounded-md border border-border">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
