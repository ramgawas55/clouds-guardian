import { useState } from "react";
import { Users, Mail, ShieldCheck, MoreVertical, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function DashboardTeams({
    externalSearchQuery
}: {
    externalSearchQuery?: string;
}) {
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const searchQuery = externalSearchQuery || "";

    const members = [
        { name: "RAM GAWAS", email: "ram@example.com", role: "Owner", initial: "RG" },
        { name: "Alex Rivers", email: "alex@example.com", role: "Admin", initial: "AR" },
        { name: "Dev Ops", email: "devops@example.com", role: "Viewer", initial: "DO" },
    ];

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        toast.info("Sending invitation...", {
            description: "An email invite is being sent to the recipient."
        });

        setTimeout(() => {
            setIsSending(false);
            setIsInviteOpen(false);
            toast.success("Invite sent successfully!", {
                description: "The user has been notified to join your workspace."
            });
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
                    <p className="text-sm text-muted-foreground">Manage roles, permissions, and access for your organization.</p>
                </div>
                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" /> Invite Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleInvite}>
                            <DialogHeader>
                                <DialogTitle>Invite Team Member</DialogTitle>
                                <DialogDescription>
                                    Add a new colleague to your organization's Cloud Guardian instance.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="Enter name" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" placeholder="email@example.com" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="role">Workspace Role</Label>
                                    <Select defaultValue="viewer">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Administrator</SelectItem>
                                            <SelectItem value="editor">Editor</SelectItem>
                                            <SelectItem value="viewer">Viewer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isSending}>
                                    {isSending ? "Sending..." : "Send Invite"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.length > 0 ? filteredMembers.map((member, i) => (
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
                        <div className="text-right flex items-center">
                            <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-bold uppercase">{member.role}</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Member Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onSelect={() => {
                                        console.log("Edit Permissions clicked");
                                        toast.info(`Editing permissions for ${member.name}`);
                                    }}>
                                        <ShieldCheck className="w-4 h-4 mr-2" /> Edit Permissions
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => {
                                        console.log("Transfer Ownership clicked");
                                        toast.info(`Initiating transfer to ${member.name}`);
                                    }}>
                                        <Users className="w-4 h-4 mr-2" /> Transfer Ownership
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                                        onSelect={() => {
                                            toast.error(`Removed ${member.name} from workspace`);
                                        }}
                                    >
                                        Remove Member
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-12 text-center text-muted-foreground italic bg-card border border-dashed rounded-xl">
                        No team members matching "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
}
