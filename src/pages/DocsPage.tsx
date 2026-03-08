import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const sections = [
  {
    title: "Getting Started",
    content: `Here's the short version: you connect your cloud accounts with read-only access, and we start scanning for waste. That's it.\n\nThe whole thing takes about 5 minutes. No agents to install, no scripts to run on your servers.\n\n**What you need:**\n- An active AWS, Azure, or GCP account\n- Permission to create a read-only IAM role (or equivalent)\n- About 5 minutes\n\n**Steps:**\n1. Create your free account\n2. Go to Integrations → Connect Cloud Account\n3. Follow the guided setup for your provider\n4. Wait for the first scan (usually 2-5 minutes)\n5. Check out your leak findings and recommendations`,
  },
  {
    title: "Connecting AWS",
    content: `Connecting AWS is pretty straightforward. You create a cross-account IAM role with read-only permissions, and we use that to scan your resources.\n\n**Here's how:**\n1. Go to Integrations → AWS → Connect\n2. We'll give you a CloudFormation template URL — just deploy it in your account\n3. The stack creates the IAM role automatically (takes about 60 seconds)\n4. The role ARN gets picked up by our system\n5. Hit "Verify Connection" and you're done\n\n**What permissions do we need?**\n- \`ReadOnlyAccess\` managed policy\n- \`ce:GetCostAndUsage\` so we can pull billing data\n- \`ec2:Describe*\` for resource inventory\n\nWe never ask for write permissions. Never have, never will.`,
  },
  {
    title: "Connecting Azure",
    content: `For Azure, we use a Service Principal with a Reader role. Nothing fancy.\n\n**Steps:**\n1. Go to Integrations → Azure → Connect\n2. Register the CCLD app in Azure AD\n3. Give it the Reader role at the subscription level\n4. Grab the Tenant ID, Client ID, and Client Secret\n5. Paste them in and verify\n\n**Roles we need:**\n- \`Reader\` at subscription scope\n- \`Cost Management Reader\` for billing\n- \`Kubernetes Cluster User\` if you want AKS analysis (optional)`,
  },
  {
    title: "Connecting GCP",
    content: `GCP uses a Service Account with Viewer role. Similar pattern to the other providers.\n\n**Steps:**\n1. Go to Integrations → GCP → Connect\n2. Create a Service Account in your project\n3. Grant it the Viewer role\n4. Download the JSON key file\n5. Upload it to CCLD and verify\n\n**Roles we need:**\n- \`roles/viewer\` for resource access\n- \`roles/billing.viewer\` for cost data\n- \`roles/container.viewer\` if you want GKE analysis (optional)`,
  },
  {
    title: "Understanding Leak Scores",
    content: `When we find waste, we assign it a severity score so you know what to tackle first. Here's how the scoring works:\n\n**Severity Levels:**\n- **Critical** — Over $500/month in waste, resource idle for 30+ days. Fix this first.\n- **High** — Over $100/month, idle 14+ days. Worth addressing soon.\n- **Medium** — Over $25/month or suboptimal config. Good to clean up when you have time.\n- **Low** — Small optimizations. Nice to fix but not urgent.\n\n**What affects the score:**\n- How long the resource has been sitting idle\n- How much it's costing you per month\n- What type of resource it is\n- Historical usage patterns\n- How confident we are in the detection`,
  },
  {
    title: "Rightsizing Recommendations",
    content: `Rightsizing is about matching your instance sizes to what you're actually using, not what you thought you'd need.\n\n**How we figure it out:**\n1. We look at 14 days of utilization data\n2. We calculate peak and average usage\n3. We find the smallest instance type that still handles your workload\n4. We show you the savings estimate\n\n**What we can rightsize:**\n- EC2 and VM instances\n- RDS and Cloud SQL databases\n- Kubernetes node pools\n- ECS and Fargate tasks\n- Lambda memory settings`,
  },
  {
    title: "Kubernetes Waste Detection",
    content: `Kubernetes clusters are notoriously hard to right-size. Here's what we look at:\n\n**At the cluster level:**\n- Overall CPU and memory utilization\n- Which nodes are overprovisioned vs underused\n- Nodes that are basically idle\n\n**At the namespace level:**\n- Resource requests vs what's actually being consumed\n- Namespaces that nobody's touched in weeks\n- Cost breakdown per namespace\n\n**At the workload level:**\n- Pods requesting way more CPU/memory than they use\n- Deployments with zero traffic\n- CronJobs that haven't fired in over 30 days`,
  },
  {
    title: "Team Alerts",
    content: `Set up alerts so your team hears about new waste as it's detected, not three months later in a cost review meeting.\n\n**Where alerts can go:**\n- Slack (channel or DM)\n- Microsoft Teams\n- Email (individual or group)\n- Webhooks (for custom integrations)\n\n**What we can alert on:**\n- New leak detected\n- Waste crosses a threshold you set\n- Weekly savings summary\n- Scan finished\n- Budget limit approaching`,
  },
  {
    title: "Security Overview",
    content: `We know you're trusting us with access to your cloud accounts. Here's how we handle that responsibility.\n\n**How we access your infrastructure:**\n- Read-only. Always. We can't change anything.\n- We won't take destructive action without your explicit approval\n- Your credentials are encrypted with AES-256\n\n**Authentication:**\n- SSO via SAML 2.0 and OIDC\n- Multi-factor authentication supported\n- Role-based access control for your team\n\n**Compliance:**\n- SOC 2 Type II audit trail\n- GDPR-compliant data handling\n- You control data retention policies`,
  },
  {
    title: "API Reference",
    content: `If you want to build on top of CCLD or pull data into your own tools, here's the API.\n\n**Base URL:** \`https://api.cloudcostleak.io/v1\`\n\n**Auth:** Bearer token using your API key\n\n**Main endpoints:**\n- \`GET /leaks\` — Get all detected leaks\n- \`GET /leaks/:id\` — Details on a specific leak\n- \`GET /recommendations\` — Your current recommendations\n- \`GET /reports/summary\` — Savings summary\n- \`POST /scans\` — Kick off a new scan\n- \`GET /accounts\` — List connected cloud accounts\n\n**Rate limit:** 100 requests/minute per key\n\n**SDKs:** Python, Node.js, Go (Go is coming soon)`,
  },
];

const DocsPage = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 min-h-screen border-r border-border bg-card p-6 pt-10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Documentation</h3>
            <nav className="space-y-1">
              {sections.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className={`block w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                    active === i
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 max-w-3xl px-6 lg:px-12 py-10">
            {/* Mobile nav */}
            <div className="lg:hidden mb-6">
              <select
                value={active}
                onChange={(e) => setActive(Number(e.target.value))}
                className="w-full h-10 px-3 bg-card border border-border rounded-md text-sm text-foreground"
              >
                {sections.map((s, i) => (
                  <option key={s.title} value={i}>{s.title}</option>
                ))}
              </select>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-6">{sections[active].title}</h1>
            <div className="prose prose-invert prose-sm max-w-none">
              {sections[active].content.split("\n").map((line, i) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  return <h3 key={i} className="text-base font-semibold text-foreground mt-6 mb-2">{line.replace(/\*\*/g, "")}</h3>;
                }
                if (line.startsWith("- ")) {
                  return (
                    <div key={i} className="flex items-start gap-2 ml-2 mb-1">
                      <span className="text-primary mt-1.5 text-xs">•</span>
                      <span className="text-sm text-muted-foreground">
                        {line.slice(2).split(/`([^`]+)`/).map((part, j) =>
                          j % 2 === 1 ? <code key={j} className="text-xs bg-secondary px-1.5 py-0.5 rounded text-foreground">{part}</code> : part
                        )}
                      </span>
                    </div>
                  );
                }
                if (line.match(/^\d+\./)) {
                  return (
                    <div key={i} className="flex items-start gap-2 ml-2 mb-1">
                      <span className="text-primary text-sm font-medium min-w-[1.2rem]">{line.match(/^\d+/)?.[0]}.</span>
                      <span className="text-sm text-muted-foreground">{line.replace(/^\d+\.\s*/, "")}</span>
                    </div>
                  );
                }
                if (line.trim() === "") return <div key={i} className="h-3" />;
                return (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-1">
                    {line.split(/`([^`]+)`/).map((part, j) =>
                      j % 2 === 1 ? <code key={j} className="text-xs bg-secondary px-1.5 py-0.5 rounded text-foreground">{part}</code> : part
                    )}
                  </p>
                );
              })}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocsPage;
