import { Link } from "@tanstack/react-router";
import { BarChart3, FileQuestion, LayoutDashboard, LogIn, SearchCheck, ShieldCheck, Sparkles, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Home", icon: SearchCheck },
  { to: "/features", label: "Features", icon: Sparkles },
  { to: "/how-it-works", label: "How it works", icon: FileQuestion },
  { to: "/pricing", label: "Pricing", icon: BarChart3 },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="veri-shell">
      <header className="relative z-20 mx-auto flex w-full max-w-7xl px-4 py-4 sm:px-6">
        <nav className="veri-nav flex w-full items-center justify-between rounded-[1.75rem] px-4 py-3 sm:px-5">
          <Link to="/" className="flex items-center gap-3 font-display text-lg font-bold text-foreground">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground hover-scale">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span>
              VeriScope AI
              <span className="block text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">Truth operations platform</span>
            </span>
          </Link>
          <div className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <Button asChild key={item.to} variant="ghost" size="sm">
                <Link to={item.to} activeProps={{ className: "bg-secondary text-secondary-foreground" }}>
                  <item.icon /> {item.label}
                </Link>
              </Button>
            ))}
            <Button asChild variant="ghost" size="sm"><Link to="/dashboard"><LayoutDashboard /> Dashboard</Link></Button>
            <Button asChild variant="ghost" size="sm"><Link to="/admin/dashboard"><UserCog /> Admin</Link></Button>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex"><Link to="/register">Create account</Link></Button>
            <Button asChild variant="hero" size="sm"><Link to="/login"><LogIn /> Sign in</Link></Button>
          </div>
        </nav>
      </header>
      <div className="relative z-10">{children}</div>
      <footer className="relative z-10 mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="veri-nav flex flex-col gap-3 rounded-[1.75rem] px-5 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>VeriScope AI · evidence-first misinformation defense</p>
          <div className="flex flex-wrap gap-4">
            <Link className="story-link" to="/features">Platform</Link>
            <Link className="story-link" to="/contact">Contact</Link>
            <Link className="story-link" to="/login">Security</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
