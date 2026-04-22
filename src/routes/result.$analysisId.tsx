import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/veriscope/AppShell";
import { ResultDetail } from "@/components/veriscope/ResultDetail";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Analysis = Database["public"]["Tables"]["analyses"]["Row"];

export const Route = createFileRoute("/result/$analysisId")({
  head: () => ({ meta: [{ title: "Analysis Result — VeriScope AI" }, { name: "description", content: "Detailed claim credibility result." }] }),
  component: ResultPage,
});

function ResultPage() {
  const { analysisId } = Route.useParams();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.from("analyses").select("*").eq("id", analysisId).single().then(({ data, error: loadError }) => {
      if (loadError) setError(loadError.message);
      else setAnalysis(data);
    });
  }, [analysisId]);

  return (
    <AppShell>
      {analysis && <ResultDetail analysis={analysis} />}
      {!analysis && !error && <div className="mx-auto max-w-3xl px-4 py-16"><div className="veri-panel rounded-2xl p-8">Loading analysis...</div></div>}
      {error && <div className="mx-auto max-w-3xl px-4 py-16"><div className="veri-panel rounded-2xl p-8"><p className="text-destructive">{error}</p><Button asChild className="mt-4"><Link to="/">Run a new analysis</Link></Button></div></div>}
    </AppShell>
  );
}
