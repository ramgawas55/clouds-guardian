export function DashboardMockup() {
  return (
    <div className="relative mx-auto max-w-5xl rounded-xl border border-border bg-card p-1 glow-md">
      <div className="rounded-lg bg-background border border-border overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">dashboard.cloudcostleak.io</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[10px] text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">Live Scan</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <StatCard label="Monthly Spend" value="$47,230" trend="+3.2%" trendDown={false} />
          <StatCard label="Estimated Waste" value="$8,410" trend="17.8%" trendDown={true} accent="destructive" />
          <StatCard label="Annual Savings" value="$100,920" trend="" accent="success" />
          <StatCard label="Active Leaks" value="34" trend="−5 this week" trendDown={true} accent="warning" />

          {/* Chart mockup */}
          <div className="col-span-2 lg:col-span-2 bg-card rounded-lg border border-border p-4">
            <div className="text-xs text-muted-foreground mb-3">Cost Leak Trend</div>
            <div className="flex items-end gap-1 h-20">
              {[35, 42, 38, 55, 48, 60, 52, 45, 58, 50, 40, 35].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary/40 transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Top leaks */}
          <div className="col-span-2 lg:col-span-2 bg-card rounded-lg border border-border p-4">
            <div className="text-xs text-muted-foreground mb-3">Top Waste Categories</div>
            <div className="space-y-2">
              {[
                { name: "Idle EC2 Instances", val: "$3,120", pct: 37 },
                { name: "Unattached EBS", val: "$1,890", pct: 22 },
                { name: "Overprovisioned K8s", val: "$1,640", pct: 19 },
                { name: "Zombie Snapshots", val: "$1,100", pct: 13 },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.val}</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary/60 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
  trendDown,
  accent,
}: {
  label: string;
  value: string;
  trend: string;
  trendDown?: boolean;
  accent?: string;
}) {
  const accentColor = accent === "destructive"
    ? "text-destructive"
    : accent === "success"
    ? "text-success"
    : accent === "warning"
    ? "text-warning"
    : "text-primary";

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={`text-xl lg:text-2xl font-bold ${accentColor}`}>{value}</div>
      {trend && (
        <div className={`text-xs mt-1 ${trendDown ? "text-success" : "text-muted-foreground"}`}>
          {trend}
        </div>
      )}
    </div>
  );
}
