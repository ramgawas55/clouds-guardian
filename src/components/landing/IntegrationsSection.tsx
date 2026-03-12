import { Section, SectionHeader } from "@/components/Section";

const integrations = [
  { name: "AWS", status: "Supported", color: "text-warning" },
  { name: "Azure", status: "Supported", color: "text-primary" },
  { name: "GCP", status: "Supported", color: "text-success" },
  { name: "Kubernetes", status: "Supported", color: "text-primary" },
  { name: "Slack", status: "Alert Channel", color: "text-foreground" },
  { name: "MS Teams", status: "Alert Channel", color: "text-primary" },
  { name: "Terraform", status: "IaC Sync", color: "text-foreground" },
  { name: "Email", status: "Alert Channel", color: "text-foreground" },
];

export function IntegrationsSection() {
  return (
    <Section id="integrations">
      <SectionHeader
        badge="Integrations"
        title="Connects with your stack."
        description="Integrate directly with major cloud providers and configure alerts across your preferred communication channels."
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
