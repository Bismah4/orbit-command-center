import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OrbitStoreProvider } from "@/lib/orbit-store";
import { PremiumProvider } from "@/lib/premium";
import Splash from "./pages/orbit/Splash";
import Onboarding from "./pages/orbit/Onboarding";
import Login from "./pages/orbit/Login";
import Signup from "./pages/orbit/Signup";
import ForgotPassword from "./pages/orbit/ForgotPassword";
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
import Subscription from "./pages/orbit/Subscription";
import EmptyStates from "./pages/orbit/EmptyStates";
import {
  DailyPulseDetail, FeedDetail, MemoryDetail, TaskDetail,
  PersonalInfoPage, ConnectedAccountsPage, SecurityPage,
  SupportPage, PrivacyPage, TermsPage,
} from "./pages/orbit/DetailScreens";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-background" />;
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OrbitStoreProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PremiumProvider>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/app" element={<AppShell />}>
              <Route index element={<Dashboard />} />
              <Route path="capture" element={<Capture />} />
              <Route path="feed" element={<Feed />} />
              <Route path="feed/:id" element={<FeedDetail />} />
              <Route path="memory" element={<Memory />} />
              <Route path="memory/:id" element={<MemoryDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/personal" element={<PersonalInfoPage />} />
              <Route path="profile/connected" element={<ConnectedAccountsPage />} />
              <Route path="profile/security" element={<SecurityPage />} />
              <Route path="profile/support" element={<SupportPage />} />
              <Route path="profile/privacy" element={<PrivacyPage />} />
              <Route path="profile/terms" element={<TermsPage />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="daily-pulse" element={<DailyPulseDetail />} />
              <Route path="task/:id" element={<TaskDetail />} />
              <Route path="goals" element={<Goals />} />
              <Route path="money" element={<Money />} />
              <Route path="work" element={<Work />} />
              <Route path="admin" element={<Admin />} />
              <Route path="people" element={<People />} />
              <Route path="health" element={<Health />} />
              <Route path="empty" element={<EmptyStates />} />
            </Route>
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/index" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </PremiumProvider>
        </BrowserRouter>
      </OrbitStoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
