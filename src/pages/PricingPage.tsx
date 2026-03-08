import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Minus } from "lucide-react";

const allFeatures = [
  { name: "Cloud accounts", starter: "1", growth: "5", enterprise: "Unlimited" },
  { name: "Scan frequency", starter: "Weekly", growth: "Daily", enterprise: "Real-time" },
  { name: "Leak detection", starter: true, growth: true, enterprise: true },
  { name: "Rightsizing", starter: false, growth: true, enterprise: true },
  { name: "Kubernetes analysis", starter: false, growth: true, enterprise: true },
  { name: "Slack/Teams alerts", starter: false, growth: true, enterprise: true },
  { name: "Email reports", starter: true, growth: true, enterprise: true },
  { name: "Scheduled reports", starter: false, growth: true, enterprise: true },
  { name: "Tag-based breakdown", starter: false, growth: true, enterprise: true },
  { name: "Custom policies", starter: false, growth: false, enterprise: true },
  { name: "SSO / SAML", starter: false, growth: false, enterprise: true },
  { name: "API access", starter: false, growth: false, enterprise: true },
  { name: "Audit logs", starter: false, growth: false, enterprise: true },
  { name: "Dedicated onboarding", starter: false, growth: false, enterprise: true },
  { name: "SLA guarantee", starter: false, growth: false, enterprise: true },
  { name: "Support", starter: "Community", growth: "Priority", enterprise: "Dedicated" },
];

function CellValue({ val }: { val: boolean | string }) {
  if (typeof val === "string") return <span className="text-sm text-foreground">{val}</span>;
  if (val) return <Check className="w-4 h-4 text-primary mx-auto" />;
  return <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />;
}

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <PricingSection />

        {/* Comparison Table */}
        <Section>
          <SectionHeader title="Detailed feature comparison" />
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground py-3 pr-4">Feature</th>
                  <th className="text-center text-sm font-medium text-muted-foreground py-3 px-4">Starter</th>
                  <th className="text-center text-sm font-medium text-primary py-3 px-4">Growth</th>
                  <th className="text-center text-sm font-medium text-muted-foreground py-3 px-4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((f) => (
                  <tr key={f.name} className="border-b border-border/50">
                    <td className="text-sm text-foreground py-3 pr-4">{f.name}</td>
                    <td className="text-center py-3 px-4"><CellValue val={f.starter} /></td>
                    <td className="text-center py-3 px-4 bg-primary/5"><CellValue val={f.growth} /></td>
                    <td className="text-center py-3 px-4"><CellValue val={f.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Enterprise CTA */}
        <Section>
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-3">Need a custom plan?</h3>
            <p className="text-muted-foreground mb-6">Talk to our team about enterprise pricing, custom integrations, and dedicated support.</p>
            <Link to="/contact">
              <Button variant="hero" size="lg">Contact Sales</Button>
            </Link>
          </div>
        </Section>

        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
