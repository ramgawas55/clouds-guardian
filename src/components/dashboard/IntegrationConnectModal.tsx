import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, ChevronRight, Copy, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface IntegrationConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    integrationName: string | null;
    onConnected: (name: string) => void;
}

export function IntegrationConnectModal({
    isOpen,
    onClose,
    integrationName,
    onConnected
}: IntegrationConnectModalProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [configValue, setConfigValue] = useState("");

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const handleNext = () => setStep(step + 1);

    const handleConnect = async () => {
        if (!configValue && (integrationName === "AWS" || integrationName === "Slack")) {
            toast.error("Please provide the required configuration");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/.netlify/functions/integrations-connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ integration: integrationName, config: configValue })
            });

            if (!response.ok) throw new Error('Failed to connect integration');

            onConnected(integrationName!);
            toast.success(`${integrationName} connected successfully`);
            reset();
        } catch (err: any) {
            toast.error(`Failed to connect ${integrationName}`, {
                description: err.message || "An unknown error occurred."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setStep(1);
        setConfigValue("");
        onClose();
    };

    if (!integrationName) return null;

    return (
        <Dialog open={isOpen} onOpenChange={reset}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Connect {integrationName}
                    </DialogTitle>
                    <DialogDescription>
                        Follow the steps below to authorize Cloud Guardian access.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    {integrationName === "AWS" && (
                        <>
                            {step === 1 && (
                                <div className="space-y-4">
                                    <div className="bg-muted p-3 rounded-lg border border-border">
                                        <p className="text-xs font-medium mb-2">Step 1: Select Trusted Entity</p>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                                            In the AWS Console, select <strong>AWS account</strong> as the trusted entity type.
                                            Choose <strong>Another AWS account</strong> and enter the ID below:
                                        </p>
                                        <div className="flex items-center justify-between bg-background border border-border p-2 rounded text-xs mb-3">
                                            <code className="font-mono">891377313063</code>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy("891377313063")}>
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                                            Check the box for <strong>Require external ID</strong> and use:
                                        </p>
                                        <div className="flex items-center justify-between bg-background border border-border p-2 rounded text-xs">
                                            <code className="font-mono">cg-prod-8f2e9a</code>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy("cg-prod-8f2e9a")}>
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Button className="w-full" onClick={handleNext}>Next: Add Permissions <ChevronRight className="ml-2 h-4 w-4" /></Button>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <div className="bg-muted p-3 rounded-lg border border-border mb-2">
                                        <p className="text-xs font-medium mb-2">Step 2: Add Permissions</p>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                                            Search for and attach the <strong>ReadOnlyAccess</strong> managed policy to this role.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role-arn" className="text-xs font-medium">Step 3: Role ARN</Label>
                                        <Input
                                            id="role-arn"
                                            placeholder="arn:aws:iam::...:role/CloudGuardianAccess"
                                            value={configValue}
                                            onChange={(e) => setConfigValue(e.target.value)}
                                            className="text-xs"
                                        />
                                    </div>
                                    <div className="bg-primary/5 p-3 rounded-lg flex gap-3 items-start border border-primary/10">
                                        <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                                            Ensure the role name is descriptive (e.g., <code>CloudGuardianAccess</code>) so you can identify it later.
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" className="w-full" onClick={() => setStep(1)}>Back</Button>
                                        <Button className="w-full" onClick={handleConnect} disabled={isSubmitting}>
                                            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : "Finish Connection"}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {(integrationName === "Slack" || integrationName === "Microsoft Teams") && (
                        <div className="space-y-4 pt-2">
                            <div className="bg-muted p-4 rounded-lg flex flex-col items-center text-center space-y-3">
                                <div className="h-10 w-10 bg-background rounded-full flex items-center justify-center">
                                    <ExternalLink className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium">Authorize via OAuth</p>
                                    <p className="text-[11px] text-muted-foreground px-4">
                                        Clicking button below will redirect you to {integrationName} to select a workspace and channel for alerts.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Fallback Webhook URL (Optional)</Label>
                                <Input
                                    placeholder="https://hooks.slack.com/services/..."
                                    value={configValue}
                                    onChange={(e) => setConfigValue(e.target.value)}
                                    className="text-xs"
                                />
                            </div>
                            <Button className="w-full" onClick={handleConnect} disabled={isSubmitting}>
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authorizing...</> : `Connect to ${integrationName}`}
                            </Button>
                        </div>
                    )}

                    {(integrationName !== "AWS" && integrationName !== "Slack" && integrationName !== "Microsoft Teams") && (
                        <div className="space-y-4 py-8 text-center">
                            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">Native Integration Ready</p>
                                <p className="text-xs text-muted-foreground">Click below to enable {integrationName} scanning for your environment.</p>
                            </div>
                            <Button className="w-full" onClick={handleConnect} disabled={isSubmitting}>
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enabling...</> : "Enable Integration"}
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
