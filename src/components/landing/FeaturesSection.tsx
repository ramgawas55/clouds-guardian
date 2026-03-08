import { Section, SectionHeader } from "@/components/Section";
import {
  Cloud, Scan, Scaling, Ship, BarChart3, Bell,
  Tag, TrendingUp, Users, Wrench, CalendarClock, FileText,
} from "lucide-react";

const features = [
  { icon: Cloud, title: "Multi-Cloud Support", desc: "Unified visibility across AWS, Azure, and GCP from a single dashboard." },
  { icon: Scan, title: "Automated Leak Detection", desc: "Continuous scans identify idle, orphaned, and overprovisioned resources automatically." },
  { icon: Scaling, title: "Rightsizing Recommendations", desc: "Data-driven suggestions to match instance size to actual utilization." },
  { icon: Ship, title: "Kubernetes Waste Analysis", desc: "Detect overprovisioned node pools, idle workloads, and unused namespaces." },
  { icon: BarChart3, title: "Daily Savings Reports", desc: "Automated daily digests of new waste found and savings captured." },
  { icon: Bell, title: "Team Alerts & Approvals", desc: "Slack, Teams, and email alerts with approval workflows for remediation." },
  { icon: Tag, title: "Tag-Based Cost Breakdown", desc: "Drill into spend by team, project, environment, or custom tags." },
  { icon: TrendingUp, title: "Historical Spend Trends", desc: "Track cost patterns over time to identify anomalies and drift." },
  { icon: Users, title: "Resource Ownership Insights", desc: "Know which team owns every resource and who should take action." },
  { icon: Wrench, title: "Smart Remediation Suggestions", desc: "Prioritized actions with estimated savings and risk assessment." },
  { icon: CalendarClock, title: "Scheduled Shutdown Automation", desc: "Auto-stop non-production workloads during off-hours and weekends." },
  { icon: FileText, title: "Executive Savings Summaries", desc: "Shareable reports for leadership with clear ROI and cost trends." },
];

export function FeaturesSection() {
  return (
    <Section id="features">
      <SectionHeader
        badge="Features"
        title="Everything you need to eliminate cloud waste."
        description="Purpose-built for DevOps, SRE, and FinOps teams who need actionable cost intelligence — not just dashboards."
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
