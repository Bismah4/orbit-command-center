import { Check, Crown, Sparkles, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePremium } from "@/lib/premium";
import { toast } from "sonner";

const features = [
  "Unlimited captures",
  "Live Orbit Map",
  "Smart Document Decoder",
  "Money Leak Detection",
  "Personal Memory Layer",
  "Daily Pulse",
  "Advanced Follow-up Intelligence",
  "Goal Drift Detection",
  "Priority Engine",
];

const Subscription = () => {
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");
  const navigate = useNavigate();
  const { isPremium, setPremium } = usePremium();

  const handleStart = () => {
    if (isPremium) {
      toast("You're already on Orbit Premium");
      return;
    }
    setPremium(true);
    toast.success("Welcome to Orbit Premium · Free trial started");
    navigate(-1);
  };

  const handleContinueFree = () => {
    toast("Continuing on the free plan");
    navigate(-1);
  };

  const handleRestore = () => {
    toast("No previous purchase found");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />

      <div className="relative flex flex-col gap-6 px-5 pt-10 pb-32">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-elevated/60 text-muted-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <header className="flex flex-col items-center text-center">
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary glow-primary">
            <Crown className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-gradient">
            Unlock Orbit Pro
          </h1>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Your life, fully under control.
          </p>
        </header>

        <section className="orbit-card p-5">
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Premium features
          </h2>
          <ul className="flex flex-col gap-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPlan("monthly")}
            className={`relative rounded-2xl border p-4 text-left transition ${
              plan === "monthly"
                ? "border-primary/60 bg-primary/10 glow-primary"
                : "border-border/60 bg-card"
            }`}
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Monthly</p>
            <p className="mt-2 font-display text-2xl font-bold">$9.99</p>
            <p className="text-[11px] text-muted-foreground">/month</p>
          </button>
          <button
            onClick={() => setPlan("yearly")}
            className={`relative rounded-2xl border p-4 text-left transition ${
              plan === "yearly"
                ? "border-primary/60 bg-primary/10 glow-primary"
                : "border-border/60 bg-card"
            }`}
          >
            <span className="absolute -top-2 right-3 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Best Value
            </span>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Yearly</p>
            <p className="mt-2 font-display text-2xl font-bold">$49.99</p>
            <p className="text-[11px] text-muted-foreground">/year · save 58%</p>
          </button>
        </section>

        <Button className="h-14 rounded-2xl bg-gradient-primary text-base font-semibold text-primary-foreground glow-primary">
          <Sparkles className="mr-2 h-4 w-4" />
          Start 3-Day Free Trial
        </Button>

        <p className="text-center text-[11px] text-muted-foreground">
          Cancel anytime. No charge during trial.
        </p>
      </div>
    </div>
  );
};

export default Subscription;
