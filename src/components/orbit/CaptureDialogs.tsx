import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, ScanLine, Mic, FileText, Image as ImageIcon, Mail, Plus, Square, Bell } from "lucide-react";
import { toast } from "sonner";
import { useOrbit, FeedItem, MemoryItem } from "@/lib/orbit-store";

type BaseProps = { open: boolean; onOpenChange: (v: boolean) => void; onCaptured?: (preview: string) => void };

const Shell = ({ children }: { children: React.ReactNode }) => (
  <DialogContent className="rounded-3xl border-border bg-elevated max-w-md">{children}</DialogContent>
);

export const UploadScreenshotDialog = ({ open, onOpenChange, onCaptured }: BaseProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const handleFile = (f: File) => {
    setFile(f);
    setUrl(URL.createObjectURL(f));
  };
  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setFile(null); setUrl(""); } }}>
      <Shell>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Upload Screenshot</DialogTitle>
          <DialogDescription>Drop a screenshot. Orbit will extract what matters.</DialogDescription>
        </DialogHeader>
        <label className="orbit-card mt-2 grid h-44 cursor-pointer place-items-center overflow-hidden">
          {url ? (
            <img src={url} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="h-8 w-8" />
              <span className="text-sm">Tap to choose image</span>
            </div>
          )}
          <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </label>
        <DialogFooter className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!file} className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => { onOpenChange(false); onCaptured?.(file?.name ?? "Screenshot"); }}>
            Process
          </Button>
        </DialogFooter>
      </Shell>
    </Dialog>
  );
};

export const ScanDocumentDialog = ({ open, onOpenChange, onCaptured }: BaseProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <Shell>
      <DialogHeader>
        <DialogTitle className="font-display text-xl">Scan Document</DialogTitle>
        <DialogDescription>Position the document inside the frame.</DialogDescription>
      </DialogHeader>
      <div className="relative mt-2 grid h-56 place-items-center overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-background">
        <div className="absolute inset-4 rounded-xl border-2 border-primary/60" />
        <div className="absolute inset-x-4 top-1/2 h-px animate-pulse bg-primary" />
        <ScanLine className="h-10 w-10 text-primary/60" />
      </div>
      <DialogFooter className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => { onOpenChange(false); onCaptured?.("Scanned document"); }}>
          Capture
        </Button>
      </DialogFooter>
    </Shell>
  </Dialog>
);

export const RecordVoiceDialog = ({ open, onOpenChange, onCaptured }: BaseProps) => {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const ref = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!open) { setRecording(false); setSeconds(0); if (ref.current) clearInterval(ref.current); }
  }, [open]);
  const toggle = () => {
    if (recording) {
      if (ref.current) clearInterval(ref.current);
      setRecording(false);
    } else {
      setRecording(true);
      setSeconds(0);
      ref.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  };
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Shell>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Record Voice Note</DialogTitle>
          <DialogDescription>Speak naturally. Orbit will turn it into actions.</DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col items-center gap-4 py-4">
          <button onClick={toggle} className={`grid h-24 w-24 place-items-center rounded-full ${recording ? "bg-destructive glow-primary animate-pulse" : "bg-gradient-primary glow-primary"}`}>
            {recording ? <Square className="h-8 w-8 text-primary-foreground" /> : <Mic className="h-10 w-10 text-primary-foreground" />}
          </button>
          <div className="font-display text-2xl tabular-nums">{mm}:{ss}</div>
          <div className="flex h-8 items-end gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className={`w-1 rounded-full bg-primary/60 ${recording ? "animate-pulse" : ""}`} style={{ height: `${10 + ((i * 7) % 22)}px`, animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
        </div>
        <DialogFooter className="mt-2 grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={seconds === 0} className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => { onOpenChange(false); onCaptured?.(`Voice note (${mm}:${ss})`); }}>
            Process
          </Button>
        </DialogFooter>
      </Shell>
    </Dialog>
  );
};

export const PasteTextDialog = ({ open, onOpenChange, onCaptured }: BaseProps) => {
  const [text, setText] = useState("");
  useEffect(() => { if (!open) setText(""); }, [open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Shell>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Paste Text</DialogTitle>
          <DialogDescription>Paste anything — an email, message, note, link.</DialogDescription>
        </DialogHeader>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste here..." className="mt-2 min-h-32 rounded-2xl border-border bg-background" />
        <DialogFooter className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!text.trim()} className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => { onOpenChange(false); onCaptured?.(text); }}>
            Process
          </Button>
        </DialogFooter>
      </Shell>
    </Dialog>
  );
};

export const ManualTaskDialog = ({ open, onOpenChange }: BaseProps) => {
  const { dispatch } = useOrbit();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState<FeedItem["tag"]>("Work");
  const [priority, setPriority] = useState<FeedItem["priority"]>("medium");
  const [due, setDue] = useState("Today");
  useEffect(() => { if (!open) { setTitle(""); setTag("Work"); setPriority("medium"); setDue("Today"); } }, [open]);
  const submit = () => {
    if (!title.trim()) return;
    const item: FeedItem = {
      id: "u" + Date.now(), icon: "FileText", title, reason: "Added manually", tag, due, priority, section: "Needs Action",
    };
    dispatch({ type: "ADD_FEED", item });
    onOpenChange(false);
    toast.success("Added to Orbit");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Shell>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">New Task</DialogTitle>
          <DialogDescription>Add a task manually to your Orbit.</DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-3">
          <div>
            <Label className="text-xs text-muted-foreground">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs doing?" className="mt-1 h-11 rounded-xl border-border bg-background" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Category</Label>
              <Select value={tag} onValueChange={(v) => setTag(v as FeedItem["tag"])}>
                <SelectTrigger className="mt-1 h-11 rounded-xl border-border bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Money", "Work", "Admin", "People", "Goals", "Health"].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as FeedItem["priority"])}>
                <SelectTrigger className="mt-1 h-11 rounded-xl border-border bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Due</Label>
            <Select value={due} onValueChange={setDue}>
              <SelectTrigger className="mt-1 h-11 rounded-xl border-border bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Today", "Tomorrow", "This week", "Next week", "—"].map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={submit}>
            <Plus className="mr-1 h-4 w-4" /> Add Task
          </Button>
        </DialogFooter>
      </Shell>
    </Dialog>
  );
};

export const ConnectEmailDialog = ({ open, onOpenChange }: BaseProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <Shell>
      <DialogHeader>
        <DialogTitle className="font-display text-xl">Connect Email</DialogTitle>
        <DialogDescription>Orbit will detect bills, receipts, and follow-ups automatically.</DialogDescription>
      </DialogHeader>
      <div className="mt-2 flex flex-col gap-2">
        {["Gmail", "Outlook", "iCloud Mail"].map((p) => (
          <button key={p} onClick={() => { onOpenChange(false); toast.success(`${p} connected`); }} className="orbit-card flex items-center gap-3 p-4 text-left transition-colors hover:bg-card/80">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{p}</p>
              <p className="text-xs text-muted-foreground">Read-only access</p>
            </div>
          </button>
        ))}
      </div>
    </Shell>
  </Dialog>
);

export const AddReminderDialog = ({ open, onOpenChange, itemTitle }: BaseProps & { itemTitle?: string }) => {
  const [when, setWhen] = useState("In 1 hour");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Shell>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Set Reminder</DialogTitle>
          <DialogDescription>{itemTitle ? `Remind me about "${itemTitle}"` : "When should Orbit nudge you?"}</DialogDescription>
        </DialogHeader>
        <RadioGroup value={when} onValueChange={setWhen} className="mt-2 flex flex-col gap-2">
          {["In 1 hour", "In 3 hours", "Tonight at 8 PM", "Tomorrow morning", "In 2 days"].map((opt) => (
            <label key={opt} className="orbit-card flex cursor-pointer items-center gap-3 p-3">
              <RadioGroupItem value={opt} id={opt} />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </RadioGroup>
        <DialogFooter className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => { onOpenChange(false); toast.success(`Reminder set: ${when}`); }}>
            <Bell className="mr-1 h-4 w-4" /> Set
          </Button>
        </DialogFooter>
      </Shell>
    </Dialog>
  );
};

export const TimePickerDialog = ({ open, onOpenChange }: BaseProps) => {
  const { state, dispatch } = useOrbit();
  const [t, setT] = useState(state.prefs.pulseTime);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Shell>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Daily Pulse Time</DialogTitle>
          <DialogDescription>When should Orbit deliver your morning pulse?</DialogDescription>
        </DialogHeader>
        <RadioGroup value={t} onValueChange={setT} className="mt-2 grid grid-cols-2 gap-2">
          {["6:30 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "12:00 PM"].map((opt) => (
            <label key={opt} className="orbit-card flex cursor-pointer items-center gap-2 p-3">
              <RadioGroupItem value={opt} id={opt} />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </RadioGroup>
        <DialogFooter className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => { dispatch({ type: "SET_PULSE_TIME", time: t }); onOpenChange(false); toast.success("Pulse time updated"); }}>
            Save
          </Button>
        </DialogFooter>
      </Shell>
    </Dialog>
  );
};

export const ReminderStyleDialog = ({ open, onOpenChange }: BaseProps) => {
  const { state, dispatch } = useOrbit();
  const [s, setS] = useState(state.prefs.reminderStyle);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Shell>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Reminder Style</DialogTitle>
          <DialogDescription>How should Orbit nudge you?</DialogDescription>
        </DialogHeader>
        <RadioGroup value={s} onValueChange={(v) => setS(v as typeof s)} className="mt-2 flex flex-col gap-2">
          {[
            { v: "Gentle", d: "One soft reminder, no repeats." },
            { v: "Standard", d: "A reminder, then one follow-up." },
            { v: "Insistent", d: "Repeats until you act on it." },
          ].map((o) => (
            <label key={o.v} className="orbit-card flex cursor-pointer items-start gap-3 p-3">
              <RadioGroupItem value={o.v} id={o.v} className="mt-1" />
              <div>
                <p className="text-sm font-semibold">{o.v}</p>
                <p className="text-xs text-muted-foreground">{o.d}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
        <DialogFooter className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border bg-card" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="h-11 rounded-xl bg-gradient-primary text-primary-foreground" onClick={() => { dispatch({ type: "SET_REMINDER_STYLE", style: s as any }); onOpenChange(false); toast.success("Reminder style updated"); }}>
            Save
          </Button>
        </DialogFooter>
      </Shell>
    </Dialog>
  );
};

export const SignOutConfirmDialog = ({ open, onOpenChange }: BaseProps) => {
  const navigate = useNavigate();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl border-border bg-elevated">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">Sign out of Orbit?</AlertDialogTitle>
          <AlertDialogDescription>You'll need to sign back in to continue.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-11 rounded-xl border-border bg-card">Cancel</AlertDialogCancel>
          <AlertDialogAction className="h-11 rounded-xl bg-destructive text-destructive-foreground" onClick={() => { onOpenChange(false); navigate("/login"); }}>
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DiscardConfirmDialog = ({ open, onOpenChange, onConfirm }: BaseProps & { onConfirm?: () => void }) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent className="rounded-3xl border-border bg-elevated">
      <AlertDialogHeader>
        <AlertDialogTitle className="font-display">Discard this item?</AlertDialogTitle>
        <AlertDialogDescription>It will be removed from your Orbit. This can't be undone.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="h-11 rounded-xl border-border bg-card">Keep</AlertDialogCancel>
        <AlertDialogAction className="h-11 rounded-xl bg-destructive text-destructive-foreground" onClick={() => { onOpenChange(false); onConfirm?.(); }}>
          Discard
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
