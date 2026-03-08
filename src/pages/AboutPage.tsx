import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const principles = [
  { title: "Clarity", desc: "Every dollar of cloud spend should be visible, attributable, and understood." },
  { title: "Accountability", desc: "Every resource should have an owner. Orphaned infrastructure is wasted infrastructure." },
  { title: "Automation", desc: "Manual cost reviews don't scale. Detection, alerts, and reporting should run continuously." },
  { title: "Cost Discipline", desc: "Cloud efficiency isn't about cutting corners — it's about spending intentionally." },
];

const timeline = [
  { year: "2023", event: "Founded after seeing teams waste $2M+ annually on idle cloud resources." },
  { year: "2024", event: "Launched multi-cloud support for AWS, Azure, and GCP with Kubernetes analysis." },
  { year: "2025", event: "Reached 500+ engineering teams and $40M+ in identified annual savings." },
  { year: "2026", event: "Expanding into automated remediation, policy enforcement, and FinOps workflows." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32">
        {/* Hero */}
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-6">About Us</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Cloud waste is a silent tax on every engineering team.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We built Cloud Cost Leak Detector because we lived the problem. Every team we worked with was overspending on cloud — not because they were careless, but because visibility was terrible. We're fixing that.
            </p>
          </div>
        </Section>

        {/* Mission */}
        <Section>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why cloud waste gets ignored</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cloud billing is complex by design. Resources get created during deployments, experiments, and incidents — then forgotten. Teams don't have time to audit every EC2 instance, every snapshot, every idle load balancer. The bill grows, and nobody questions it because "that's just what cloud costs."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Engineering teams see infrastructure. Finance teams see invoices. Neither side has a shared view of what's being used, what's wasted, and what can be safely eliminated. Cloud Cost Leak Detector bridges that gap with automated detection, clear ownership, and actionable recommendations.
            </p>
          </div>
        </Section>

        {/* Timeline */}
        <Section>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our journey</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {timeline.map((t) => (
              <div key={t.year} className="flex gap-6 items-start">
                <span className="text-sm font-bold text-primary min-w-[4rem]">{t.year}</span>
                <div className="flex-1 bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-foreground">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Principles */}
        <Section>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Product principles</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {principles.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Leadership */}
        <Section>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Leadership</h2>
          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { name: "Raj Mehta", role: "CEO & Co-founder", bg: "Former SRE at a cloud-native unicorn." },
              { name: "Elena Voronova", role: "CTO & Co-founder", bg: "Ex-AWS, built cost tooling at scale." },
              { name: "James Okafor", role: "VP Engineering", bg: "Led platform teams at two public companies." },
            ].map((p) => (
              <div key={p.name} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center text-lg font-bold text-muted-foreground">
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
                <p className="text-xs text-primary mb-1">{p.role}</p>
                <p className="text-xs text-muted-foreground">{p.bg}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to stop wasting?</h2>
            <Link to="/dashboard">
              <Button variant="hero" size="lg">Start Free Scan</Button>
            </Link>
          </div>
        </Section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
