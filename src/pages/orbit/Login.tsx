import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OrbitLogo } from "@/components/orbit/OrbitLogo";
import { Apple, Mail } from "lucide-react";

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1S8.7 6 12 6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"/></svg>
);

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center bg-background px-6">
      <div className="mt-16 flex flex-col items-center">
        <OrbitLogo size={84} />
        <h1 className="mt-6 font-display text-3xl font-bold">Welcome to Orbit</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in to control your life from one place.
        </p>
      </div>

      <div className="mt-12 flex w-full flex-col gap-3">
        <Button onClick={() => navigate("/app")} variant="outline" className="h-14 rounded-2xl border-border bg-elevated text-base">
          <Apple className="mr-2 h-5 w-5" /> Continue with Apple
        </Button>
        <Button onClick={() => navigate("/app")} variant="outline" className="h-14 rounded-2xl border-border bg-elevated text-base">
          <span className="mr-2"><GoogleIcon /></span> Continue with Google
        </Button>
        <Button onClick={() => navigate("/app")} className="h-14 rounded-2xl bg-gradient-primary text-base font-semibold text-primary-foreground glow-primary">
          <Mail className="mr-2 h-5 w-5" /> Continue with Email
        </Button>
      </div>

      <div className="mt-6 flex w-full items-center justify-between text-xs">
        <Link to="/forgot-password" className="text-muted-foreground hover:text-foreground">Forgot password?</Link>
        <Link to="/signup" className="text-foreground">Create account</Link>
      </div>

      <p className="mt-auto pb-10 pt-12 text-center text-xs text-muted-foreground">
        By continuing, you agree to our <span className="text-foreground">Terms</span> & <span className="text-foreground">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default Login;
