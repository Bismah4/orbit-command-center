import { ModuleHeader } from "@/components/orbit/ModuleHeader";
import { AlertOctagon, Bell, TrendingDown, Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const types = [
  {
    type: "Urgent",
    Icon: AlertOctagon,
    tone: "destructive",
    items: [{ title: "Your bill is due today.", sub: "Internet · Rs. 8,500", time: "2m" }],
  },
  {
    type: "Smart Reminder",
    Icon: Bell,
    tone: "primary",
    items: [{ title: "You said you'd follow up with Ahmed today.", sub: "From voice note · Wed", time: "1h" }],
  },
  {
    type: "Money Leak",
    Icon: TrendingDown,
    tone: "warning",
    items: [{ title: "Orbit found a subscription renewing tomorrow.", sub: "Netflix · $15.99", time: "3h" }],
  },
  {
    type: "Daily Pulse",
    Icon: Sparkles,
    tone: "cyan",
    items: [{ title: "Today's biggest pressure: Work Admin.", sub: "3 follow-ups · 1 unpaid bill", time: "8h" }],
  },
  {
    type: "Quiet Warning",
    Icon: MessageSquare,
    tone: "muted",
    items: [{ title: "3 tasks are becoming mental clutter.", sub: "Untouched for 7+ days", time: "1d" }],
  },
] as const;

const toneCls: Record<string, string> = {
  destructive: "bg-destructive/15 text-destructive",
  primary: "bg-primary/15 text-primary",
  warning: "bg-warning/15 text-warning",
  cyan: "bg-cyan/15 text-cyan",
  muted: "bg-elevated text-muted-foreground",
};

const Notifications = () => {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <ModuleHeader title="Notifications" subtitle="Only what matters. Nothing noisy." accent="primary" />

      {types.map((t) => (
        <section key={t.type} className="px-5">
          <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t.type}
          </h3>
          {t.items.map((it) => (
            <div key={it.title} className={cn("orbit-card flex items-start gap-3 p-4")}>
              <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", toneCls[t.tone])}>
                <t.Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug">{it.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{it.sub}</p>
              </div>
              <span className="text-[11px] text-muted-foreground">{it.time}</span>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default Notifications;
