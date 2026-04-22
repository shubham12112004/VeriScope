import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, BrainCircuit, Fingerprint, Globe2, Radar, ShieldAlert, Sparkles, Workflow } from "lucide-react";
import { Analyzer } from "@/components/veriscope/Analyzer";
import { Button } from "@/components/ui/button";

const proofCards = [
  { label: "Verdict graph", value: "3-way", copy: "True, False, or Unverified with confidence weighting." },
  { label: "Source stance", value: "4+", copy: "Evidence links labeled as support, contradiction, or context." },
  { label: "Risk language", value: "12", copy: "Suspicious keyword signals and manipulation markers." },
];

const featureTiles = [
  { icon: Radar, title: "Evidence radar", copy: "Cross-check claims against reliable source patterns and source stance signals." },
  { icon: Fingerprint, title: "Claim fingerprinting", copy: "Normalize text, URLs, and social descriptions into repeatable verification records." },
  { icon: BrainCircuit, title: "Explainable scoring", copy: "Readable verdict rationale instead of opaque black-box moderation output." },
  { icon: Globe2, title: "Multilingual triage", copy: "Detect likely language and preserve context for global misinformation workflows." },
];

export function LandingPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-16">
        <div className="animate-fade-in space-y-7">
          <div className="veri-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold">
            <Sparkles className="h-4 w-4" /> Interview-ready misinformation OS
          </div>
          <h1 className="max-w-4xl text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
            A professional verification console for modern claims.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            VeriScope AI turns claims, links, and social narratives into a credibility dossier with AI-style summaries, evidence trails, risk language, analytics, and role-based review.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg"><a href="#analyzer">Start analyzing <ArrowRight /></a></Button>
            <Button asChild variant="outline" size="lg"><Link to="/how-it-works">See workflow</Link></Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["JWT-secured", "Auth sessions handled with signed tokens."],
              ["Google SSO", "Frictionless sign-in for teams and reviewers."],
              ["AI briefing", "Readable verdicts and evidence narratives."],
            ].map(([title, copy]) => (
              <div key={title} className="veri-route-card rounded-2xl p-4">
                <p className="font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {proofCards.map((card, index) => (
              <div className="veri-route-card animate-enter rounded-2xl p-4" style={{ animationDelay: `${index * 90}ms` }} key={card.label}>
                <p className="text-3xl font-bold text-primary">{card.value}</p>
                <p className="mt-1 font-semibold">{card.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="animate-scale-in lg:pt-8">
          <div className="veri-statement relative overflow-hidden rounded-4xl p-6 sm:p-8">
            <div className="absolute left-6 top-6 rounded-full bg-background/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/80">Live AI brief</div>
            <div className="veri-lens mx-auto flex aspect-square max-w-sm items-center justify-center rounded-full p-5">
              <div className="veri-lens-core flex h-full w-full flex-col items-center justify-center rounded-full p-7 text-center text-foreground">
                <ShieldAlert className="h-12 w-12 text-primary" />
                <p className="mt-4 text-sm font-semibold text-muted-foreground">Signal capture</p>
                <p className="mt-2 font-display text-4xl font-bold">False</p>
                <p className="mt-2 text-sm text-muted-foreground">92% confidence · 7 risky cues · 3 contradictions</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-background/10 p-4"><BadgeCheck className="mb-3 h-5 w-5" /><p className="font-semibold">Human-readable evidence narrative</p></div>
              <div className="rounded-2xl bg-background/10 p-4"><Workflow className="mb-3 h-5 w-5" /><p className="font-semibold">Admin override and review pipeline</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="veri-section py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3">
          {[
            ["Decision trace", "See the full path from input, to extracted text, to verdict and confidence."],
            ["Reviewer flow", "Admin override, saved analyses, and history views are already built in."],
            ["Professional finish", "Glass panels, stronger hierarchy, and a cleaner content rhythm."],
          ].map(([title, copy]) => (
            <div className="veri-route-card rounded-2xl p-5" key={title}>
              <h3 className="font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="veri-section py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="veri-chip inline-flex rounded-full px-3 py-1 text-sm font-semibold">What makes it stand out</p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Designed like an intelligence desk, not a plain form.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featureTiles.map((feature) => (
              <Link to="/features" className="veri-route-card rounded-2xl p-5" key={feature.title}>
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-5 font-display text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="analyzer" className="py-8">
        <Analyzer compact />
      </section>
    </>
  );
}
