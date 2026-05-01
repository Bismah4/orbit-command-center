import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Bell, Check, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrbit, iconMap } from "@/lib/orbit-store";
import { AddReminderDialog, DiscardConfirmDialog } from "@/components/orbit/CaptureDialogs";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-3 px-5 pt-8">
      <button onClick={() => navigate(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-elevated">
        <ArrowLeft className="h-4 w-4" />
      </button>
      <h1 className="font-display text-xl font-bold">{title}</h1>
    </header>
  );
};

export const DailyPulseDetail = () => {
  return (
    <div className="flex flex-col gap-5 pb-8">
      <Header title="Daily Pulse" />
      <section className="orbit-card mx-5 relative overflow-hidden p-5">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <span className="pill border-primary/30 bg-primary/10 text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Today's Pulse
          </span>
          <h2 className="mt-4 text-2xl font-semibold leading-snug">
            Your biggest pressure today is <span className="text-warning">Work Admin</span>.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Orbit detected 6 things building pressure across your day. Here's the breakdown.
          </p>
        </div>
      </section>

      <section className="px-5">
        <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Where pressure is rising</h3>
        <div className="orbit-card overflow-hidden">
          {[
            { label: "Work · Overloaded", desc: "3 follow-ups, 2 overdue", tone: "warning" },
            { label: "Money · Leaking", desc: "1 unpaid bill, 1 subscription", tone: "destructive" },
            { label: "Admin · Slipping", desc: "4 ignored this week", tone: "warning" },
          ].map((r, i, arr) => (
            <Link to="/app/feed" key={r.label} className={cn("flex items-center justify-between p-4", i !== arr.length - 1 && "border-b border-border/60")}>
              <div>
                <p className="text-sm font-semibold">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5">
        <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">What's stable</h3>
        <div className="orbit-card p-4">
          <p className="text-sm">Goals, Health and People are quiet. Nothing needs you there today.</p>
        </div>
      </section>

      <div className="px-5">
        <Button onClick={() => window.history.back()} className="h-12 w-full rounded-2xl bg-gradient-primary text-primary-foreground glow-primary">
          Got it — show me what to do
        </Button>
      </div>
    </div>
  );
};

export const FeedDetail = () => {
  const { id } = useParams();
  const { state, dispatch } = useOrbit();
  const navigate = useNavigate();
  const item = state.feed.find((f) => f.id === id);
  const [remindOpen, setRemindOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  if (!item) {
    return (
      <div className="flex flex-col gap-5 pb-8">
        <Header title="Item" />
        <p className="px-5 text-sm text-muted-foreground">This item is no longer in your Orbit.</p>
      </div>
    );
  }
  const Icon = iconMap[item.icon];
  return (
    <div className="flex flex-col gap-5 pb-8">
      <Header title={item.section} />
      <section className="orbit-card mx-5 p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
            <Icon className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold leading-tight">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.reason}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="pill border-border bg-elevated text-muted-foreground">{item.tag}</span>
              <span className="pill border-border bg-elevated text-muted-foreground"><Clock className="h-3 w-3" /> {item.due}</span>
              <span className={cn(
                "pill",
                item.priority === "high" && "border-destructive/40 bg-destructive/10 text-destructive",
                item.priority === "medium" && "border-warning/40 bg-warning/10 text-warning",
                item.priority === "low" && "border-border bg-elevated text-muted-foreground",
              )}>{item.priority}</span>
            </div>
          </div>
        </div>
        {item.description && <p className="mt-4 text-sm text-muted-foreground">{item.description}</p>}
        {item.amount && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-background p-3 text-sm">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-semibold">{item.amount}</span>
          </div>
        )}
      </section>

      <div className="grid grid-cols-3 gap-2 px-5">
        <Button onClick={() => { dispatch({ type: "MARK_DONE", id: item.id }); toast.success("Moved to Memory"); navigate("/app/feed"); }} className="h-12 rounded-xl bg-gradient-primary text-primary-foreground">
          <Check className="mr-1 h-4 w-4" /> Done
        </Button>
        <Button onClick={() => setRemindOpen(true)} variant="outline" className="h-12 rounded-xl border-border bg-card">
          <Bell className="mr-1 h-4 w-4" /> Remind
        </Button>
        <Button onClick={() => setDiscardOpen(true)} variant="outline" className="h-12 rounded-xl border-border bg-card text-muted-foreground">
          <Trash2 className="mr-1 h-4 w-4" /> Discard
        </Button>
      </div>
      <AddReminderDialog open={remindOpen} onOpenChange={setRemindOpen} itemTitle={item.title} />
      <DiscardConfirmDialog open={discardOpen} onOpenChange={setDiscardOpen} onConfirm={() => { dispatch({ type: "DISCARD", id: item.id }); navigate("/app/feed"); toast("Discarded"); }} />
    </div>
  );
};

export const MemoryDetail = () => {
  const { id } = useParams();
  const { state } = useOrbit();
  const item = state.memory.find((m) => m.id === id);
  if (!item) return (
    <div className="flex flex-col gap-5 pb-8">
      <Header title="Memory" />
      <p className="px-5 text-sm text-muted-foreground">Memory not found.</p>
    </div>
  );
  const Icon = iconMap[item.icon];
  return (
    <div className="flex flex-col gap-5 pb-8">
      <Header title="Memory" />
      <section className="orbit-card mx-5 p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold">{item.title}</h2>
            <p className="text-xs text-muted-foreground">{item.source} · {item.time} · {item.group}</p>
          </div>
        </div>
        {item.detail && <p className="mt-4 text-sm text-muted-foreground">{item.detail}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="pill border-border bg-elevated text-muted-foreground">{t}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tasks: Record<string, { title: string; reason: string; tag: string }> = {
    "pay-internet": { title: "Pay internet bill", reason: "Due today · High priority", tag: "Money" },
    "follow-up-client": { title: "Follow up with client", reason: "No reply since 2 days", tag: "Work" },
    "review-contract": { title: "Review contract screenshot", reason: "Hidden clause detected", tag: "Admin" },
    "organize-receipts": { title: "Organize old receipts", reason: "12 untagged receipts", tag: "Money" },
    "review-saved": { title: "Review saved article", reason: "Saved 4 days ago", tag: "Goals" },
    "update-goal": { title: "Update goal notes", reason: "Last touched 8 days ago", tag: "Goals" },
  };
  const t = tasks[id ?? ""] ?? { title: "Task", reason: "Details unavailable", tag: "—" };
  const [remindOpen, setRemindOpen] = useState(false);
  return (
    <div className="flex flex-col gap-5 pb-8">
      <Header title="Smart Action" />
      <section className="orbit-card mx-5 p-5">
        <h2 className="font-display text-xl font-semibold">{t.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.reason}</p>
        <div className="mt-3 flex gap-2">
          <span className="pill border-primary/30 bg-primary/10 text-primary">{t.tag}</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Orbit suggests handling this in the next 24 hours to keep pressure low.
        </p>
      </section>
      <div className="grid grid-cols-2 gap-2 px-5">
        <Button onClick={() => { toast.success("Marked done"); navigate(-1); }} className="h-12 rounded-xl bg-gradient-primary text-primary-foreground">
          <Check className="mr-1 h-4 w-4" /> Done
        </Button>
        <Button onClick={() => setRemindOpen(true)} variant="outline" className="h-12 rounded-xl border-border bg-card">
          <Bell className="mr-1 h-4 w-4" /> Remind
        </Button>
      </div>
      <AddReminderDialog open={remindOpen} onOpenChange={setRemindOpen} itemTitle={t.title} />
    </div>
  );
};

export const SimpleSettingsPage = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="flex flex-col gap-5 pb-8">
    <Header title={title} />
    <div className="px-5">
      <div className="orbit-card p-5 text-sm text-muted-foreground">
        {children ?? "This screen is part of your Orbit settings. Content coming soon."}
      </div>
    </div>
  </div>
);

export const PersonalInfoPage = () => (
  <SimpleSettingsPage title="Personal info">
    <div className="space-y-3 text-foreground">
      <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>Bismah Ahmed</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>bismah@example.com</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span>—</span></div>
    </div>
  </SimpleSettingsPage>
);

export const ConnectedAccountsPage = () => (
  <SimpleSettingsPage title="Connected accounts">
    <div className="space-y-3 text-foreground">
      <div className="flex justify-between"><span className="text-muted-foreground">Apple</span><span className="text-success">Connected</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Google</span><span className="text-muted-foreground">Not connected</span></div>
    </div>
  </SimpleSettingsPage>
);

export const SecurityPage = () => (
  <SimpleSettingsPage title="Security">
    <div className="space-y-3 text-foreground">
      <div className="flex justify-between"><span className="text-muted-foreground">Password</span><span>Last changed 30d ago</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Face ID</span><span className="text-success">On</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Two-factor</span><span className="text-muted-foreground">Off</span></div>
    </div>
  </SimpleSettingsPage>
);

export const SupportPage = () => (
  <SimpleSettingsPage title="Contact support">
    <p>Reach our team at <span className="text-foreground">support@orbit.app</span>. Average reply within a day.</p>
  </SimpleSettingsPage>
);

export const PrivacyPage = () => (
  <SimpleSettingsPage title="Privacy policy">
    <p>Orbit only stores what you capture. Your data is encrypted and never sold. AI processing is on-device when possible.</p>
  </SimpleSettingsPage>
);

export const TermsPage = () => (
  <SimpleSettingsPage title="Terms">
    <p>By using Orbit you agree to fair use, no scraping, and our refund policy. Full terms available at orbit.app/terms.</p>
  </SimpleSettingsPage>
);
