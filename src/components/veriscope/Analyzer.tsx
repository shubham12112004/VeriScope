import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AlertTriangle, FileImage, Link as LinkIcon, Loader2, Microscope, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { analyzeClaim, type InputType } from "@/lib/claim-engine";
import { getCurrentUser } from "@/lib/auth";

const examples = [
  "WHO and Reuters confirm a new public health study with peer reviewed evidence.",
  "A miracle secret cure is being hidden and is 100% guaranteed, share urgently.",
  "A viral post allegedly claims a policy changed, but reports are conflicting.",
];

export function Analyzer({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState<InputType>("text");
  const [claim, setClaim] = useState("");
  const [fileText, setFileText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const canAnalyze = useMemo(() => (claim + fileText).trim().length > 8, [claim, fileText]);

  async function handleFile(file?: File) {
    if (!file) return;
    if (file.type.startsWith("text/")) {
      setFileText(await file.text());
      return;
    }
    setFileText(`OCR image upload received: ${file.name}. Visual text extraction would run in the production OCR worker.`);
  }

  async function runAnalysis() {
    setError("");
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        navigate({ to: "/login" });
        return;
      }
      const result = analyzeClaim(`${claim}\n${fileText}`.trim(), inputType);
      const { data, error: insertError } = await supabase
        .from("analyses")
        .insert({
          user_id: user.id,
          input_type: result.inputType,
          input: result.input,
          extracted_text: result.extractedText,
          normalized_text: result.normalizedText,
          verdict: result.verdict,
          confidence: result.confidence,
          explanation: result.explanation,
          sources: result.sources,
          suspicious_keywords: result.suspiciousKeywords,
          similar_claim_count: result.similarClaimCount,
          language: result.language,
          status: "completed",
        })
        .select("id")
        .single();
      if (insertError) throw insertError;
      navigate({ to: "/result/$analysisId", params: { analysisId: data.id } });
    } catch (analysisError) {
      setError(analysisError instanceof Error ? analysisError.message : "Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:pt-16">
      <div className="space-y-8">
{!compact && (
          <div className="max-w-3xl space-y-5 animate-fade-in">
            <div className="veri-chip inline-flex rounded-full px-3 py-1 text-sm font-semibold">Universal claim intelligence</div>
            <h1 className="text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
              Verify claims before they move markets, minds, or policy.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Paste text, submit a URL, or describe a social post. VeriScope AI returns a verdict, confidence, evidence map, suspicious phrase highlights, and saved history.
            </p>
          </div>
        )}
        {compact && (
          <div className="max-w-3xl space-y-3 animate-fade-in">
            <div className="veri-chip inline-flex rounded-full px-3 py-1 text-sm font-semibold">Try it live</div>
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl">Run a verification in seconds.</h2>
          </div>
        )}
        <div className="veri-panel rounded-[1.75rem] p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["text", Type, "Text"],
              ["url", LinkIcon, "URL"],
              ["social", AlertTriangle, "Social"],
              ["file", FileImage, "File/OCR"],
            ].map(([value, Icon, label]) => (
              <button
                key={value as string}
                type="button"
                onClick={() => setInputType(value as InputType)}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${inputType === value ? "bg-primary text-primary-foreground" : "veri-chip hover:-translate-y-0.5"}`}
              >
                <Icon className="mx-auto mb-2 h-5 w-5" />
                {label as string}
              </button>
            ))}
          </div>
          <textarea
            value={claim}
            onChange={(event) => setClaim(event.target.value)}
            placeholder={inputType === "url" ? "https://example.com/claim-or-article" : "Paste a claim, public statement, or social media description..."}
            className="mt-5 min-h-44 w-full resize-none rounded-2xl border border-input bg-background/70 p-4 text-base outline-none transition focus:ring-2 focus:ring-ring"
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="veri-chip cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5">
              Attach optional file
              <input className="sr-only" type="file" accept="image/*,.txt,.md" onChange={(event) => handleFile(event.target.files?.[0])} />
            </label>
            <Button variant="hero" size="lg" disabled={!canAnalyze || isLoading} onClick={runAnalysis}>
              {isLoading ? <Loader2 className="animate-spin" /> : <Microscope />}
              Run verification
            </Button>
          </div>
          {fileText && <p className="mt-3 rounded-xl bg-muted p-3 text-sm text-muted-foreground">File context added.</p>}
          {error && <p className="mt-3 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        </div>
      </div>
      <aside className="space-y-5">
        <div className="veri-panel-dark relative overflow-hidden rounded-[1.75rem] p-6">
          <div className="veri-scanline absolute left-0 top-0 h-1 w-full" />
          <p className="text-sm font-semibold text-primary-foreground/75">Live verification model</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-primary-foreground">AI briefing preview</h3>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div><p className="text-3xl font-bold">84%</p><p className="text-xs text-primary-foreground/70">avg confidence</p></div>
            <div><p className="text-3xl font-bold">4</p><p className="text-xs text-primary-foreground/70">source types</p></div>
            <div><p className="text-3xl font-bold">12</p><p className="text-xs text-primary-foreground/70">risk signals</p></div>
          </div>
          <p className="mt-5 text-sm leading-6 text-primary-foreground/80">The production version would swap this deterministic heuristic layer for live retrieval, ranking, and model-generated summaries while keeping the same interface.</p>
        </div>
        <div className="veri-panel rounded-[1.75rem] p-5">
          <h2 className="font-display text-xl font-bold">Try an interview-ready scenario</h2>
          <div className="mt-4 space-y-3">
            {examples.map((example) => (
              <button key={example} onClick={() => setClaim(example)} className="w-full rounded-xl border border-border bg-background/60 p-3 text-left text-sm transition hover:-translate-y-0.5 hover:bg-accent">
                {example}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
