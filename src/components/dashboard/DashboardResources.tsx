import { useState, useEffect } from "react";
import {
    Server, Search, Filter, ExternalLink, Database, Globe,
    Shield, Tag, Activity, Cpu, HardDrive as Disk, ArrowUpRight,
    Zap, AlertCircle, BarChart3, Radio
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export function DashboardResources({
    externalSearchQuery,
    onSearchChange
}: {
    externalSearchQuery?: string;
    onSearchChange?: (val: string) => void;
}) {
    const [isConnected, setIsConnected] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState("");

    // Sync local search with external if provided
    const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : localSearchQuery;
    const setSearchQuery = onSearchChange || setLocalSearchQuery;
    const [activeFilter, setActiveFilter] = useState("All");
    const [isTelemetryLoading, setIsTelemetryLoading] = useState(false);
    const [showTelemetry, setShowTelemetry] = useState(false);
    const [selectedResource, setSelectedResource] = useState<any>(null);

    const baseResources = [
        { name: "prod-api-cluster", type: "EKS Cluster", region: "us-east-1", account: "AWS-Main", status: "Healthy" },
        { name: "user-data-bucket", type: "S3 Bucket", region: "eu-central-1", account: "AWS-Main", status: "Healthy" },
        { name: "auth-db-instance", type: "RDS Instance", region: "us-east-1", account: "AWS-Main", status: "Issue" },
        { name: "static-website-cdn", type: "CloudFront", region: "Global", account: "AWS-Prod", status: "Healthy" },
        { name: "security-audit-log", type: "CloudWatch", region: "us-east-1", account: "AWS-Prod", status: "Healthy" },
    ];

    const filteredResources = baseResources.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === "All" ||
            (activeFilter === "Compute" && r.type.includes("Cluster")) ||
            (activeFilter === "Storage" && (r.type.includes("Bucket") || r.type.includes("Instance"))) ||
            (activeFilter === "Security" && r.type.includes("Audit"));
        return matchesSearch && matchesFilter;
    });

    const handleViewTelemetry = () => {
        setIsTelemetryLoading(true);
        setShowTelemetry(false);
        toast.info("Establishing secure connection to " + selectedResource?.name, {
            description: "Fetching real-time data packets..."
        });

        setTimeout(() => {
            setIsTelemetryLoading(false);
            setShowTelemetry(true);
            toast.success("Telemetry synchronized", {
                duration: 2000
            });
        }, 2000);
    };

    const handleCloseSheet = () => {
        setSelectedResource(null);
        setShowTelemetry(false);
        setIsTelemetryLoading(false);
    };

    useEffect(() => {
        const saved = localStorage.getItem("ccl-connected-integrations");
        if (saved) {
            const list = JSON.parse(saved);
            setIsConnected(list.length > 0);
        }
    }, []);

    if (isConnected) {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Resources Inventory</h1>
                        <p className="text-sm text-muted-foreground">Comprehensive list of all discovered assets across your cloud trail.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search inventory..."
                                className="pl-9 w-64 h-9 bg-card"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className={activeFilter !== 'All' ? 'border-primary text-primary' : ''}>
                                    <Filter className="w-4 h-4 mr-2" /> {activeFilter === 'All' ? 'Filter' : activeFilter}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Filter Categories</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setActiveFilter("All")}>All Resources</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setActiveFilter("Compute")}>Compute Engines</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setActiveFilter("Storage")}>Storage & DBs</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setActiveFilter("Security")}>Security & Logs</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" className="sm:hidden">
                            <Search className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">Resource Name</th>
                                    <th className="px-6 py-3 font-semibold">Type</th>
                                    <th className="px-6 py-3 font-semibold">Region</th>
                                    <th className="px-6 py-3 font-semibold">Account</th>
                                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredResources.length > 0 ? filteredResources.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-muted/30 transition-colors cursor-pointer group"
                                        onClick={() => setSelectedResource(item)}
                                    >
                                        <td className="px-6 py-4 font-medium flex items-center gap-2">
                                            <Server className="w-3.5 h-3.5 text-primary" /> {item.name}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{item.type}</td>
                                        <td className="px-6 py-4 text-xs font-mono">{item.region}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold">{item.account}</span>
                                                {item.status === 'Issue' && <AlertCircle className="w-3 h-3 text-destructive animate-pulse" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8"
                                                onClick={() => setSelectedResource(item)}
                                            >
                                                <ExternalLink className="w-3 h-3 mr-2" /> Details
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                                            No resources matching "{searchQuery}" in {activeFilter}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Sheet open={!!selectedResource} onOpenChange={handleCloseSheet}>
                    <SheetContent className="sm:max-w-md overflow-y-auto">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="flex items-center gap-2 text-xl">
                                <Database className="w-5 h-5 text-primary" /> Resource Detail
                            </SheetTitle>
                            <SheetDescription>
                                Deep-dive inspection into the configuration and security posture of this asset.
                            </SheetDescription>
                        </SheetHeader>

                        {selectedResource && (
                            <div className="space-y-6">
                                <div className="p-4 rounded-lg bg-muted border border-border">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Display Name</p>
                                    <p className="text-lg font-bold">{selectedResource.name}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">{selectedResource.type}</span>
                                        <span className="px-1.5 py-0.5 rounded bg-muted-foreground/10 text-muted-foreground text-[10px] font-bold uppercase">{selectedResource.account}</span>
                                    </div>
                                </div>

                                {!showTelemetry ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 rounded-lg border border-border">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                                                    <p className="text-[10px] text-muted-foreground font-semibold">Region</p>
                                                </div>
                                                <p className="text-sm font-medium">{selectedResource.region}</p>
                                            </div>
                                            <div className="p-3 rounded-lg border border-border">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                                                    <p className="text-[10px] text-muted-foreground font-semibold">Security</p>
                                                </div>
                                                <p className={`text-sm font-medium ${selectedResource.status === 'Issue' ? 'text-destructive' : 'text-success'}`}>
                                                    {selectedResource.status === 'Issue' ? 'Review Required' : 'Compliant'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                                                <Tag className="w-3 h-3" /> Tags & Metadata
                                            </h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                    <span className="text-xs text-muted-foreground">Environment</span>
                                                    <span className="text-xs font-mono">Production</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                    <span className="text-xs text-muted-foreground">Project</span>
                                                    <span className="text-xs font-mono">Cloud-Guardian</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-xs text-muted-foreground">Owner</span>
                                                    <span className="text-xs font-mono">RAM-GAWAS</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <Button
                                                className="w-full relative overflow-hidden group"
                                                variant="outline"
                                                onClick={handleViewTelemetry}
                                                disabled={isTelemetryLoading}
                                            >
                                                <span className={isTelemetryLoading ? 'opacity-0' : 'flex items-center'}>
                                                    <Activity className="w-4 h-4 mr-2 text-primary" /> View Live Telemetry
                                                </span>
                                                {isTelemetryLoading && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                                                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                                                        <span className="text-xs font-medium">Interrogating...</span>
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-6 animate-in zoom-in-95 duration-300">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                                                <Radio className="w-3 h-3 animate-pulse" /> Real-time Health Metrics
                                            </h4>
                                            <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => setShowTelemetry(false)}>Reset View</Button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
                                                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                                    <Cpu className="w-4 h-4" />
                                                    <span className="text-[10px] font-medium uppercase">CPU Load</span>
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-bold">14.2</span>
                                                    <span className="text-[10px] text-muted-foreground">%</span>
                                                </div>
                                                <Progress value={14} className="h-1 mt-3" />
                                            </div>
                                            <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
                                                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                                    <Activity className="w-4 h-4" />
                                                    <span className="text-[10px] font-medium uppercase">Network</span>
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-bold">2.4</span>
                                                    <span className="text-[10px] text-muted-foreground">GB/s</span>
                                                </div>
                                                <div className="flex gap-1 mt-3 h-8 items-end">
                                                    {[40, 70, 45, 90, 65, 80].map((h, i) => (
                                                        <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h / 3}%` }} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                            <div className="flex items-start gap-3">
                                                <BarChart3 className="w-5 h-5 text-primary mt-1" />
                                                <div className="space-y-1">
                                                    <h5 className="text-sm font-semibold">Optimization Insight</h5>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                                        This resource is currently under-utilized (Avg CPU &lt; 15%). We recommend downsizing to reduce monthly spend by 28%.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <Button className="w-full" variant="outline" onClick={() => toast.info("Deep logs would appear here in production.")}>
                                            Explore Stream Logs <ArrowUpRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-xl font-bold text-foreground">Resources</h1>
                <p className="text-xs text-muted-foreground">Inventory of all cloud resources</p>
            </div>

            <div className="flex flex-col items-center justify-center p-12 mt-4 border border-dashed border-border rounded-xl bg-card">
                <Server className="w-12 h-12 text-muted-foreground/30 mb-6" />
                <h2 className="text-lg font-semibold text-foreground mb-2">Inventory Empty</h2>
                <p className="text-sm text-muted-foreground max-w-md text-center mb-6">
                    Connect your first cloud provider to automatically discover and index all your infrastructure resources.
                </p>
                <Button variant="outline">Learn More about Discovery</Button>
            </div>
        </div>
    );
}
