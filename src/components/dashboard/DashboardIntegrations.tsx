const integrations = [
  { name: "AWS", status: "Connected", account: "prod-account-01", statusColor: "text-success" },
  { name: "Azure", status: "Connected", account: "subscription-staging", statusColor: "text-success" },
  { name: "GCP", status: "Pending", account: "project-gcp-dev", statusColor: "text-warning" },
  { name: "Slack", status: "Connected", account: "#cloud-alerts", statusColor: "text-success" },
  { name: "Microsoft Teams", status: "Disconnected", account: "—", statusColor: "text-muted-foreground" },
  { name: "Webhooks", status: "Connected", account: "https://hooks.acme.io/ccld", statusColor: "text-success" },
];

const btnLabel: Record<string, string> = {
  Connected: "Manage",
  Pending: "Complete Setup",
  Disconnected: "Connect",
};

export function DashboardIntegrations() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Integrations</h1>
        <p className="text-xs text-muted-foreground">Manage cloud provider and notification connections</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((i) => (
          <div key={i.name} className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">{i.name}</h3>
              <span className={`text-[10px] font-medium ${i.statusColor}`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${
                  i.status === "Connected" ? "bg-success" : i.status === "Pending" ? "bg-warning" : "bg-muted-foreground"
                }`} />
                {i.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 font-mono truncate">{i.account}</p>
            <div className="flex gap-2">
              <button className="text-[10px] bg-primary/10 text-primary px-3 py-1.5 rounded-md font-medium hover:bg-primary/20">
                {btnLabel[i.status]}
              </button>
              {i.status === "Connected" && (
                <button className="text-[10px] border border-border text-muted-foreground px-3 py-1.5 rounded-md hover:text-foreground">
                  Test Alert
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
