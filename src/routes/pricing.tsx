import { Link, createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { AppShell } from "@/components/veriscope/AppShell";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Scout", price: "Free", items: ["10 demo analyses", "Evidence links", "Keyword flags"] },
  { name: "Investigator", price: "$19", items: ["Unlimited history", "Saved dossiers", "Trend dashboard"], featured: true },
  { name: "Command", price: "$79", items: ["Admin review queue", "Team roles", "Override workflow"] },
] as const;

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — VeriScope AI" }, { name: "description", content: "VeriScope AI pricing plans for individuals, investigators, and teams." }, { property: "og:title", content: "Pricing — VeriScope AI" }, { property: "og:description", content: "Choose a claim verification workflow plan for demos, investigations, or admin teams." }] }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="max-w-3xl animate-fade-in">
          <p className="veri-chip inline-flex rounded-full px-3 py-1 text-sm font-semibold">Hackathon-ready SaaS model</p>
          <h1 className="mt-4 text-5xl font-bold sm:text-6xl">Pricing that makes it feel like a real product.</h1>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article className={`rounded-2xl p-6 ${plan.featured ? "veri-statement" : "veri-route-card"}`} key={plan.name}>
              <h2 className="font-display text-2xl font-bold">{plan.name}</h2>
              <p className="mt-4 text-5xl font-bold">{plan.price}</p>
              <p className="mt-1 text-sm text-muted-foreground">per month</p>
              <ul className="mt-6 space-y-3">
                {plan.items.map((item) => <li className="flex items-center gap-2" key={item}><Check className="h-4 w-4 text-primary" /> {item}</li>)}
              </ul>
              <Button asChild className="mt-7 w-full" variant={plan.featured ? "forensic" : "outline"}><Link to="/register">Choose plan</Link></Button>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
