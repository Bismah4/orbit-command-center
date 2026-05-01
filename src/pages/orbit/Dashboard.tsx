import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, Wallet, Briefcase, Heart, FileCheck, Users, Target,
  ArrowRight, Wifi, MessageSquare, FileText, Clock, ChevronRight,
} from "lucide-react";
import { OrbitLogo } from "@/components/orbit/OrbitLogo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { DailyPulseDialog } from "@/components/orbit/OrbitDialogs";
import { cn } from "@/lib/utils";

type NodeStatus = "stable" | "attention" | "critical" | "active" | "quiet";

const statusStyles: Record<NodeStatus, string> = {
  stable: "bg-success",
  attention: "bg-warning",
  critical: "bg-destructive",
  active: "bg-primary",
  quiet: "bg-muted-foreground",
};
const statusLabel: Record<NodeStatus, string> = {
  stable: "Stable",
  attention: "Needs attention",
  critical: "Critical",
  active: "Active",
  quiet: "Quiet",
};

const nodes = [
  { id: "money", route: "money", Icon: Wallet, label: "Money", sub: "2 leaks detected", status: "critical" as NodeStatus },
  { id: "work", route: "work", Icon: Briefcase, label: "Work", sub: "3 follow-ups", status: "attention" as NodeStatus },
  { id: "health", route: "health", Icon: Heart, label: "Health", sub: "Stable", status: "stable" as NodeStatus },
  { id: "admin", route: "admin", Icon: FileCheck, label: "Admin", sub: "1 pending", status: "active" as NodeStatus },
  { id: "people", route: "people", Icon: Users, label: "People", sub: "All caught up", status: "quiet" as NodeStatus },
  { id: "goals", route: "goals", Icon: Target, label: "Goals", sub: "On track", status: "stable" as NodeStatus },
];

const actions = [
  { Icon: Wifi, title: "Pay internet bill", reason: "Due today · High priority", tone: "destructive" as const, id: "pay-internet" },
  { Icon: MessageSquare, title: "Follow up with client", reason: "No reply since 2 days", tone: "warning" as const, id: "follow-up-client" },
  { Icon: FileText, title: "Review contract screenshot", reason: "Hidden clause detected", tone: "primary" as const, id: "review-contract" },
];

const canWait = [
  { label: "Organize old receipts", id: "organize-receipts" },
  { label: "Review saved article", id: "review-saved" },
  { label: "Update goal notes", id: "update-goal" },
];

const Dashboard = () => {
  const [open, setOpen] = useState<typeof nodes[number] | null>(null);
  const navigate = useNavigate();
  const [pulseOpen, setPulseOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("orbit-pulse-shown")) return;
    const t = setTimeout(() => {
      setPulseOpen(true);
      sessionStorage.setItem("orbit-pulse-shown", "1");
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-6 px-5 pt-8">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Good morning</p>
          <h1 className="mt-1 font-display text-2xl font-bold">Bismah</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's what needs your attention today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/app/notifications")}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-elevated"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">B</div>
        </div>
      </header>

      {/* Daily Pulse */}
      <section className="orbit-card relative overflow-hidden p-5 animate-fade-in">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="pill border-primary/30 bg-primary/10 text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Daily Pulse
            </span>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
          <h2 className="mt-4 text-xl font-semibold leading-snug">
            Your biggest pressure today is <span className="text-warning">Work Admin</span>.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            3 follow-ups, 1 unpaid bill and 2 overdue tasks are building pressure.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="pill border-warning/40 bg-warning/10 text-warning">Work · Overloaded</span>
            <span className="pill border-destructive/40 bg-destructive/10 text-destructive">Money · Leaking</span>
            <span className="pill border-success/40 bg-success/10 text-success">Goals · Stable</span>
          </div>
          <Button onClick={() => navigate("/app/daily-pulse")} className="mt-5 h-11 w-full rounded-xl bg-gradient-primary text-primary-foreground glow-primary">
            Review Today <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Live Orbit Map */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg font-semibold">Live Orbit Map</h3>
          <span className="text-xs text-muted-foreground">Tap a node</span>
        </div>
        <div className="orbit-card relative grid aspect-square w-full place-items-center overflow-hidden p-2">
          <div className="absolute inset-0 bg-gradient-radial opacity-70" />
          <div className="absolute inset-8 rounded-full ring-orbit animate-spin-slow" />
          <div className="absolute inset-20 rounded-full ring-orbit animate-spin-reverse opacity-60" />
          <OrbitLogo size={86} />
          {nodes.map((n, i) => {
            const angle = (i / nodes.length) * 360 - 90;
            const r = 38; // percent
            const x = 50 + Math.cos((angle * Math.PI) / 180) * r;
            const y = 50 + Math.sin((angle * Math.PI) / 180) * r;
            return (
              <button
                key={n.id}
                onClick={() => setOpen(n)}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span className="orbit-card-elevated relative grid h-14 w-14 place-items-center rounded-2xl">
                  <n.Icon className="h-5 w-5 text-foreground" />
                  <span className={cn("absolute right-1.5 top-1.5 h-2 w-2 rounded-full", statusStyles[n.status])} />
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">{n.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Today's Smart Actions */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg font-semibold">Today's Smart Actions</h3>
          <button onClick={() => navigate("/app/feed")} className="text-xs text-primary">View all</button>
        </div>
        <ul className="flex flex-col gap-2">
          {actions.map((a) => (
            <li key={a.title}>
              <button onClick={() => navigate(`/app/task/${a.id}`)} className="orbit-card flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-card/60">
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-xl",
                    a.tone === "destructive" && "bg-destructive/15 text-destructive",
                    a.tone === "warning" && "bg-warning/15 text-warning",
                    a.tone === "primary" && "bg-primary/15 text-primary",
                  )}
                >
                  <a.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.reason}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Can wait */}
      <section className="pb-2">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="font-display text-lg font-semibold">Can Wait</h3>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="orbit-card p-2">
          {canWait.map((t, i) => (
            <button
              key={t.id}
              onClick={() => navigate(`/app/task/${t.id}`)}
              className={cn(
                "flex w-full items-center justify-between px-3 py-3 text-sm text-left transition-colors hover:bg-card/60",
                i !== canWait.length - 1 && "border-b border-border/60"
              )}
            >
              <span className="text-muted-foreground">{t.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      <Sheet open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl border-border bg-elevated">
          {open && (
            <>
              <SheetHeader className="text-left">
                <div className="mb-3 flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", statusStyles[open.status])} />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{statusLabel[open.status]}</span>
                </div>
                <SheetTitle className="font-display text-2xl">{open.label} is {open.status === "critical" ? "leaking" : open.status === "attention" ? "busy" : "stable"}</SheetTitle>
                <SheetDescription>
                  Orbit found {open.sub.toLowerCase()} in the {open.label.toLowerCase()} area.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-5 flex flex-col gap-2">
                {[
                  "Netflix subscription renews tomorrow",
                  "Invoice payment due in 3 days",
                  "Duplicate app subscription detected",
                ].map((t) => (
                  <div key={t} className="orbit-card flex items-center justify-between p-3 text-sm">
                    <span>{t}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 pb-2">
                <Button
                  className="h-12 rounded-xl bg-gradient-primary text-primary-foreground"
                  onClick={() => { const r = open.route; setOpen(null); navigate(`/app/${r}`); }}
                >
                  Open Module
                </Button>
                <Button variant="outline" className="h-12 rounded-xl border-border bg-card" onClick={() => setOpen(null)}>Remind Later</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <DailyPulseDialog open={pulseOpen} onOpenChange={setPulseOpen} />
    </div>
  );
};

export default Dashboard;
