import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, BarChart3, Bookmark, FileSearch, Languages, LockKeyhole, Radio, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/veriscope/AppShell";

const features = [
  [ShieldCheck, "Verdict engine", "True, False, and Unverified outputs with transparent confidence scoring."],
  [FileSearch, "Evidence panel", "Clickable sources with reliability and stance labels for fast review."],
  [AlertTriangle, "Suspicious language", "Flags viral, manipulative, conspiratorial, and urgency-based phrasing."],
  [BarChart3, "Trend analytics", "Charts reveal verdict frequency and frequently searched claim patterns."],
  [Bookmark, "Saved dossiers", "Users bookmark important analyses for interview demos and audit trails."],
  [LockKeyhole, "Secure RBAC", "Admin/User access is enforced through protected Cloud roles."],
  [Languages, "Multilingual signals", "Language hints help triage global misinformation workflows."],
  [Radio, "Realtime-ready", "Architecture is prepared for live review queues and updates."],
] as const;

export const Route = createFileRoute("/features")({
  head: () => ({ meta: [{ title: "Features — VeriScope AI" }, { name: "description", content: "Explore VeriScope AI verification, evidence, dashboards, and admin moderation features." }, { property: "og:title", content: "Features — VeriScope AI" }, { property: "og:description", content: "A claim verification platform with verdicts, evidence, analytics, saved results, and secure admin review." }] }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="max-w-3xl animate-fade-in">
          <p className="veri-chip inline-flex rounded-full px-3 py-1 text-sm font-semibold">Platform capabilities</p>
          <h1 className="mt-4 text-5xl font-bold sm:text-6xl">A full verification suite with product-grade polish.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">Built to demonstrate full-stack skill, security awareness, system design, and a distinctive visual product sense.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([Icon, title, copy]) => (
            <article className="veri-route-card rounded-2xl p-5" key={title}>
              <Icon className="h-8 w-8 text-primary" />
              <h2 className="mt-5 font-display text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
