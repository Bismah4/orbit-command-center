import { useState } from "react";
import {
  Receipt, Wifi, MessageSquare, FileText, Calendar, Target, AlertTriangle,
  Clock, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const filters = ["All", "Urgent", "Money", "Work", "Admin", "People", "Goals", "Waiting"] as const;

type Card = {
  Icon: any; title: string; reason: string; tag: string; due: string;
  priority: "high" | "medium" | "low";
};

const sections: { title: string; tone: "destructive" | "warning" | "muted" | "primary"; items: Card[] }[] = [
  {
    title: "Needs Action",
    tone: "destructive",
    items: [
      { Icon: Wifi, title: "Pay internet bill", reason: "Late fee starts tomorrow", tag: "Money", due: "Today", priority: "high" },
      { Icon: MessageSquare, title: "Reply to client", reason: "Awaiting feedback since Mon", tag: "Work", due: "Today", priority: "high" },
      { Icon: FileText, title: "Review document risk", reason: "Hidden clause detected", tag: "Admin", due: "1d", priority: "medium" },
    ],
  },
  {
    title: "Needs Attention",
    tone: "warning",
    items: [
      { Icon: Calendar, title: "Subscription renews soon", reason: "Netflix · $15.99 on May 5", tag: "Money", due: "2d", priority: "medium" },
      { Icon: Target, title: "Goal has no progress in 8 days", reason: "Read 1 book per month", tag: "Goals", due: "—", priority: "medium" },
    ],
  },
  {
    title: "Quietly Becoming a Problem",
    tone: "primary",
    items: [
      { Icon: AlertTriangle, title: "4 admin tasks ignored this week", reason: "Pressure rising in Admin orbit", tag: "Admin", due: "—", priority: "medium" },
      { Icon: AlertTriangle, title: "Work follow-ups increasing", reason: "From 3 → 7 in 10 days", tag: "Work", due: "—", priority: "medium" },
    ],
  },
  {
    title: "Can Wait",
    tone: "muted",
    items: [
      { Icon: Receipt, title: "Organize old receipts", reason: "12 untagged receipts", tag: "Money", due: "—", priority: "low" },
    ],
  },
];

const toneRing: Record<string, string> = {
  destructive: "border-l-destructive",
  warning: "border-l-warning",
  primary: "border-l-primary",
  muted: "border-l-muted-foreground/40",
};

const Feed = () => {
  const [active, setActive] = useState<typeof filters[number]>("All");

  return (
    <div className="flex flex-col gap-5 px-5 pt-8">
      <header>
        <h1 className="font-display text-2xl font-bold">Orbit Feed</h1>
        <p className="mt-1 text-sm text-muted-foreground">Only what needs your attention.</p>
      </header>

      {/* Filter chips */}
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              active === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-elevated text-muted-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {sections.map((sec) => (
        <section key={sec.title}>
          <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {sec.title}
          </h3>
          <div className="flex flex-col gap-2">
            {sec.items.map((c) => (
              <article
                key={c.title}
                className={cn("orbit-card border-l-4 p-4", toneRing[sec.tone])}
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated text-foreground">
                    <c.Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight">{c.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{c.reason}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="pill border-border bg-elevated text-muted-foreground">{c.tag}</span>
                      <span className="pill border-border bg-elevated text-muted-foreground">
                        <Clock className="h-3 w-3" /> {c.due}
                      </span>
                      <span
                        className={cn(
                          "pill",
                          c.priority === "high" && "border-destructive/40 bg-destructive/10 text-destructive",
                          c.priority === "medium" && "border-warning/40 bg-warning/10 text-warning",
                          c.priority === "low" && "border-border bg-elevated text-muted-foreground"
                        )}
                      >
                        {c.priority}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="h-8 rounded-lg bg-gradient-primary text-xs text-primary-foreground">Mark Done</Button>
                  <Button size="sm" variant="outline" className="h-8 rounded-lg border-border bg-elevated text-xs">Remind</Button>
                  <Button size="sm" variant="outline" className="h-8 rounded-lg border-border bg-elevated text-xs">Open</Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Feed;
