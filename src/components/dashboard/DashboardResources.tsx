import { useState, useEffect } from "react";
import { Server, Search, Filter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardResources() {
    const [isConnected, setIsConnected] = useState(false);

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
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" /> Filter
                        </Button>
                        <Button size="sm">
                            <Search className="w-4 h-4 mr-2" /> Global Search
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
                                {[
                                    { name: "prod-api-cluster", type: "EKS Cluster", region: "us-east-1", account: "AWS-Main" },
                                    { name: "user-data-bucket", type: "S3 Bucket", region: "eu-central-1", account: "AWS-Main" },
                                    { name: "auth-db-instance", type: "RDS Instance", region: "us-east-1", account: "AWS-Main" },
                                    { name: "static-website-cdn", type: "CloudFront", region: "Global", account: "AWS-Prod" },
                                    { name: "security-audit-log", type: "CloudWatch", region: "us-east-1", account: "AWS-Prod" },
                                ].map((item, i) => (
                                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-medium flex items-center gap-2">
                                            <Server className="w-3.5 h-3.5 text-primary" /> {item.name}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{item.type}</td>
                                        <td className="px-6 py-4 text-xs font-mono">{item.region}</td>
                                        <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold">{item.account}</span></td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm" className="h-8">
                                                <ExternalLink className="w-3 h-3 mr-2" /> Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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
