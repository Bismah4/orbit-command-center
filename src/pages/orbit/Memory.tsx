import { Search, Mic, FileText, Receipt, MessageSquare, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

const groups = [
  {
    label: "Today",
    items: [
      { Icon: Receipt, title: "Paid internet bill", source: "Bill scan", time: "9:24 AM" },
      { Icon: MessageSquare, title: "Added client follow-up", source: "Email", time: "11:02 AM" },
      { Icon: FileText, title: "Scanned invoice", source: "Document", time: "2:18 PM" },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { Icon: Calendar, title: "Meeting with client", source: "Calendar", time: "—" },
      { Icon: Mic, title: "Voice note → 3 tasks", source: "Voice", time: "—" },
      { Icon: Receipt, title: "Subscription renewal detected", source: "Email", time: "—" },
    ],
  },
  {
    label: "Last week",
    items: [
      { Icon: FileText, title: "Contract uploaded", source: "Document", time: "—" },
      { Icon: Receipt, title: "Receipt saved · $129", source: "Scan", time: "—" },
    ],
  },
];

const Memory = () => {
  return (
    <div className="flex flex-col gap-5 px-5 pt-8">
      <header>
        <h1 className="font-display text-2xl font-bold">Memory</h1>
        <p className="mt-1 text-sm text-muted-foreground">Everything important, remembered.</p>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search anything Orbit remembers..."
          className="h-12 rounded-2xl border-border bg-elevated pl-10 text-sm placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {["client payment", "doctor advice", "electricity bill", "contract clause"].map((s) => (
          <span key={s} className="pill border-border bg-elevated text-muted-foreground">{s}</span>
        ))}
      </div>

      {groups.map((g) => (
        <section key={g.label}>
          <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {g.label}
          </h3>
          <div className="orbit-card overflow-hidden">
            {g.items.map((it, i) => (
              <div
                key={it.title}
                className={`flex items-center gap-3 p-4 ${i !== g.items.length - 1 ? "border-b border-border/60" : ""}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <it.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{it.title}</p>
                  <p className="text-xs text-muted-foreground">{it.source} · {it.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Memory;
