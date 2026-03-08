import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const benefits = [
  "See a live walkthrough of leak detection",
  "Get a custom savings estimate for your infrastructure",
  "Learn how teams like yours reduced cloud spend by 20-35%",
  "Understand the 5-minute onboarding process",
  "Ask questions about security, compliance, and integrations",
];

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20">
          <Section>
            <div className="max-w-lg mx-auto text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-3">Thanks for reaching out.</h1>
              <p className="text-muted-foreground">Our team will get back to you within one business day.</p>
            </div>
          </Section>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20">
        <Section>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left side — benefits */}
            <div>
              <span className="inline-block text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-6">
                Book a Demo
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                See how much your team could save.
              </h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Schedule a 30-minute walkthrough with our team. We'll show you how Cloud Cost Leak Detector works with your cloud setup and estimate your potential savings.
              </p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side — form */}
            <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-4"
              >
                <Field label="Full Name" name="name" placeholder="Jane Smith" />
                <Field label="Work Email" name="email" type="email" placeholder="jane@company.com" />
                <Field label="Company" name="company" placeholder="Acme Inc." />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Cloud Providers</label>
                    <select className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground">
                      <option>AWS</option>
                      <option>Azure</option>
                      <option>GCP</option>
                      <option>Multi-cloud</option>
                    </select>
                  </div>
                  <Field label="Monthly Cloud Spend" name="spend" placeholder="$50,000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Team Size</label>
                    <select className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground">
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-200</option>
                      <option>200+</option>
                    </select>
                  </div>
                  <div />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Message (optional)</label>
                  <textarea
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground min-h-[80px] resize-none"
                    placeholder="Tell us about your cloud cost challenges..."
                  />
                </div>
                <Button variant="hero" size="lg" className="w-full" type="submit">
                  Book Demo
                </Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  No commitment required. We'll respond within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </div>
  );
};

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground/50"
      />
    </div>
  );
}

export default ContactPage;
