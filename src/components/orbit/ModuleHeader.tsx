import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  accent?: "primary" | "destructive" | "warning" | "success" | "cyan";
}

const accentMap: Record<NonNullable<Props["accent"]>, string> = {
  primary: "from-primary/30",
  destructive: "from-destructive/30",
  warning: "from-warning/30",
  success: "from-success/30",
  cyan: "from-cyan/30",
};

export const ModuleHeader = ({ title, subtitle, accent = "primary" }: Props) => {
  const navigate = useNavigate();
  return (
    <header className="relative overflow-hidden px-5 pb-2 pt-6">
      <div className={cn("absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl opacity-60", accentMap[accent])} />
      <div className="relative flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-elevated"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-border bg-elevated">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <div className="relative mt-5">
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </header>
  );
};
