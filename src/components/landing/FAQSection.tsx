import { Section, SectionHeader } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Is access read-only?", a: "Yes. We use read-only IAM roles and service principals. We never modify, delete, or create resources in your cloud accounts." },
  { q: "Does this support AWS, Azure, and GCP?", a: "Yes. Cloud Cost Leak Detector provides full support for all three major cloud providers with unified dashboards and cross-cloud analysis." },
  { q: "Can I detect Kubernetes waste?", a: "Absolutely. We analyze cluster utilization, node pool efficiency, namespace-level spend, and identify idle workloads and overprovisioned resources." },
  { q: "Do you make changes automatically?", a: "No. All remediation actions require explicit confirmation through approval workflows. We suggest — you decide." },
  { q: "How long does setup take?", a: "Most teams connect their first cloud account in under 5 minutes. No agents to install, no scripts to run. Just grant read-only access and we start scanning." },
  { q: "Is this suitable for startups?", a: "Yes. Our Starter plan is built for small teams. Many startups discover 20-30% waste within their first week." },
  { q: "Can finance teams use it too?", a: "Yes. We provide executive summaries, tag-based breakdowns, and exportable reports that finance and leadership teams can understand without engineering context." },
  { q: "Do you support team alerts?", a: "Yes. Alerts go to Slack, Microsoft Teams, email, or custom webhooks. You can configure thresholds and assign ownership per resource or team." },
  { q: "Can this work across multiple accounts?", a: "Yes. Growth and Enterprise plans support multiple cloud accounts and cross-account analysis from a single dashboard." },
  { q: "What kind of savings can I expect?", a: "Most teams reduce their cloud bill by 15-35% within the first month. Savings depend on your infrastructure size and current optimization practices." },
];

export function FAQSection() {
  return (
    <Section id="faq">
      <SectionHeader
        badge="FAQ"
        title="Frequently asked questions."
      />
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-card">
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
