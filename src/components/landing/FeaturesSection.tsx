import { Section, SectionHeader } from "@/components/Section";
import {
  Cloud, Scan, Scaling, Ship, BarChart3, Bell,
  Tag, TrendingUp, Users, Wrench, CalendarClock, FileText,
} from "lucide-react";

const features = [
  { icon: Cloud, title: "Multi-Cloud Support", desc: "See AWS, Azure, and GCP side by side. One dashboard for everything." },
  { icon: Scan, title: "Automated Leak Detection", desc: "Scans run continuously, so you catch waste as it happens — not months later." },
  { icon: Scaling, title: "Rightsizing Recommendations", desc: "We look at what your instances actually use, then suggest what they should be." },
  { icon: Ship, title: "Kubernetes Waste Analysis", desc: "Find overprovisioned node pools, idle pods, and namespaces nobody's touched in weeks." },
  { icon: BarChart3, title: "Daily Savings Reports", desc: "Wake up to a summary of what we found overnight and how much you can save today." },
  { icon: Bell, title: "Team Alerts & Approvals", desc: "Get notified on Slack, Teams, or email. Nothing gets changed without someone approving it first." },
  { icon: Tag, title: "Tag-Based Cost Breakdown", desc: "Break down spend by team, project, or environment. Finally know who's spending what." },
  { icon: TrendingUp, title: "Historical Spend Trends", desc: "See how your costs have moved over time. Spot anomalies before they become the new normal." },
  { icon: Users, title: "Resource Ownership Insights", desc: "Every resource gets an owner. No more \"who spun this up?\" conversations." },
  { icon: Wrench, title: "Smart Remediation Suggestions", desc: "Not just \"this is wasted\" — we tell you exactly what to do about it, ranked by impact." },
  { icon: CalendarClock, title: "Scheduled Shutdown Automation", desc: "Turn off dev and staging environments at night and on weekends. Simple as that." },
  { icon: FileText, title: "Executive Savings Summaries", desc: "Need to show leadership what you saved this quarter? We've got a report for that." },
];

export function FeaturesSection() {
  return (
    <Section id="features">
      <SectionHeader
        badge="Features"
        title="Built for the people who actually manage cloud infrastructure."
        description="Not another fancy dashboard you'll never open. These are tools that help you do something about waste."
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
