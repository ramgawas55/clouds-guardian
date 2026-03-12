import { Section, SectionHeader } from "@/components/Section";
import {
  Cloud, Scan, Scaling, Ship, BarChart3, Bell,
  Tag, TrendingUp, Users, Wrench, CalendarClock, FileText,
} from "lucide-react";

const features = [
  { icon: Cloud, title: "Multi-Cloud Visibility", desc: "View AWS, Azure, and GCP spend from a single, unified dashboard." },
  { icon: Scan, title: "Automated Detection", desc: "Continuous scanning identifies orphaned resources the moment they become idle." },
  { icon: Scaling, title: "Actionable Intelligence", desc: "Receive precise remediation steps, not just raw alerts." },
  { icon: Ship, title: "Kubernetes Profiling", desc: "Identify over-provisioned node pools and idle pods across clusters." },
  { icon: Users, title: "Resource Ownership", desc: "Map infrastructure costs directly to teams and individual owners." },
  { icon: Wrench, title: "Guided Remediation", desc: "Safely terminate or resize assets with transparent impact estimates." },
];

export function FeaturesSection() {
  return (
    <Section id="features">
      <SectionHeader
        badge="Features"
        title="Built for engineering velocity."
        description="A focused toolset designed to identify cloud waste without interrupting your development workflows."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-all duration-300"
          >
            <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
              <f.icon className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
