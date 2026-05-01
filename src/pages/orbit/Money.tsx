import { ModuleHeader } from "@/components/orbit/ModuleHeader";
import { Button } from "@/components/ui/button";
import {
  TrendingDown, AlertTriangle, Repeat, Wifi, Calendar, ChevronRight, BellOff, CreditCard, Bookmark, Check,
} from "lucide-react";

const leaks = [
  { Icon: Repeat, title: "Duplicate subscription detected", sub: "Notion · 2 active plans", tone: "destructive" },
  { Icon: TrendingDown, title: "Unused paid app", sub: "$9.99/mo · last used 47d ago", tone: "warning" },
  { Icon: Wifi, title: "Bill due tomorrow", sub: "Internet · Rs. 8,500", tone: "destructive" },
  { Icon: AlertTriangle, title: "Recurring payment increased", sub: "iCloud · $0.99 → $2.99", tone: "warning" },
] as const;

const subs = [
  { name: "Netflix", amount: "$15.99", date: "May 5" },
  { name: "Spotify", amount: "$9.99", date: "May 12" },
  { name: "iCloud+", amount: "$2.99", date: "May 18" },
];

const toneCls = {
  destructive: "bg-destructive/15 text-destructive",
  warning: "bg-warning/15 text-warning",
} as const;

const Money = () => {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <ModuleHeader title="Money Control" subtitle="Not just expenses — Orbit detects money leaks." accent="destructive" />

      {/* Money pulse */}
      <section className="px-5">
        <div className="orbit-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Money Pulse</span>
            <span className="pill border-destructive/40 bg-destructive/10 text-destructive">Leaking</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="font-display text-3xl font-bold">Rs. 142,300</p>
              <p className="text-xs text-muted-foreground">Spent this month</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-destructive">+18%</p>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat label="Upcoming bills" value="3" />
            <Stat label="Leaks" value="4" tone="destructive" />
            <Stat label="Subs" value="7" />
          </div>
        </div>
      </section>

      {/* Money leaks */}
      <section className="px-5">
        <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Money Leaks</h3>
        <div className="flex flex-col gap-2">
          {leaks.map((l) => (
            <div key={l.title} className="orbit-card p-4">
              <div className="flex items-start gap-3">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${toneCls[l.tone]}`}>
                  <l.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{l.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{l.sub}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" className="h-8 rounded-lg bg-gradient-primary text-xs text-primary-foreground">
                  <CreditCard className="mr-1 h-3 w-3" /> Pay reminder
                </Button>
                <Button size="sm" variant="outline" className="h-8 rounded-lg border-border bg-elevated text-xs">
                  <BellOff className="mr-1 h-3 w-3" /> Cancel reminder
                </Button>
                <Button size="sm" variant="outline" className="h-8 rounded-lg border-border bg-elevated text-xs">
                  <Bookmark className="mr-1 h-3 w-3" /> Save
                </Button>
                <Button size="sm" variant="outline" className="h-8 rounded-lg border-border bg-elevated text-xs">
                  <Check className="mr-1 h-3 w-3" /> Reviewed
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscriptions */}
      <section className="px-5">
        <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Subscriptions</h3>
        <div className="orbit-card overflow-hidden">
          {subs.map((s, i) => (
            <div key={s.name} className={`flex items-center justify-between p-4 ${i !== subs.length - 1 ? "border-b border-border/60" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-elevated">
                  <Calendar className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-muted-foreground">Renews {s.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{s.amount}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Stat = ({ label, value, tone }: { label: string; value: string; tone?: "destructive" }) => (
  <div className="rounded-xl bg-elevated p-3 text-center">
    <p className={`font-display text-lg font-bold ${tone === "destructive" ? "text-destructive" : ""}`}>{value}</p>
    <p className="text-[11px] text-muted-foreground">{label}</p>
  </div>
);

export default Money;
