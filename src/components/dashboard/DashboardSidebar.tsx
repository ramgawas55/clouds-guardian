import {
  LayoutDashboard, Search as SearchIcon, Lightbulb, Ship, Server, FileText,
  Plug, Users, Settings, ChevronLeft, Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "leaks", label: "Leak Findings", icon: SearchIcon },
  { id: "recommendations", label: "Recommendations", icon: Lightbulb },
  { id: "kubernetes", label: "Kubernetes", icon: Ship },
  { id: "resources", label: "Resources", icon: Server },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "teams", label: "Teams", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

interface Props {
  active: string;
  onNavigate: (id: string) => void;
  open: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({ active, onNavigate, open, onToggle }: Props) {
  const { data: scanStatus, isLoading } = useQuery({
    queryKey: ['scan-status'],
    queryFn: async () => {
      const res = await fetch('/api/scan-status');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    refetchInterval: 60000 // poll every minute
  });

  return (
    <aside
      className={`${open ? "w-56" : "w-14"
        } hidden md:flex flex-col bg-card border-r border-border transition-all duration-200 min-h-screen`}
    >
      <div className="flex items-center justify-between px-3 h-14 border-b border-border">
        {open && (
          <span className="text-sm font-bold text-foreground truncate">Cloud Guardian</span>
        )}
        <button onClick={onToggle} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground w-8 flex items-center justify-center">
          <ChevronLeft className={`w-4 h-4 transition-transform ${!open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${active === item.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              } ${!open && "justify-center px-0"}`}
            title={!open ? item.label : undefined}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {open && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-border flex items-center justify-center">
        {open ? (
          <div className="text-[10px] text-muted-foreground w-full flex items-center justify-between">
            {isLoading ? (
              <div className="flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Checking Status...</div>
            ) : (
              <>
                <span>Last scan: {scanStatus?.lastScan || 'Unknown'}</span>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${scanStatus?.status === 'error' ? 'bg-destructive' : 'bg-success'}`} />
              </>
            )}
          </div>
        ) : (
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${scanStatus?.status === 'error' ? 'bg-destructive' : 'bg-success'}`} />
        )}
      </div>
    </aside>
  );
}

