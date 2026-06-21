import React from "react";
import { Scissors, Mail, Phone, MapPin, Instagram, Youtube, Facebook } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
  onResetDatabase?: () => void;
}

export default function Footer({ onNavigate, onResetDatabase }: FooterProps) {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 font-sans tracking-wide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <Scissors className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-white">
                Barber<span className="text-gold">Hub</span>
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mb-6">
              Platform revolusioner nomor satu untuk manajemen dan pemesanan layanan barbershop modern se-Indonesia. Menghilangkan waktu antre Anda selamanya.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-neutral-900 hover:bg-gold hover:text-black transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-900 hover:bg-gold hover:text-black transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-900 hover:bg-gold hover:text-black transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider font-display">Layanan Kami</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate("directory")} className="hover:text-gold transition-colors cursor-pointer text-left">
                  Cari Mitra Barbershop dekat saya
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("directory")} className="hover:text-gold transition-colors cursor-pointer text-left">
                  Daftar Capster Pilihan Terbaik
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("auth-login")} className="hover:text-gold transition-colors cursor-pointer text-left">
                  Booking Cepat Online (Instan)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("auth-register-partner")} className="hover:text-gold transition-colors cursor-pointer text-left">
                  Platform Cloud Antrean (Queue)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider font-display">Kemitraan & Karir</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate("auth-register-partner")} className="hover:text-gold transition-colors cursor-pointer text-left">
                  Daftar Sebagai Mitra Salon/Barber
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors text-left block">
                  SOP Standarisasi Capster Hub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors text-left block">
                  Sponsor & Integrasi Brand Pomade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors text-left block">
                  Karir Capster & Sertifikasi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider font-display">Hubungi Kami</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-neutral-500 leading-relaxed">
                  The Premium Plaza, Lt. 12, Senayan, Kebayoran Baru, Jakarta Selatan
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>support@barberhub.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>+62-21-9902-1823</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-600 gap-4">
          <p>© 2026 BarberHub Global Indonesia. All Rights Reserved. Crafted to Perfection.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0 flex-wrap">
            {onResetDatabase && (
              <button
                onClick={onResetDatabase}
                className="text-[10px] px-2.5 py-1 bg-red-950/40 hover:bg-red-900 border border-red-900/40 hover:border-red-600 rounded-md text-red-400 hover:text-white transition-all font-mono font-bold cursor-pointer"
                title="Sapu ulang penyimpanan data sandbox"
              >
                🔄 Reset Data
              </button>
            )}
            <a href="#" className="hover:text-neutral-400 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
