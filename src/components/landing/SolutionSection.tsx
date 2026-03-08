import { Section, SectionHeader } from "@/components/Section";
import { Link2, Search, Lightbulb } from "lucide-react";

const steps = [
  {
    icon: Link2,
    step: "01",
    title: "Connect cloud accounts securely",
    desc: "Grant read-only access to your AWS, Azure, or GCP accounts. No agents, no invasive permissions. Takes under 5 minutes.",
  },
  {
    icon: Search,
    step: "02",
    title: "Analyze usage, spend, and orphaned resources",
    desc: "Our engine scans your infrastructure for idle compute, unattached storage, zombie snapshots, overprovisioned clusters, and more.",
  },
  {
    icon: Lightbulb,
    step: "03",
    title: "Get prioritized savings recommendations",
    desc: "Receive actionable recommendations ranked by impact, with cost estimates, ownership data, and one-click remediation paths.",
  },
];

export function SolutionSection() {
  return (
    <Section id="solution">
      <SectionHeader
        badge="How It Works"
        title="See exactly where your money is leaking."
        description="Three steps to full cloud cost visibility. No scripts, no lengthy onboarding, no disruptions."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div key={s.step} className="relative bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-all">
            <span className="text-5xl font-black text-primary/10 absolute top-4 right-4">{s.step}</span>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
