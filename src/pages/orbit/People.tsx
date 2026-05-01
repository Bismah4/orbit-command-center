import { ModuleHeader } from "@/components/orbit/ModuleHeader";
import { ChevronRight, Phone, MessageSquare, Cake, Calendar, Clock } from "lucide-react";

const sections = [
  {
    title: "Promised follow-ups",
    Icon: MessageSquare,
    items: [
      { title: "Call Mom", sub: "You said you'd call this weekend.", Icon: Phone, tone: "primary" },
      { title: "Send portfolio to Hassan", sub: "Promised on Tuesday", Icon: MessageSquare, tone: "primary" },
    ],
  },
  {
    title: "Waiting for replies",
    Icon: Clock,
    items: [
      { title: "Client follow-up", sub: "No reply since 3 days.", Icon: MessageSquare, tone: "warning" },
    ],
  },
  {
    title: "Upcoming meetings",
    Icon: Calendar,
    items: [
      { title: "1:1 with Sara", sub: "Tomorrow · 4:00 PM", Icon: Calendar, tone: "primary" },
    ],
  },
  {
    title: "Birthdays",
    Icon: Cake,
    items: [
      { title: "Ahmed's birthday", sub: "In 4 days · suggest a message", Icon: Cake, tone: "cyan" },
    ],
  },
] as const;

const toneCls: Record<string, string> = {
  primary: "bg-primary/15 text-primary",
  warning: "bg-warning/15 text-warning",
  cyan: "bg-cyan/15 text-cyan",
};

const People = () => {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <ModuleHeader title="People" subtitle="Important commitments and conversations." accent="primary" />

      {sections.map((sec) => (
        <section key={sec.title} className="px-5">
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <sec.Icon className="h-3.5 w-3.5" /> {sec.title}
          </div>
          <div className="orbit-card overflow-hidden">
            {sec.items.map((it, i) => (
              <div key={it.title} className={`flex items-center justify-between p-4 ${i !== sec.items.length - 1 ? "border-b border-border/60" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${toneCls[it.tone]}`}>
                    <it.Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{it.title}</p>
                    <p className="text-xs text-muted-foreground">{it.sub}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default People;
