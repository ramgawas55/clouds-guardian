import { Section, SectionHeader } from "@/components/Section";
import { Shield, Lock, Users, FileText, Key, AlertTriangle, Settings, ClipboardCheck } from "lucide-react";

const items = [
  { icon: Shield, title: "Read-Only Cloud Access", desc: "We never modify your infrastructure. All connections use read-only IAM roles." },
  { icon: Lock, title: "Encrypted Credentials", desc: "All cloud credentials are encrypted at rest and in transit using AES-256." },
  { icon: Users, title: "Role-Based Access Control", desc: "Granular permissions for admins, engineers, and viewers across teams." },
  { icon: FileText, title: "Audit Logs", desc: "Complete audit trail of every action, scan, and configuration change." },
  { icon: Key, title: "SSO-Ready Architecture", desc: "Enterprise SSO support with SAML 2.0 and OpenID Connect." },
  { icon: Settings, title: "Secure API Tokens", desc: "Scoped API tokens with expiration policies and rotation support." },
  { icon: AlertTriangle, title: "No Destructive Changes", desc: "All remediation actions require explicit confirmation and approval workflows." },
  { icon: ClipboardCheck, title: "Compliance Reporting", desc: "Generate compliance-friendly reports for SOC 2, ISO 27001, and internal audits." },
];

export function SecuritySection() {
  return (
    <Section id="security">
      <SectionHeader
        badge="Security & Compliance"
        title="Built for teams that care about access and control."
        description="Enterprise-grade security from day one. Your credentials, your rules, your audit trail."
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
