import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrbitLogo } from "@/components/orbit/OrbitLogo";
import { Apple, Mail } from "lucide-react";

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1S8.7 6 12 6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"/></svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center bg-background px-6">
      <div className="mt-12 flex flex-col items-center">
        <OrbitLogo size={64} />
        <h1 className="mt-5 font-display text-3xl font-bold">Create your Orbit</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Start managing life from one calm place.</p>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); navigate("/app"); }}
        className="mt-8 flex w-full flex-col gap-3"
      >
        <div>
          <Label className="text-xs text-muted-foreground">Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Bismah Ahmed" className="mt-1 h-12 rounded-2xl border-border bg-elevated" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 h-12 rounded-2xl border-border bg-elevated" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Password</Label>
          <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" className="mt-1 h-12 rounded-2xl border-border bg-elevated" />
        </div>
        <Button type="submit" className="mt-2 h-14 rounded-2xl bg-gradient-primary text-base font-semibold text-primary-foreground glow-primary">
          Create account
        </Button>
      </form>

      <div className="my-5 flex w-full items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
      </div>
      <div className="flex w-full flex-col gap-3">
        <Button onClick={() => navigate("/app")} variant="outline" className="h-14 rounded-2xl border-border bg-elevated text-base">
          <Apple className="mr-2 h-5 w-5" /> Continue with Apple
        </Button>
        <Button onClick={() => navigate("/app")} variant="outline" className="h-14 rounded-2xl border-border bg-elevated text-base">
          <span className="mr-2"><GoogleIcon /></span> Continue with Google
        </Button>
      </div>

      <p className="mt-auto pb-10 pt-8 text-center text-xs text-muted-foreground">
        Already have an account? <Link to="/login" className="text-foreground">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;
