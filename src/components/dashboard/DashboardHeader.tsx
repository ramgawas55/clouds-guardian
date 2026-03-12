import { Bell, Search, Menu, LogOut, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function DashboardHeader({
  onMenuToggle,
  searchQuery,
  onSearchChange
}: {
  onMenuToggle: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}) {
  const { user, logout } = useAuth();
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="md:hidden p-1.5 rounded-md hover:bg-secondary text-muted-foreground">
          <Menu className="w-4 h-4" />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-background border border-border rounded-md px-3 h-8 w-64">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Search resources..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none flex-1"
            value={searchQuery || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-1.5 rounded-md hover:bg-secondary text-muted-foreground transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-destructive rounded-full text-[8px] text-foreground flex items-center justify-center font-bold animate-pulse">3</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold">Notifications</h4>
              <p className="text-[10px] text-muted-foreground mt-1">You have 3 unread alerts</p>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {[
                { id: 1, title: "Scan Completed", desc: "No critical leaked found in AWS-PROD", time: "2m ago", icon: CheckCircle2, color: "text-success" },
                { id: 2, title: "New Integration", desc: "AWS account connected successfully", time: "15m ago", icon: Info, color: "text-primary" },
                { id: 3, title: "Cost Alert", desc: "Unattached EBS volume found ($45/mo)", time: "1h ago", icon: AlertCircle, color: "text-destructive" },
              ].map((n) => (
                <div key={n.id} className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="flex gap-3">
                    <n.icon className={`w-4 h-4 shrink-0 mt-0.5 ${n.color}`} />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold group-hover:text-primary transition-colors">{n.title}</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{n.desc}</p>
                      <p className="text-[9px] text-muted-foreground/60">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border text-center">
              <Button variant="ghost" className="w-full text-[10px] h-8">Clear all notifications</Button>
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-secondary cursor-pointer" onClick={logout}>
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">JD</div>
          <span className="hidden sm:block text-xs text-foreground">{(user?.user_metadata?.full_name as string) || 'RAM GAWAS'}</span>
          <LogOut className="w-3 h-3 text-muted-foreground ml-1 hover:text-destructive transition-colors" />
        </div>
      </div>
    </header>
  );
}
