import { ModuleHeader } from "@/components/orbit/ModuleHeader";
import { ChevronRight, Stethoscope, Pill, FileText, Droplet, Moon, Heart } from "lucide-react";

const sections = [
  {
    title: "Appointments",
    Icon: Stethoscope,
    items: [{ title: "Dentist appointment", sub: "Sat · 11:00 AM", Icon: Stethoscope }],
  },
  {
    title: "Medicine reminders",
    Icon: Pill,
    items: [
      { title: "Vitamin D", sub: "Daily · 9:00 AM", Icon: Pill },
      { title: "Allergy med", sub: "Every night", Icon: Pill },
    ],
  },
  {
    title: "Lab reports",
    Icon: FileText,
    items: [{ title: "Blood test results", sub: "Saved 12 May", Icon: FileText }],
  },
  {
    title: "Daily routine",
    Icon: Heart,
    items: [
      { title: "Water reminder", sub: "6 of 8 glasses", Icon: Droplet },
      { title: "Sleep note", sub: "Slept 6h 12m", Icon: Moon },
    ],
  },
] as const;

const Health = () => {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <ModuleHeader title="Health" subtitle="Reminders, reports, and your routine." accent="success" />

      <section className="px-5">
        <div className="orbit-card grid grid-cols-3 p-4 text-center">
          {[
            { v: "Stable", l: "Status", c: "text-success" },
            { v: "1", l: "Appt this wk" },
            { v: "2", l: "Meds" },
          ].map((s) => (
            <div key={s.l}>
              <p className={`font-display text-base font-bold ${s.c ?? ""}`}>{s.v}</p>
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
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
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

export default Health;
