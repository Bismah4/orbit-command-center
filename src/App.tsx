import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Splash from "./pages/orbit/Splash";
import Onboarding from "./pages/orbit/Onboarding";
import Login from "./pages/orbit/Login";
import { AppShell } from "./components/orbit/AppShell";
import Dashboard from "./pages/orbit/Dashboard";
import Capture from "./pages/orbit/Capture";
import Feed from "./pages/orbit/Feed";
import Memory from "./pages/orbit/Memory";
import Profile from "./pages/orbit/Profile";
import Goals from "./pages/orbit/Goals";
import Money from "./pages/orbit/Money";
import Work from "./pages/orbit/Work";
import Admin from "./pages/orbit/Admin";
import People from "./pages/orbit/People";
import Health from "./pages/orbit/Health";
import Notifications from "./pages/orbit/Notifications";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="capture" element={<Capture />} />
            <Route path="feed" element={<Feed />} />
            <Route path="memory" element={<Memory />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="goals" element={<Goals />} />
            <Route path="money" element={<Money />} />
            <Route path="work" element={<Work />} />
            <Route path="admin" element={<Admin />} />
            <Route path="people" element={<People />} />
            <Route path="health" element={<Health />} />
          </Route>
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
