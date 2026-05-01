import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, AlertTriangle, TrendingUp, Crown } from "lucide-react";

type BaseProps = { open: boolean; onOpenChange: (v: boolean) => void };

const IconBadge = ({ Icon, tone = "primary" }: { Icon: any; tone?: "primary" | "warning" | "destructive" | "cyan" }) => {
  const cls = {
    primary: "bg-primary/15 text-primary",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/15 text-destructive",
    cyan: "bg-cyan/15 text-cyan",
  }[tone];
  return (
    <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${cls}`}>
      <Icon className="h-7 w-7" />
    </div>
  );
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <DialogContent className="rounded-3xl border-border bg-elevated">
    {children}
  </DialogContent>
);

export const AddedToOrbitDialog = ({ open, onOpenChange }: BaseProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <Shell>
      <DialogHeader className="items-center text-center">
        <IconBadge Icon={Check} tone="primary" />
        <DialogTitle className="font-display text-xl">Added to Orbit</DialogTitle>
        <DialogDescription>I created 1 task, 1 reminder, and saved the original source.</DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2">
        <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>View</Button>
        <Button className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => onOpenChange(false)}>Done</Button>
      </DialogFooter>
    </Shell>
  </Dialog>
);

export const SuggestionDialog = ({ open, onOpenChange }: BaseProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <Shell>
      <DialogHeader className="items-center text-center">
        <IconBadge Icon={Sparkles} tone="cyan" />
        <DialogTitle className="font-display text-xl">Orbit Suggests</DialogTitle>
        <DialogDescription>This looks important. Do you want to set a reminder?</DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2">
        <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Ignore</Button>
        <Button className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => onOpenChange(false)}>Set Reminder</Button>
      </DialogFooter>
    </Shell>
  </Dialog>
);

export const RiskDialog = ({ open, onOpenChange }: BaseProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <Shell>
      <DialogHeader className="items-center text-center">
        <IconBadge Icon={AlertTriangle} tone="destructive" />
        <DialogTitle className="font-display text-xl">Risk Detected</DialogTitle>
        <DialogDescription>This document includes a possible hidden fee.</DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2">
        <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Save for Later</Button>
        <Button className="h-11 rounded-xl bg-destructive text-destructive-foreground" onClick={() => onOpenChange(false)}>Review Risk</Button>
      </DialogFooter>
    </Shell>
  </Dialog>
);

export const DailyPulseDialog = ({ open, onOpenChange }: BaseProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <Shell>
      <DialogHeader className="items-center text-center">
        <IconBadge Icon={TrendingUp} tone="warning" />
        <DialogTitle className="font-display text-xl">Today's Pulse</DialogTitle>
        <DialogDescription>
          Your biggest pressure today is <span className="font-semibold text-warning">Money</span>. 2 bills and 1 subscription need review.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2">
        <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Later</Button>
        <Button className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => onOpenChange(false)}>Review Now</Button>
      </DialogFooter>
    </Shell>
  </Dialog>
);

export const PremiumDialog = ({ open, onOpenChange }: BaseProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="overflow-hidden rounded-3xl border-border bg-elevated p-0">
      <div className="relative px-6 pt-7">
        <div className="absolute inset-x-0 -top-16 mx-auto h-40 w-72 rounded-full bg-gradient-glow blur-3xl" />
        <div className="relative">
          <IconBadge Icon={Crown} tone="warning" />
          <DialogHeader className="mt-3 items-center text-center">
            <DialogTitle className="font-display text-2xl">Unlock Full Orbit</DialogTitle>
            <DialogDescription>
              Unlimited captures, advanced memory, document decoder, money leak detection and live orbit insights.
            </DialogDescription>
          </DialogHeader>
        </div>
      </div>
      <ul className="space-y-2 px-6 py-4 text-sm">
        {[
          "Unlimited universal captures",
          "Advanced memory & search",
          "Smart Document Decoder",
          "Money leak detection",
          "Live orbit insights",
        ].map((f) => (
          <li key={f} className="flex items-center gap-2 text-muted-foreground">
            <Check className="h-4 w-4 text-success" />
            <span className="text-foreground">{f}</span>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-2 px-6 pb-6">
        <Button variant="outline" className="h-12 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Maybe Later</Button>
        <Button className="h-12 rounded-xl bg-gradient-primary text-primary-foreground glow-primary" onClick={() => onOpenChange(false)}>Start Free Trial</Button>
      </div>
    </DialogContent>
  </Dialog>
);
