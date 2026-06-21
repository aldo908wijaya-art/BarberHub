import React, { useState } from "react";
import { LayoutDashboard, Users, Clock, Sliders, Play, Check, X, ShieldAlert, BadgePlus, RefreshCcw, DollarSign, ListOrdered, CalendarDays, BarChart3, Image, Scissors, Trash } from "lucide-react";
import { Booking, Service, Capster, Barbershop, INITIAL_BARBERSHOPS } from "../data";
import AnalyticsCharts from "./AnalyticsCharts";

interface DashboardPartnerProps {
  bookings: Booking[];
  barbershop: Barbershop;
  onCallQueue: (bookingId: string) => void;
  onCompleteQueue: (bookingId: string) => void;
  onRejectQueue: (bookingId: string) => void;
  onAddCapster: (capster: Capster) => void;
  onUpdateCapsterStatus: (id: string, status: "Active" | "On Break" | "Fully Booked") => void;
  onDeleteCapster: (id: string) => void;
  onAddService: (service: Service) => void;
  onDeleteService: (id: string) => void;
  onUpdateShopHours: (hours: string) => void;
}

export default function DashboardPartner({
  bookings,
  barbershop,
  onCallQueue,
  onCompleteQueue,
  onRejectQueue,
  onAddCapster,
  onUpdateCapsterStatus,
  onDeleteCapster,
  onAddService,
  onDeleteService,
  onUpdateShopHours
}: DashboardPartnerProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "barbershop" | "capsters" | "bookings" | "queue" | "analytics">("dashboard");

  // Local helper states for adding Capsters
  const [newCapName, setNewCapName] = useState("");
  const [newCapExp, setNewCapExp] = useState("5 Years");
  const [newCapSpec, setNewCapSpec] = useState("Skin Fade, Slickback");
  const [showCapModal, setShowCapModal] = useState(false);

  // Local helper states for adding Services
  const [newSrvName, setNewSrvName] = useState("");
  const [newSrvPrice, setNewSrvPrice] = useState(120000);
  const [newSrvDur, setNewSrvDur] = useState(45);
  const [newSrvDesc, setNewSrvDesc] = useState("");
  const [showSrvModal, setShowSrvModal] = useState(false);

  // Operational Settings edit
  const [editHours, setEditHours] = useState(barbershop.openHours);
  const [hoursSaved, setHoursSaved] = useState(false);

  // Calendar toggle in booking management
  const [bookingListView, setBookingListView] = useState<"table" | "calendar">("table");

  // Filters for Bookings
  const activeReservations = bookings.filter((b) => b.status === "Pending" || b.status === "Waiting" || b.status === "Processing");

  // Split queue states: Online vs Walk-in
  const onlineQueues = bookings.filter((b) => b.type === "Online" && (b.status === "Waiting" || b.status === "Processing"));
  const walkInQueues = bookings.filter((b) => b.type === "Walk-in" && (b.status === "Waiting" || b.status === "Processing"));

  const handleSaveHours = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateShopHours(editHours);
    setHoursSaved(true);
    setTimeout(() => setHoursSaved(false), 2000);
  };

  const submitCapster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCapName) return;
    onAddCapster({
      id: "cap-" + Math.random().toString(36).substr(2, 9),
      name: newCapName,
      experience: newCapExp,
      rating: 5.0,
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      status: "Active",
      specialties: newCapSpec.split(",").map((s) => s.trim())
    });
    setNewCapName("");
    setShowCapModal(false);
  };

  const submitService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvName) return;
    onAddService({
      id: "srv-" + Math.random().toString(36).substr(2, 9),
      name: newSrvName,
      price: Number(newSrvPrice),
      duration: Number(newSrvDur),
      description: newSrvDesc
    });
    setNewSrvName("");
    setNewSrvDesc("");
    setShowSrvModal(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* PARNTER SIDEBAR PANEL */}
        <div className="w-full lg:w-64 flex-shrink-0 bg-neutral-900 border border-neutral-850 p-6 rounded-2xl space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-850">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center border border-gold/20 shadow-md">
              <Scissors className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="text-[10px] text-gold font-mono uppercase tracking-widest font-bold">Partner Console</p>
              <h4 className="text-xs sm:text-sm font-bold text-white max-w-[140px] truncate">{barbershop.name}</h4>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "dashboard", label: "Dashboard Hub", icon: LayoutDashboard },
              { id: "barbershop", label: "Barbershop Ops", icon: Sliders },
              { id: "queue", label: "Live Queue Board", icon: ListOrdered },
              { id: "bookings", label: "Booking Schedules", icon: CalendarDays },
              { id: "capsters", label: "Capsters Roster", icon: Users },
              { id: "analytics", label: "Performance charts", icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    activeTab === tab.id
                      ? "bg-gold text-black shadow-md font-bold"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-850"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-neutral-850 text-xs text-neutral-500 text-center">
            <p className="font-mono">IP: 192.168.1.104</p>
            <p className="text-[10px] text-green-500 font-semibold mt-1">● Terminal Cloud Connected</p>
          </div>
        </div>

        {/* RIGHT ACTION DASHBOARD */}
        <div className="flex-grow space-y-6">
          
          {/* Header text info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-neutral-900 border border-neutral-850 rounded-2xl gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
                {activeTab === "dashboard" && "Console Management Overview"}
                {activeTab === "barbershop" && "Manage Profile & Treatments"}
                {activeTab === "queue" && "Antrean Real-time Control Desk"}
                {activeTab === "bookings" && "Schedules Booking Pipeline"}
                {activeTab === "capsters" && "Stylist staff & Specialties"}
                {activeTab === "analytics" && "Earnings & Volume Metrics"}
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                {activeTab === "dashboard" && "Dapatkan data harian, lacak kepuasan konsumen, dan percepat penanganan antrean."}
                {activeTab === "barbershop" && "Mutasikan galeri, jam buka operational, dan atur katalog harga jasa potong."}
                {activeTab === "queue" && "Panggil kupon berikutnya, pangkas penumpukan, pisahkan online vs walk-in."}
                {activeTab === "bookings" && "Pantau reservasi terjadwal. Klik 'Setujui' atau 'Tolak' antrean pending."}
                {activeTab === "capsters" && "Tambahkan roster capster andalan, edit status istirahat secara real-time."}
                {activeTab === "analytics" && "Analisa grafik omzet bulanan, produk best-seller, dan retensi pengunjung."}
              </p>
            </div>
            
            <div className="bg-neutral-950 px-4 py-2 border border-neutral-850 rounded-xl font-mono text-[10px] text-neutral-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span>Sesi Hari Ini ({barbershop.location})</span>
            </div>
          </div>

          {/* TAB 1: PARTNER DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Partner metrics widgets */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850">
                  <div className="flex justify-between items-center text-neutral-500">
                    <span className="text-[10px] font-mono uppercase">Daily Booking Target</span>
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
                    {onlineQueues.length + walkInQueues.length} Active
                  </p>
                  <span className="text-[10px] text-neutral-500 font-mono">Antrean mengular di lobi</span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850">
                  <div className="flex justify-between items-center text-neutral-500">
                    <span className="text-[10px] font-mono uppercase">Est. Revenue</span>
                    <DollarSign className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gold mt-1 font-display">Rp 4.720.000</p>
                  <span className="text-[10px] text-green-500 font-mono">▲ +12% dibanding kemarin</span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850 col-span-2 lg:col-span-1">
                  <div className="flex justify-between items-center text-neutral-500">
                    <span className="text-[10px] font-mono uppercase">Active Staff Roster</span>
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
                    {barbershop.capsters.filter(c => c.status === "Active").length} / {barbershop.capsters.length} On Duty
                  </p>
                  <span className="text-[10px] text-neutral-500">Staff standby di tempat</span>
                </div>
              </div>

              {/* Mini Queue Split Preview and Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 space-y-4 rounded-2xl bg-neutral-900 border border-neutral-850 text-left">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Antrean online berikutnya</h3>
                  {onlineQueues.length === 0 ? (
                    <p className="text-xs text-neutral-500 italic py-4">Tidak ada antrean online mengantre.</p>
                  ) : (
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gold font-mono">{onlineQueues[0].queueNumber || "A-012"}</span>
                        <h4 className="text-xs font-bold text-white mt-1">{onlineQueues[0].customerName}</h4>
                        <p className="text-[10px] text-neutral-500 font-mono">{onlineQueues[0].service.name}</p>
                      </div>
                      <button
                        onClick={() => onCallQueue(onlineQueues[0].id)}
                        className="px-4 py-2 bg-gold hover:bg-gold-hover text-black text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" /> Panggil
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-4 rounded-2xl bg-neutral-900 border border-neutral-850 text-left">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Antrean walk-in berikutnya</h3>
                  {walkInQueues.length === 0 ? (
                    <p className="text-xs text-neutral-500 italic py-4">Tidak ada antrean walk-in terdaftar.</p>
                  ) : (
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-white font-mono">{walkInQueues[0].queueNumber || "W-04"}</span>
                        <h4 className="text-xs font-bold text-white mt-1">{walkInQueues[0].customerName}</h4>
                        <p className="text-[10px] text-neutral-500 font-mono">{walkInQueues[0].service.name}</p>
                      </div>
                      <button
                        onClick={() => onCallQueue(walkInQueues[0].id)}
                        className="px-4 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" /> Panggil
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Performance charts embedding */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnalyticsCharts type="trend" />
                <AnalyticsCharts type="services" />
              </div>
            </div>
          )}

          {/* TAB 2: BARBERSHOP MANAGEMENT */}
          {activeTab === "barbershop" && (
            <div className="space-y-6">
              
              {/* OPERATIONAL HOURS */}
              <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl">
                <h3 className="text-base font-bold text-white mb-3">Edit Operational Hours</h3>
                <form onSubmit={handleSaveHours} className="flex items-center gap-4 max-w-md">
                  <input
                    type="text"
                    required
                    value={editHours}
                    onChange={(e) => setEditHours(e.target.value)}
                    placeholder="e.g. 09:00 - 21:00"
                    className="flex-grow px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gold hover:bg-gold-hover text-black text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Simpan Jam Buka
                  </button>
                </form>
                {hoursSaved && <p className="text-xs text-green-500 font-semibold mt-2">✓ Jam operasional berhasil disimpan!</p>}
              </div>

              {/* SERVICES LIST MANAGEMENT */}
              <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Layanan & Harga Jasa</h3>
                    <p className="text-xs text-neutral-500 mt-1">Daftar harga yang terlihat langsung di katalog reservasi pelanggan.</p>
                  </div>
                  <button
                    onClick={() => setShowSrvModal(true)}
                    className="px-4 py-2 bg-gold hover:bg-gold-hover text-black text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <BadgePlus className="w-4 h-4" /> Add Treatment
                  </button>
                </div>

                <div className="space-y-3">
                  {barbershop.services.map((srv) => (
                    <div key={srv.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{srv.name}</h4>
                        <span className="text-[10px] text-gold font-mono font-bold">Rp {srv.price.toLocaleString()}</span>
                        <span className="text-[10px] text-neutral-500 ml-4 font-mono">Durasi: {srv.duration} Mins</span>
                      </div>
                      <button
                        onClick={() => onDeleteService(srv.id)}
                        className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete service"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPILT LAYOUT QUEUE MANAGEMENT */}
          {activeTab === "queue" && (
            <div className="space-y-6">
              
              {/* Online vs Walk-In Splitting layout board */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column: Online Queue Board */}
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-850 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="text-sm font-extrabold text-gold uppercase tracking-wider font-mono">
                      Online Queue Desk ({onlineQueues.length})
                    </h3>
                    <span className="text-[9px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-mono font-bold">REAL-TIME CLOUD</span>
                  </div>

                  {onlineQueues.length === 0 ? (
                    <p className="text-xs text-neutral-500 italic py-8 text-center bg-neutral-950/40 rounded-xl">Tidak ada antrean online aktif.</p>
                  ) : (
                    <div className="space-y-3">
                      {onlineQueues.map((q) => (
                        <div key={q.id} className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                          q.status === "Processing" ? "bg-gold/5 border-gold shadow-md" : "bg-neutral-950 border-neutral-850"
                        }`}>
                          <div>
                            <span className="text-base font-extrabold text-gold font-mono">{q.queueNumber || "A-012"}</span>
                            <h4 className="text-xs font-bold text-white mt-1">{q.customerName}</h4>
                            <p className="text-[10px] text-neutral-400">{q.service.name} • Bersama {q.capster.name}</p>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-500 font-mono inline-block mt-2">Status: {q.status}</span>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0 justify-end">
                            {q.status === "Waiting" ? (
                              <button
                                onClick={() => onCallQueue(q.id)}
                                className="px-3.5 py-1.5 bg-gold hover:bg-gold-hover text-black text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1"
                              >
                                <Play className="w-3.5 h-3.5 fill-black" /> Panggil
                              </button>
                            ) : (
                              <button
                                onClick={() => onCompleteQueue(q.id)}
                                className="px-3.5 py-1.5 bg-green-500 hover:bg-green-650 text-white text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Selesaikan
                              </button>
                            )}
                            <button
                              onClick={() => onRejectQueue(q.id)}
                              className="p-1.5 hover:bg-red-500/10 text-neutral-500 hover:text-red-500 rounded-lg cursor-pointer transition-colors"
                              title="Skip/Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Walk-In Queue Board */}
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-850 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">
                      Walk-in (Offline) Queue Desk ({walkInQueues.length})
                    </h3>
                    <span className="text-[9px] bg-neutral-850 text-neutral-400 px-2 py-0.5 rounded-full font-mono">OFFLINE DESK</span>
                  </div>

                  {walkInQueues.length === 0 ? (
                    <p className="text-xs text-neutral-500 italic py-8 text-center bg-neutral-950/40 rounded-xl">Tidak ada antrean walk-in aktif.</p>
                  ) : (
                    <div className="space-y-3">
                      {walkInQueues.map((q) => (
                        <div key={q.id} className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                          q.status === "Processing" ? "bg-white/5 border-white shadow-md" : "bg-neutral-950 border-neutral-850"
                        }`}>
                          <div>
                            <span className="text-base font-extrabold text-white font-mono">{q.queueNumber || "W-01"}</span>
                            <h4 className="text-xs font-bold text-white mt-1">{q.customerName}</h4>
                            <p className="text-[10px] text-neutral-400">{q.service.name} • Bersama {q.capster.name}</p>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-500 font-mono inline-block mt-2 font-bold">Status: {q.status}</span>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0 justify-end">
                            {q.status === "Waiting" ? (
                              <button
                                onClick={() => onCallQueue(q.id)}
                                className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-750 text-white text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1"
                              >
                                <Play className="w-3.5 h-3.5 fill-white" /> Panggil
                              </button>
                            ) : (
                              <button
                                onClick={() => onCompleteQueue(q.id)}
                                className="px-3.5 py-1.5 bg-green-500 hover:bg-green-650 text-white text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Selesaikan
                              </button>
                            )}
                            <button
                              onClick={() => onRejectQueue(q.id)}
                              className="p-1.5 hover:bg-red-500/10 text-neutral-500 hover:text-red-500 rounded-lg cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: BOOKING SCHEDULE DETAILS WITH TABLE/CALENDAR VIEW */}
          {activeTab === "bookings" && (
            <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">Master Antrean & Jadwal Booking</h3>
                  <p className="text-xs text-neutral-500 mt-1">Lacak dan verifikasi jadwal masuk.</p>
                </div>

                <div className="flex items-center p-1 bg-neutral-950 rounded-lg w-fit">
                  <button
                    onClick={() => setBookingListView("table")}
                    className={`px-3 py-1.5 text-[10px] font-semibold rounded ${
                      bookingListView === "table" ? "bg-neutral-800 text-gold" : "text-neutral-500"
                    }`}
                  >
                    Table View
                  </button>
                  <button
                    onClick={() => setBookingListView("calendar")}
                    className={`px-3 py-1.5 text-[10px] font-semibold rounded ${
                      bookingListView === "calendar" ? "bg-neutral-800 text-gold" : "text-neutral-500"
                    }`}
                  >
                    Calendar View
                  </button>
                </div>
              </div>

              {bookingListView === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead>
                      <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-500 font-mono uppercase">
                        <th className="p-3.5">ID Jurnal</th>
                        <th className="p-3.5">Pelanggan</th>
                        <th className="p-3.5">Layanan</th>
                        <th className="p-3.5">Pilihan capster</th>
                        <th className="p-3.5">Tanggal / Jam</th>
                        <th className="p-3.5">Tipe</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id} className="border-b border-neutral-800 hover:bg-neutral-850/50 transition-colors">
                          <td className="p-3.5 font-mono text-neutral-400 font-bold">{b.id}</td>
                          <td className="p-3.5 text-white font-semibold">
                            {b.customerName}
                            <span className="block text-[10px] text-neutral-500 font-normal">{b.customerPhone}</span>
                          </td>
                          <td className="p-3.5">{b.service.name}</td>
                          <td className="p-3.5 font-medium">{b.capster.name}</td>
                          <td className="p-3.5 font-mono">{b.date} • {b.time}</td>
                          <td className="p-3.5 font-mono text-[10px]">{b.type}</td>
                          <td className="p-3.5 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              b.status === "Completed" ? "bg-green-500/10 text-green-500" :
                              b.status === "Pending" ? "bg-yellow-500/10 text-gold font-bold animate-pulse" :
                              "bg-neutral-800 text-neutral-500"
                            }`}>{b.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Dynamic simulated calendar interface */
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs text-neutral-500 bg-neutral-950 p-2 rounded-t-xl uppercase font-bold">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 h-48">
                    {[...Array(31)].map((_, i) => {
                      const dayNumber = i + 1;
                      const hasBookings = dayNumber === 21 || dayNumber === 22;
                      return (
                        <div key={i} className={`p-2 rounded-xl flex flex-col justify-between border ${
                          hasBookings ? "bg-gold/5 border-gold/30" : "bg-neutral-950 border-neutral-850"
                        }`}>
                          <span className="text-[10px] text-neutral-400 font-mono font-bold">{dayNumber}</span>
                          {hasBookings && (
                            <span className="w-2 h-2 rounded-full bg-gold self-center" title="Schedule active" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: STAFF ROSTER MANAGEMENT */}
          {activeTab === "capsters" && (
            <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white">Staff Capster / Stylists</h3>
                  <p className="text-xs text-neutral-500 mt-1">Daftar staf yang bertugas melayani pelanggan secara eksklusif.</p>
                </div>
                <button
                  onClick={() => setShowCapModal(true)}
                  className="px-4 py-2 bg-gold hover:bg-gold-hover text-black text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <BadgePlus className="w-4 h-4" /> Add Capster
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-500 font-mono uppercase">
                      <th className="p-3.5">Logo</th>
                      <th className="p-3.5">Nama stylist</th>
                      <th className="p-3.5">Pengalaman Kerja</th>
                      <th className="p-3.5">Rating Kepuasan</th>
                      <th className="p-3.5">Status Bertugas</th>
                      <th className="p-3.5 rounded-tr-xl">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barbershop.capsters.map((cap) => (
                      <tr key={cap.id} className="border-b border-neutral-800 hover:bg-neutral-850/50 transition-colors">
                        <td className="p-3.5">
                          <img src={cap.photoUrl} alt={cap.name} className="w-10 h-10 rounded-full object-cover bg-neutral-950" />
                        </td>
                        <td className="p-3.5 text-white font-bold">
                          {cap.name}
                          <span className="block text-[10px] text-gold font-normal">Spesialis: {cap.specialties.join(", ")}</span>
                        </td>
                        <td className="p-3.5 font-mono">{cap.experience}</td>
                        <td className="p-3.5 text-gold font-mono">★ {cap.rating}</td>
                        <td className="p-3.5">
                          <select
                            value={cap.status}
                            onChange={(e) => onUpdateCapsterStatus(cap.id, e.target.value as any)}
                            className="bg-neutral-950 border border-neutral-800 text-xs rounded px-2 py-1 text-white focus:outline-none"
                          >
                            <option value="Active">Active / On Duty</option>
                            <option value="On Break">On Break</option>
                            <option value="Fully Booked">Fully Booked</option>
                          </select>
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => onDeleteCapster(cap.id)}
                            className="p-1.5 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer"
                            title="Delete Stylist"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PERFORMANCE METRICS ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnalyticsCharts type="trend" />
                <AnalyticsCharts type="revenue" />
                <AnalyticsCharts type="services" />
                <AnalyticsCharts type="growth" />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL WINDOWS FOR ADDING STUFF */}
      {showCapModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={submitCapster} className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Tambahkan Capster Baru</h3>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Nama Capster</label>
              <input
                type="text"
                required
                placeholder="Rahmat Efendi"
                value={newCapName}
                onChange={(e) => setNewCapName(e.target.value)}
                className="block w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Pengalaman Kerja</label>
              <input
                type="text"
                required
                placeholder="e.g. 5 Years"
                value={newCapExp}
                onChange={(e) => setNewCapExp(e.target.value)}
                className="block w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Keahlian Spesialisasi (Koma pisahkan)</label>
              <input
                type="text"
                required
                placeholder="e.g. Classic Pompadour, Hair Tattoo, Skin Fade"
                value={newCapSpec}
                onChange={(e) => setNewCapSpec(e.target.value)}
                className="block w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs"
              />
            </div>
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-gold hover:bg-gold-hover text-black text-xs font-bold rounded-xl cursor-pointer"
              >
                Simpan Stylist
              </button>
              <button
                type="button"
                onClick={() => setShowCapModal(false)}
                className="flex-1 py-2.5 bg-neutral-850 hover:bg-neutral-800 text-neutral-400 text-xs font-semibold rounded-xl"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {showSrvModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={submitService} className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Tambahkan Treatment Baru</h3>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Nama Layanan</label>
              <input
                type="text"
                required
                placeholder="Golden Face Cleansing Shave"
                value={newSrvName}
                onChange={(e) => setNewSrvName(e.target.value)}
                className="block w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Harga (Rupiah)</label>
                <input
                  type="number"
                  required
                  placeholder="150000"
                  value={newSrvPrice}
                  onChange={(e) => setNewSrvPrice(Number(e.target.value))}
                  className="block w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Durasi (Menit)</label>
                <input
                  type="number"
                  required
                  placeholder="45"
                  value={newSrvDur}
                  onChange={(e) => setNewSrvDur(Number(e.target.value))}
                  className="block w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Deskripsi Singkat</label>
              <textarea
                required
                rows={2}
                placeholder="Rincian massage, bahan charcoal premium, dsb..."
                value={newSrvDesc}
                onChange={(e) => setNewSrvDesc(e.target.value)}
                className="block w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs"
              />
            </div>
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-gold hover:bg-gold-hover text-black text-xs font-bold rounded-xl cursor-pointer"
              >
                Simpan Jasa
              </button>
              <button
                type="button"
                onClick={() => setShowSrvModal(false)}
                className="flex-1 py-2.5 bg-neutral-850 hover:bg-neutral-800 text-neutral-400 text-xs font-semibold rounded-xl"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
