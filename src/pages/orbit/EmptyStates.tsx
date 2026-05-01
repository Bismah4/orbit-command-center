import { Inbox, Brain, Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ModuleHeader } from "@/components/orbit/ModuleHeader";

const states = [
  {
    Icon: Inbox,
    title: "Nothing needs action right now.",
    body: "Orbit will surface what matters when something needs attention.",
    cta: "Open Feed",
    to: "/app/feed",
  },
  {
    Icon: Brain,
    title: "No memories yet.",
    body: "Drop a note, screenshot, or voice memo to start building your second memory.",
    cta: "Add memory",
    to: "/app/memory",
  },
  {
    Icon: Plus,
    title: "Start by dropping anything.",
    body: "Orbit will understand it and turn it into action.",
    cta: "Open Capture",
    to: "/app/capture",
  },
  {
    Icon: Target,
    title: "Add your first goal.",
    body: "Orbit will help you keep it moving.",
    cta: "Add goal",
    to: "/app/goals",
  },
];

const EmptyStates = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 px-5 pb-8 pt-4">
      <ModuleHeader title="Empty states" subtitle="What Orbit shows when there's nothing to surface" />
      {states.map(({ Icon, title, body, cta, to }) => (
        <section key={title} className="orbit-card flex flex-col items-center gap-3 p-8 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-elevated text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <h3 className="font-display text-base font-semibold">{title}</h3>
          <p className="max-w-xs text-xs text-muted-foreground">{body}</p>
          <Button
            variant="outline"
            className="mt-2 h-10 rounded-xl border-border bg-elevated text-xs"
            onClick={() => navigate(to)}
          >
            {cta}
          </Button>
        </section>
      ))}
    </div>
  );
};

export default EmptyStates;
