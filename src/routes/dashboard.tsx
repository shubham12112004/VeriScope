import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { AppShell } from "@/components/veriscope/AppShell";
import { TrendChart } from "@/components/veriscope/TrendChart";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { getCurrentUser, signOut } from "@/lib/auth";

type Analysis = Database["public"]["Tables"]["analyses"]["Row"];

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — VeriScope AI" }, { name: "description", content: "User analytics and verification history." }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Analysis[]>([]);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) navigate({ to: "/login" });
      else supabase.from("analyses").select("*").order("created_at", { ascending: false }).limit(30).then(({ data }) => setItems(data || []));
    });
  }, [navigate]);

  const trendData = useMemo(() => [
    { name: "True", value: items.filter((item) => item.verdict === "true").length },
    { name: "False", value: items.filter((item) => item.verdict === "false").length },
    { name: "Unverified", value: items.filter((item) => item.verdict === "unverified").length },
  ], [items]);

  async function logout() {
    await signOut();
    navigate({ to: "/" });
  }

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><h1 className="text-5xl font-bold">Verification dashboard</h1><p className="mt-2 text-muted-foreground">History, saved evidence, and claim trend intelligence.</p></div>
          <Button variant="outline" onClick={logout}><LogOut /> Sign out</Button>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="veri-panel rounded-[1.75rem] p-6"><h2 className="font-display text-2xl font-bold">Verdict frequency</h2><TrendChart data={trendData} /></div>
          <div className="veri-panel rounded-[1.75rem] p-6">
            <h2 className="font-display text-2xl font-bold">Recent analysis history</h2>
            <div className="mt-4 space-y-3">
              {items.length === 0 && <p className="rounded-2xl bg-muted p-4 text-muted-foreground">No analyses yet. Run your first verification from the home page.</p>}
              {items.map((item) => <Link key={item.id} to="/result/$analysisId" params={{ analysisId: item.id }} className="block rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-0.5 hover:bg-accent"><div className="flex items-center justify-between gap-3"><p className="line-clamp-1 font-semibold">{item.input}</p><span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">{item.confidence}%</span></div><p className="mt-1 text-sm text-muted-foreground">{item.verdict.toUpperCase()} · {new Date(item.created_at).toLocaleString()}</p></Link>)}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
