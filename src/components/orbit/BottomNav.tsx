import { NavLink } from "react-router-dom";
import { Compass, PlusCircle, Layers, Brain, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/app", label: "Orbit", Icon: Compass, end: true },
  { to: "/app/capture", label: "Capture", Icon: PlusCircle },
  { to: "/app/feed", label: "Feed", Icon: Layers },
  { to: "/app/memory", label: "Memory", Icon: Brain },
  { to: "/app/profile", label: "Profile", Icon: User },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "group flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-[11px] font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    "relative grid h-9 w-9 place-items-center rounded-xl transition-all",
                    isActive && "bg-primary/15 text-primary glow-primary"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} />
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
