import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Send } from "lucide-react";
import { AppShell } from "@/components/veriscope/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — VeriScope AI" }, { name: "description", content: "Contact VeriScope AI for demos, partnerships, and team verification workflows." }, { property: "og:title", content: "Contact — VeriScope AI" }, { property: "og:description", content: "Request a VeriScope AI demo or discuss misinformation detection workflows." }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="veri-statement rounded-[2rem] p-8">
          <Mail className="h-10 w-10" />
          <h1 className="mt-6 text-5xl font-bold">Bring verification into your newsroom, team, or classroom.</h1>
          <p className="mt-4 leading-8 text-primary-foreground/75">Use this page as a polished lead-capture placeholder for demos and interviews.</p>
        </div>
        <form className="veri-panel rounded-2xl p-6">
          <h2 className="font-display text-3xl font-bold">Request access</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input className="rounded-xl border border-input bg-background/70 p-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Name" />
            <input className="rounded-xl border border-input bg-background/70 p-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Email" type="email" />
          </div>
          <input className="mt-3 w-full rounded-xl border border-input bg-background/70 p-3 outline-none focus:ring-2 focus:ring-ring" placeholder="Organization" />
          <textarea className="mt-3 min-h-36 w-full resize-none rounded-xl border border-input bg-background/70 p-3 outline-none focus:ring-2 focus:ring-ring" placeholder="What claims do you need to verify?" />
          <Button type="button" className="mt-5" variant="hero"><Send /> Send request</Button>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><MessageSquare className="h-4 w-4" /> This demo form is frontend-only until email integration is added.</p>
        </form>
      </section>
    </AppShell>
  );
}
