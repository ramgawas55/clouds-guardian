import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, AlertCircle, Loader2 } from "lucide-react";

export function DashboardSettings() {
  const { data: fetchedSettings, isLoading, error, refetch } = useQuery({
    queryKey: ['user-settings'],
    queryFn: async () => {
      const response = await fetch('/api/user-settings');
      if (!response.ok) {
        throw new Error('Failed to fetch settings.');
      }
      return response.json();
    },
    retry: 1
  });

  const defaultSettings = {
    scanFrequency: "Daily",
    wasteThreshold: "$25/month",
    idleWindow: "14 days",
    alerts: {
      leaks: true,
      digest: true,
      budget: true,
      completion: false
    }
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (fetchedSettings) {
      setSettings(fetchedSettings);
    }
  }, [fetchedSettings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/user-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (!response.ok) throw new Error('Failed to save settings');
      toast.success("Settings saved successfully.");
    } catch (err: any) {
      toast.error("Error saving settings", {
        description: err.message || "An unknown error occurred."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const toggleAlert = (key: string) => {
    setSettings((prev: any) => ({
      ...prev,
      alerts: { ...prev.alerts, [key]: !prev.alerts[key] }
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px] bg-red-500/5 rounded-xl border border-red-500/20 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Settings</h2>
        <p className="text-muted-foreground max-w-md mb-6">{(error as Error).message || "An unknown error occurred"}</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCcw className="w-4 h-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
          <p className="text-xs text-muted-foreground">Configure scanning, notifications, and preferences</p>
        </div>
        <Button onClick={handleSave} size="sm" disabled={isSaving}>
          {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
        </Button>
      </div>

      <SettingsCard title="Scan Configuration">
        <SettingSelect
          label="Scan Frequency"
          options={["Every 6 hours", "Daily", "Weekly"]}
          value={settings.scanFrequency}
          onChange={(v) => updateSetting('scanFrequency', v)}
        />
        <SettingSelect
          label="Waste Threshold"
          options={["$10/month", "$25/month", "$50/month"]}
          value={settings.wasteThreshold}
          onChange={(v) => updateSetting('wasteThreshold', v)}
        />
        <SettingSelect
          label="Idle Detection Window"
          options={["7 days", "14 days", "30 days"]}
          value={settings.idleWindow}
          onChange={(v) => updateSetting('idleWindow', v)}
        />
      </SettingsCard>

      <SettingsCard title="Notification Preferences">
        <SettingToggle label="New leak alerts" enabled={settings.alerts.leaks} onToggle={() => toggleAlert('leaks')} />
        <SettingToggle label="Weekly savings digest" enabled={settings.alerts.digest} onToggle={() => toggleAlert('digest')} />
        <SettingToggle label="Budget threshold alerts" enabled={settings.alerts.budget} onToggle={() => toggleAlert('budget')} />
        <SettingToggle label="Scan completion notifications" enabled={settings.alerts.completion} onToggle={() => toggleAlert('completion')} />
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

function SettingSelect({ label, options, value, onChange }: { label: string; options: string[], value: string, onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-foreground">{label}</span>
      <select
        className="bg-background border border-border text-sm rounded-md px-2 py-1 text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function SettingToggle({ label, enabled, onToggle }: { label: string; enabled: boolean, onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-foreground">{label}</span>
      <button
        onClick={onToggle}
        className={`w-9 h-5 rounded-full relative transition-colors ${enabled ? "bg-primary" : "bg-secondary"}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform ${enabled ? "translate-x-4.5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}
