import { Section, SectionHeader } from "@/components/Section";
import { Server, HardDrive, Camera, Database, BarChart3, Globe } from "lucide-react";

const pains = [
  { icon: Server, title: "Idle EC2 / VM Instances", desc: "That batch server someone spun up three sprints ago? Still running. Still billing you. Nobody remembers who owns it." },
  { icon: HardDrive, title: "Unattached Disks & Volumes", desc: "When you terminate an instance but forget the attached storage, those volumes just sit there — quietly costing you every hour." },
  { icon: Camera, title: "Forgotten Snapshots", desc: "Teams create EBS snapshots \"just in case\" and never clean them up. After a few months, you've got hundreds nobody needs." },
  { icon: Database, title: "Oversized Clusters", desc: "Your Kubernetes clusters were sized for Black Friday traffic six months ago. Now they're at 15% utilization, every single day." },
  { icon: BarChart3, title: "Staging Running 24/7", desc: "Dev and staging environments don't need to run at 3 AM on a Sunday. But without shutdown policies, they do — and you pay for it." },
  { icon: Globe, title: "Load Balancers Left Behind", desc: "Old deployments leave behind ALBs and NLBs that serve zero traffic but still show up on your bill every month." },
];

export function ProblemSection() {
  return (
    <Section id="problem">
      <SectionHeader
        badge="The Problem"
        title="Cloud infrastructure scales effortlessly. So does waste."
        description="Resources are rapidly deployed for experiments, incidents, and fast loops. Frequently, they are forgotten. Over time, untracked assets silently inflate your runtime costs."
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
