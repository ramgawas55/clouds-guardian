import { Section, SectionHeader } from "@/components/Section";
import { Shield, Lock, Users, FileText, Key, AlertTriangle, Settings, ClipboardCheck } from "lucide-react";

const items = [
  { icon: Shield, title: "Read-Only Cloud Access", desc: "We only look at your infrastructure. We can't change, delete, or create anything. That's by design." },
  { icon: Lock, title: "Encrypted Credentials", desc: "Your cloud credentials are encrypted with AES-256, both when stored and when moving between systems." },
  { icon: Users, title: "Role-Based Access Control", desc: "Give admins full access, engineers what they need, and viewers a read-only experience. Your call." },
  { icon: FileText, title: "Audit Logs", desc: "Every scan, every action, every config change gets logged. You can always see exactly what happened and when." },
  { icon: Key, title: "SSO-Ready Architecture", desc: "Support for SAML 2.0 and OpenID Connect. Plug into your existing identity provider." },
  { icon: Settings, title: "Secure API Tokens", desc: "Scoped tokens with expiration dates and rotation support. No permanent keys floating around." },
  { icon: AlertTriangle, title: "No Destructive Changes", desc: "Want to terminate something? You have to confirm it. We'll never delete a resource without your explicit approval." },
  { icon: ClipboardCheck, title: "Compliance Reporting", desc: "Generate reports that work for SOC 2, ISO 27001, or your internal security review. They're actually readable." },
];

export function SecuritySection() {
  return (
    <Section id="security">
      <SectionHeader
        badge="Security & Compliance"
        title="We take security seriously. Here's how."
        description="You're giving us access to your cloud accounts — we understand that's a big deal. Here's exactly how we handle it."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.title} className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-all">
            <item.icon className="w-5 h-5 text-primary mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
