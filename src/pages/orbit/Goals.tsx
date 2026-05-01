import { useState } from "react";
import { Target, Sparkles, ChevronRight, Plus, Activity, ListChecks, Lightbulb } from "lucide-react";
import { ModuleHeader } from "@/components/orbit/ModuleHeader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Goal = {
  id: string; title: string; progress: number;
  status: "On track" | "Slipping" | "Needs attention";
  tone: "success" | "warning" | "destructive";
};

const goals: Goal[] = [
  { id: "1", title: "Launch Resume App", progress: 68, status: "On track", tone: "success" },
  { id: "2", title: "Save $2,000", progress: 30, status: "Slipping", tone: "destructive" },
  { id: "3", title: "Improve Health Routine", progress: 42, status: "Needs attention", tone: "warning" },
];

const toneText: Record<Goal["tone"], string> = {
  success: "text-success", warning: "text-warning", destructive: "text-destructive",
};
const toneBg: Record<Goal["tone"], string> = {
  success: "bg-success", warning: "bg-warning", destructive: "bg-destructive",
};

const Goals = () => {
  const [open, setOpen] = useState<Goal | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <ModuleHeader title="Goals" subtitle="Track what you're building, not just what you're doing." accent="success" />

      <div className="px-5">
        <Button className="h-12 w-full rounded-2xl bg-gradient-primary text-primary-foreground glow-primary">
          <Plus className="mr-1 h-4 w-4" /> New Goal
        </Button>
      </div>

      <section className="flex flex-col gap-3 px-5 pb-2">
        {goals.map((g) => (
          <button
            key={g.id}
            onClick={() => setOpen(g)}
            className="orbit-card p-4 text-left transition-transform active:scale-[0.99]"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <Target className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{g.title}</p>
                <p className={cn("mt-0.5 text-xs", toneText[g.tone])}>{g.status}</p>
              </div>
              <span className="font-display text-lg font-bold">{g.progress}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-elevated">
              <div className={cn("h-full rounded-full", toneBg[g.tone])} style={{ width: `${g.progress}%` }} />
            </div>
          </button>
        ))}
      </section>

      <Sheet open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto rounded-t-3xl border-border bg-elevated">
          {open && (
            <>
              <SheetHeader className="text-left">
                <SheetTitle className="font-display text-2xl">{open.title}</SheetTitle>
              </SheetHeader>

              {/* Progress */}
              <div className="orbit-card mt-5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Progress</span>
                  <span className={cn("text-xs font-semibold", toneText[open.tone])}>{open.status}</span>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <span className="font-display text-3xl font-bold">{open.progress}%</span>
                  <span className="text-xs text-muted-foreground">12 of 18 milestones</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-card">
                  <div className={cn("h-full rounded-full", toneBg[open.tone])} style={{ width: `${open.progress}%` }} />
                </div>
              </div>

              {/* Related tasks */}
              <Section icon={ListChecks} title="Related tasks">
                {["Draft case-study page", "Prepare launch tweet", "Send to 3 beta users"].map((t) => (
                  <Row key={t} title={t} sub="Due this week" />
                ))}
              </Section>

              {/* Recent activity */}
              <Section icon={Activity} title="Recent activity">
                <Row title="Updated milestone 'Beta Ready'" sub="2 days ago" />
                <Row title="Captured voice note → 2 tasks" sub="4 days ago" />
              </Section>

              {/* Orbit insight */}
              <div className="orbit-card mt-4 border border-primary/30 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs uppercase tracking-wider text-primary">Orbit insight</span>
                </div>
                <p className="mt-2 text-sm">
                  You haven't taken action on this goal for 6 days. Orbit suggests one small step today.
                </p>
              </div>

              {/* Next best action */}
              <div className="mt-5 grid grid-cols-2 gap-2 pb-4">
                <Button className="h-12 rounded-xl bg-gradient-primary text-primary-foreground">
                  <Lightbulb className="mr-1 h-4 w-4" /> Next best step
                </Button>
                <Button variant="outline" className="h-12 rounded-xl border-border bg-card">View all</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <section className="mt-5">
    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
      <Icon className="h-3.5 w-3.5" /> {title}
    </div>
    <div className="orbit-card overflow-hidden">{children}</div>
  </section>
);

const Row = ({ title, sub }: { title: string; sub: string }) => (
  <div className="flex items-center justify-between border-b border-border/60 p-3 last:border-b-0">
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
  </div>
);

export default Goals;
