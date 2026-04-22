import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/veriscope/AppShell";
import { LandingPage } from "@/components/veriscope/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VeriScope AI — Universal Claim Verification" },
      { name: "description", content: "A stylish full-stack platform for claim verification, misinformation detection, source evidence, and trend analytics." },
      { property: "og:title", content: "VeriScope AI — Universal Claim Verification" },
      { property: "og:description", content: "Evidence-backed verdicts, confidence scores, suspicious keyword scanning, dashboards, and admin review." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      <LandingPage />
    </AppShell>
  );
}
