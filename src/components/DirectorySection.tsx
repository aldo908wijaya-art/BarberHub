import React, { useState } from "react";
import { Search, MapPin, Star, Calendar, Clock, User, Check, Scissors, ChevronRight, Sparkles, Filter, SlidersHorizontal, ArrowLeft, ShieldAlert } from "lucide-react";
import { Barbershop, Service, Capster, Booking } from "../data";

interface DirectorySectionProps {
  barbershops: Barbershop[];
  onBackToHome: () => void;
  onBookingCreated: (booking: Partial<Booking>) => void;
  activeBarberId?: string | null;
  onSetView: (view: string) => void;
}

export default function DirectorySection({
  barbershops,
  onBackToHome,
  onBookingCreated,
  activeBarberId,
  onSetView
}: DirectorySectionProps) {
  // Navigation states within Directory (list vs details)
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(activeBarberId || null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLoc, setSelectedLoc] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Booking Wizard States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1: Service, 2: Capster, 3: Schedule, 4: Confirm
  const [chosenService, setChosenService] = useState<Service | null>(null);
  const [chosenCapster, setChosenCapster] = useState<Capster | null>(null);
  const [chosenDate, setChosenDate] = useState("2026-06-22");
  const [chosenTime, setChosenTime] = useState("");
  const [custName, setCustName] = useState("Aldo Wijaya");
  const [custPhone, setCustPhone] = useState("+62 812-3456-7890");
  const [custEmail, setCustEmail] = useState("aldo908wijaya@gmail.com");

  const currentBarbershop = barbershops.find((b) => b.id === (selectedBarberId || activeBarberId));

  // Extract unique locations for filtering
  const locations = ["All", ...Array.from(new Set(barbershops.map((b) => b.location)))];

  // Filtering Logic
  const filteredBarbershops = barbershops
    .filter((shop) => {
      const matchSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          shop.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLoc = selectedLoc === "All" || shop.location === selectedLoc;
      const matchRating = shop.rating >= selectedRating;
      
      let matchPrice = true;
      if (selectedPrice !== "All") {
        if (selectedPrice === "low") {
          matchPrice = shop.priceRange.includes("120.000") || shop.priceRange.includes("130.000");
        } else if (selectedPrice === "high") {
          matchPrice = shop.priceRange.includes("350.000") || shop.priceRange.includes("300.000");
        }
      }
      return matchSearch && matchLoc && matchRating && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === "rating-desc") return b.rating - a.rating;
      if (sortBy === "reviews-desc") return b.reviewsCount - a.reviewsCount;
      return 0; // default
    });

  const getDayLabel = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split("T")[0];
  };

  const timeSlots = ["09:30", "10:15", "11:00", "13:00", "14:15", "15:00", "16:30", "17:45", "19:00", "20:15"];

  const handleStartBooking = () => {
    if (!currentBarbershop) return;
    setChosenService(currentBarbershop.services[0]);
    setChosenCapster(currentBarbershop.capsters[0]);
    setChosenTime("10:15");
    setBookingStep(1);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!currentBarbershop || !chosenService || !chosenCapster) return;

    onBookingCreated({
      barbershopId: currentBarbershop.id,
      barbershopName: currentBarbershop.name,
      service: chosenService,
      capster: chosenCapster,
      date: chosenDate,
      time: chosenTime,
      customerName: custName,
      customerPhone: custPhone,
      customerEmail: custEmail,
      status: "Pending",
      type: "Online"
    });

    setIsBookingOpen(false);
    setSelectedBarberId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-white">
      {/* DIRECTORY VIEW: List of Barbershops with Search and Advanced Filters */}
      {!selectedBarberId ? (
        <div>
          <div className="mb-10 text-center">
            <span className="text-gold text-xs font-mono font-semibold tracking-widest uppercase mb-2 block">Premium Experience</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display">Directory Mitra Barber</h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
              Temukan barbershop elite, bandingkan ulasan, jadwalkan janji temu aman tanpa repot.
            </p>
          </div>

          {/* Search bar & Filter trigger */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800/80 mb-8 shadow-xl">
            <div className="lg:col-span-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-500" />
              </span>
              <input
                type="text"
                placeholder="Cari barbershop, area terdekat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs placeholder-neutral-500 focus:outline-none focus:border-gold"
              />
            </div>

            <div className="lg:col-span-2">
              <select
                value={selectedLoc}
                onChange={(e) => setSelectedLoc(e.target.value)}
                className="block w-full px-3 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300 focus:outline-none focus:border-gold"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All" ? "Lokasi: Semua" : `Area: ${loc}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="block w-full px-3 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300 focus:outline-none"
              >
                <option value="All">Harga: Semua</option>
                <option value="low">Menengah (Dibawah Rp 150K)</option>
                <option value="high">Premium (Diatas Rp 150K)</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full px-3 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300 focus:outline-none"
              >
                <option value="default">Urutkan: Rekomendasi</option>
                <option value="rating-desc">Rating Tertinggi</option>
                <option value="reviews-desc">Paling Populer</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <button
                onClick={() => { setSelectedLoc("All"); setSelectedPrice("All"); setSelectedRating(0); setSearchQuery(""); }}
                className="w-full py-3 bg-neutral-800 hover:bg-neutral-750 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Results grid */}
          {filteredBarbershops.length === 0 ? (
            <div className="text-center py-16 bg-neutral-900/25 rounded-2xl border border-neutral-800 border-dashed">
              <ShieldAlert className="w-12 h-12 text-gold mx-auto mb-4" />
              <p className="text-sm text-neutral-400 font-semibold mb-1">Barbershop tidak ditemukan</p>
              <p className="text-xs text-neutral-500">Coba atur ulang filter pencarian Anda atau telusuri kota lain.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBarbershops.map((shop) => (
                <div
                  key={shop.id}
                  className="rounded-2xl bg-neutral-900 border border-neutral-800/80 overflow-hidden transform transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/20"
                >
                  <div className="relative h-48 overflow-hidden bg-neutral-950">
                    <img
                      src={shop.coverImage}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-gold text-xs font-semibold px-2 px-2.5 py-1 rounded-full border border-gold/15 flex items-center gap-1 font-mono">
                      <Star className="w-3.5 h-3.5 fill-gold stroke-gold" /> {shop.rating}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider px-2 py-1 rounded-md border border-neutral-700/50">
                      Open: {shop.openHours}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 font-display">{shop.name}</h3>
                    <p className="text-xs text-neutral-400 mb-4 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" /> {shop.address}
                    </p>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-6">
                      {shop.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-850">
                      <span className="text-xs text-neutral-400 font-mono">{shop.priceRange}</span>
                      <button
                        onClick={() => setSelectedBarberId(shop.id)}
                        className="px-4 py-2 bg-gold hover:bg-gold-hover text-black text-xs font-bold rounded-lg transition-all cursor-pointer"
                      >
                        Detail & Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* BARBERSHOP DETAIL PAGE: Extensive detailed breakdown */
        <div>
          {/* Back button */}
          <button
            onClick={() => setSelectedBarberId(null)}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-gold text-xs font-semibold mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar
          </button>

          {currentBarbershop && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Details, description, services list, reviews */}
              <div className="lg:col-span-8 space-y-8">
                {/* Visual Header Banner */}
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img
                    src={currentBarbershop.coverImage}
                    alt={currentBarbershop.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="inline-block px-3 py-1 rounded-md bg-gold text-black text-[10px] font-extrabold uppercase mb-2 tracking-wider">
                      ★ RATING {currentBarbershop.rating} ({currentBarbershop.reviewsCount} Ulasan)
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">{currentBarbershop.name}</h1>
                  </div>
                </div>

                {/* Grid Gallery */}
                <div>
                  <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Gallery Showcase</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {currentBarbershop.gallery.map((img, idx) => (
                      <div key={idx} className="h-20 sm:h-28 rounded-xl overflow-hidden border border-neutral-800">
                        <img src={img} alt="Interior" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <h3 className="text-base font-bold text-white mb-3">About the Saloon</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{currentBarbershop.description}</p>
                </div>

                {/* Services List */}
                <div>
                  <h3 className="text-base font-bold text-white mb-4">Grooming & Treatments</h3>
                  <div className="space-y-4">
                    {currentBarbershop.services.map((srv) => (
                      <div
                        key={srv.id}
                        className="p-5 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-white font-display mb-1">{srv.name}</h4>
                          <p className="text-xs text-neutral-400 mb-2">{srv.description}</p>
                          <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-md font-mono">
                            Durasi: {srv.duration} Mins
                          </span>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-neutral-800 pt-3 sm:pt-0">
                          <span className="text-xs sm:text-sm font-bold text-gold font-mono whitespace-nowrap">
                            Rp {srv.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => { setChosenService(srv); handleStartBooking(); }}
                            className="px-4 py-2 bg-gold hover:bg-gold-hover text-black text-xs font-bold rounded-lg cursor-pointer whitespace-nowrap"
                          >
                            Pilih & Booking
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review logs */}
                <div>
                  <h3 className="text-base font-bold text-white mb-4">Verified Customer Feedback</h3>
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-left">
                      <div className="flex items-center gap-1.5 text-gold mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                        <span className="text-xs text-neutral-400 font-semibold ml-2">Ahmad Sobari (5.0)</span>
                      </div>
                      <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                        "Cukuran paling andalan kalau kesini. Pelayanan cepat, tidak ada antrean panjang karena sistem pendaftaran dionlinekan dengan rapi."
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-left">
                      <div className="flex items-center gap-1.5 text-gold mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`${i < 4 ? "fill-gold" : "text-neutral-500"} w-3.5 h-3.5`} />)}
                        <span className="text-xs text-neutral-400 font-semibold ml-2">Denny Setiawan (4.0)</span>
                      </div>
                      <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                        "Tempat bersih, interior mewah berkelas modern minimalist. Capster ramah banget."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Side Booking Panel */}
              <div className="lg:col-span-4">
                <div className="p-6 rounded-2xl bg-neutral-900 border border-gold/15 shadow-xl space-y-6 sticky top-6">
                  <div className="border-b border-neutral-800 pb-4">
                    <h3 className="text-sm font-bold text-gold uppercase tracking-widest font-mono mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Quick Booking Portal
                    </h3>
                    <p className="text-xs text-neutral-500">Amankan jam terbaik Anda untuk potong hari ini.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-500">Jam Operasional</span>
                      <span className="font-semibold text-white">{currentBarbershop.openHours}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-500">Harga Standar</span>
                      <span className="font-semibold text-white font-mono">{currentBarbershop.priceRange}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-500">Lokasi Kota</span>
                      <span className="font-semibold text-white">{currentBarbershop.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleStartBooking}
                    className="w-full py-3.5 bg-gold hover:bg-gold-hover text-black font-semibold rounded-xl text-xs tracking-wide transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gold/20 cursor-pointer text-center"
                  >
                    Mulai Booking Sekarang
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4-STEP BOOKING WIZARD MODAL POPUP */}
      {isBookingOpen && currentBarbershop && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Content Area: Wizard Steps */}
            <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
              
              {/* Steps Progress Header */}
              <div className="flex justify-between items-center pb-4 border-b border-neutral-800 gap-2 overflow-x-auto">
                {[
                  { step: 1, label: "Layanan" },
                  { step: 2, label: "Capster" },
                  { step: 3, label: "Jadwal" },
                  { step: 4, label: "Konfirmasi" }
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold font-display flex items-center justify-center ${
                        bookingStep === s.step
                          ? "bg-gold text-black"
                          : bookingStep > s.step
                          ? "bg-green-500 text-white"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {bookingStep > s.step ? "✓" : s.step}
                    </span>
                    <span className={`text-xs font-semibold whitespace-nowrap ${bookingStep === s.step ? "text-gold" : "text-neutral-500"}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* STEP 1: Select Service */}
              {bookingStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white">Langkah 1: Pilih Layanan Treatment</h3>
                  <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-1">
                    {currentBarbershop.services.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => setChosenService(srv)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          chosenService?.id === srv.id
                            ? "bg-gold/5 border-gold shadow-[0_0_15px_rgba(212,175,55,0.08)]"
                            : "bg-neutral-950 border-neutral-850 hover:border-neutral-700"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs sm:text-sm font-bold text-white">{srv.name}</h4>
                          <span className="text-xs text-gold font-bold font-mono">Rp {srv.price.toLocaleString()}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1">{srv.description}</p>
                        <p className="text-[10px] text-neutral-500 mt-2 font-mono">Durasi: {srv.duration} Mins</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Select Capster */}
              {bookingStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white">Langkah 2: Pilih Professional Capster</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
                    {currentBarbershop.capsters.map((cap) => {
                      const isUnavailable = cap.status === "On Break" || cap.status === "Fully Booked";
                      return (
                        <div
                          key={cap.id}
                          onClick={() => { if (!isUnavailable) setChosenCapster(cap); }}
                          className={`p-4 rounded-xl border transition-all flex items-start gap-3 relative ${
                            isUnavailable
                              ? "opacity-50 cursor-not-allowed bg-neutral-950 border-neutral-900"
                              : chosenCapster?.id === cap.id
                              ? "bg-gold/5 border-gold cursor-pointer"
                              : "bg-neutral-950 border-neutral-850 hover:border-neutral-700 cursor-pointer"
                          }`}
                        >
                          <img src={cap.photoUrl} alt="Capster Avatar" className="w-12 h-12 rounded-xl object-cover bg-neutral-900" />
                          <div className="flex-grow">
                            <h4 className="text-xs font-bold text-white">{cap.name}</h4>
                            <p className="text-[10px] text-neutral-400 font-mono">Exp: {cap.experience}</p>
                            
                            <div className="flex items-center gap-1.5 mt-1 sm:mt-2">
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                                  cap.status === "Active"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-neutral-800 text-neutral-400"
                                }`}
                              >
                                {cap.status}
                              </span>
                              <span className="text-[9px] text-gold font-mono flex items-center gap-0.5">
                                ★ {cap.rating}
                              </span>
                            </div>
                          </div>
                          
                          {chosenCapster?.id === cap.id && !isUnavailable && (
                            <div className="p-1 rounded-full bg-gold text-black absolute top-3 right-3">
                              <Check className="w-3.5 h-3.5 stroke-[3px]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Select Schedule */}
              {bookingStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white">Langkah 3: Atur Schedule & Tanggal</h3>
                  
                  {/* Visual Date selection */}
                  <div>
                    <span className="text-xs text-neutral-400 block mb-2 font-medium">Pilih Tanggal</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((offset) => {
                        const dateStr = getDayLabel(offset);
                        const isSelected = chosenDate === dateStr;
                        return (
                          <button
                            key={offset}
                            type="button"
                            onClick={() => setChosenDate(dateStr)}
                            className={`py-3.5 rounded-xl border text-xs font-semibold cursor-pointer text-center transition-all ${
                              isSelected
                                ? "bg-gold text-black border-gold font-extrabold"
                                : "bg-neutral-950 border-neutral-850 hover:bg-neutral-900"
                            }`}
                          >
                            {offset === 0 ? "Hari Ini" : offset === 1 ? "Besok" : "Lusa"}
                            <span className={`block text-[10px] mt-1 font-mono ${isSelected ? "text-black" : "text-neutral-500"}`}>
                              {dateStr}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time list */}
                  <div>
                    <span className="text-xs text-neutral-400 block mb-2 font-medium">Pilih Jam Booking</span>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-[160px] overflow-y-auto pr-1">
                      {timeSlots.map((t) => {
                        const isSelected = chosenTime === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setChosenTime(t)}
                            className={`py-2 text-[11px] font-mono rounded-lg border text-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-white text-black font-semibold border-white"
                                : "bg-neutral-950 border-neutral-850 hover:bg-neutral-900 text-neutral-300"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Confirm customer email & values */}
              {bookingStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white">Langkah 4: Informasi Kontak Anda</h3>
                  <div className="space-y-3 bg-neutral-950 p-4 border border-neutral-850 rounded-xl">
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        className="block w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1">Nomor Handphone (WhatsApp)</label>
                      <input
                        type="tel"
                        required
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        className="block w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1 font-sans">E-mail Address</label>
                      <input
                        type="email"
                        required
                        value={custEmail}
                        onChange={(e) => setCustEmail(e.target.value)}
                        className="block w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Control buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  disabled={bookingStep === 1}
                  onClick={() => setBookingStep((s) => s - 1)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    bookingStep === 1 ? "opacity-30 cursor-not-allowed text-neutral-500" : "bg-neutral-800 hover:bg-neutral-750"
                  }`}
                >
                  Sebelumnya
                </button>

                {bookingStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (bookingStep === 1 && !chosenService) return;
                      if (bookingStep === 2 && !chosenCapster) return;
                      if (bookingStep === 3 && !chosenTime) return;
                      setBookingStep((s) => s + 1);
                    }}
                    className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-black text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Lanjutnya
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="px-6 py-2.5 bg-green-500 hover:bg-green-650 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Konfirmasi & Amankan Slot
                  </button>
                )}
              </div>
            </div>

            {/* Right Sidebar: Sticky Invoice Summary Checkout */}
            <div className="lg:col-span-4 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between border-l border-neutral-850">
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-neutral-800">
                  Ringkasan Booking
                </h3>

                <div className="space-y-4">
                  {chosenService ? (
                    <div>
                      <span className="text-[10px] text-neutral-500 block">Layanan</span>
                      <span className="text-xs font-semibold text-white">{chosenService.name}</span>
                      <span className="text-xs text-gold block font-mono">Rp {chosenService.price.toLocaleString()}</span>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500 italic">Belum memilih layanan...</p>
                  )}

                  {chosenCapster ? (
                    <div>
                      <span className="text-[10px] text-neutral-500 block">Capster</span>
                      <span className="text-xs font-semibold text-white">{chosenCapster.name}</span>
                      <span className="text-[10px] text-neutral-500 block">Exp: {chosenCapster.experience}</span>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500 italic">Belum memilih capster...</p>
                  )}

                  <div>
                    <span className="text-[10px] text-neutral-500 block">Jadwal Tanggal & Jam</span>
                    <span className="text-xs font-semibold text-white font-mono">{chosenDate} @ {chosenTime || "--:--"}</span>
                  </div>

                  {chosenService && (
                    <div className="pt-2 border-t border-neutral-900 flex justify-between items-center">
                      <span className="text-[10px] text-neutral-500">Estimasi Durasi</span>
                      <span className="text-xs text-neutral-300 font-semibold font-mono">{chosenService.duration} Mins</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Price Section */}
              <div className="pt-6 border-t border-neutral-800 space-y-4 mt-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-neutral-400">Total Biaya</span>
                  <span className="text-lg font-bold text-gold font-mono">
                    Rp {chosenService ? chosenService.price.toLocaleString() : "0"}
                  </span>
                </div>
                
                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="w-full py-2 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 text-[10px] rounded-lg tracking-wide transition-colors cursor-pointer text-center"
                >
                  Batal Booking
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
