
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Studio from "./pages/Studio";
import Collaborations from "./pages/Collaborations";
import Earnings from "./pages/Earnings";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/collaborations" element={<Collaborations />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/earnings" element={<Earnings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
