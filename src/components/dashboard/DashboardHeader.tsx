import { Bell, Search, Menu, LogOut, CheckCircle2, AlertCircle, Info, Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const iconMap: Record<string, any> = {
  CheckCircle2,
  Info,
  AlertCircle
};

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
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['user-notifications'],
    queryFn: async () => {
      const res = await fetch('/api/notifications');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: Infinity
  });

  const handleClearNotifications = async () => {
    try {
      const res = await fetch('/api/notifications-clear', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to clear notifications');
      toast.success('Notifications cleared');
      queryClient.setQueryData(['user-notifications'], []);
    } catch (err: any) {
      toast.error('Could not clear notifications', { description: err.message });
    }
  };

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
              {notifications.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-destructive rounded-full text-[8px] text-foreground flex items-center justify-center font-bold animate-pulse">
                  {notifications.length}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-border bg-muted/30">
              <h4 className="text-sm font-semibold">Notifications</h4>
              <p className="text-[10px] text-muted-foreground mt-1">You have {notifications.length} unread alerts</p>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {isLoading ? (
                <div className="p-6 text-center text-muted-foreground flex justify-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((n: any) => {
                  const Icon = iconMap[n.icon] || Info;
                  return (
                    <div key={n.id} className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="flex gap-3">
                        <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${n.color}`} />
                        <div className="space-y-1">
                          <p className="text-xs font-semibold group-hover:text-primary transition-colors">{n.title}</p>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">{n.desc}</p>
                          <p className="text-[9px] text-muted-foreground/60">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-muted-foreground">
                  No new notifications.
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-2 border-t border-border text-center">
                <Button variant="ghost" className="w-full text-[10px] h-8" onClick={handleClearNotifications}>Clear all notifications</Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-secondary cursor-pointer" onClick={logout}>
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
            {(user?.user_metadata?.full_name as string)?.substring(0, 2)?.toUpperCase() || 'RG'}
          </div>
          <span className="hidden sm:block text-xs text-foreground">{(user?.user_metadata?.full_name as string) || 'RAM GAWAS'}</span>
          <LogOut className="w-3 h-3 text-muted-foreground ml-1 hover:text-destructive transition-colors" />
        </div>
      </div>
    </header>
  );
}
