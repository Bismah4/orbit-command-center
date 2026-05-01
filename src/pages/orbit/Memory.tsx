import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useOrbit, iconMap } from "@/lib/orbit-store";
import { cn } from "@/lib/utils";

const allTags = ["client payment", "doctor advice", "electricity bill", "contract clause", "money", "work"];

const Memory = () => {
  const { state } = useOrbit();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return state.memory.filter((m) => {
      const matchQ = !q.trim() || m.title.toLowerCase().includes(q.toLowerCase()) || m.tags.some((t) => t.includes(q.toLowerCase()));
      const matchTag = !tag || m.tags.includes(tag);
      return matchQ && matchTag;
    });
  }, [state.memory, q, tag]);

  const groups = useMemo(() => {
    const order: ("Today" | "Yesterday" | "Last week")[] = ["Today", "Yesterday", "Last week"];
    return order.map((g) => ({ label: g, items: filtered.filter((m) => m.group === g) })).filter((g) => g.items.length);
  }, [filtered]);

  return (
    <div className="flex flex-col gap-5 px-5 pt-8">
      <header>
        <h1 className="font-display text-2xl font-bold">Memory</h1>
        <p className="mt-1 text-sm text-muted-foreground">Everything important, remembered.</p>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search anything Orbit remembers..."
          className="h-12 rounded-2xl border-border bg-elevated pl-10 text-sm placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((s) => (
          <button
            key={s}
            onClick={() => setTag((cur) => (cur === s ? null : s))}
            className={cn("pill", tag === s ? "border-primary bg-primary/15 text-primary" : "border-border bg-elevated text-muted-foreground")}
          >
            {s}
          </button>
        ))}
      </div>

      {groups.length === 0 && (
        <div className="orbit-card grid place-items-center p-10 text-center">
          <p className="font-display text-base font-semibold">Nothing matches.</p>
          <p className="mt-1 text-xs text-muted-foreground">Try a different search or tag.</p>
        </div>
      )}

      {groups.map((g) => (
        <section key={g.label}>
          <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {g.label}
          </h3>
          <div className="orbit-card overflow-hidden">
            {g.items.map((it, i) => {
              const Icon = iconMap[it.icon];
              return (
                <button
                  key={it.id}
                  onClick={() => navigate(`/app/memory/${it.id}`)}
                  className={cn("flex w-full items-center gap-3 p-4 text-left", i !== g.items.length - 1 && "border-b border-border/60")}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{it.title}</p>
                    <p className="text-xs text-muted-foreground">{it.source} · {it.time}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Memory;
