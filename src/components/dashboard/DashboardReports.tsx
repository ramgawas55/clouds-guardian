export function DashboardReports() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Reports</h1>
        <p className="text-xs text-muted-foreground">Savings summaries and exportable reports</p>
      </div>

      {/* Executive Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm font-semibold text-foreground mb-1">Executive Summary — March 2026</h3>
        <p className="text-xs text-muted-foreground mb-4">Key cost optimization metrics for leadership review</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <MiniStat label="Total Spend" value="$47,230" />
          <MiniStat label="Waste Identified" value="$8,410" />
          <MiniStat label="Actions Taken" value="12" />
          <MiniStat label="Savings Captured" value="$3,200" />
        </div>
        <div className="flex gap-2">
          <ExportBtn label="Export PDF" />
          <ExportBtn label="Export CSV" />
          <ExportBtn label="Email Report" />
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Weekly Savings Summary</h3>
        <div className="space-y-3">
          {[
            { week: "Mar 1 – Mar 7", found: "$2,100", captured: "$840", actions: 5 },
            { week: "Feb 22 – Feb 28", found: "$1,890", captured: "$1,200", actions: 8 },
            { week: "Feb 15 – Feb 21", found: "$2,340", captured: "$960", actions: 4 },
            { week: "Feb 8 – Feb 14", found: "$1,560", captured: "$1,100", actions: 6 },
          ].map((w) => (
            <div key={w.week} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-xs text-foreground">{w.week}</span>
              <div className="flex items-center gap-6 text-xs">
                <span className="text-muted-foreground">Found: <span className="text-destructive">{w.found}</span></span>
                <span className="text-muted-foreground">Captured: <span className="text-success">{w.captured}</span></span>
                <span className="text-muted-foreground">{w.actions} actions</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team waste trends */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Team-Wise Waste</h3>
        <div className="space-y-2">
          {[
            { team: "platform-team", waste: "$3,120", pct: 37 },
            { team: "sre-team", waste: "$2,140", pct: 25 },
            { team: "dev-team", waste: "$1,560", pct: 19 },
            { team: "data-team", waste: "$980", pct: 12 },
            { team: "ml-team", waste: "$610", pct: 7 },
          ].map((t) => (
            <div key={t.team} className="flex items-center gap-4">
              <span className="text-xs text-foreground min-w-[100px] font-mono">{t.team}</span>
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary/50 rounded-full" style={{ width: `${t.pct}%` }} />
              </div>
              <span className="text-xs text-muted-foreground min-w-[60px] text-right">{t.waste}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background border border-border rounded-md p-3">
      <div className="text-[10px] text-muted-foreground mb-0.5">{label}</div>
      <div className="text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}

function ExportBtn({ label }: { label: string }) {
  return (
    <button className="text-[10px] border border-border text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md transition-colors">
      {label}
    </button>
  );
}
