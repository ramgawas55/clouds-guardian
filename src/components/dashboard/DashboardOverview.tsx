import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const trendData = [
  { month: "Jul", spend: 42000, waste: 9200 },
  { month: "Aug", spend: 44500, waste: 8800 },
  { month: "Sep", spend: 45200, waste: 9400 },
  { month: "Oct", spend: 46100, waste: 8100 },
  { month: "Nov", spend: 47800, waste: 8600 },
  { month: "Dec", spend: 47230, waste: 8410 },
];

const savingsData = [
  { category: "Idle Compute", savings: 3120 },
  { category: "Storage", savings: 1890 },
  { category: "K8s", savings: 1640 },
  { category: "Snapshots", savings: 1100 },
  { category: "Load Bal.", savings: 420 },
  { category: "Other", savings: 240 },
];

const severityData = [
  { name: "Critical", value: 8, color: "hsl(0, 60%, 50%)" },
  { name: "High", value: 12, color: "hsl(38, 80%, 55%)" },
  { name: "Medium", value: 18, color: "hsl(195, 100%, 50%)" },
  { name: "Low", value: 14, color: "hsl(215, 12%, 55%)" },
];

const leakAlerts = [
  { resource: "prod-ec2-batch-07", type: "EC2", severity: "High", cost: "$184/mo", time: "2 hours ago" },
  { resource: "aks-nodepool-test", type: "K8s", severity: "High", cost: "$290/mo", time: "5 hours ago" },
  { resource: "snapshot-db-old-12", type: "EBS", severity: "Medium", cost: "$63/mo", time: "1 day ago" },
];

const recentScans = [
  { account: "AWS Production", resources: 1243, leaks: 18, time: "4 min ago" },
  { account: "Azure Staging", resources: 387, leaks: 9, time: "1 hour ago" },
  { account: "GCP Dev", resources: 156, leaks: 4, time: "3 hours ago" },
];

const tooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 14%, 16%)", borderRadius: "6px", fontSize: "12px" },
  labelStyle: { color: "hsl(215, 12%, 55%)" },
};

export function DashboardOverview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">Overview</h1>
          <p className="text-xs text-muted-foreground">Cloud cost analysis across all connected accounts</p>
        </div>
        <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors">
          Run New Scan
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatWidget label="Total Monthly Spend" value="$47,230" sub="+3.2% vs last month" />
        <StatWidget label="Estimated Waste" value="$8,410" sub="17.8% of total spend" accent="destructive" />
        <StatWidget label="Potential Annual Savings" value="$100,920" accent="success" />
        <StatWidget label="Active Leaks" value="34" sub="−5 this week" accent="warning" />
      </div>

      {/* Provider spend */}
      <div className="grid grid-cols-3 gap-3">
        <ProviderCard provider="AWS" spend="$28,140" pct={60} />
        <ProviderCard provider="Azure" spend="$12,450" pct={26} />
        <ProviderCard provider="GCP" spend="$6,640" pct={14} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Trend */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Cost & Waste Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 14%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Line type="monotone" dataKey="spend" stroke="hsl(195, 100%, 50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="waste" stroke="hsl(0, 60%, 50%)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Savings by category */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Savings by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 14%)" />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Bar dataKey="savings" fill="hsl(195, 100%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Severity + Alerts + Scans */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Severity */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={severityData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
                {severityData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {severityData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[10px] text-muted-foreground">{s.name} ({s.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leak Alerts */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Leak Alerts</h3>
          <div className="space-y-3">
            {leakAlerts.map((a) => (
              <div key={a.resource} className="flex items-start gap-3">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.severity === "High" ? "bg-warning" : "bg-primary"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">{a.resource}</div>
                  <div className="text-[10px] text-muted-foreground">{a.type} · {a.cost} · {a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Scans</h3>
          <div className="space-y-3">
            {recentScans.map((s) => (
              <div key={s.account} className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-foreground">{s.account}</div>
                  <div className="text-[10px] text-muted-foreground">{s.resources} resources · {s.leaks} leaks</div>
                </div>
                <span className="text-[10px] text-muted-foreground">{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatWidget({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  const color = accent === "destructive" ? "text-destructive" : accent === "success" ? "text-success" : accent === "warning" ? "text-warning" : "text-foreground";
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

function ProviderCard({ provider, spend, pct }: { provider: string; spend: string; pct: number }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-foreground">{provider}</span>
        <span className="text-xs text-muted-foreground">{pct}%</span>
      </div>
      <div className="text-lg font-bold text-foreground mb-2">{spend}</div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary/60 rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
