import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Terminal, Copy, ExternalLink, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface LeakResolveModalProps {
    isOpen: boolean;
    onClose: () => void;
    leak: {
        title: string;
        resource: string;
        severity: string;
    } | null;
}

export function LeakResolveModal({ isOpen, onClose, leak }: LeakResolveModalProps) {
    const [isResolved, setIsResolved] = useState(false);

    if (!leak) return null;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Command copied to clipboard");
    };

    const handleResolve = () => {
        setIsResolved(true);
        toast.success("Resolution request sent", {
            description: `The request to resolve ${leak.resource} has been queued.`,
        });
        setTimeout(() => {
            onClose();
            setIsResolved(false);
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Resolve: {leak.title}
                    </DialogTitle>
                    <DialogDescription>
                        Follow these steps to remediate the identified security risk.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-[10px] text-primary-foreground">1</span>
                            AWS CLI Resolution
                        </h4>
                        <p className="text-xs text-muted-foreground">Run the following command in your terminal to delete the unattached resource:</p>
                        <div className="bg-muted p-3 rounded-lg border border-border flex items-center justify-between">
                            <code className="text-[11px] font-mono break-all text-foreground">
                                {leak.title.includes("Volume")
                                    ? `aws ec2 delete-volume --volume-id ${leak.resource}`
                                    : `aws s3api put-bucket-acl --bucket ${leak.resource} --acl private`}
                            </code>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleCopy("aws ec2 delete-volume...")}>
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-[10px] text-primary-foreground">2</span>
                            Manual Resolution (Console)
                        </h4>
                        <div className="bg-muted/50 p-3 rounded-lg border border-border flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-medium">Open AWS Management Console</p>
                                <p className="text-[10px] text-muted-foreground">Navigate to the resource and update its configuration manually.</p>
                            </div>
                            <Button variant="outline" size="sm" className="h-8 text-[10px]">
                                <ExternalLink className="h-3 w-3 mr-1.5" /> Open Console
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex sm:justify-between items-center bg-muted/30 -mx-6 -mb-6 p-4 rounded-b-lg">
                    <p className="text-[10px] text-muted-foreground max-w-[240px]">
                        Resolution actions are logged and reflected in the dashboard after the next scan.
                    </p>
                    <Button onClick={handleResolve} disabled={isResolved} size="sm">
                        {isResolved ? (
                            <><CheckCircle2 className="mr-2 h-4 w-4" /> Resolved</>
                        ) : (
                            "Mark as Resolved"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
