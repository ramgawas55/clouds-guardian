import { Section } from "@/components/Section";

const technologies = [
  "Amazon Web Services", "Microsoft Azure", "Google Cloud",
  "Kubernetes", "Terraform", "Docker"
];

export function TrustBar() {
  return (
    <Section className="py-12 lg:py-16 border-y border-border">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
        Built to integrate with modern cloud infrastructure
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {technologies.map((t) => (
          <span key={t} className="text-sm font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            {t}
          </span>
        ))}
      </div>
    </Section>
  );
}
