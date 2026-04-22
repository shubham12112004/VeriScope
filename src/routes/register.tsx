import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Chrome, Loader2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/veriscope/AppShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { signInWithGoogle } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — VeriScope AI" }, { name: "description", content: "Create a VeriScope AI account." }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpGoogle() {
    setError("");
    const { error: googleError } = await signInWithGoogle();
    if (googleError) setError(googleError.message);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    
    // Strong password validation matching Supabase policy
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setError("Password must be 8+ characters with uppercase, lowercase, number, and special char (!@#$%).");
      return;
    }
    
    setLoading(true);
    setError("");
    const { error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { name }, emailRedirectTo: window.location.origin } });
    setLoading(false);
    if (signUpError) setError(signUpError.message);
    else navigate({ to: "/dashboard" });
  }

  return (
    <AppShell>
      <section className="mx-auto flex max-w-lg px-4 py-16 sm:px-6">
        <form onSubmit={submit} className="veri-panel w-full rounded-[1.75rem] p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-secondary-foreground">
            <ShieldCheck className="h-4 w-4" /> Protected onboarding
          </div>
          <h1 className="mt-4 text-4xl font-bold">Create account</h1>
          <p className="mt-2 max-w-md text-muted-foreground">Start building a private verification history with secure JWT sessions and Google sign-in support.</p>
          <Button type="button" variant="outline" className="mt-6 w-full" onClick={signUpGoogle}>
            <Chrome /> Continue with Google
          </Button>
          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or create with email
            <span className="h-px flex-1 bg-border" />
          </div>
          <input className="w-full rounded-xl border border-input bg-background/70 p-3 outline-none transition focus:ring-2 focus:ring-ring" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
          <input className="mt-3 w-full rounded-xl border border-input bg-background/70 p-3 outline-none transition focus:ring-2 focus:ring-ring" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="mt-3 w-full rounded-xl border border-input bg-background/70 p-3 outline-none transition focus:ring-2 focus:ring-ring" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="mt-3 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          <Button className="mt-5 w-full" variant="hero" disabled={loading}>{loading && <Loader2 className="animate-spin" />} Register</Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">Already registered? <Link className="font-semibold text-primary" to="/login">Sign in</Link></p>
        </form>
      </section>
    </AppShell>
  );
}
