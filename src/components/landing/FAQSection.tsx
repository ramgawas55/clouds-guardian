import { Section, SectionHeader } from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Is access really read-only?", a: "Yes, 100%. We use read-only IAM roles and service principals. We literally cannot modify, delete, or create anything in your cloud accounts. That's a hard technical limitation, not just a policy." },
  { q: "Does this work with AWS, Azure, and GCP?", a: "Yep, all three. You get a single dashboard that pulls in data from all your connected accounts, so you don't have to jump between tools." },
  { q: "Can it detect Kubernetes waste?", a: "Absolutely. We look at cluster utilization, node pool sizing, namespace-level spend, and idle workloads. If your clusters are oversized, we'll tell you exactly where and by how much." },
  { q: "Will it make changes to my infrastructure automatically?", a: "No. We suggest actions — you decide what to do. Every remediation requires your explicit approval. We're not going to delete your production database at 2 AM." },
  { q: "How long does it actually take to set up?", a: "Most teams are up and running in under 5 minutes. You create a read-only IAM role, connect it, and we start scanning. No agents, no scripts, nothing to install on your servers." },
  { q: "Is this useful for small startups?", a: "Very. Startups often have the most waste relative to their spend because they're moving fast and not thinking about cost optimization. This tool is built to give you instant visibility." },
  { q: "Can non-technical people use it? Like finance teams?", a: "Yes. We have executive summaries, tag-based breakdowns, and exportable reports that don't require engineering context to understand. Finance teams love it." },
  { q: "How do team alerts work?", a: "You pick your channels — Slack, Microsoft Teams, email, or webhooks. Set thresholds for what matters to you (new leaks, budget limits, weekly summaries), and we handle the rest." },
  { q: "Can this handle multiple cloud accounts?", a: "Yes. You can connect as many accounts as you need. Everything shows up in one unified dashboard with cross-account analysis." },
  { q: "What kind of savings should I realistically expect?", a: "It depends on your setup, but most teams find 15-35% of their cloud bill is going to waste. Some find more. The first scan usually surfaces the biggest wins." },
];

export function FAQSection() {
  return (
    <Section id="faq">
      <SectionHeader
        badge="FAQ"
        title="Questions people actually ask us."
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
