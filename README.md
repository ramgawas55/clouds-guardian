# Cloud Cost Leak Detector

**Find hidden cloud waste before it drains your budget.**

Cloud Cost Leak Detector is a SaaS platform that helps engineering teams spot and eliminate wasted cloud spend across AWS, Azure, and GCP. If you've ever had idle EC2 instances running for weeks, forgotten snapshots piling up, or Kubernetes clusters sitting at 15% utilization — this tool is built for you.

## What It Does

Most teams waste 20–35% of their cloud bill without realizing it. Resources get spun up during deployments, experiments, or incidents — and then nobody remembers to shut them down. The bill keeps growing, and everyone assumes "that's just what cloud costs."

Cloud Cost Leak Detector fixes that by:

- **Scanning your infrastructure** for idle compute, unattached storage, zombie snapshots, and overprovisioned workloads
- **Surfacing prioritized recommendations** so you know exactly what to fix first
- **Tracking waste by team and service** so there's clear ownership and accountability
- **Generating reports** that both engineers and leadership can actually understand

## Who It's For

- DevOps and Platform Engineers tired of manually auditing resources
- SRE teams looking for better cost visibility across environments
- FinOps teams that need clear, exportable savings data
- CTOs and engineering managers who want to reduce cloud spend without slowing down development
- Startup founders watching every dollar of runway

## Key Features

- **Multi-cloud support** — AWS, Azure, and GCP in one dashboard
- **Automated leak detection** — continuous scans catch idle and orphaned resources
- **Kubernetes waste analysis** — node pool utilization, namespace-level spend, idle workloads
- **Rightsizing recommendations** — data-driven suggestions based on actual usage
- **Team alerts** — Slack, Microsoft Teams, email, and webhook notifications
- **Tag-based cost breakdown** — drill into spend by team, project, or environment
- **Scheduled shutdown automation** — stop paying for dev environments that run overnight
- **Executive-ready reports** — shareable summaries with hard numbers

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Framer Motion** for animations
- **Shadcn/UI** components

## Pages

| Page | What's Inside |
|------|--------------|
| **Landing** | Hero, features, pricing, testimonials, FAQ, integrations |
| **Dashboard** | Charts, leak findings table, recommendations, K8s analysis, reports, settings |
| **Docs** | Structured documentation with sidebar navigation |
| **Pricing** | Plans, comparison table, annual billing toggle |
| **About** | Company story, mission, leadership |
| **Contact** | Demo booking form with benefits panel |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/ramgawas55/-Cloud-Cost-Leak-Detector.git

# Navigate into the project
cd -Cloud-Cost-Leak-Detector

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── landing/        # All landing page sections
│   ├── dashboard/      # Dashboard widgets and layout
│   ├── ui/             # Shadcn UI primitives
│   ├── Navbar.tsx       # Global navigation
│   ├── Footer.tsx       # Global footer
│   └── Section.tsx      # Reusable section wrapper
├── pages/
│   ├── Index.tsx        # Landing page
│   ├── DashboardPage.tsx
│   ├── PricingPage.tsx
│   ├── DocsPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
└── App.tsx              # Routes and providers
```

## Security Approach

This platform is designed with enterprise trust in mind:

- Read-only cloud access — we never touch your infrastructure
- Credentials encrypted with AES-256 at rest and in transit
- Role-based access control for teams
- Full audit logging of every action and scan
- SSO-ready with SAML 2.0 and OpenID Connect
- No destructive changes without explicit user approval

## Deployment

This project is ready to deploy on any static hosting platform — Vercel, Netlify, or your own infrastructure. Just run `npm run build` and deploy the `dist/` folder.

## License

All rights reserved.

---

Made by [Ram Gawas](https://ramgawas55.in)
