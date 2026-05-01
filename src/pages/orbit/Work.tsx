import { ModuleHeader } from "@/components/orbit/ModuleHeader";
import { ChevronRight, MessageSquare, Clock, Calendar, FileText, Mic, Users } from "lucide-react";

const sections = [
  {
    title: "Pending follow-ups",
    Icon: MessageSquare,
    items: [
      { title: "Follow up with Zubair", sub: "Design discussion pending · 2d" },
      { title: "Send invoice to client", sub: "Detected from voice note" },
    ],
  },
  {
    title: "Waiting for replies",
    Icon: Clock,
    items: [
      { title: "Ahmed — proposal feedback", sub: "Sent 4 days ago" },
      { title: "Sara — contract revision", sub: "Sent 6 days ago" },
    ],
  },
  {
    title: "Upcoming deadlines",
    Icon: Calendar,
    items: [
      { title: "Q2 report draft", sub: "Due Friday" },
      { title: "Client wireframes", sub: "Due Monday" },
    ],
  },
  {
    title: "Meetings → Tasks",
    Icon: Mic,
    items: [
      { title: "Share design board", sub: "From Tue meeting" },
      { title: "Confirm scope with PM", sub: "From Wed standup" },
    ],
  },
  {
    title: "Client commitments",
    Icon: Users,
    items: [
      { title: "Send revised mockups", sub: "Promised by Friday" },
    ],
  },
];

const Work = () => {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <ModuleHeader title="Work Control" subtitle="Follow-ups, replies, deadlines — never dropped." accent="warning" />

      <section className="px-5">
        <div className="orbit-card grid grid-cols-3 p-4 text-center">
          {[
            { v: "7", l: "Follow-ups" },
            { v: "3", l: "Waiting" },
            { v: "2", l: "Deadlines" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-xl font-bold">{s.v}</p>
              <p className="text-[11px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {sections.map((sec) => (
        <section key={sec.title} className="px-5">
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <sec.Icon className="h-3.5 w-3.5" /> {sec.title}
          </div>
          <div className="orbit-card overflow-hidden">
            {sec.items.map((it, i) => (
              <div key={it.title} className={`flex items-center justify-between p-4 ${i !== sec.items.length - 1 ? "border-b border-border/60" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-warning/15 text-warning">
                    <FileText className="h-4 w-4" />
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

export default Work;
