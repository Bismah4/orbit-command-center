import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export const AppShell = () => {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-background">
      <main className="flex-1 pb-28">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
