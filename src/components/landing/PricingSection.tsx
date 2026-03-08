import { Section, SectionHeader } from "@/components/Section";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    desc: "For solo engineers and small teams getting started with cost visibility.",
    monthly: 49,
    yearly: 39,
    features: [
      "Single cloud account",
      "Weekly scans",
      "Email reports",
      "Basic leak detection",
      "Up to 500 resources",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Growth",
    desc: "For startups and scaling teams with multi-cloud infrastructure.",
    monthly: 199,
    yearly: 159,
    features: [
      "Up to 5 cloud accounts",
      "Daily scans",
      "Slack & Teams alerts",
      "Full dashboards",
      "Kubernetes analysis",
      "Scheduled reports",
      "Tag-based breakdown",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    desc: "For organizations that need full control, SSO, and dedicated onboarding.",
    monthly: null,
    yearly: null,
    features: [
      "Unlimited cloud accounts",
      "Real-time scanning",
      "SSO / SAML",
      "Custom policies",
      "Dedicated onboarding",
      "Custom reporting",
      "API access",
      "SLA guarantee",
      "Audit logs",
      "Compliance reports",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <Section id="pricing">
      <SectionHeader
        badge="Pricing"
        title="Simple, transparent pricing."
        description="Start free. Scale as your cloud footprint grows. No hidden fees."
      />

      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className={`text-sm ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-primary" : "bg-secondary"}`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-background transition-transform ${
              annual ? "translate-x-6" : "translate-x-0.5"
            }`}
          />
        </button>
        <span className={`text-sm ${annual ? "text-foreground" : "text-muted-foreground"}`}>
          Annual <span className="text-primary text-xs">Save 20%</span>
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-card border rounded-xl p-6 transition-all ${
              plan.popular ? "border-primary/40 glow-sm scale-[1.02]" : "border-border hover:border-primary/20"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
            <p className="text-xs text-muted-foreground mb-5">{plan.desc}</p>
            <div className="mb-6">
              {plan.monthly !== null ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    ${annual ? plan.yearly : plan.monthly}
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-foreground">Custom</span>
              )}
            </div>
            <Link to={plan.monthly === null ? "/contact" : "/dashboard"}>
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full mb-6"
              >
                {plan.cta}
              </Button>
            </Link>
            <ul className="space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
