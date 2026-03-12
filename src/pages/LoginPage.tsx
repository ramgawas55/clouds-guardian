import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Shield, ArrowLeft, Mail } from "lucide-react";

type AuthMode = "login" | "forgot" | "reset" | "invite";

export default function LoginPage() {
    const [mode, setMode] = useState<AuthMode>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const { login, user, requestPasswordRecovery, recoverPassword, acceptInvite } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    // Handle token detection from URL hash
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.replace("#", "?"));
            const inviteToken = params.get("invite_token");
            const recoveryToken = params.get("recovery_token");

            if (inviteToken) {
                setToken(inviteToken);
                setMode("invite");
                // Clear the hash to avoid re-triggering
                window.history.replaceState(null, "", window.location.pathname);
            } else if (recoveryToken) {
                setToken(recoveryToken);
                setMode("reset");
                window.history.replaceState(null, "", window.location.pathname);
            }
        }
    }, []);

    // If already logged in and not in a token flow, redirect to dashboard
    if (user && mode === "login") {
        return <Navigate to={from} replace />;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }
        try {
            setIsSubmitting(true);
            await login(email, password);
            toast.success("Successfully logged in");
            navigate(from, { replace: true });
        } catch (error: any) {
            const errorMsg = error.json?.error_description || error.message || "Failed to authenticate";
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }
        try {
            setIsSubmitting(true);
            await requestPasswordRecovery(email);
            setIsEmailSent(true);
            toast.success("Recovery email sent");
        } catch (error: any) {
            toast.error(error.message || "Failed to request recovery");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setIsSubmitting(true);
            await recoverPassword(token, password);
            toast.success("Password reset successful");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Failed to reset password");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setIsSubmitting(true);
            await acceptInvite(token, password);
            toast.success("Account setup successful");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Failed to complete setup");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderHeader = () => {
        switch (mode) {
            case "forgot": return { title: "Forgot Password", sub: "Enter your email to receive a reset link" };
            case "reset": return { title: "Reset Password", sub: "Enter your new password below" };
            case "invite": return { title: "Complete Setup", sub: "Set a password to activate your account" };
            default: return { title: "Access Secure Area", sub: "Sign in to manage your cloud infrastructure" };
        }
    };

    const header = renderHeader();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="mb-8 text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">{header.title}</h1>
                    <p className="text-muted-foreground mt-2">{header.sub}</p>
                </div>

                <div className="bg-card border border-border rounded-xl shadow-lg p-6 sm:p-8">
                    {mode === "login" && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} required className="bg-background" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <button type="button" onClick={() => setMode("forgot")} className="text-xs text-primary hover:underline">Forgot password?</button>
                                </div>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} required className="bg-background" />
                            </div>
                            <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating...</> : "Sign In"}
                            </Button>
                        </form>
                    )}

                    {mode === "forgot" && (
                        <div className="space-y-4">
                            {isEmailSent ? (
                                <div className="text-center space-y-4 py-4">
                                    <div className="mx-auto w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-success" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">If an account exists for {email}, you will receive a reset link shortly.</p>
                                    <Button variant="outline" className="w-full" onClick={() => setMode("login")}>Back to login</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleForgot} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="reset-email">Email</Label>
                                        <Input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} required className="bg-background" />
                                    </div>
                                    <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Send Reset Link"}
                                    </Button>
                                    <button type="button" onClick={() => setMode("login")} className="w-full text-xs text-muted-foreground flex items-center justify-center gap-2 hover:text-foreground">
                                        <ArrowLeft className="w-3 h-3" /> Back to login
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {(mode === "reset" || mode === "invite") && (
                        <form onSubmit={mode === "reset" ? handleReset : handleInvite} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} required className="bg-background" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isSubmitting} required className="bg-background" />
                            </div>
                            <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : mode === "reset" ? "Reset Password" : "Setup Account"}
                            </Button>
                        </form>
                    )}
                </div>

                <p className="text-center text-xs text-muted-foreground mt-8">
                    This system is restricted to authorized personnel only.
                </p>
            </div>
        </div>
    );
}
