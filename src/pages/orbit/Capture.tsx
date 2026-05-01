import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Image as ImageIcon, ScanLine, Mic, ClipboardPaste, Plus, Mail,
  Sparkles, Check, X, Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddedToOrbitDialog } from "@/components/orbit/OrbitDialogs";
import {
  UploadScreenshotDialog, ScanDocumentDialog, RecordVoiceDialog,
  PasteTextDialog, ManualTaskDialog, ConnectEmailDialog,
} from "@/components/orbit/CaptureDialogs";
import { useOrbit, FeedItem } from "@/lib/orbit-store";
import { toast } from "sonner";

const steps = [
  "Reading input...",
  "Detecting meaning...",
  "Finding action...",
  "Setting priority...",
  "Added to Orbit.",
];

const Capture = () => {
  const { dispatch } = useOrbit();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"idle" | "processing" | "result">("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const [openTool, setOpenTool] = useState<null | "upload" | "scan" | "voice" | "paste" | "manual" | "email">(null);

  const startProcessing = () => {
    setPhase("processing");
    setStepIdx(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i >= steps.length) {
        clearInterval(id);
        setPhase("result");
      } else setStepIdx(i);
    }, 600);
  };

  const handleCaptured = () => startProcessing();

  const tools = [
    { Icon: ImageIcon, label: "Upload Screenshot", key: "upload" as const },
    { Icon: ScanLine, label: "Scan Document", key: "scan" as const },
    { Icon: Mic, label: "Record Voice", key: "voice" as const },
    { Icon: ClipboardPaste, label: "Paste Text", key: "paste" as const },
    { Icon: Plus, label: "Manual Task", key: "manual" as const },
    { Icon: Mail, label: "Connect Email", key: "email" as const },
  ];

  const addDetected = () => {
    const item: FeedItem = {
      id: "c" + Date.now(),
      icon: "Wifi",
      title: "Pay internet bill",
      reason: "Detected from capture · Due May 5",
      tag: "Money",
      due: "May 5",
      priority: "high",
      section: "Needs Action",
      amount: "$42.99",
    };
    dispatch({ type: "ADD_FEED", item });
    setPhase("idle");
    setAdded(true);
    setTimeout(() => navigate("/app/feed"), 700);
  };

  return (
    <div className="flex flex-col gap-6 px-5 pt-8">
      <header>
        <h1 className="font-display text-2xl font-bold">Universal Capture</h1>
        <p className="mt-1 text-sm text-muted-foreground">Drop anything. Orbit will understand it.</p>
      </header>

      <button
        onClick={() => setOpenTool("upload")}
        className="orbit-card relative grid h-56 w-full place-items-center overflow-hidden text-center"
      >
        <div className="absolute inset-0 bg-gradient-radial opacity-70" />
        <div className="absolute inset-0 animate-pulse-glow" />
        <div className="relative flex flex-col items-center gap-3 px-6">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary glow-primary">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="font-display text-base font-semibold">Drop, paste, speak, or scan anything</p>
          <p className="text-xs text-muted-foreground">Orbit detects type and action automatically</p>
        </div>
      </button>

      <div className="grid grid-cols-3 gap-3">
        {tools.map((t) => (
          <button
            key={t.label}
            onClick={() => setOpenTool(t.key)}
            className="orbit-card flex aspect-square flex-col items-center justify-center gap-2 p-3 text-center transition-transform active:scale-95"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <t.Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-medium leading-tight text-muted-foreground">{t.label}</span>
          </button>
        ))}
      </div>

      {phase === "processing" && (
        <div className="orbit-card animate-fade-in p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Processing</span>
          </div>
          <ul className="flex flex-col gap-2">
            {steps.map((s, i) => (
              <li key={s} className={cn("flex items-center gap-3 text-sm transition-opacity", i > stepIdx && "opacity-30")}>
                <span className={cn(
                  "grid h-6 w-6 place-items-center rounded-full border",
                  i < stepIdx && "border-success bg-success/10 text-success",
                  i === stepIdx && "border-primary bg-primary/10 text-primary",
                  i > stepIdx && "border-border text-muted-foreground"
                )}>
                  {i < stepIdx ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                </span>
                <span className={cn(i === stepIdx && "text-foreground")}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {phase === "result" && (
        <div className="orbit-card animate-scale-in p-5">
          <div className="flex items-center gap-2">
            <span className="pill border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3" /> Orbit understood this
            </span>
          </div>
          <h3 className="mt-3 font-display text-lg font-semibold">Detected: Bill</h3>
          <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-muted-foreground">Amount</dt><dd className="text-right font-medium">$42.99</dd>
            <dt className="text-muted-foreground">Due Date</dt><dd className="text-right font-medium">May 5</dd>
            <dt className="text-muted-foreground">Priority</dt><dd className="text-right font-medium text-destructive">High</dd>
            <dt className="text-muted-foreground">Action</dt><dd className="text-right font-medium">Set payment reminder</dd>
          </dl>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Button onClick={addDetected} className="h-11 rounded-xl bg-gradient-primary text-primary-foreground">
              <Check className="mr-1 h-4 w-4" /> Add
            </Button>
            <Button onClick={() => { toast("Edit coming soon"); }} variant="outline" className="h-11 rounded-xl border-border bg-card">
              <Pencil className="mr-1 h-4 w-4" /> Edit
            </Button>
            <Button onClick={() => { setPhase("idle"); toast("Discarded"); }} variant="outline" className="h-11 rounded-xl border-border bg-card text-muted-foreground">
              <X className="mr-1 h-4 w-4" /> Discard
            </Button>
          </div>
        </div>
      )}

      <UploadScreenshotDialog open={openTool === "upload"} onOpenChange={(v) => !v && setOpenTool(null)} onCaptured={handleCaptured} />
      <ScanDocumentDialog open={openTool === "scan"} onOpenChange={(v) => !v && setOpenTool(null)} onCaptured={handleCaptured} />
      <RecordVoiceDialog open={openTool === "voice"} onOpenChange={(v) => !v && setOpenTool(null)} onCaptured={handleCaptured} />
      <PasteTextDialog open={openTool === "paste"} onOpenChange={(v) => !v && setOpenTool(null)} onCaptured={handleCaptured} />
      <ManualTaskDialog open={openTool === "manual"} onOpenChange={(v) => !v && setOpenTool(null)} />
      <ConnectEmailDialog open={openTool === "email"} onOpenChange={(v) => !v && setOpenTool(null)} />
      <AddedToOrbitDialog open={added} onOpenChange={setAdded} />
    </div>
  );
};

export default Capture;
