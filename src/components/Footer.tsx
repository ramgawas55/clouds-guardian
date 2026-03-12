import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Integrations", href: "/#integrations" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs" },
    { label: "Status", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
    { label: "DPA", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-foreground mb-4">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-black">CC</span>
              </div>
              <span className="text-sm">CCLD</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A custom-built cloud cost detection tool to optimize AWS, Azure, and GCP resources without the noise.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cloud Cost Leak Detector. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed & Developed by{" "}
            <a href="https://ramgawas55.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              RAM GAWAS
            </a>
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
