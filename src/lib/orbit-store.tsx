import { createContext, useContext, useReducer, ReactNode } from "react";
import { Receipt, Wifi, MessageSquare, FileText, Calendar, Target, AlertTriangle, Mic } from "lucide-react";

export type Priority = "high" | "medium" | "low";
export type Tag = "Money" | "Work" | "Admin" | "People" | "Goals" | "Health" | "Waiting";

export type FeedItem = {
  id: string;
  title: string;
  reason: string;
  tag: Tag;
  due: string;
  priority: Priority;
  section: "Needs Action" | "Needs Attention" | "Quietly Becoming a Problem" | "Can Wait";
  icon: keyof typeof iconMap;
  done?: boolean;
  amount?: string;
  description?: string;
};

export type MemoryItem = {
  id: string;
  title: string;
  source: string;
  time: string;
  group: "Today" | "Yesterday" | "Last week";
  icon: keyof typeof iconMap;
  tags: string[];
  detail?: string;
};

export const iconMap = {
  Wifi, MessageSquare, FileText, Calendar, Target, AlertTriangle, Receipt, Mic,
};

const initialFeed: FeedItem[] = [
  { id: "f1", icon: "Wifi", title: "Pay internet bill", reason: "Late fee starts tomorrow", tag: "Money", due: "Today", priority: "high", section: "Needs Action", amount: "$42.99", description: "Auto-detected from email receipt. Account ending 4421." },
  { id: "f2", icon: "MessageSquare", title: "Reply to client", reason: "Awaiting feedback since Mon", tag: "Work", due: "Today", priority: "high", section: "Needs Action", description: "Sarah from Acme is waiting on the proposal revisions." },
  { id: "f3", icon: "FileText", title: "Review document risk", reason: "Hidden clause detected", tag: "Admin", due: "1d", priority: "medium", section: "Needs Action", description: "Page 4 contains an auto-renewal clause Orbit flagged." },
  { id: "f4", icon: "Calendar", title: "Subscription renews soon", reason: "Netflix · $15.99 on May 5", tag: "Money", due: "2d", priority: "medium", section: "Needs Attention", amount: "$15.99" },
  { id: "f5", icon: "Target", title: "Goal has no progress in 8 days", reason: "Read 1 book per month", tag: "Goals", due: "—", priority: "medium", section: "Needs Attention" },
  { id: "f6", icon: "AlertTriangle", title: "4 admin tasks ignored this week", reason: "Pressure rising in Admin orbit", tag: "Admin", due: "—", priority: "medium", section: "Quietly Becoming a Problem" },
  { id: "f7", icon: "AlertTriangle", title: "Work follow-ups increasing", reason: "From 3 → 7 in 10 days", tag: "Work", due: "—", priority: "medium", section: "Quietly Becoming a Problem" },
  { id: "f8", icon: "Receipt", title: "Organize old receipts", reason: "12 untagged receipts", tag: "Money", due: "—", priority: "low", section: "Can Wait" },
];

const initialMemory: MemoryItem[] = [
  { id: "m1", icon: "Receipt", title: "Paid internet bill", source: "Bill scan", time: "9:24 AM", group: "Today", tags: ["electricity bill", "money"], detail: "Internet bill paid via auto-debit on May 1." },
  { id: "m2", icon: "MessageSquare", title: "Added client follow-up", source: "Email", time: "11:02 AM", group: "Today", tags: ["client payment", "work"] },
  { id: "m3", icon: "FileText", title: "Scanned invoice", source: "Document", time: "2:18 PM", group: "Today", tags: ["work"] },
  { id: "m4", icon: "Calendar", title: "Meeting with client", source: "Calendar", time: "—", group: "Yesterday", tags: ["work"] },
  { id: "m5", icon: "Mic", title: "Voice note → 3 tasks", source: "Voice", time: "—", group: "Yesterday", tags: ["voice"] },
  { id: "m6", icon: "Receipt", title: "Subscription renewal detected", source: "Email", time: "—", group: "Yesterday", tags: ["money"] },
  { id: "m7", icon: "FileText", title: "Contract uploaded", source: "Document", time: "—", group: "Last week", tags: ["contract clause"] },
  { id: "m8", icon: "Receipt", title: "Receipt saved · $129", source: "Scan", time: "—", group: "Last week", tags: ["money"] },
];

type Prefs = { pulseTime: string; reminderStyle: "Gentle" | "Standard" | "Insistent" };

type State = { feed: FeedItem[]; memory: MemoryItem[]; prefs: Prefs };

type Action =
  | { type: "ADD_FEED"; item: FeedItem }
  | { type: "MARK_DONE"; id: string }
  | { type: "DISCARD"; id: string }
  | { type: "ADD_MEMORY"; item: MemoryItem }
  | { type: "SET_PULSE_TIME"; time: string }
  | { type: "SET_REMINDER_STYLE"; style: Prefs["reminderStyle"] };

const reducer = (s: State, a: Action): State => {
  switch (a.type) {
    case "ADD_FEED":
      return { ...s, feed: [a.item, ...s.feed] };
    case "MARK_DONE": {
      const item = s.feed.find((f) => f.id === a.id);
      if (!item) return s;
      const mem: MemoryItem = {
        id: "mem-" + a.id,
        icon: item.icon,
        title: item.title,
        source: "Completed action",
        time: "Just now",
        group: "Today",
        tags: [item.tag.toLowerCase()],
      };
      return { ...s, feed: s.feed.filter((f) => f.id !== a.id), memory: [mem, ...s.memory] };
    }
    case "DISCARD":
      return { ...s, feed: s.feed.filter((f) => f.id !== a.id) };
    case "ADD_MEMORY":
      return { ...s, memory: [a.item, ...s.memory] };
    case "SET_PULSE_TIME":
      return { ...s, prefs: { ...s.prefs, pulseTime: a.time } };
    case "SET_REMINDER_STYLE":
      return { ...s, prefs: { ...s.prefs, reminderStyle: a.style } };
    default:
      return s;
  }
};

const Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export const OrbitStoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    feed: initialFeed,
    memory: initialMemory,
    prefs: { pulseTime: "8:00 AM", reminderStyle: "Gentle" },
  });
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
};

export const useOrbit = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOrbit must be used inside OrbitStoreProvider");
  return v;
};
