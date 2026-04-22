import { ExternalLink, Save, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { EvidenceSource } from "@/lib/claim-engine";
import { getCurrentUser } from "@/lib/auth";

type Analysis = Database["public"]["Tables"]["analyses"]["Row"];

function parseSources(value: Analysis["sources"]): EvidenceSource[] {
  return Array.isArray(value) ? (value as EvidenceSource[]) : [];
}

export function ResultDetail({ analysis }: { analysis: Analysis }) {
  const verdict = analysis.override_verdict ?? analysis.verdict;
  const Icon = verdict === "true" ? ShieldCheck : verdict === "false" ? ShieldAlert : ShieldQuestion;
  const verdictClass = verdict === "true" ? "veri-true" : verdict === "false" ? "veri-false" : "veri-unverified";
  const sources = parseSources(analysis.sources);
  const keywordCount = analysis.suspicious_keywords.length;
  const AIHeadline = verdict === "true" ? "The claim aligns with stronger verification signals." : verdict === "false" ? "The claim shows manipulation-prone and unsupported phrasing." : "The evidence is mixed and needs more primary sourcing.";

  async function saveAnalysis() {
    const user = await getCurrentUser();
    if (!user) return;
    await supabase.from("saved_analyses").upsert({ user_id: user.id, analysis_id: analysis.id });
    await supabase.from("analyses").update({ is_bookmarked: true }).eq("id", analysis.id);
  }

  const highlighted = analysis.extracted_text || analysis.input;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 rounded-[1.75rem] border border-border bg-background/70 px-5 py-4 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.6)] backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">AI result brief</p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Analysis ready for review</h1>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">A professional summary of the claim, the confidence signal, and the evidence chain.</p>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${verdictClass}`}>
            <Icon className="h-5 w-5" /> {verdict.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="veri-panel rounded-[1.75rem] p-6">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${verdictClass}`}>
            <Icon className="h-5 w-5" /> {verdict.toUpperCase()}
          </div>
          <h2 className="mt-6 text-4xl font-bold text-foreground">Credibility analysis</h2>
          <p className="mt-3 text-muted-foreground">{analysis.override_explanation || analysis.explanation}</p>
          <div className="mt-6 rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex items-end justify-between"><span className="font-semibold">Confidence</span><span className="text-4xl font-bold">{analysis.confidence}%</span></div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${analysis.confidence}%` }} /></div>
            <p className="mt-3 text-sm text-muted-foreground">{AIHeadline}</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-muted p-4"><p className="text-2xl font-bold">{analysis.similar_claim_count}</p><p className="text-sm text-muted-foreground">similar claims</p></div>
            <div className="rounded-2xl bg-muted p-4"><p className="text-2xl font-bold">{analysis.language.toUpperCase()}</p><p className="text-sm text-muted-foreground">language</p></div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Risk scan</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{keywordCount}</p>
              <p className="mt-1 text-sm text-muted-foreground">flagged keywords</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Input type</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{analysis.input_type.toUpperCase()}</p>
              <p className="mt-1 text-sm text-muted-foreground">verification route</p>
            </div>
          </div>
          <Button className="mt-6 w-full" variant="forensic" onClick={saveAnalysis}><Save /> Save result</Button>
        </div>
        <div className="space-y-6">
          <div className="veri-panel rounded-[1.75rem] p-6">
            <h2 className="font-display text-2xl font-bold">Suspicious keyword scan</h2>
            <p className="mt-3 leading-8 text-muted-foreground">{highlighted}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.suspicious_keywords.length ? analysis.suspicious_keywords.map((keyword) => <span className="veri-keyword rounded-full px-3 py-1 text-sm font-semibold" key={keyword}>{keyword}</span>) : <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">No high-risk terms detected</span>}
            </div>
          </div>
          <div className="veri-panel rounded-[1.75rem] p-6">
            <h2 className="font-display text-2xl font-bold">Evidence panel</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sources are grouped by reliability and stance to make the decision trace easier to audit.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-0.5 hover:bg-accent">
                  <div className="flex items-start justify-between gap-3"><h3 className="font-semibold">{source.title}</h3><ExternalLink className="h-4 w-4" /></div>
                  <p className="mt-2 text-sm text-muted-foreground">{source.reliability} reliability · {source.stance}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
