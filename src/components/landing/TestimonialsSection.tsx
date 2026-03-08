import { Section, SectionHeader } from "@/components/Section";

const testimonials = [
  {
    quote: "We were paying $14K/month for EC2 instances that hadn't served traffic in weeks. CCLD flagged them within the first scan. We cut our AWS bill by 27% in two weeks.",
    name: "Anika Patel",
    role: "Platform Engineer",
    company: "ScaleOps",
  },
  {
    quote: "The Kubernetes waste detection is genuinely useful. We had node pools running at 18% utilization. The rightsizing suggestions alone saved us $8K/month across three clusters.",
    name: "Marcus Chen",
    role: "DevOps Lead",
    company: "Veltrix",
  },
  {
    quote: "I needed a single view of waste across AWS and GCP for our board meeting. CCLD gave me an executive summary with hard numbers. Finance finally understands where the spend goes.",
    name: "Sarah Lindqvist",
    role: "CTO",
    company: "NovaSoft",
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <SectionHeader
        badge="What Teams Say"
        title="Trusted by engineers who care about cost discipline."
      />
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-foreground leading-relaxed mb-5">"{t.quote}"</p>
            <div>
              <div className="text-sm font-semibold text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role} at {t.company}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
