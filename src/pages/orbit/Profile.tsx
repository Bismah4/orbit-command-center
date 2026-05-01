import { useState } from "react";
import { Bell, Shield, CreditCard, Settings, HelpCircle, LogOut, ChevronRight, Sparkles, AlertTriangle, Crown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuggestionDialog, RiskDialog, PremiumDialog, DailyPulseDialog } from "@/components/orbit/OrbitDialogs";

const items = [
  { Icon: Bell, label: "Notifications", hint: "Daily Pulse, reminders" },
  { Icon: Shield, label: "Privacy & Security", hint: "Data, biometrics" },
  { Icon: CreditCard, label: "Subscription", hint: "Orbit Premium" },
  { Icon: Settings, label: "Preferences", hint: "Theme, language" },
  { Icon: HelpCircle, label: "Help & Support", hint: "Docs, contact us" },
];

const Profile = () => {
  const [suggest, setSuggest] = useState(false);
  const [risk, setRisk] = useState(false);
  const [premium, setPremium] = useState(false);
  const [pulse, setPulse] = useState(false);
  return (
    <div className="flex flex-col gap-5 px-5 pt-8">
      <header className="orbit-card relative overflow-hidden p-5">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-2xl font-bold text-primary-foreground glow-primary">B</div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-bold">Bismah Ahmed</h1>
            <p className="text-xs text-muted-foreground">bismah@example.com</p>
            <span className="pill mt-2 border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3" /> Orbit Premium
            </span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-2">
        {[
          { label: "Captures", value: "128" },
          { label: "Actions done", value: "84" },
          { label: "Streak", value: "12d" },
        ].map((s) => (
          <div key={s.label} className="orbit-card p-3 text-center">
            <p className="font-display text-lg font-bold">{s.value}</p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="orbit-card overflow-hidden">
        {items.map((it, i) => (
          <button
            key={it.label}
            className={`flex w-full items-center gap-3 p-4 text-left ${i !== items.length - 1 ? "border-b border-border/60" : ""}`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated text-foreground">
              <it.Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{it.label}</p>
              <p className="text-xs text-muted-foreground">{it.hint}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </section>

      <section>
        <h3 className="mb-2 px-1 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Preview Orbit popups</h3>
        <div className="orbit-card grid grid-cols-2 gap-2 p-3">
          <Button variant="outline" className="h-11 rounded-xl border-border bg-elevated text-xs" onClick={() => setSuggest(true)}>
            <Sparkles className="mr-1 h-3.5 w-3.5" /> Smart suggestion
          </Button>
          <Button variant="outline" className="h-11 rounded-xl border-border bg-elevated text-xs" onClick={() => setRisk(true)}>
            <AlertTriangle className="mr-1 h-3.5 w-3.5" /> Risk detected
          </Button>
          <Button variant="outline" className="h-11 rounded-xl border-border bg-elevated text-xs" onClick={() => setPulse(true)}>
            <TrendingUp className="mr-1 h-3.5 w-3.5" /> Daily Pulse
          </Button>
          <Button className="h-11 rounded-xl bg-gradient-primary text-xs text-primary-foreground" onClick={() => setPremium(true)}>
            <Crown className="mr-1 h-3.5 w-3.5" /> Upgrade Orbit
          </Button>
        </div>
      </section>

      <Button variant="outline" className="h-12 rounded-2xl border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15 hover:text-destructive">
        <LogOut className="mr-2 h-4 w-4" /> Sign out
      </Button>

      <p className="pb-4 text-center text-[11px] text-muted-foreground">Orbit · v1.0.0</p>

      <SuggestionDialog open={suggest} onOpenChange={setSuggest} />
      <RiskDialog open={risk} onOpenChange={setRisk} />
      <DailyPulseDialog open={pulse} onOpenChange={setPulse} />
      <PremiumDialog open={premium} onOpenChange={setPremium} />
    </div>
  );
};

export default Profile;
