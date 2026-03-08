import { Section, SectionHeader } from "@/components/Section";

const companies = [
  "Acme Cloud", "Veltrix", "NovaSoft", "Orbitra", "ScaleOps",
  "DataForge", "CloudPeak", "InfraHQ", "PlatformX", "DevStack",
];

export function TrustBar() {
  return (
    <Section className="py-12 lg:py-16 border-y border-border">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
        Trusted by fast-growing SaaS teams, platform engineers, and cloud-native companies
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {companies.map((c) => (
          <span key={c} className="text-sm font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            {c}
          </span>
        ))}
      </div>
    </Section>
  );
}
