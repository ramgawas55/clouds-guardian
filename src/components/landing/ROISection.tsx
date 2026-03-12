import { Section, SectionHeader } from "@/components/Section";
import { useState } from "react";

export function ROISection() {
  const [spend, setSpend] = useState(50000);
  const wastePercent = 22;
  const monthlySavings = Math.round(spend * (wastePercent / 100));
  const annualSavings = monthlySavings * 12;

  return (
    <Section id="roi">
      <SectionHeader
        badge="ROI Calculator"
        title="Estimate your savings"
        description="Drag the slider to your current monthly cloud spend to see typical waste levels based on industry averages."
      />
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="mb-8">
          <label className="text-sm text-muted-foreground mb-3 block">
            Your monthly cloud bill: <span className="text-foreground font-semibold">${spend.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min={5000}
            max={500000}
            step={5000}
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            className="w-full accent-primary h-1.5 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>$5K</span>
            <span>$500K</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-background rounded-lg border border-border p-4">
            <div className="text-xs text-muted-foreground mb-1">Likely Waste</div>
            <div className="text-xl font-bold text-warning">{wastePercent}%</div>
          </div>
          <div className="bg-background rounded-lg border border-border p-4">
            <div className="text-xs text-muted-foreground mb-1">Monthly Savings</div>
            <div className="text-xl font-bold text-success">${monthlySavings.toLocaleString()}</div>
          </div>
          <div className="bg-background rounded-lg border border-border p-4">
            <div className="text-xs text-muted-foreground mb-1">Annual Savings</div>
            <div className="text-xl font-bold text-primary">${annualSavings.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
