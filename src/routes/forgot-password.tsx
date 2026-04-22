import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/veriscope/AppShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — VeriScope AI" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    
    setLoading(false);
    if (resetError) setError(resetError.message);
    else setSuccess("Check your email for the password reset link.");
  }

  return (
    <AppShell>
      <section className="mx-auto flex max-w-lg px-4 py-16 sm:px-6">
        <form onSubmit={submit} className="veri-panel w-full rounded-[1.75rem] p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-secondary-foreground">
            <ShieldCheck className="h-4 w-4" /> Account Recovery
          </div>
          <h1 className="mt-4 text-4xl font-bold">Reset Password</h1>
          <p className="mt-2 max-w-md text-muted-foreground">Enter your email address to receive a password reset link.</p>
          
          <div className="mt-6">
            <input className="w-full rounded-xl border border-input bg-background/70 p-3 outline-none transition focus:ring-2 focus:ring-ring" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          {error && <p className="mt-3 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          {success && <p className="mt-3 rounded-xl bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">{success}</p>}
          
          <Button className="mt-5 w-full" variant="hero" disabled={loading}>{loading && <Loader2 className="animate-spin" />} Send reset link</Button>
          
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Remembered your password? <Link className="font-semibold text-primary hover:underline" to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </AppShell>
  );
}
