import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const FREE_LIMITS = {
  aiCapturesPerDay: 3,
  activeReminders: 3,
  memoryItems: 10,
  connectedAccounts: 1,
};

export type PremiumFeature =
  | "unlimited-capture"
  | "smart-ai-suggestions"
  | "deep-memory-search"
  | "custom-reminder"
  | "recurring-reminder"
  | "export"
  | "advanced-filters"
  | "email-sync"
  | "calendar-sync"
  | "extra-account"
  | "premium-theme"
  | "advanced-pulse"
  | "advanced-reminder-style"
  | "premium-badge"
  | "ai-memory-recall"
  | "priority-sorting"
  | "multi-step-workflow"
  | "completed-history"
  | "smart-categorization";

type Usage = {
  aiCapturesToday: number;
  activeReminders: number;
  memoryCount: number;
  connectedAccounts: number;
};

type Ctx = {
  isPremium: boolean;
  setPremium: (v: boolean) => void;
  usage: Usage;
  incrementCapture: () => void;
  requirePremium: (feature?: PremiumFeature, label?: string) => boolean;
  checkCaptureAllowed: () => boolean;
};

const PremiumCtx = createContext<Ctx | null>(null);

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [usage, setUsage] = useState<Usage>({
    aiCapturesToday: 0,
    activeReminders: 1,
    memoryCount: 8,
    connectedAccounts: 1,
  });
  const navigate = useNavigate();

  const requirePremium = useCallback(
    (_feature?: PremiumFeature, label?: string) => {
      if (isPremium) return true;
      toast(`${label ?? "Premium feature"} · Unlock with Orbit Pro`);
      navigate("/subscription");
      return false;
    },
    [isPremium, navigate]
  );

  const checkCaptureAllowed = useCallback(() => {
    if (isPremium) return true;
    if (usage.aiCapturesToday >= FREE_LIMITS.aiCapturesPerDay) {
      toast("Daily free capture limit reached");
      navigate("/subscription");
      return false;
    }
    return true;
  }, [isPremium, usage.aiCapturesToday, navigate]);

  const incrementCapture = useCallback(() => {
    setUsage((u) => ({ ...u, aiCapturesToday: u.aiCapturesToday + 1 }));
  }, []);

  const value = useMemo(
    () => ({
      isPremium,
      setPremium: setIsPremium,
      usage,
      incrementCapture,
      requirePremium,
      checkCaptureAllowed,
    }),
    [isPremium, usage, incrementCapture, requirePremium, checkCaptureAllowed]
  );

  return <PremiumCtx.Provider value={value}>{children}</PremiumCtx.Provider>;
};

export const usePremium = () => {
  const v = useContext(PremiumCtx);
  if (!v) throw new Error("usePremium must be used inside PremiumProvider");
  return v;
};
