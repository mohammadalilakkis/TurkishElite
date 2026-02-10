import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TouristTours } from "./components/TouristTours";
import { MedicalTourism } from "./components/MedicalTourism";
import { Destinations } from "./components/Destinations";
import { Testimonials } from "./components/Testimonials";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { AdminDashboard } from "./components/AdminDashboard";
import { authAPI } from "../services/api";

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:18',message:'Route check started',data:{path,isAuthenticated:authAPI.isAuthenticated(),isAdmin:authAPI.isAdmin(),user:authAPI.getCurrentUser()},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      if (path === '/admin') {
        // Check if user is admin
        const isAuthenticated = authAPI.isAuthenticated();
        const isAdmin = authAPI.isAdmin();
        const user = authAPI.getCurrentUser();
        // #region agent log
        fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:25',message:'Admin route auth check',data:{isAuthenticated,isAdmin,user},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        if (!isAuthenticated || !isAdmin) {
          // #region agent log
          fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:28',message:'Redirecting from admin - auth failed',data:{isAuthenticated,isAdmin},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
          window.location.href = '/';
          return;
        }
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
      }
      setIsChecking(false);
    };

    checkRoute();
    
    // Listen for route changes
    const handlePopState = () => checkRoute();
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" richColors />
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <Hero />
        <TouristTours />
        <MedicalTourism />
        <Destinations />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
