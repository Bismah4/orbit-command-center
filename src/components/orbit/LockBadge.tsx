import { Lock, Crown } from "lucide-react";
import { usePremium, PremiumFeature } from "@/lib/premium";

export const LockPill = () => (
  <span className="pill border-primary/30 bg-primary/10 text-primary">
    <Lock className="h-3 w-3" /> Pro
  </span>
);

export const PremiumBadge = ({ className = "" }: { className?: string }) => {
  const { isPremium, requirePremium } = usePremium();
  return (
    <button
      onClick={() => !isPremium && requirePremium("premium-badge", "Orbit Premium")}
      className={`pill border-primary/30 bg-primary/10 text-primary ${className}`}
    >
      <Crown className="h-3 w-3" /> {isPremium ? "Orbit Premium" : "Upgrade"}
    </button>
  );
};

export const useLockedAction = (
  feature: PremiumFeature,
  label: string,
  fn: () => void
) => {
  const { requirePremium } = usePremium();
  return () => {
    if (requirePremium(feature, label)) fn();
  };
};
