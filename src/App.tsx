import React, { useState } from "react";
import { Scissors, User, Shield, Briefcase, Sparkles, LogOut, ExternalLink, X, PlusCircle, Bell, ArrowRight } from "lucide-react";

// Import custom luxury seed data
import {
  INITIAL_BARBERSHOPS,
  INITIAL_BOOKINGS,
  INITIAL_VERIFICATIONS,
  Barbershop,
  Booking,
  PartnerVerificationRequest,
  Service,
  Capster
} from "./data";

// Import modular pages
import HomeSection from "./components/HomeSection";
import Footer from "./components/Footer";
import AuthSection from "./components/AuthSection";
import DirectorySection from "./components/DirectorySection";
import DashboardCustomer from "./components/DashboardCustomer";
import DashboardPartner from "./components/DashboardPartner";
import DashboardAdmin from "./components/DashboardAdmin";
import NotificationToast, { ToastMessage } from "./components/NotificationToast";

export default function App() {
  // Navigation & Role State
  const [userRole, setUserRole] = useState<"visitor" | "customer" | "partner" | "admin">(() => {
    return (localStorage.getItem("barberhub_userRole") as any) || "visitor";
  });
  const [currentView, setCurrentView] = useState<string>(() => {
    return localStorage.getItem("barberhub_currentView") || "home";
  });
  
  // Simulated Client Databases through LocalStorage
  const [barbershops, setBarbershops] = useState<Barbershop[]>(() => {
    const saved = localStorage.getItem("barberhub_barbershops");
    return saved ? JSON.parse(saved) : INITIAL_BARBERSHOPS;
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("barberhub_bookings");
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });
  const [requests, setRequests] = useState<PartnerVerificationRequest[]>(() => {
    const saved = localStorage.getItem("barberhub_requests");
    return saved ? JSON.parse(saved) : INITIAL_VERIFICATIONS;
  });
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);

  // Authenticated state
  const [customerName, setCustomerName] = useState<string>(() => {
    return localStorage.getItem("barberhub_customerName") || "Aldo Wijaya";
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronizers to localStorage
  React.useEffect(() => {
    localStorage.setItem("barberhub_userRole", userRole);
  }, [userRole]);

  React.useEffect(() => {
    localStorage.setItem("barberhub_currentView", currentView);
  }, [currentView]);

  React.useEffect(() => {
    localStorage.setItem("barberhub_barbershops", JSON.stringify(barbershops));
  }, [barbershops]);

  React.useEffect(() => {
    localStorage.setItem("barberhub_bookings", JSON.stringify(bookings));
  }, [bookings]);

  React.useEffect(() => {
    localStorage.setItem("barberhub_requests", JSON.stringify(requests));
  }, [requests]);

  React.useEffect(() => {
    localStorage.setItem("barberhub_customerName", customerName);
  }, [customerName]);

  // Handle manual database reset
  const handleResetDatabase = () => {
    localStorage.removeItem("barberhub_barbershops");
    localStorage.removeItem("barberhub_bookings");
    localStorage.removeItem("barberhub_requests");
    localStorage.removeItem("barberhub_userRole");
    localStorage.removeItem("barberhub_currentView");
    localStorage.removeItem("barberhub_customerName");
    
    setBarbershops(INITIAL_BARBERSHOPS);
    setBookings(INITIAL_BOOKINGS);
    setRequests(INITIAL_VERIFICATIONS);
    setUserRole("visitor");
    setCurrentView("home");
    setCustomerName("Aldo Wijaya");
    
    addToast("Database sandbox has been successfully reset to initial seed data!", "info");
  };

  // Add toast helper
  const addToast = (text: string, type: "success" | "error" | "info" = "success") => {
    const id = "toast-" + Math.random().toString(36).substr(2, 9);
    setToasts((t) => [...t, { id, text, type }]);
    
    // Auto-remove toast in 4 seconds
    setTimeout(() => {
      setToasts((t) => t.filter((item) => item.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((t) => t.filter((item) => item.id !== id));
  };

  // HANDLERS FOR CUSTOMER ACTION
  const handleBookingCreated = (bookingDetails: Partial<Booking>) => {
    const nextQueueNum = `A-0${bookings.length + 12}`;
    const nextEstTime = `${Math.floor(Math.random() * 25) + 15} mins`;
    const nextInv = `INV-20260621-${Math.floor(Math.random() * 80) + 10}`;

    const newBooking: Booking = {
      id: `BK-${Math.floor(Math.random() * 8000) + 1000}`,
      barbershopId: bookingDetails.barbershopId || "b1",
      barbershopName: bookingDetails.barbershopName || "Gilded Razor Guild",
      service: bookingDetails.service || barbershops[0].services[0],
      capster: bookingDetails.capster || barbershops[0].capsters[0],
      date: bookingDetails.date || "2026-06-22",
      time: bookingDetails.time || "10:30",
      status: "Waiting",
      customerName: bookingDetails.customerName || customerName,
      customerPhone: bookingDetails.customerPhone || "+62 812-3456-7890",
      customerEmail: bookingDetails.customerEmail || "aldo908wijaya@gmail.com",
      queueNumber: nextQueueNum,
      estimatedTime: nextEstTime,
      invoiceNumber: nextInv,
      type: "Online"
    };

    setBookings((prev) => [newBooking, ...prev]);
    addToast(`Successfully booked slot at ${newBooking.barbershopName}! Queue: ${nextQueueNum}`, "success");
    
    // Auto log in as customer and redirect to live customer queue overview
    setUserRole("customer");
    setCurrentView("customer-dashboard");
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    addToast("Booking slot has been canceled and slot recycled.", "info");
  };

  // HANDLERS FOR PARTNER OPTIONS
  const handleCallQueue = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Processing", estimatedTime: "In styling session" } : b))
    );
    const item = bookings.find((b) => b.id === bookingId);
    addToast(`Called Queue ${item?.queueNumber || ""} successfully!`, "success");
  };

  const handleCompleteQueue = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Completed", estimatedTime: "Completed" } : b))
    );
    addToast("Treatment marked complete! Invoice generated.", "success");
  };

  const handleRejectQueue = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Rejected" } : b))
    );
    addToast("Appointment declined/postponed.", "error");
  };

  const handleAddCapster = (capster: Capster) => {
    setBarbershops((prev) =>
      prev.map((shop) => ({
        ...shop,
        capsters: [capster, ...shop.capsters]
      }))
    );
    addToast(`Roster capster "${capster.name}" added successfully!`, "success");
  };

  const handleUpdateCapsterStatus = (id: string, status: "Active" | "On Break" | "Fully Booked") => {
    setBarbershops((prev) =>
      prev.map((shop) => ({
        ...shop,
        capsters: shop.capsters.map((c) => (c.id === id ? { ...c, status } : c))
      }))
    );
    addToast(`Updated capster status to ${status}.`, "info");
  };

  const handleDeleteCapster = (id: string) => {
    setBarbershops((prev) =>
      prev.map((shop) => ({
        ...shop,
        capsters: shop.capsters.filter((c) => c.id !== id)
      }))
    );
    addToast("Removed styling staff from active roster.", "error");
  };

  const handleAddService = (service: Service) => {
    setBarbershops((prev) =>
      prev.map((shop) => ({
        ...shop,
        services: [...shop.services, service]
      }))
    );
    addToast(`Created product service "${service.name}".`, "success");
  };

  const handleDeleteService = (id: string) => {
    setBarbershops((prev) =>
      prev.map((shop) => ({
        ...shop,
        services: shop.services.filter((s) => s.id !== id)
      }))
    );
    addToast("Service removed from pricelist.", "info");
  };

  const handleShopHoursUpdate = (hours: string) => {
    setBarbershops((prev) =>
      prev.map((shop) => ({ ...shop, openHours: hours }))
    );
  };

  // HANDLERS FOR ADMIN ACTIONS
  const handleApproveRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );
    
    // Add new barbershop dynamically to show up in the Directory listing instantly!
    const entry = requests.find((r) => r.id === id);
    if (entry) {
      const newShop: Barbershop = {
        id: `b-new-${Math.floor(Math.random() * 100)}`,
        name: entry.barberName,
        rating: 5.0,
        reviewsCount: 1,
        address: entry.address,
        location: "Jakarta Selatan",
        openHours: "09:00 - 21:00",
        priceRange: "Rp 120.000 - Rp 230.000",
        coverImage: "https://images.unsplash.com/photo-1599351431247-f5094087e593?auto=format&fit=crop&q=80&w=500",
        description: "Official newly authorized luxury grooming lounge. Equipped with master capsters and premium towel massages.",
        services: barbershops[0].services,
        capsters: [barbershops[0].capsters[0], barbershops[0].capsters[1]],
        gallery: [barbershops[0].gallery[0]]
      };
      setBarbershops((prev) => [...prev, newShop]);
    }
    
    addToast("Mitra approved successfully! Shop added to global directory.", "success");
  };

  const handleRejectRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
    addToast("Mitra request declined.", "error");
  };

  // Unified Header Navigation router
  const handleHeaderNavigate = (view: string, targetBarberId?: string) => {
    if (view === "barber-detail" && targetBarberId) {
      setSelectedBarberId(targetBarberId);
      setCurrentView("directory");
    } else {
      setSelectedBarberId(null);
      setCurrentView(view);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">

      {/* PUBLIC HEADER NAVBAR (Shared amongst relevant routes) */}
      {(userRole === "visitor" || currentView === "home" || currentView === "directory") && (
        <header className="bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 sticky top-0 z-40 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
            {/* Logo area */}
            <div
              onClick={() => handleHeaderNavigate("home")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center border border-gold/20 shadow-lg group-hover:scale-105 transition-transform">
                <Scissors className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-white">
                Barber<span className="text-gold">Hub</span>
              </span>
            </div>

            {/* Navigation tabs */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
              <button onClick={() => handleHeaderNavigate("home")} className={`hover:text-gold transition-colors cursor-pointer ${currentView === "home" ? "text-gold" : "text-neutral-300"}`}>Home</button>
              <button onClick={() => handleHeaderNavigate("directory")} className={`hover:text-gold transition-colors cursor-pointer ${currentView === "directory" ? "text-gold" : "text-neutral-300"}`}>Find Barber</button>
              <button onClick={() => handleHeaderNavigate("auth-register-partner")} className={`hover:text-gold transition-colors cursor-pointer ${currentView === "auth-register-partner" ? "text-gold" : "text-neutral-300"}`}>Become Partner</button>
            </nav>

            {/* Account CTA buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleHeaderNavigate("auth-login")}
                className="px-4 py-2 text-xs font-semibold hover:text-gold text-neutral-300 transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => handleHeaderNavigate("auth-register-customer")}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        </header>
      )}

      {/* MAIN LAYOUT CANVAS ROUTER */}
      <main className="flex-grow">
        {/* PUBLIC HOME SCREEN */}
        {currentView === "home" && (
          <HomeSection
            barbershops={barbershops}
            onNavigate={handleHeaderNavigate}
            onSetUserRole={(role) => setUserRole(role)}
            userRole={userRole}
          />
        )}

        {/* BARBERSHOP DIRECTORY & DIRECT BOOKING PANEL */}
        {currentView === "directory" && (
          <DirectorySection
            barbershops={barbershops}
            onBackToHome={() => setCurrentView("home")}
            onBookingCreated={handleBookingCreated}
            activeBarberId={selectedBarberId}
            onSetView={setCurrentView}
          />
        )}

        {/* AUTHENTICATION PORTALS */}
        {(currentView === "auth-login" || currentView === "auth-register-customer" || currentView === "auth-register-partner") && (
          <AuthSection
            initialMode={
              currentView === "auth-login"
                ? "login"
                : currentView === "auth-register-customer"
                ? "register-customer"
                : "register-partner"
            }
            onAuthSuccess={(user) => {
              setCustomerName(user.name);
              setUserRole(user.role);
              setCurrentView(user.role === "customer" ? "customer-dashboard" : "partner-dashboard");
              addToast(`Sign up successful! Welcome to the console, ${user.name}!`, "success");
            }}
            onNavigate={setCurrentView}
          />
        )}

        {/* CUSTOMER CONSOLE WORKSPACE */}
        {currentView === "customer-dashboard" && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <DashboardCustomer
              bookings={bookings}
              barbershops={barbershops}
              onSetView={handleHeaderNavigate}
              onCancelBooking={handleCancelBooking}
              customerName={customerName}
            />
          </div>
        )}

        {/* BARBERSHOP PARTNER WORKSPACE */}
        {currentView === "partner-dashboard" && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <DashboardPartner
              bookings={bookings}
              barbershop={barbershops[0]}
              onCallQueue={handleCallQueue}
              onCompleteQueue={handleCompleteQueue}
              onRejectQueue={handleRejectQueue}
              onAddCapster={handleAddCapster}
              onUpdateCapsterStatus={handleUpdateCapsterStatus}
              onDeleteCapster={handleDeleteCapster}
              onAddService={handleAddService}
              onDeleteService={handleDeleteService}
              onUpdateShopHours={handleShopHoursUpdate}
            />
          </div>
        )}

        {/* PLATFORM ADMIN MONITOR WORKSPACE */}
        {currentView === "admin-panel" && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <DashboardAdmin
              requests={requests}
              onApproveRequest={handleApproveRequest}
              onRejectRequest={handleRejectRequest}
            />
          </div>
        )}
      </main>

      {/* FOOTER WRAPPER */}
      <Footer onNavigate={handleHeaderNavigate} onResetDatabase={handleResetDatabase} />

      {/* FLOATING SYSTEM TOAST */}
      <NotificationToast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
