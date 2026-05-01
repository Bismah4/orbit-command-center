import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrbitLogo } from "@/components/orbit/OrbitLogo";
import { ArrowLeft, MailCheck } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-background px-6">
      <button onClick={() => navigate(-1)} className="mt-6 grid h-10 w-10 place-items-center rounded-full border border-border bg-elevated">
        <ArrowLeft className="h-4 w-4" />
      </button>
      <div className="mt-8 flex flex-col items-center">
        <OrbitLogo size={64} />
        <h1 className="mt-5 font-display text-3xl font-bold">Reset password</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">We'll send a reset link to your email.</p>
      </div>

      {!sent ? (
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Reset link sent"); }}
          className="mt-8 flex w-full flex-col gap-3"
        >
          <div>
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 h-12 rounded-2xl border-border bg-elevated" />
          </div>
          <Button type="submit" className="mt-2 h-14 rounded-2xl bg-gradient-primary text-base font-semibold text-primary-foreground glow-primary">
            Send reset link
          </Button>
        </form>
      ) : (
        <div className="orbit-card mt-8 flex flex-col items-center gap-3 p-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-success/15 text-success">
            <MailCheck className="h-7 w-7" />
          </span>
          <p className="font-display text-lg font-semibold">Check your inbox</p>
          <p className="text-sm text-muted-foreground">We sent a reset link to {email}.</p>
          <Button onClick={() => navigate("/login")} className="mt-2 h-12 w-full rounded-2xl bg-gradient-primary text-primary-foreground">
            Back to sign in
          </Button>
        </div>
      )}

      <p className="mt-auto pb-10 pt-8 text-center text-xs text-muted-foreground">
        Remember it? <Link to="/login" className="text-foreground">Sign in</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
