import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const principles = [
  { title: "Clarity", desc: "If you can't see where the money's going, you can't control it. Every dollar should be visible and attributable." },
  { title: "Accountability", desc: "Every resource should have an owner. When nobody owns it, nobody cleans it up — and you keep paying for it." },
  { title: "Automation", desc: "Manually auditing cloud resources doesn't scale. Detection, alerts, and reporting need to happen on their own." },
  { title: "Cost Discipline", desc: "Being efficient with cloud spend isn't about being cheap. It's about spending intentionally instead of accidentally." },
];

const timeline = [
  { year: "2023", event: "Started the company after watching teams waste $2M+ a year on idle cloud resources and not even know it." },
  { year: "2024", event: "Built out multi-cloud support for AWS, Azure, and GCP. Added Kubernetes waste analysis because everyone asked for it." },
  { year: "2025", event: "Crossed 500 engineering teams using the platform. Identified over $40M in annual savings across our user base." },
  { year: "2026", event: "Working on automated remediation, policy enforcement, and deeper FinOps workflows. Lots more coming." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32">
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-6">About Us</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              We built this because we lived the problem.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every engineering team we've worked with was overspending on cloud. Not because they were careless, but because there was no easy way to see what was being wasted. So we built the tool we wished we had.
            </p>
          </div>
        </Section>

        <Section>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why does cloud waste keep getting ignored?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Honestly? Because cloud billing is a mess. Resources get created during deploys, experiments, and incidents — and then everyone moves on to the next thing. Nobody goes back to check if that staging cluster is still running, or if those snapshots from six months ago are still needed. The bill grows, and after a while, people just assume that's what cloud costs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Engineering sees infrastructure. Finance sees invoices. Neither team has the full picture. Cloud Cost Leak Detector gives both sides a shared view — what's running, what's wasted, who owns it, and what should be done about it.
            </p>
          </div>
        </Section>

        <Section>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">How we got here</h2>
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

        <Section>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What we believe in</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {principles.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">The team</h2>
          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { name: "Raj Mehta", role: "CEO & Co-founder", bg: "Former SRE who got tired of manually auditing cloud spend every quarter." },
              { name: "Elena Voronova", role: "CTO & Co-founder", bg: "Spent 6 years at AWS, then built cost tooling internally at two startups." },
              { name: "James Okafor", role: "VP Engineering", bg: "Led platform engineering at two public companies. Cares a lot about clean infrastructure." },
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Want to see what you're wasting?</h2>
            <Link to="/dashboard">
              <Button variant="hero" size="lg">Run a Free Scan</Button>
            </Link>
          </div>
        </Section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
