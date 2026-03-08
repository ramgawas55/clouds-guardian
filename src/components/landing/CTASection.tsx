import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <Section className="py-24">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Cut cloud waste before it becomes normal.
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Join hundreds of engineering teams saving thousands every month by eliminating hidden cloud cost leaks.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard">
            <Button variant="hero" size="xl">Start Free Scan</Button>
          </Link>
          <Link to="/contact">
            <Button variant="hero-outline" size="xl">Book Demo</Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
