import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Link as LinkIcon, Lock, Clock, BellRing, ListChecks, Gauge,
  Calendar, Mail, Image as ImageIcon, FileText, AlarmClock,
  CreditCard, Crown, LifeBuoy, MessageSquare, ShieldCheck, ScrollText,
  ChevronRight, LogOut, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Item = { Icon: any; label: string; hint?: string; to?: string };

const sections: { title: string; items: Item[] }[] = [
  {
    title: "Account",
    items: [
      { Icon: User, label: "Personal info", hint: "Name, avatar, email" },
      { Icon: LinkIcon, label: "Connected accounts", hint: "Apple, Google" },
      { Icon: Lock, label: "Security", hint: "Password, biometrics" },
    ],
  },
  {
    title: "Orbit Preferences",
    items: [
      { Icon: Clock, label: "Daily Pulse time", hint: "8:00 AM" },
      { Icon: BellRing, label: "Reminder style", hint: "Gentle" },
      { Icon: ListChecks, label: "Default categories", hint: "Money · Work · Admin" },
      { Icon: Gauge, label: "Priority sensitivity", hint: "Balanced" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { Icon: Calendar, label: "Calendar", hint: "Connected" },
      { Icon: Mail, label: "Email", hint: "Not connected" },
      { Icon: ImageIcon, label: "Photos", hint: "Connected" },
      { Icon: FileText, label: "Files", hint: "Not connected" },
      { Icon: AlarmClock, label: "Reminders", hint: "Connected" },
    ],
  },
  {
    title: "Subscription",
    items: [
      { Icon: CreditCard, label: "Current plan", hint: "Orbit Premium · Yearly" },
      { Icon: Crown, label: "Upgrade / Manage plan", to: "/subscription" },
    ],
  },
  {
    title: "Support",
    items: [
      { Icon: LifeBuoy, label: "Help center" },
      { Icon: MessageSquare, label: "Contact support" },
      { Icon: ShieldCheck, label: "Privacy policy" },
      { Icon: ScrollText, label: "Terms" },
    ],
  },
];

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 px-5 pt-8 pb-8">
      <header className="orbit-card relative overflow-hidden p-5">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-2xl font-bold text-primary-foreground glow-primary">
            B
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-bold">Bismah Ahmed</h1>
            <p className="text-xs text-muted-foreground">bismah@example.com</p>
            <span className="pill mt-2 border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3" /> Orbit Premium · Yearly
            </span>
          </div>
        </div>
      </header>

      {sections.map((section) => (
        <section key={section.title}>
          <h3 className="mb-2 px-1 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h3>
          <div className="orbit-card overflow-hidden">
            {section.items.map((it, i) => (
              <button
                key={it.label}
                onClick={() => it.to && navigate(it.to)}
                className={`flex w-full items-center gap-3 p-4 text-left ${
                  i !== section.items.length - 1 ? "border-b border-border/60" : ""
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated text-foreground">
                  <it.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{it.label}</p>
                  {it.hint && <p className="truncate text-xs text-muted-foreground">{it.hint}</p>}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>
      ))}

      <Button
        variant="outline"
        className="h-12 rounded-2xl border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15 hover:text-destructive"
      >
        <LogOut className="mr-2 h-4 w-4" /> Sign out
      </Button>

      <p className="text-center text-[11px] text-muted-foreground">Orbit · v1.0.0</p>
    </div>
  );
};

export default Profile;
