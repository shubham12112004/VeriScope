import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Database, FileInput, Gauge, Search, UserCheck } from "lucide-react";
import { AppShell } from "@/components/veriscope/AppShell";

const steps = [
  [FileInput, "Capture", "Text, URL, social description, or optional file context enters the verification workspace."],
  [Search, "Normalize", "The claim is extracted, cleaned, and fingerprinted for consistent scoring."],
  [Database, "Compare", "Evidence sources and reliability signals are assembled into a structured source panel."],
  [Gauge, "Score", "Signals, conflicts, and suspicious keywords are translated into confidence."],
  [CheckCircle2, "Explain", "The user receives a readable verdict narrative with supporting links."],
  [UserCheck, "Review", "Admins can monitor high-risk claims and override results with audit context."],
] as const;

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [{ title: "How It Works — VeriScope AI" }, { name: "description", content: "See the VeriScope AI claim verification workflow from input capture to admin review." }, { property: "og:title", content: "How It Works — VeriScope AI" }, { property: "og:description", content: "Input, normalize, compare, score, explain, and review claims in a secure evidence workflow." }] }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="veri-statement rounded-[2rem] p-8 sm:p-10">
          <p className="text-sm font-semibold text-primary-foreground/70">Verification pipeline</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-bold sm:text-6xl">From raw claim to evidence dossier.</h1>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(([Icon, title, copy], index) => (
            <article className="veri-route-card rounded-2xl p-6" key={title}>
              <div className="flex items-center gap-3"><span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">0{index + 1}</span><Icon className="h-6 w-6 text-primary" /></div>
              <h2 className="mt-6 font-display text-2xl font-bold">{title}</h2>
              <p className="mt-2 leading-7 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
