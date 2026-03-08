import { Section, SectionHeader } from "@/components/Section";
import { Server, HardDrive, Camera, Database, BarChart3, Globe } from "lucide-react";

const pains = [
  { icon: Server, title: "Idle EC2 / VM Instances", desc: "Compute resources running 24/7 with near-zero utilization, burning through your budget silently." },
  { icon: HardDrive, title: "Unattached Disks & Volumes", desc: "Storage volumes left orphaned after instance termination, accruing charges with no workload." },
  { icon: Camera, title: "Forgotten Snapshots", desc: "Old EBS snapshots and disk images piling up across regions, often unnoticed for months." },
  { icon: Database, title: "Oversized Clusters", desc: "Kubernetes node pools and database instances provisioned for peak, running idle at baseline." },
  { icon: BarChart3, title: "Staging Running 24/7", desc: "Non-production environments running around the clock without shutdown schedules or policies." },
  { icon: Globe, title: "Load Balancers Left Behind", desc: "Orphaned ALBs and NLBs from old deployments still generating hourly charges." },
];

export function ProblemSection() {
  return (
    <Section id="problem">
      <SectionHeader
        badge="The Problem"
        title="Your cloud bill is full of silent waste."
        description="Most engineering teams waste 20-35% of their cloud spend on resources nobody is actively using. These leaks compound every month."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pains.map((p) => (
          <div
            key={p.title}
            className="group bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
              <p.icon className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
