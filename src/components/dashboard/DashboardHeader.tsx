import { Bell, Search, Menu, ChevronDown } from "lucide-react";

export function DashboardHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
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
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-1.5 rounded-md hover:bg-secondary text-muted-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-destructive rounded-full text-[8px] text-foreground flex items-center justify-center font-bold">3</span>
        </button>
        <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-secondary cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">JD</div>
          <span className="hidden sm:block text-xs text-foreground">RAM GAWAS</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
