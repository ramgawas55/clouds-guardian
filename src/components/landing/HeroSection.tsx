import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Zap, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardMockup } from "./DashboardMockup";

const trustItems = [
  { icon: Cloud, label: "AWS, Azure, GCP" },
  { icon: Shield, label: "Read-only access" },
  { icon: Clock, label: "Setup in 5 minutes" },
  { icon: Zap, label: "No agents to install" },
];

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <span className="inline-block text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-6">
            Works across AWS, Azure, and GCP
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
            Find and cut cloud waste {" "}
            <span className="text-gradient">in minutes.</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Scan your AWS, Azure, and GCP environments for idle instances, forgotten snapshots, and oversized clusters. Built for engineers who want visibility across their cloud stack without the noise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="hero" size="xl">Run a Scan</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="hero-outline" size="xl">See the Dashboard</Button>
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
