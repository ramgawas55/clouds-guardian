import { useState } from "react";

const leaks = [
  { resource: "prod-ec2-batch-07", cloud: "AWS", type: "EC2", region: "ap-south-1", cost: "$184", reason: "Idle 14 days", severity: "High", action: "Terminate or schedule", owner: "platform-team", status: "Open" },
  { resource: "snapshot-db-old-12", cloud: "AWS", type: "EBS Snapshot", region: "us-east-1", cost: "$63", reason: "Orphaned snapshot", severity: "Medium", action: "Archive or delete", owner: "Unassigned", status: "Open" },
  { resource: "aks-nodepool-test", cloud: "Azure", type: "Kubernetes", region: "centralindia", cost: "$290", reason: "Overprovisioned nodepool", severity: "High", action: "Reduce node count", owner: "sre-team", status: "Reviewing" },
  { resource: "gcp-lb-stage", cloud: "GCP", type: "Load Balancer", region: "asia-south1", cost: "$76", reason: "Stale resource", severity: "Medium", action: "Remove", owner: "dev-team", status: "Open" },
  { resource: "dev-rds-analytics", cloud: "AWS", type: "RDS", region: "us-west-2", cost: "$340", reason: "Idle 30+ days", severity: "Critical", action: "Terminate or snapshot", owner: "data-team", status: "Open" },
  { resource: "vm-staging-web-03", cloud: "Azure", type: "VM", region: "westeurope", cost: "$156", reason: "No traffic 21 days", severity: "High", action: "Deallocate", owner: "web-team", status: "Open" },
  { resource: "eip-unused-04", cloud: "AWS", type: "Elastic IP", region: "eu-west-1", cost: "$8", reason: "Unattached EIP", severity: "Low", action: "Release", owner: "Unassigned", status: "Open" },
  { resource: "gke-pool-batch", cloud: "GCP", type: "GKE Node Pool", region: "us-central1", cost: "$210", reason: "12% avg utilization", severity: "High", action: "Rightsize", owner: "ml-team", status: "Reviewing" },
];

const severityColor: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
  Low: "bg-secondary text-muted-foreground",
};

const statusColor: Record<string, string> = {
  Open: "bg-destructive/10 text-destructive",
  Reviewing: "bg-warning/10 text-warning",
  Resolved: "bg-success/10 text-success",
};

export function DashboardLeaks() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Critical", "High", "Medium", "Low"];
  const filtered = filter === "All" ? leaks : leaks.filter((l) => l.severity === filter);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Leak Findings</h1>
        <p className="text-xs text-muted-foreground">All detected cost leaks across connected accounts</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filter === f
                ? "bg-primary/10 border-primary/30 text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Resource", "Cloud", "Type", "Region", "Cost", "Reason", "Severity", "Action", "Owner", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.resource} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 text-xs font-medium text-foreground whitespace-nowrap">{l.resource}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{l.cloud}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{l.type}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{l.region}</td>
                <td className="px-4 py-3 text-xs font-medium text-foreground">{l.cost}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{l.reason}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${severityColor[l.severity]}`}>
                    {l.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{l.action}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{l.owner}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[l.status]}`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
