import { Section, SectionHeader } from "@/components/Section";
import { Link2, Search, Lightbulb } from "lucide-react";

const steps = [
  {
    icon: Link2,
    step: "01",
    title: "Connect your cloud accounts",
    desc: "Give us read-only access to your AWS, Azure, or GCP accounts. No agents, no scripts, nothing invasive. It takes about 5 minutes.",
  },
  {
    icon: Search,
    step: "02",
    title: "We scan for waste automatically",
    desc: "Our engine goes through your infrastructure looking for idle compute, orphaned storage, forgotten snapshots, oversized clusters — the stuff that adds up quietly.",
  },
  {
    icon: Lightbulb,
    step: "03",
    title: "You get a clear list of what to fix",
    desc: "Every finding comes with a cost estimate, severity level, suggested action, and the team that owns it. No guesswork.",
  },
];

export function SolutionSection() {
  return (
    <Section id="solution">
      <SectionHeader
        badge="How it works"
        title="Automated cloud auditing"
        description="A straightforward pipeline to detect unattached assets and idle compute."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s) => (
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
