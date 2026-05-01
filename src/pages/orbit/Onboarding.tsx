import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OrbitLogo } from "@/components/orbit/OrbitLogo";
import {
  Receipt, Mic, FileText, CheckSquare, MessageSquare, Sparkles,
  Wallet, Briefcase, Heart, FileCheck, Users, Target, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const orbitChips = [
  { Icon: Receipt, label: "Bill", out: "Payment Reminder" },
  { Icon: Mic, label: "Voice Note", out: "Task" },
  { Icon: MessageSquare, label: "Email", out: "Follow-up" },
  { Icon: FileText, label: "Receipt", out: "Expense" },
];

const orbitNodes = [
  { Icon: Wallet, label: "Money", color: "text-destructive" },
  { Icon: Briefcase, label: "Work", color: "text-warning" },
  { Icon: Heart, label: "Health", color: "text-success" },
  { Icon: FileCheck, label: "Admin", color: "text-cyan" },
  { Icon: Users, label: "People", color: "text-primary" },
  { Icon: Target, label: "Goals", color: "text-success" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const next = () => (step < 3 ? setStep(step + 1) : navigate("/login"));

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-background">
      {/* Progress dots */}
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === step ? "w-6 bg-primary" : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => navigate("/login")}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Skip
        </button>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-8">
        {step === 0 && <StepIntro />}
        {step === 1 && <StepCapture />}
        {step === 2 && <StepOrbitMap />}
        {step === 3 && <StepPulse />}
      </div>

      <div className="px-6 pb-10">
        <Button
          onClick={next}
          className="h-14 w-full rounded-2xl bg-gradient-primary text-base font-semibold text-primary-foreground glow-primary hover:opacity-95"
        >
          {step < 3 ? "Continue" : "Get Started"}
        </Button>
      </div>
    </div>
  );
};

const StepIntro = () => (
  <div className="flex flex-1 flex-col">
    <div className="relative mx-auto mb-6 grid h-72 w-72 place-items-center">
      <OrbitLogo size={120} />
      {orbitChips.map((c, i) => {
        const angle = (i / orbitChips.length) * 360;
        const r = 130;
        const x = Math.cos((angle * Math.PI) / 180) * r;
        const y = Math.sin((angle * Math.PI) / 180) * r;
        return (
          <div
            key={c.label}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <div
              className="orbit-card-elevated flex items-center gap-2 px-3 py-2 text-xs animate-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <c.Icon className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{c.label}</span>
            </div>
          </div>
        );
      })}
    </div>
    <h1 className="font-display text-3xl font-bold leading-tight">
      Your life is scattered. <span className="text-gradient">Orbit brings it together.</span>
    </h1>
    <p className="mt-4 text-base text-muted-foreground">
      Drop screenshots, bills, voice notes, tasks, and reminders. Orbit understands them and turns
      them into action.
    </p>
  </div>
);

const StepCapture = () => (
  <div className="flex flex-1 flex-col">
    <div className="orbit-card relative mx-auto mb-8 grid h-64 w-full place-items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="relative grid h-24 w-24 place-items-center rounded-2xl bg-gradient-primary glow-primary">
        <Sparkles className="h-10 w-10 text-primary-foreground" />
      </div>
    </div>
    <h1 className="font-display text-3xl font-bold leading-tight">
      Drop anything. <span className="text-gradient">Orbit knows what to do.</span>
    </h1>
    <p className="mt-3 text-base text-muted-foreground">
      No manual sorting. No typing everything. Orbit detects what each item means and what action it needs.
    </p>
    <div className="mt-6 flex flex-wrap gap-2">
      {orbitChips.concat([{ Icon: CheckSquare, label: "Screenshot", out: "Saved Action" }]).map((c) => (
        <div key={c.label} className="pill border-border bg-elevated text-muted-foreground">
          <c.Icon className="h-3 w-3 text-primary" />
          <span className="text-foreground">{c.label}</span>
          <span className="opacity-60">→</span>
          <span>{c.out}</span>
        </div>
      ))}
    </div>
  </div>
);

const StepOrbitMap = () => (
  <div className="flex flex-1 flex-col">
    <div className="relative mx-auto mb-6 grid h-72 w-72 place-items-center">
      <div className="absolute inset-6 rounded-full ring-orbit animate-spin-slow" />
      <div className="absolute inset-16 rounded-full ring-orbit animate-spin-reverse opacity-70" />
      <OrbitLogo size={80} />
      {orbitNodes.map((n, i) => {
        const angle = (i / orbitNodes.length) * 360 - 90;
        const r = 120;
        const x = Math.cos((angle * Math.PI) / 180) * r;
        const y = Math.sin((angle * Math.PI) / 180) * r;
        return (
          <div
            key={n.label}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <div className="orbit-card-elevated flex items-center gap-2 px-3 py-2 text-xs">
              <n.Icon className={cn("h-3.5 w-3.5", n.color)} />
              <span className="font-medium">{n.label}</span>
            </div>
          </div>
        );
      })}
    </div>
    <h1 className="font-display text-3xl font-bold leading-tight">
      See your life as a <span className="text-gradient">live system.</span>
    </h1>
    <p className="mt-3 text-base text-muted-foreground">
      Money, work, health, admin, people, and goals — all visible in one command center.
    </p>
  </div>
);

const StepPulse = () => (
  <div className="flex flex-1 flex-col">
    <div className="orbit-card mx-auto mb-8 w-full p-6">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <TrendingUp className="h-4 w-4 text-primary" /> Daily Pulse
      </div>
      <p className="mt-3 text-lg font-semibold leading-snug">
        Your biggest pressure today: <span className="text-warning">Work Admin</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        3 follow-ups, 1 unpaid bill and 2 overdue tasks are building pressure.
      </p>
      <div className="mt-4 flex gap-2">
        <span className="pill border-warning/40 bg-warning/10 text-warning">Work · Overloaded</span>
        <span className="pill border-destructive/40 bg-destructive/10 text-destructive">Money · Leaking</span>
      </div>
    </div>
    <h1 className="font-display text-3xl font-bold leading-tight">
      Know what <span className="text-gradient">needs you today.</span>
    </h1>
    <p className="mt-3 text-base text-muted-foreground">
      Orbit shows what is urgent, what is slipping, and what can wait.
    </p>
  </div>
);

export default Onboarding;
