import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useOrbit, iconMap, FeedItem } from "@/lib/orbit-store";
import { AddReminderDialog } from "@/components/orbit/CaptureDialogs";
import { toast } from "sonner";

const filters = ["All", "Urgent", "Money", "Work", "Admin", "People", "Goals", "Waiting"] as const;

const toneRing: Record<string, string> = {
  "Needs Action": "border-l-destructive",
  "Needs Attention": "border-l-warning",
  "Quietly Becoming a Problem": "border-l-primary",
  "Can Wait": "border-l-muted-foreground/40",
};

const Feed = () => {
  const { state, dispatch } = useOrbit();
  const navigate = useNavigate();
  const [active, setActive] = useState<typeof filters[number]>("All");
  const [remindFor, setRemindFor] = useState<FeedItem | null>(null);

  const filtered = useMemo(() => {
    if (active === "All") return state.feed;
    if (active === "Urgent") return state.feed.filter((f) => f.priority === "high");
    if (active === "Waiting") return state.feed.filter((f) => f.section === "Can Wait");
    return state.feed.filter((f) => f.tag === active);
  }, [state.feed, active]);

  const sections = useMemo(() => {
    const order: FeedItem["section"][] = ["Needs Action", "Needs Attention", "Quietly Becoming a Problem", "Can Wait"];
    return order
      .map((title) => ({ title, items: filtered.filter((f) => f.section === title) }))
      .filter((s) => s.items.length > 0);
  }, [filtered]);

  return (
    <div className="flex flex-col gap-5 px-5 pt-8">
      <header>
        <h1 className="font-display text-2xl font-bold">Orbit Feed</h1>
        <p className="mt-1 text-sm text-muted-foreground">Only what needs your attention.</p>
      </header>

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

      {sections.length === 0 && (
        <div className="orbit-card grid place-items-center p-10 text-center">
          <p className="font-display text-base font-semibold">All clear.</p>
          <p className="mt-1 text-xs text-muted-foreground">Nothing matches "{active}" right now.</p>
        </div>
      )}

      {sections.map((sec) => (
        <section key={sec.title}>
          <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {sec.title}
          </h3>
          <div className="flex flex-col gap-2">
            {sec.items.map((c) => {
              const Icon = iconMap[c.icon];
              return (
                <article key={c.id} className={cn("orbit-card border-l-4 p-4 animate-fade-in", toneRing[sec.title])}>
                  <button onClick={() => navigate(`/app/feed/${c.id}`)} className="flex w-full items-start gap-3 text-left">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated text-foreground">
                      <Icon className="h-5 w-5" />
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
                  </button>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => { dispatch({ type: "MARK_DONE", id: c.id }); toast.success("Moved to Memory"); }}
                      className="h-8 rounded-lg bg-gradient-primary text-xs text-primary-foreground"
                    >
                      Mark Done
                    </Button>
                    <Button size="sm" onClick={() => setRemindFor(c)} variant="outline" className="h-8 rounded-lg border-border bg-elevated text-xs">Remind</Button>
                    <Button size="sm" onClick={() => navigate(`/app/feed/${c.id}`)} variant="outline" className="h-8 rounded-lg border-border bg-elevated text-xs">Open</Button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <AddReminderDialog open={!!remindFor} onOpenChange={(v) => !v && setRemindFor(null)} itemTitle={remindFor?.title} />
    </div>
  );
};

export default Feed;
