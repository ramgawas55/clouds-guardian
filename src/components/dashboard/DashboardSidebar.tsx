import {
  LayoutDashboard, Search as SearchIcon, Lightbulb, Ship, Server, FileText,
  Plug, Users, Settings, ChevronLeft,
} from "lucide-react";

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
  return (
    <aside
      className={`${
        open ? "w-56" : "w-14"
      } hidden md:flex flex-col bg-card border-r border-border transition-all duration-200 min-h-screen`}
    >
      <div className="flex items-center justify-between px-3 h-14 border-b border-border">
        {open && (
          <span className="text-sm font-bold text-foreground truncate">CCLD</span>
        )}
        <button onClick={onToggle} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground">
          <ChevronLeft className={`w-4 h-4 transition-transform ${!open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              active === item.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {open && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        {open && (
          <div className="text-[10px] text-muted-foreground">
            Last scan: 4 min ago
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-success ml-2" />
          </div>
        )}
      </div>
    </aside>
  );
}
