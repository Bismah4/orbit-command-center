import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrbitLogo } from "@/components/orbit/OrbitLogo";

const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate("/onboarding"), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="relative flex flex-col items-center gap-6 animate-fade-in">
        <OrbitLogo size={160} />
        <div className="text-center">
          <h1 className="font-display text-5xl font-bold tracking-tight text-gradient">Orbit</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your Life. One Command Center.</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
