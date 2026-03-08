import { CalendarClock, Scaling, HardDrive, Camera, Ship, Globe } from "lucide-react";

const recommendations = [
  { icon: CalendarClock, title: "Schedule nightly shutdown for dev environments", impact: "$1,240/mo", priority: "High", desc: "15 dev instances run 24/7. Shutting down 8pm-8am saves 50% on non-prod compute." },
  { icon: Scaling, title: "Resize low-utilization EC2 instances", impact: "$890/mo", priority: "High", desc: "7 instances averaging <15% CPU. Downsizing from m5.xlarge to m5.large cuts cost in half." },
  { icon: HardDrive, title: "Delete 23 unattached EBS volumes", impact: "$420/mo", priority: "Medium", desc: "Orphaned volumes from terminated instances. No snapshots needed — data already archived." },
  { icon: Camera, title: "Archive old snapshots older than 90 days", impact: "$310/mo", priority: "Medium", desc: "47 snapshots older than 90 days. Move to Glacier or delete if backups exist elsewhere." },
  { icon: Ship, title: "Reduce Kubernetes node overcapacity", impact: "$1,640/mo", priority: "Critical", desc: "Three node pools running at 18% avg utilization. Scale down from 12 to 6 nodes." },
  { icon: Globe, title: "Move staging workloads to cheaper regions", impact: "$380/mo", priority: "Low", desc: "Staging runs in ap-south-1. Moving to us-east-1 saves 22% on compute and egress." },
];

const priorityColor: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
  Low: "bg-secondary text-muted-foreground",
};

export function DashboardRecommendations() {
  return (
    <div className="space-y-4">
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
