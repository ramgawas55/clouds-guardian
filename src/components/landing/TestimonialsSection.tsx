import { Section, SectionHeader } from "@/components/Section";

const testimonials = [
  {
    quote: "We had $14K/month in EC2 instances that hadn't seen real traffic in weeks. Nobody knew. CCLD found them on the first scan, and we cut our AWS bill by 27% within two weeks. It felt almost too easy.",
    name: "Anika Patel",
    role: "Platform Engineer",
    company: "ScaleOps",
  },
  {
    quote: "I knew our Kubernetes clusters were oversized, but I didn't have the data to prove it. CCLD showed us node pools running at 18% utilization with clear rightsizing suggestions. We saved $8K/month across three clusters.",
    name: "Marcus Chen",
    role: "DevOps Lead",
    company: "Veltrix",
  },
  {
    quote: "Before our board meeting, I needed a clear picture of waste across AWS and GCP. CCLD gave me an executive summary with actual dollar amounts. For the first time, our finance team understood where the cloud money was going.",
    name: "Sarah Lindqvist",
    role: "CTO",
    company: "NovaSoft",
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <SectionHeader
        badge="From Real Teams"
        title="What people actually say about using this."
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
