import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Zap, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardMockup } from "./DashboardMockup";

const trustItems = [
  { icon: Cloud, label: "AWS, Azure, GCP" },
  { icon: Shield, label: "Read-only access" },
  { icon: Clock, label: "5-min onboarding" },
  { icon: Zap, label: "No agent required" },
];

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <span className="inline-block text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-6">
            Now supporting multi-cloud environments
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
            Stop paying for cloud resources{" "}
            <span className="text-gradient">nobody is using.</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Cloud Cost Leak Detector scans your AWS, Azure, and GCP infrastructure to
            detect hidden cost leaks, waste patterns, and rightsizing opportunities — in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="hero" size="xl">Start Free Scan</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="hero-outline" size="xl">View Demo Dashboard</Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-6 flex-wrap mb-14"
        >
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="w-4 h-4 text-primary" />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
