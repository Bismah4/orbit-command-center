import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  animated?: boolean;
  className?: string;
}

export const OrbitLogo = ({ size = 120, animated = true, className }: Props) => {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Outer glow halo */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-glow",
          animated && "animate-pulse-glow"
        )}
      />
      {/* Outer ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border border-primary/40",
          animated && "animate-spin-slow"
        )}
        style={{ borderTopColor: "hsl(var(--cyan))" }}
      />
      {/* Mid ring */}
      <div
        className={cn(
          "absolute rounded-full border border-cyan/30",
          animated && "animate-spin-reverse"
        )}
        style={{ inset: size * 0.12, borderRightColor: "hsl(var(--primary))" }}
      />
      {/* Inner core */}
      <div
        className="relative rounded-full bg-gradient-primary shadow-[0_0_30px_hsl(var(--primary)/0.7)]"
        style={{ width: size * 0.32, height: size * 0.32 }}
      />
      {/* Tiny orbiting dot */}
      {animated && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          style={{ width: size, height: size }}
        >
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 block h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_hsl(var(--cyan))]"
          />
        </div>
      )}
    </div>
  );
};
