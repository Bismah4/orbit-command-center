import { ModuleHeader } from "@/components/orbit/ModuleHeader";
import { AlertTriangle, ChevronRight, FileCheck, Receipt, Calendar, IdCard, Shield, RefreshCw, FileText } from "lucide-react";

const groups = [
  { Icon: Receipt, label: "Bills", count: 3 },
  { Icon: FileText, label: "Documents", count: 12 },
  { Icon: RefreshCw, label: "Renewals", count: 2 },
  { Icon: FileCheck, label: "Forms", count: 1 },
  { Icon: Calendar, label: "Appointments", count: 2 },
  { Icon: IdCard, label: "IDs", count: 4 },
  { Icon: Shield, label: "Insurance", count: 1 },
  { Icon: RefreshCw, label: "Subscriptions", count: 7 },
];

const delayed = [
  { title: "Renew driving license", sub: "Delayed 8 days" },
  { title: "Submit tax form", sub: "Delayed 6 days" },
  { title: "Upload utility bill proof", sub: "Delayed 5 days" },
  { title: "Update insurance nominee", sub: "Delayed 5 days" },
];

const Admin = () => {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <ModuleHeader title="Admin" subtitle="Bills, documents, renewals — life paperwork in one place." accent="cyan" />

      {/* Insight */}
      <section className="px-5">
        <div className="orbit-card border border-warning/30 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-xs uppercase tracking-wider text-warning">Admin insight</span>
          </div>
          <p className="mt-2 text-sm">
            You have <span className="font-semibold">4 admin tasks</span> that have been delayed for over 5 days.
          </p>
        </div>
      </section>

      {/* Categories grid */}
      <section className="px-5">
        <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Categories</h3>
        <div className="grid grid-cols-4 gap-2">
          {groups.map((g) => (
            <button key={g.label} className="orbit-card flex aspect-square flex-col items-center justify-center gap-1 p-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan/15 text-cyan">
                <g.Icon className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-medium leading-tight">{g.label}</span>
              <span className="text-[10px] text-muted-foreground">{g.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Delayed */}
      <section className="px-5">
        <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Delayed admin</h3>
        <div className="orbit-card overflow-hidden">
          {delayed.map((d, i) => (
            <div key={d.title} className={`flex items-center justify-between p-4 ${i !== delayed.length - 1 ? "border-b border-border/60" : ""}`}>
              <div>
                <p className="text-sm font-semibold">{d.title}</p>
                <p className="text-xs text-warning">{d.sub}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;
