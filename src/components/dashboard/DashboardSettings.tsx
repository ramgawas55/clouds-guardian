import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DashboardSettings() {
  const handleSave = () => {
    toast.success("Settings saved successfully.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
          <p className="text-xs text-muted-foreground">Configure scanning, notifications, and preferences</p>
        </div>
        <Button onClick={handleSave} size="sm">Save Changes</Button>
      </div>

      <SettingsCard title="Scan Configuration">
        <SettingSelect label="Scan Frequency" options={["Every 6 hours", "Daily", "Weekly"]} defaultVal="Daily" />
        <SettingSelect label="Waste Threshold" options={["$10/month", "$25/month", "$50/month"]} defaultVal="$25/month" />
        <SettingSelect label="Idle Detection Window" options={["7 days", "14 days", "30 days"]} defaultVal="14 days" />
      </SettingsCard>

      <SettingsCard title="Notification Preferences">
        <SettingToggle label="New leak alerts" defaultEnabled />
        <SettingToggle label="Weekly savings digest" defaultEnabled />
        <SettingToggle label="Budget threshold alerts" defaultEnabled />
        <SettingToggle label="Scan completion notifications" defaultEnabled={false} />
      </SettingsCard>

      <SettingsCard title="Team Management">
        <div className="text-xs text-muted-foreground mb-4">
          Team management is managed centrally via Netlify Identity.
        </div>
        <Button variant="outline" size="sm" onClick={() => window.open('https://app.netlify.com', '_blank')}>
          Open Netlify Identity Dashboard
        </Button>
      </SettingsCard>
    </div>
  );
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function SettingSelect({ label, options, defaultVal }: { label: string; options: string[], defaultVal: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-foreground">{label}</span>
      <select
        className="bg-background border border-border text-sm rounded-md px-2 py-1 text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
        defaultValue={defaultVal}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function SettingToggle({ label, defaultEnabled }: { label: string; defaultEnabled: boolean }) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-foreground">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-9 h-5 rounded-full relative transition-colors ${enabled ? "bg-primary" : "bg-secondary"}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform ${enabled ? "translate-x-4.5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}
