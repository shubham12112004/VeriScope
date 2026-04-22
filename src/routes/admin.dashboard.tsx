import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/veriscope/AppShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { getCurrentUser } from "@/lib/auth";

type Analysis = Database["public"]["Tables"]["analyses"]["Row"];
type Verdict = Database["public"]["Enums"]["analysis_verdict"];

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — VeriScope AI" }, { name: "description", content: "Monitor and override verification results." }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [items, setItems] = useState<Analysis[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  async function load() {
    const user = await getCurrentUser();
    if (!user) return;
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
    const admin = Boolean(roles?.some((role) => role.role === "admin"));
    setIsAdmin(admin);
    if (admin) {
      const { data } = await supabase.from("analyses").select("*").order("created_at", { ascending: false }).limit(50);
      setItems(data || []);
    }
  }

  async function overrideResult(id: string, verdict: Verdict) {
    const user = await getCurrentUser();
    if (!user) return;
    await supabase.from("analyses").update({ override_verdict: verdict, override_explanation: `Admin review set the final verdict to ${verdict}.`, overridden_by: user.id, overridden_at: new Date().toISOString() }).eq("id", id);
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-5xl font-bold">Admin review queue</h1>
        <p className="mt-2 text-muted-foreground">Monitor queries, inspect risky claims, and override machine-generated verdicts.</p>
        {!isAdmin && <div className="veri-panel mt-8 rounded-[1.75rem] p-6 text-muted-foreground">Admin role required. Roles are stored in a protected user_roles table.</div>}
        {isAdmin && <div className="mt-8 grid gap-4">{items.map((item) => <div className="veri-panel rounded-[1.75rem] p-5" key={item.id}><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><p className="font-semibold">{item.input}</p><p className="mt-1 text-sm text-muted-foreground">Current: {(item.override_verdict || item.verdict).toUpperCase()} · {item.confidence}%</p></div><div className="flex flex-wrap gap-2"><Button size="sm" variant="secondary" onClick={() => overrideResult(item.id, "true")}>True</Button><Button size="sm" variant="outline" onClick={() => overrideResult(item.id, "unverified")}>Unverified</Button><Button size="sm" variant="destructive" onClick={() => overrideResult(item.id, "false")}>False</Button></div></div></div>)}</div>}
      </section>
    </AppShell>
  );
}
