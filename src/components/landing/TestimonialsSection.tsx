import { Section, SectionHeader } from "@/components/Section";

export function TestimonialsSection() {
  return (
    <Section id="about">
      <SectionHeader
        badge="Project Genesis"
        title="Why I built this."
      />
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8 md:p-10">
        <p className="text-base text-foreground leading-relaxed mb-6">
          "I kept seeing the same problem when auditing cloud infrastructure: companies paying for resources that hadn't seen traffic in months. EC2 instances forgotten after a sprint, oversized Kubernetes clusters, and unattached EBS volumes."
        </p>
        <p className="text-base text-foreground leading-relaxed mb-8">
          "I wanted a tool that didn't just dump a spreadsheet of data, but actually provided actionable insights. A tool that a developer could deploy in minutes, scan across AWS, Azure, and GCP, and immediately surface where the waste was."
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            RG
          </div>
          <div>
            <div className="text-base font-semibold text-foreground">RAM GAWAS</div>
            <div className="text-sm text-muted-foreground">Developer & Creator</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
