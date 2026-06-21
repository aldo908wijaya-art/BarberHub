import React, { useState } from "react";
import { LayoutDashboard, Compass, Ticket, ListFilter, History, User2, Clock, MapPin, Scissors, Calendar, ExternalLink, RefreshCw, Star, Smartphone, ShieldCheck, Mail } from "lucide-react";
import { Booking, Barbershop } from "../data";

interface DashboardCustomerProps {
  bookings: Booking[];
  barbershops: Barbershop[];
  onSetView: (view: string) => void;
  onCancelBooking: (id: string) => void;
  customerName: string;
}

export default function DashboardCustomer({
  bookings,
  barbershops,
  onSetView,
  onCancelBooking,
  customerName
}: DashboardCustomerProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "explore" | "my-booking" | "queue" | "history" | "profile">("dashboard");

  // Profile fields (Editable)
  const [phone, setPhone] = useState("+62 812-3456-7890");
  const [email, setEmail] = useState("aldo908wijaya@gmail.com");
  const [address, setAddress] = useState("Kebayoran Lama, Jakarta Selatan");
  const [isSaved, setIsSaved] = useState(false);

  // Filter book records for this user (Aldo Wijaya / Guest)
  const myBookings = bookings; // Simulator treats current list as my records
  const activeBookings = myBookings.filter((b) => b.status === "Pending" || b.status === "Waiting" || b.status === "Processing");
  const completedBookings = myBookings.filter((b) => b.status === "Completed" || b.status === "Rejected");

  // Active queue item
  const activeQueueItem = myBookings.find((b) => b.status === "Processing" || b.status === "Waiting");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      
      {/* Dashboard container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR PANEL */}
        <div className="w-full lg:w-64 flex-shrink-0 bg-neutral-900 border border-neutral-850 p-6 rounded-2xl space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-850">
            <div className="w-10 h-10 rounded-full bg-gold/10 text-gold font-bold text-sm tracking-widest flex items-center justify-center border border-gold/15">
              {customerName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-neutral-500 font-mono">Customer Account</p>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-[140px]">{customerName}</h4>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "explore", label: "Explore Mitra", icon: Compass },
              { id: "my-booking", label: "My Bookings", icon: Ticket },
              { id: "queue", label: "Realtime Queue", icon: Clock },
              { id: "history", label: "Booking History", icon: History },
              { id: "profile", label: "Profile", icon: User2 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === "explore") {
                      onSetView("directory");
                    } else {
                      setActiveTab(tab.id as any);
                    }
                  }}
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

          <div className="pt-6 border-t border-neutral-850">
            <div className="p-4 bg-gold/5 border border-gold/10 rounded-xl">
              <span className="text-[10px] text-gold font-mono uppercase tracking-wider block font-bold">PRO Tip</span>
              <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">
                Gunakan antrean online untuk menghemat waktu perjalanan hingga 45 menit!
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT DYNAMIC DISPLAY BOARD */}
        <div className="flex-grow space-y-6">
          
          {/* Header Overview line */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-neutral-900 border border-neutral-850 rounded-2xl gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
                {activeTab === "dashboard" && `Selamat Datang, ${customerName}!`}
                {activeTab === "my-booking" && "My Appointments Scheduler"}
                {activeTab === "queue" && "Realtime Queue Status Monitor"}
                {activeTab === "history" && "Grooming Archive Invoice logs"}
                {activeTab === "profile" && "Account Profile Settings"}
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                {activeTab === "dashboard" && "Pantau status pesanan salon, detail antrean, dan capster andalan Anda."}
                {activeTab === "my-booking" && "Lihat atau sesuaikan slot treatment rambut yang sudah terjadwal."}
                {activeTab === "queue" && "Lihat progres timeline real-time antrean capster Anda agar tidak telat datang."}
                {activeTab === "history" && "Catatan digital seluruh invoice transaksi potongan rambut Anda."}
                {activeTab === "profile" && "Mutasikan kontak email dan verifikasi verifikasi biometrik Anda."}
              </p>
            </div>
          </div>

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              
              {/* Dashboard stats panel widgets */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wide block">Upcoming Booking</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">{activeBookings.length}</p>
                  <span className="text-[10px] text-green-500 font-mono">Slot Terjadwalkan Aman</span>
                </div>
                
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wide block">Total Booking Count</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gold font-display mt-2">{myBookings.length}</p>
                  <span className="text-[10px] text-neutral-500 font-mono">Tercatat Selama Bermitra</span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850 col-span-2 lg:col-span-1">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wide block">Favorite Capster Roster</span>
                  <div className="flex items-center gap-3 mt-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                      alt="Capster"
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">Andra Maulana</h4>
                      <p className="text-[10px] text-gold font-mono">★ 4.9 (Master Skin Fade)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIVE QUEUE WIDGET */}
              {activeQueueItem ? (
                <div className="p-6 rounded-2xl bg-neutral-900 border border-gold/15 shadow-xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/5 blur-[80px] pointer-events-none rounded-full" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-850">
                    <div>
                      <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">⚡ Active Queue Tracking Live</span>
                      <h3 className="text-base font-bold text-white mt-1">{activeQueueItem.barbershopName}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-500 block">Antrean Anda</span>
                        <span className="text-base sm:text-lg font-bold text-gold font-mono">{activeQueueItem.queueNumber || "A-012"}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-500 block">Estimasi Tunggu</span>
                        <span className="text-base sm:text-lg font-bold text-white font-mono">{activeQueueItem.estimatedTime || "15 mins"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Realtime progress timeline scheduler */}
                  <div>
                    <span className="text-xs text-neutral-400 font-semibold mb-4 block">Progres Antrean Cukur</span>
                    <div className="grid grid-cols-3 gap-4 relative">
                      {[
                        { step: "Waiting", desc: "Mengantre", isColor: activeQueueItem.status === "Waiting" || activeQueueItem.status === "Processing" || activeQueueItem.status === "Completed" },
                        { step: "Processing", desc: "Sedang Dicukur", isColor: activeQueueItem.status === "Processing" || activeQueueItem.status === "Completed" },
                        { step: "Completed", desc: "Selesai", isColor: activeQueueItem.status === "Completed" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              item.isColor ? "bg-gold text-black" : "bg-neutral-800 text-neutral-500"
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <span className={`text-[11px] font-semibold mt-2 ${item.isColor ? "text-white" : "text-neutral-500"}`}>{item.step}</span>
                          <span className="text-[9px] text-neutral-500 uppercase mt-0.5">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-4 border-t border-neutral-850 text-neutral-500">
                    <span>Layanan: {activeQueueItem.service.name}</span>
                    <span>Capster: {activeQueueItem.capster.name}</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-850 flex flex-col items-center text-center py-10">
                  <Scissors className="w-10 h-10 text-neutral-600 mb-3" />
                  <h4 className="text-sm font-semibold text-white">Tidak ada antrean aktif</h4>
                  <p className="text-xs text-neutral-500 mt-1 mb-4">Mulai cari barbershop terdekat untuk mengamankan slot cukur Anda.</p>
                  <button
                    onClick={() => onSetView("directory")}
                    className="px-5 py-2.5 bg-gold hover:bg-gold-hover text-black text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Booking Barber Sekarang
                  </button>
                </div>
              )}

              {/* UPCOMING BOOKING DATA LIST */}
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-850">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-850 pb-3">Upcoming Bookings List</h3>
                {activeBookings.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-4 italic text-center">Belum ada booking terjadwal mendatang.</p>
                ) : (
                  <div className="space-y-4">
                    {activeBookings.map((b) => (
                      <div key={b.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] text-neutral-500 block">Jadwal</span>
                          <span className="text-xs font-bold text-white font-mono">{b.date} @ {b.time}</span>
                          <h4 className="text-xs font-semibold text-neutral-300 mt-1">{b.barbershopName}</h4>
                          <span className="text-[10px] text-neutral-500">{b.service.name} / Capster: {b.capster.name}</span>
                        </div>

                        <div className="flex items-center gap-3 justify-between sm:justify-end">
                          <span className="text-xs px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-gold font-mono">
                            {b.status}
                          </span>
                          <button
                            onClick={() => onCancelBooking(b.id)}
                            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 text-[10px] rounded-lg cursor-pointer transition-colors"
                          >
                            Cancel Slot
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MY BOOKINGS LIST */}
          {activeTab === "my-booking" && (
            <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-6">
              <h3 className="text-base font-bold text-white">Kelola Booking & Reservasi Anda</h3>
              <p className="text-xs text-neutral-500">Berikut adalah daftar lengkap reservasi aktif Anda. Pembatalan hanya dapat dilakukan selambat-lambatnya 1 jam sebelum jadwal dimulai.</p>
              
              <div className="space-y-4">
                {myBookings.map((b) => (
                  <div key={b.id} className="p-5 rounded-xl bg-neutral-950 border border-neutral-850 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono font-bold">{b.id}</span>
                        <span className="text-xs text-gold font-bold font-mono">Rp {b.service.price.toLocaleString()}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1.5">{b.barbershopName}</h4>
                      <p className="text-xs text-neutral-400">{b.service.name} • Bersama {b.capster.name}</p>
                      <p className="text-[10px] text-neutral-500 font-mono mt-1">Scheduled: {b.date} @ {b.time}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-neutral-900 pt-3 sm:pt-0">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        b.status === "Waiting" || b.status === "Pending" ? "bg-yellow-500/10 text-yellow-500" :
                        b.status === "Processing" ? "bg-green-500/10 text-green-500" : "bg-neutral-850 text-neutral-500"
                      }`}>{b.status}</span>
                      
                      {(b.status === "Pending" || b.status === "Waiting") && (
                        <button
                          onClick={() => onCancelBooking(b.id)}
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REALTIME QUEUE DETAIL SECTION */}
          {activeTab === "queue" && (
            <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-6">
              <h3 className="text-base font-bold text-white">Live Antrean Antar-Cabang</h3>
              <p className="text-xs text-neutral-500">
                Pembaruan antrean terjadi langsung tiap kali capster salon mengklik "Selesai" untuk pelanggan sebelumnya di dashboard konsol.
              </p>

              {activeQueueItem ? (
                <div className="space-y-6">
                  <div className="p-5 rounded-xl bg-neutral-950 border border-gold/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Cabang: {activeQueueItem.barbershopName}</h4>
                      <p className="text-xs text-neutral-400 mt-1">Treatment: {activeQueueItem.service.name}</p>
                      <p className="text-xs text-neutral-500">Capster yang Melayani: {activeQueueItem.capster.name}</p>
                    </div>

                    <div className="flex gap-6">
                      <div className="bg-neutral-900 px-4 py-2.5 rounded-lg border border-neutral-800">
                        <span className="text-[10px] text-neutral-500 block">Nomor Kupon</span>
                        <span className="text-xl font-extrabold text-gold font-mono">{activeQueueItem.queueNumber || "A-012"}</span>
                      </div>
                      <div className="bg-neutral-900 px-4 py-2.5 rounded-lg border border-neutral-800">
                        <span className="text-[10px] text-neutral-500 block">Sisa Estimasi</span>
                        <span className="text-xl font-extrabold text-white font-mono">{activeQueueItem.estimatedTime || "15 mins"}</span>
                      </div>
                    </div>
                  </div>

                  {/* High Quality Timeline track */}
                  <div className="relative pl-6 border-l-2 border-dashed border-neutral-800 space-y-8 py-3">
                    <div className="relative">
                      <span className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        activeQueueItem.status === "Waiting" || activeQueueItem.status === "Processing" || activeQueueItem.status === "Completed"
                          ? "bg-gold text-black" : "bg-neutral-800 text-neutral-500"
                      }`}>1</span>
                      <h4 className="text-xs font-bold text-white">Antrean Masuk (Waiting Queue)</h4>
                      <p className="text-[11px] text-neutral-500">Akun Anda sedang terdaftar aman di Server BarberHub. Silakan bertolak menuju lokasi barbershop.</p>
                    </div>

                    <div className="relative">
                      <span className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        activeQueueItem.status === "Processing" || activeQueueItem.status === "Completed"
                          ? "bg-gold text-black" : "bg-neutral-800 text-neutral-500"
                      }`}>2</span>
                      <h4 className="text-xs font-bold text-white">Sedang Diproses (Processing Styling)</h4>
                      <p className="text-[11px] text-neutral-500">Capster sedang merapikan potongan rambut Anda. Santai di kursi premium dengan handuk hangat.</p>
                    </div>

                    <div className="relative">
                      <span className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        activeQueueItem.status === "Completed"
                          ? "bg-gold text-black" : "bg-neutral-800 text-neutral-500"
                      }`}>3</span>
                      <h4 className="text-xs font-bold text-white">Selesai (Completed & Payment)</h4>
                      <p className="text-[11px] text-neutral-500">Proses pencukuran rapi sempurna! Invoice dicatat digital.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-neutral-500 font-sans italic text-center py-8">Anda tidak memiliki antrean aktif hari ini.</p>
              )}
            </div>
          )}

          {/* TAB 4: BOOKING HISTORY TABLE */}
          {activeTab === "history" && (
            <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-6">
              <h3 className="text-base font-bold text-white">Archive Transaksi & Riwayat Potongan</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300 font-sans min-w-[500px]">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-500 bg-neutral-950 font-mono uppercase tracking-wider">
                      <th className="p-4 rounded-tl-xl">Invoice ID</th>
                      <th className="p-4">Tanggal / Jam</th>
                      <th className="p-4">Mitra Barbershop</th>
                      <th className="p-4">Capster</th>
                      <th className="p-4">Biaya</th>
                      <th className="p-4 rounded-tr-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedBookings.map((b) => (
                      <tr key={b.id} className="border-b border-neutral-800 hover:bg-neutral-850/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-neutral-400">{b.id}</td>
                        <td className="p-4">{b.date} • {b.time}</td>
                        <td className="p-4 text-white font-semibold">{b.barbershopName}</td>
                        <td className="p-4">{b.capster.name}</td>
                        <td className="p-4 font-mono text-gold font-semibold">Rp {b.service.price.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            b.status === "Completed" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                          }`}>{b.status}</span>
                        </td>
                      </tr>
                    ))}
                    {completedBookings.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-neutral-600 italic">No historical records.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE EDIT PANEL */}
          {activeTab === "profile" && (
            <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl">
              <h3 className="text-base font-bold text-white mb-6">Edit Profile Customer</h3>
              
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-2">Customer Full Name</label>
                  <input
                    type="text"
                    required
                    defaultValue={customerName}
                    disabled
                    className="block w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-400 focus:outline-none cursor-not-allowed"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">Nama divalidasi aman via NIK atau Auth token.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-2">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-2">E-mail Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-2">Delivery and Home Cut Address (Optional)</label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gold hover:bg-gold-hover text-black font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Simpan Perubahan Profile
                  </button>
                </div>

                {isSaved && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded-xl pr-3 font-semibold">
                    ✓ Profile Sukses Diperbarui secara instan!
                  </div>
                )}
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
