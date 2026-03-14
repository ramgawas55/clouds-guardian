import { useState } from "react";
import { Users, Mail, ShieldCheck, MoreVertical, Plus, Check, RefreshCcw, AlertCircle } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";

interface TeamMember {
    name: string;
    email: string;
    role: string;
    initial: string;
}

export function DashboardTeams({
    externalSearchQuery
}: {
    externalSearchQuery?: string;
}) {
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteName, setInviteName] = useState("");
    const [inviteRole, setInviteRole] = useState("viewer");

    const searchQuery = externalSearchQuery || "";

    const { data: members = [], isLoading, error, refetch } = useQuery({
        queryKey: ['workspace-teams'],
        queryFn: async () => {
            const response = await fetch('/api/teams');
            if (!response.ok) {
                throw new Error('Failed to fetch team members.');
            }
            return response.json();
        },
        retry: 1
    });

    const filteredMembers = members.filter((m: TeamMember) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        toast.info("Sending invitation...", {
            description: "An email invite is being sent to the recipient."
        });

        try {
            const response = await MOCK_API.post('teams-invite', {})
            });

            if (!response.ok) throw new Error('Failed to send invite');

            setIsInviteOpen(false);
            setInviteName("");
            setInviteEmail("");
            setInviteRole("viewer");
            toast.success("Invite sent successfully!", {
                description: "The user has been notified to join your workspace."
            });
            refetch();
        } catch (err: any) {
            toast.error("Failed to send invite", {
                description: err.message || "Please check the email address and try again."
            });
        } finally {
            setIsSending(false);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px]">
                <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading team members...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px] bg-red-500/5 rounded-xl border border-red-500/20 p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Team Members</h2>
                <p className="text-muted-foreground max-w-md mb-6">{error instanceof Error ? error.message : "An unknown error occurred"}</p>
                <Button onClick={() => refetch()} variant="outline" className="gap-2">
                    <RefreshCcw className="w-4 h-4" /> Try Again
                </Button>
            </div>
        );
    }

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
                                    <Input id="name" placeholder="Enter name" value={inviteName} onChange={(e) => setInviteName(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" placeholder="email@example.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="role">Workspace Role</Label>
                                    <Select value={inviteRole} onValueChange={setInviteRole}>
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
                {filteredMembers.length > 0 ? filteredMembers.map((member: TeamMember, i: number) => (
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
                                        toast.info(`Editing permissions for ${member.name}`);
                                    }}>
                                        <ShieldCheck className="w-4 h-4 mr-2" /> Edit Permissions
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => {
                                        toast.info(`Initiating transfer to ${member.name}`);
                                    }}>
                                        <Users className="w-4 h-4 mr-2" /> Transfer Ownership
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                                        onSelect={async () => {
                                            try {
                                                const res = await MOCK_API.post('teams-remove', {}) });
                                                if (!res.ok) throw new Error('Failed to remove member');
                                                toast.success(`Removed ${member.name} from workspace`);
                                                refetch();
                                            } catch (err: any) {
                                                toast.error(err.message || 'Failed to remove member');
                                            }
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
                        No team members matching "{searchQuery}" or no team members present.
                    </div>
                )}
            </div>
        </div>
    );
}

