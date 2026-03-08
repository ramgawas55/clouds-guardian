export function DashboardSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground">Configure scanning, notifications, and team preferences</p>
      </div>

      <SettingsCard title="Scan Configuration">
        <SettingRow label="Scan Frequency" value="Every 6 hours" />
        <SettingRow label="Waste Threshold" value="$25/month minimum" />
        <SettingRow label="Idle Detection Window" value="14 days" />
        <SettingRow label="Timezone" value="UTC" />
      </SettingsCard>

      <SettingsCard title="Notification Preferences">
        <SettingToggle label="New leak alerts" enabled />
        <SettingToggle label="Weekly savings digest" enabled />
        <SettingToggle label="Budget threshold alerts" enabled />
        <SettingToggle label="Scan completion notifications" enabled={false} />
      </SettingsCard>

      <SettingsCard title="Budget Alerts">
        <SettingRow label="Monthly budget limit" value="$50,000" />
        <SettingRow label="Warning threshold" value="80% of budget" />
        <SettingRow label="Critical threshold" value="95% of budget" />
      </SettingsCard>

      <SettingsCard title="Team & Permissions">
        <SettingRow label="Team members" value="8 users" />
        <SettingRow label="Admin users" value="2" />
        <SettingRow label="Viewer users" value="6" />
        <SettingRow label="SSO" value="Not configured" />
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

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs text-foreground font-medium">{value}</span>
    </div>
  );
}

function SettingToggle({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className={`w-8 h-4 rounded-full relative ${enabled ? "bg-primary" : "bg-secondary"}`}>
        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-background transition-transform ${enabled ? "translate-x-4" : "translate-x-0.5"}`} />
      </div>
    </div>
  );
}
