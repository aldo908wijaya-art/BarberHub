import React from "react";
import { Scissors, MapPin, Star, CalendarDays, Award, ChevronRight, CheckCircle2, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import { Barbershop } from "../data";

interface HomeSectionProps {
  barbershops: Barbershop[];
  onNavigate: (view: string, targetBarbershopId?: string) => void;
  onSetUserRole: (role: "visitor" | "customer" | "partner" | "admin") => void;
  userRole: string;
}

export default function HomeSection({ barbershops, onNavigate, onSetUserRole, userRole }: HomeSectionProps) {
  return (
    <div className="bg-neutral-950 font-sans">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-200px] left-[20%] w-[600px] h-[600px] rounded-full bg-gold/5 blur-[150px]" />
        <div className="absolute top-[100px] right-[10%] w-[400px] h-[400px] rounded-full bg-gold/10 blur-[130px]" />
      </div>

      {/* Hero Section */}
      <section id="home-hero" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-36 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-6 tracking-wide border border-gold/20 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" /> Platform Booking Barber #1 Indonesia
        </span>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display mb-6">
          Booking Barber <span className="gold-text-gradient block sm:inline">Tanpa Antre</span>
        </h1>
        
        <p className="text-base sm:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Cari barber favorit, pilih capster terbaik, booking online instan. Nikmati layanan premium kelas dunia tanpa waktu tunggu berharga yang terbuang sia-sia.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => onNavigate("directory")}
            className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-hover text-black font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Scissors className="w-5 h-5 text-black" /> Booking Now
          </button>
          <button
            onClick={() => onNavigate("auth-register-partner")}
            className="w-full sm:w-auto px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl tracking-wide border border-neutral-800 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Become Partner
          </button>
        </div>

        {/* Floating Quick Feature Tags */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-neutral-900 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/10">
              <CheckCircle2 className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Garansi Tanpa Antre</p>
              <p className="text-xs text-neutral-500">Antrean terekam presisi</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/10">
              <Award className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Master Capsters</p>
              <p className="text-xs text-neutral-500">Pakar penata rambut elite</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/10">
              <CalendarDays className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Smart Scheduler</p>
              <p className="text-xs text-neutral-500">Pilih jam real-time</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/10">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Secure Cashless</p>
              <p className="text-xs text-neutral-500">Bayar online dengan mudah</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Barbershops Section */}
      <section className="bg-neutral-900/40 py-20 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2 font-mono">Our Curated Partners</p>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">Featured Barbershops</h2>
            </div>
            <button
              onClick={() => onNavigate("directory")}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-gold hover:text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              See All Barbershops <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbershops.slice(0, 3).map((shop) => (
              <div
                key={shop.id}
                className="group rounded-2xl bg-neutral-900 border border-neutral-800/80 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:border-gold/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)]"
              >
                <div className="relative h-48 overflow-hidden bg-neutral-950">
                  <img
                    src={shop.coverImage}
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-gold text-xs font-semibold font-mono tracking-wider px-2.5 py-1 rounded-full border border-gold/20 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold stroke-gold" /> {shop.rating}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-neutral-700 font-mono">
                    {shop.location}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 font-display">{shop.name}</h3>
                  <p className="text-xs text-neutral-400 mb-4 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" /> {shop.address}
                  </p>
                  <p className="text-xs text-neutral-500 line-clamp-2 mb-6 leading-relaxed">
                    {shop.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
                    <span className="text-xs text-neutral-400 font-mono">{shop.priceRange}</span>
                    <button
                      onClick={() => onNavigate("barber-detail", shop.id)}
                      className="px-4 py-2 bg-gradient-to-r from-neutral-800 to-neutral-850 hover:from-gold hover:to-gold-hover hover:text-black text-white text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      Book Spot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2 font-mono">Simple & Intuitive</p>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mb-16">Bagaimana BarberHub Bekerja</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative p-6 rounded-2xl bg-neutral-900/30 border border-neutral-900 text-left">
              <span className="absolute -top-6 left-6 w-12 h-12 bg-neutral-900 font-display text-gold text-xl font-bold flex items-center justify-center rounded-xl border border-gold/20">01</span>
              <h3 className="text-base font-bold text-white mb-2 mt-4">Cari Barbershop</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Filter berdasarkan lokasi terdekat, rentang harga, rating, atau ketersediaan jam operasional secara real-time.
              </p>
            </div>
            
            <div className="relative p-6 rounded-2xl bg-neutral-900/30 border border-neutral-900 text-left">
              <span className="absolute -top-6 left-6 w-12 h-12 bg-neutral-900 font-display text-gold text-xl font-bold flex items-center justify-center rounded-xl border border-gold/20">02</span>
              <h3 className="text-base font-bold text-white mb-2 mt-4">Pilih Capster</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Lihat spesialisasi capster, portofolio hasil cukuran, pengalaman mereka, dan ulasan dari pelanggan sebelumnya.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-neutral-900/30 border border-neutral-900 text-left">
              <span className="absolute -top-6 left-6 w-12 h-12 bg-neutral-900 font-display text-gold text-xl font-bold flex items-center justify-center rounded-xl border border-gold/20">03</span>
              <h3 className="text-base font-bold text-white mb-2 mt-4">Booking & Bayar</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Tentukan hari dan jam presisi, amankan slot layanan tanpa antrean pusing, bayar online atau di kasir.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-neutral-900/30 border border-neutral-900 text-left">
              <span className="absolute -top-6 left-6 w-12 h-12 bg-neutral-900 font-display text-gold text-xl font-bold flex items-center justify-center rounded-xl border border-gold/20">04</span>
              <h3 className="text-base font-bold text-white mb-2 mt-4">Datang & Nikmati</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Duduk santai di barbershop tanpa menunggu lama, langsung dilayani oleh capster andalan pada jam yang Anda pilih.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-neutral-900/40 py-20 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2 font-mono">Testimonials</p>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mb-12">Customer Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center gap-1 text-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold" />
                ))}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                "Udah males banget antre di barbershop konvensional yang bisa nunggu 1-2 jam. Pake BarberHub tinggal pesen sebelum jalan, nyampe langsung dicukur! Mantap banget."
              </p>
              <div className="border-t border-neutral-800/80 pt-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 text-gold font-bold text-xs flex items-center justify-center">KW</div>
                <div>
                  <h4 className="text-xs font-bold text-white">Kevin Wijaya</h4>
                  <p className="text-[10px] text-neutral-500">Jakarta Selatan</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center gap-1 text-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold" />
                ))}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                "Suka banget sama transparansi portofolio capsternya. Bisa ngeliat keahlian masing-masing capster dulu sebelum milih. Potongannya rapi sesuai ekspektasi!"
              </p>
              <div className="border-t border-neutral-800/80 pt-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 text-gold font-bold text-xs flex items-center justify-center">RY</div>
                <div>
                  <h4 className="text-xs font-bold text-white">Rivaldy Yusuf</h4>
                  <p className="text-[10px] text-neutral-500">Bandung</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center gap-1 text-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold" />
                ))}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                "Sebagai pemilik Barbershop, platform partner BarberHub ini ngebantu banget ngelolain giliran (queue) online dan walk-in secara bersandingan. Rekomendasi 100%!"
              </p>
              <div className="border-t border-neutral-800/80 pt-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 text-gold font-bold text-xs flex items-center justify-center">AS</div>
                <div>
                  <h4 className="text-xs font-bold text-white">Andri Setiawan</h4>
                  <p className="text-[10px] text-neutral-500">Owner, Gilded Razor PIK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="bg-neutral-900/60 py-16 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-white font-display">14K+</p>
              <p className="text-xs text-neutral-400 mt-2 font-medium">Pelanggan Aktif</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-gold font-display">180+</p>
              <p className="text-xs text-neutral-400 mt-2 font-medium">Mitra Barbershop</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-white font-display">85K++</p>
              <p className="text-xs text-neutral-400 mt-2 font-medium">Total Cukuran Berhasil</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-gold font-display">4.9</p>
              <p className="text-xs text-neutral-400 mt-2 font-medium">Rating Kepuasan</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 glass-panel-gold p-12 rounded-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">Apakah Anda Pemilik Barbershop?</h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto mb-8">
            Bergabunglah bersama ratusan mitra barbershop modern lainnya. Atur pemesanan online, catat antrean walk-in, dan tingkatan omzet barbershop Anda hingga 150%!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onNavigate("auth-register-partner")}
              className="px-8 py-3 bg-gold hover:bg-gold-hover text-black font-semibold rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Daftar Jadi Mitra Sekarang
            </button>
            <button
              onClick={() => onNavigate("directory")}
              className="px-8 py-3 bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 font-semibold rounded-xl transition-all cursor-pointer"
            >
              Booking Sebagai Customer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
