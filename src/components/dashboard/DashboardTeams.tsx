import { useState } from "react";
import { Users, Mail, ShieldCheck, MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardTeams() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
                    <p className="text-sm text-muted-foreground">Manage roles, permissions, and access for your organization.</p>
                </div>
                <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Invite Member
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { name: "RAM GAWAS", email: "ram@example.com", role: "Owner", initial: "RG" },
                    { name: "Alex Rivers", email: "alex@example.com", role: "Admin", initial: "AR" },
                    { name: "Dev Ops", email: "devops@example.com", role: "Viewer", initial: "DO" },
                ].map((member, i) => (
                    <div key={i} className="bg-card border border-border p-5 rounded-xl flex items-center justify-between group hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                                {member.initial}
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold">{member.name}</p>
                                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                    <Mail className="w-2.5 h-2.5" /> {member.email}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-bold uppercase">{member.role}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
