import { Section, SectionHeader } from "@/components/Section";

const integrations = [
  { name: "AWS", status: "Full Support", color: "text-warning" },
  { name: "Azure", status: "Full Support", color: "text-primary" },
  { name: "GCP", status: "Full Support", color: "text-success" },
  { name: "Kubernetes", status: "Native", color: "text-primary" },
  { name: "Slack", status: "Alerts", color: "text-foreground" },
  { name: "Microsoft Teams", status: "Alerts", color: "text-primary" },
  { name: "Terraform", status: "Import", color: "text-foreground" },
  { name: "Prometheus", status: "Metrics", color: "text-destructive" },
  { name: "Grafana", status: "Dashboards", color: "text-warning" },
  { name: "Datadog", status: "Metrics", color: "text-foreground" },
  { name: "Email Alerts", status: "Built-in", color: "text-foreground" },
  { name: "Webhooks", status: "Custom", color: "text-foreground" },
];

export function IntegrationsSection() {
  return (
    <Section id="integrations">
      <SectionHeader
        badge="Integrations"
        title="Plugs into the tools you already use."
        description="Connect your cloud accounts, hook up Slack or Teams for alerts, and pull metrics from your existing monitoring stack. No new workflows to learn."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {integrations.map((i) => (
          <div
            key={i.name}
            className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/20 transition-all group"
          >
            <div className={`text-2xl font-bold mb-2 ${i.color} opacity-60 group-hover:opacity-100 transition-opacity`}>
              {i.name.charAt(0)}
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">{i.name}</h4>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{i.status}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
