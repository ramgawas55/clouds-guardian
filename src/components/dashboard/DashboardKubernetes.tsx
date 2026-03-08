import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const clusterData = [
  { cluster: "prod-eks-1", cpuReq: 72, cpuUsed: 38, memReq: 64, memUsed: 41 },
  { cluster: "staging-aks", cpuReq: 48, cpuUsed: 12, memReq: 56, memUsed: 18 },
  { cluster: "gke-batch", cpuReq: 80, cpuUsed: 22, memReq: 72, memUsed: 30 },
];

const namespaces = [
  { name: "default", cpu: "12%", memory: "18%", pods: 4, status: "Underutilized" },
  { name: "monitoring", cpu: "45%", memory: "52%", pods: 12, status: "Healthy" },
  { name: "staging-web", cpu: "8%", memory: "11%", pods: 6, status: "Overprovisioned" },
  { name: "batch-jobs", cpu: "5%", memory: "7%", pods: 2, status: "Idle" },
  { name: "ml-training", cpu: "68%", memory: "74%", pods: 8, status: "Healthy" },
];

const clusterCost = [
  { name: "prod-eks-1", cost: 4200 },
  { name: "staging-aks", cost: 1800 },
  { name: "gke-batch", cost: 2100 },
];

const statusColor: Record<string, string> = {
  Healthy: "text-success",
  Underutilized: "text-warning",
  Overprovisioned: "text-destructive",
  Idle: "text-muted-foreground",
};

const tooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 14%, 16%)", borderRadius: "6px", fontSize: "12px" },
};

export function DashboardKubernetes() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Kubernetes</h1>
        <p className="text-xs text-muted-foreground">Cluster utilization and waste analysis</p>
      </div>

      {/* Cluster cards */}
      <div className="grid lg:grid-cols-3 gap-4">
        {clusterData.map((c) => (
          <div key={c.cluster} className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">{c.cluster}</h3>
            <div className="space-y-3">
              <UtilBar label="CPU" requested={c.cpuReq} used={c.cpuUsed} />
              <UtilBar label="Memory" requested={c.memReq} used={c.memUsed} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Cost by cluster */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Cost by Cluster</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={clusterCost} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 14%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => `$${v.toLocaleString()}/mo`} />
              <Bar dataKey="cost" fill="hsl(195, 100%, 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Namespaces */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Namespace Utilization</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {["Namespace", "CPU", "Memory", "Pods", "Status"].map((h) => (
                  <th key={h} className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-medium py-2 pr-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {namespaces.map((n) => (
                <tr key={n.name} className="border-b border-border/50">
                  <td className="py-2 pr-3 font-medium text-foreground font-mono">{n.name}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{n.cpu}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{n.memory}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{n.pods}</td>
                  <td className={`py-2 font-medium ${statusColor[n.status]}`}>{n.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UtilBar({ label, requested, used }: { label: string; requested: number; used: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-[10px] text-muted-foreground">
          {used}% used / {requested}% requested
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
        <div className="h-full bg-primary/30 rounded-full absolute" style={{ width: `${requested}%` }} />
        <div className="h-full bg-primary rounded-full absolute" style={{ width: `${used}%` }} />
      </div>
    </div>
  );
}
