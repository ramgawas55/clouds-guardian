import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const sections = [
  {
    title: "Getting Started",
    content: `Cloud Cost Leak Detector connects to your AWS, Azure, or GCP accounts using read-only access. Once connected, the platform continuously scans your infrastructure to identify idle, orphaned, and overprovisioned resources.\n\n**Prerequisites:**\n- An active AWS, Azure, or GCP account\n- IAM permissions to create read-only roles\n- 5 minutes of setup time\n\n**Quick Start:**\n1. Sign up for a free account\n2. Navigate to Integrations → Connect Cloud Account\n3. Follow the guided setup for your cloud provider\n4. Wait for the initial scan to complete (usually 2-5 minutes)\n5. Review your first set of leak findings and recommendations`,
  },
  {
    title: "Connecting AWS",
    content: `To connect your AWS account, you'll create a cross-account IAM role with read-only permissions.\n\n**Steps:**\n1. Go to Integrations → AWS → Connect\n2. Copy the provided CloudFormation template URL\n3. Deploy the stack in your AWS account (takes ~60 seconds)\n4. The role ARN is automatically detected\n5. Click "Verify Connection"\n\n**Permissions Required:**\n- \`ReadOnlyAccess\` managed policy\n- \`ce:GetCostAndUsage\` for billing data\n- \`ec2:Describe*\` for resource inventory\n\nWe never request write permissions. All access is read-only and auditable.`,
  },
  {
    title: "Connecting Azure",
    content: `Azure integration uses a Service Principal with Reader role.\n\n**Steps:**\n1. Go to Integrations → Azure → Connect\n2. Register the CCLD application in Azure AD\n3. Assign the Reader role at the subscription level\n4. Provide the Tenant ID, Client ID, and Client Secret\n5. Verify connection\n\n**Required Roles:**\n- \`Reader\` at subscription scope\n- \`Cost Management Reader\` for billing data\n- \`Kubernetes Cluster User\` for AKS analysis (optional)`,
  },
  {
    title: "Connecting GCP",
    content: `GCP integration uses a Service Account with Viewer role.\n\n**Steps:**\n1. Go to Integrations → GCP → Connect\n2. Create a Service Account in your GCP project\n3. Grant the Viewer role\n4. Generate a JSON key file\n5. Upload the key to CCLD\n6. Verify connection\n\n**Required Roles:**\n- \`roles/viewer\` for resource access\n- \`roles/billing.viewer\` for cost data\n- \`roles/container.viewer\` for GKE analysis (optional)`,
  },
  {
    title: "Understanding Leak Scores",
    content: `Every detected leak is assigned a severity score based on multiple factors:\n\n**Severity Levels:**\n- **Critical** — Resources with >$500/month waste, idle for 30+ days\n- **High** — Resources with >$100/month waste, idle for 14+ days\n- **Medium** — Resources with >$25/month waste or suboptimal configuration\n- **Low** — Minor optimization opportunities\n\n**Scoring Factors:**\n- Duration of inactivity\n- Monthly cost impact\n- Resource type and region\n- Historical utilization patterns\n- Confidence level of detection`,
  },
  {
    title: "Rightsizing Recommendations",
    content: `Rightsizing suggestions analyze your actual resource utilization against provisioned capacity.\n\n**How It Works:**\n1. We collect 14 days of utilization metrics\n2. Peak and average usage are calculated\n3. Optimal instance types are matched\n4. Savings estimates are generated\n\n**Supported Resources:**\n- EC2 / VM instances\n- RDS / Cloud SQL databases\n- Kubernetes node pools\n- ECS / Fargate tasks\n- Lambda memory configuration`,
  },
  {
    title: "Kubernetes Waste Detection",
    content: `CCLD analyzes Kubernetes clusters for resource inefficiency at multiple levels.\n\n**Cluster Level:**\n- Node pool utilization (CPU, memory)\n- Over-provisioned vs under-utilized nodes\n- Idle node detection\n\n**Namespace Level:**\n- Resource requests vs actual usage\n- Orphaned namespaces\n- Cost allocation by namespace\n\n**Workload Level:**\n- Pods with excessive resource requests\n- Idle deployments with zero traffic\n- CronJobs that haven't run in 30+ days`,
  },
  {
    title: "Team Alerts",
    content: `Configure alerts to notify your team when new leaks are detected or thresholds are exceeded.\n\n**Channels:**\n- Slack (channel or DM)\n- Microsoft Teams\n- Email (individual or group)\n- Webhooks (custom integrations)\n\n**Alert Types:**\n- New leak detected\n- Waste threshold exceeded\n- Weekly savings summary\n- Scan completion\n- Budget alerts`,
  },
  {
    title: "Security Overview",
    content: `Cloud Cost Leak Detector is built with enterprise security requirements in mind.\n\n**Access Model:**\n- Read-only cloud access only\n- No destructive operations without explicit approval\n- Credentials encrypted with AES-256\n\n**Authentication:**\n- SSO via SAML 2.0 and OIDC\n- Multi-factor authentication\n- Role-based access control\n\n**Compliance:**\n- SOC 2 Type II audit trail\n- GDPR-compliant data handling\n- Configurable data retention policies`,
  },
  {
    title: "API Reference",
    content: `The CCLD API allows programmatic access to your leak data, recommendations, and reports.\n\n**Base URL:** \`https://api.cloudcostleak.io/v1\`\n\n**Authentication:** Bearer token via API key\n\n**Key Endpoints:**\n- \`GET /leaks\` — List all detected leaks\n- \`GET /leaks/:id\` — Get leak details\n- \`GET /recommendations\` — List recommendations\n- \`GET /reports/summary\` — Get savings summary\n- \`POST /scans\` — Trigger a new scan\n- \`GET /accounts\` — List connected accounts\n\n**Rate Limits:** 100 requests/minute per API key\n\n**SDKs:** Python, Node.js, Go (coming soon)`,
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
