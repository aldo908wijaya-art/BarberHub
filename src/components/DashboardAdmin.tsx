import React, { useState } from "react";
import { ShieldCheck, UserCheck, ShieldAlert, BarChart3, Activity, Terminal, Check, X, Users, BadgeCheck, FileText, CheckCircle, Clock } from "lucide-react";
import { PartnerVerificationRequest, STATISTICS_DATA } from "../data";
import AnalyticsCharts from "./AnalyticsCharts";

interface DashboardAdminProps {
  requests: PartnerVerificationRequest[];
  onApproveRequest: (id: string) => void;
  onRejectRequest: (id: string) => void;
}

export default function DashboardAdmin({
  requests,
  onApproveRequest,
  onRejectRequest
}: DashboardAdminProps) {
  const [activeTab, setActiveTab] = useState<"verification" | "monitoring" | "stats">("verification");

  // Local simulated server diagnostics lines
  const [liveLogs, setLiveLogs] = useState<string[]>([
    "[SYSTEM] 2026-06-21 14:12:05 - BarberHub Core online.",
    "[ROUTING] 2026-06-21 14:12:08 - Route GET /api/barbershops - 200 OK (8ms)",
    "[OAUTH] 2026-06-21 14:12:15 - Active sessions parsed verified: 12,401 users",
    "[SECURITY] 2026-06-21 14:12:20 - SSL handshake validated safely. Cloud Run region: asia-east1",
    "[DOCKER] 2026-06-21 14:14:02 - Active reverse proxy ingress bound correctly to port 3000"
  ]);

  const addSimulatedLog = () => {
    const hoursStr = new Date().toLocaleTimeString();
    const mockLogs = [
      `[API] ${hoursStr} - Resolved booking pipeline payload successfully. Status codes: 201 Created`,
      `[DATABASE] ${hoursStr} - Firestore query completed. Document reference fetched in 4ms`,
      `[EVENT] ${hoursStr} - Real-time queue sync emitted for client cluster: #BK-8023`,
      `[CRON] ${hoursStr} - Nightly queue sequence reset checks executed successfully`
    ];
    const item = mockLogs[Math.floor(Math.random() * mockLogs.length)];
    setLiveLogs((prev) => [...prev.slice(-8), item]); // keep last 10 lines
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT ADMIN MENU PANEL */}
        <div className="w-full lg:w-64 flex-shrink-0 bg-neutral-900 border border-neutral-850 p-6 rounded-2xl space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-850">
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center border border-gold/15">
              <ShieldCheck className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="text-[10px] text-gold font-mono uppercase tracking-widest font-bold">Admin Panel</p>
              <h4 className="text-xs sm:text-sm font-bold text-white">Platform Master</h4>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "verification", label: "Partner Verifications", icon: UserCheck },
              { id: "monitoring", label: "Platform Monitoring", icon: Activity },
              { id: "stats", label: "Analytics Reports", icon: BarChart3 }
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

          <div className="pt-6 border-t border-neutral-850">
            <button
              onClick={addSimulatedLog}
              className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-750 text-white border border-neutral-700 rounded-xl text-[11px] font-mono cursor-pointer transition-colors"
            >
              ⚡ Inject Diagnostic Event
            </button>
          </div>
        </div>

        {/* RIGHT MASTER DISPLAY BOARD */}
        <div className="flex-grow space-y-6">
          
          {/* Header diagnostic parameters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-neutral-900 border border-neutral-850 rounded-2xl gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
                {activeTab === "verification" && "Partner Business License approvals"}
                {activeTab === "monitoring" && "Real-time Telemetry & Logs"}
                {activeTab === "stats" && "Global Platforms Growth index"}
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                {activeTab === "verification" && "Verifikasi kelayakan dokumen hukum SIUP/NIB mitra salon baru untuk go-live gratis."}
                {activeTab === "monitoring" && "Pantau latensi server, ketersediaan CPU sandbox, dan urutan log reverse proxy Nginx."}
                {activeTab === "stats" && "Grafik performa gabungan omzet kotor, total booking, dan pendaftaran mitra barbershop."}
              </p>
            </div>
            
            <div className="px-4 py-2 bg-neutral-950 border border-neutral-850 rounded-xl font-mono text-[10px] text-green-500 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span>Core Host Online (Port 3000)</span>
            </div>
          </div>

          {/* ADMIN SUMMARY METRIC WIDGETS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850">
              <span className="text-[10px] text-neutral-500 font-mono uppercase block">Total Users platform</span>
              <p className="text-xl sm:text-2xl font-extrabold text-white mt-2 font-display">14,208</p>
              <span className="text-[10px] text-green-500 font-mono">▲ +1,405 this week</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850">
              <span className="text-[10px] text-neutral-500 font-mono uppercase block">Verified Partners</span>
              <p className="text-xl sm:text-2xl font-extrabold text-white mt-2 font-display">184 Business</p>
              <span className="text-[10px] text-gold font-mono">★ Active in 12 cities</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850">
              <span className="text-[10px] text-neutral-500 font-mono uppercase block">Active Live Queue</span>
              <p className="text-xl sm:text-2xl font-extrabold text-gold mt-2 font-display">124 Tickets</p>
              <span className="text-[10px] text-neutral-400 font-mono">Across all partner salons</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-850">
              <span className="text-[10px] text-neutral-500 font-mono uppercase block">Platform Uptime</span>
              <p className="text-xl sm:text-2xl font-extrabold text-green-500 mt-2 font-display">99.99 %</p>
              <span className="text-[10px] text-neutral-500 font-mono">Zero packet loss recorded</span>
            </div>
          </div>

          {/* TAB 1: PARTNER VERIFICATION LIST */}
          {activeTab === "verification" && (
            <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-6">
              <h3 className="text-base font-bold text-white">Evaluasi Pengajuan Mitra Salon Baru</h3>
              <p className="text-xs text-neutral-500">Tinjau keselarasan dokumen SIUP milik pemilik bisnis sebelum menyetujui ketersediaan status mereka ke publik.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300 min-w-[620px]">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-500 font-mono uppercase">
                      <th className="p-3.5">ID Reg</th>
                      <th className="p-3.5">Owner / Bisnis</th>
                      <th className="p-3.5">Wilayah Alamat</th>
                      <th className="p-3.5">Dokumen SIUP Hukum</th>
                      <th className="p-3.5">Status Pengajuan</th>
                      <th className="p-3.5 text-right rounded-tr-xl">Aksi Persetujuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id} className="border-b border-neutral-800 hover:bg-neutral-850/50 transition-colors">
                        <td className="p-3.5 font-mono text-neutral-400 font-bold">{req.id}</td>
                        <td className="p-3.5">
                          <p className="text-white font-bold">{req.barberName}</p>
                          <p className="text-[10px] text-neutral-500">Owner: {req.ownerName} ({req.ownerPhone})</p>
                        </td>
                        <td className="p-3.5 max-w-[150px] truncate" title={req.address}>{req.address}</td>
                        <td className="p-3.5 text-gold font-mono flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-gold" /> {req.documentName}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            req.status === "Approved" ? "bg-green-500/10 text-green-500" :
                            req.status === "Rejected" ? "bg-red-500/10 text-red-500" :
                            "bg-yellow-500/10 text-gold animate-pulse font-bold"
                          }`}>{req.status}</span>
                        </td>
                        <td className="p-3.5 text-right">
                          {req.status === "Pending" ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => onApproveRequest(req.id)}
                                className="p-1 px-2.5 bg-green-500 hover:bg-green-600 text-white text-[11px] font-bold rounded cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Approve
                              </button>
                              <button
                                onClick={() => onRejectRequest(req.id)}
                                className="p-1 px-2.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 text-[11px] font-bold rounded cursor-pointer flex items-center gap-1"
                              >
                                <X className="w-3.5 h-3.5" /> Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-neutral-500 italic">Diselesaikan ({req.dateRequested})</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SYSTEM MONITORING DIAGNOSTICS */}
          {activeTab === "monitoring" && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Latency meter */}
                <div className="p-5 p-4 rounded-xl bg-neutral-900 border border-neutral-850">
                  <span className="text-[10px] text-neutral-400 font-mono block">PING LATENCY</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-white font-mono">14 ms</span>
                    <span className="text-[10px] text-green-500 font-mono font-bold">EXCELLENT</span>
                  </div>
                </div>

                {/* DB Sync indicator */}
                <div className="p-5 p-4 rounded-xl bg-neutral-900 border border-neutral-850">
                  <span className="text-[10px] text-neutral-400 font-mono block">DATABASE CLUSTERS</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-white font-mono">Firestore</span>
                    <span className="text-[10px] text-green-500 font-mono font-bold">STANDBY</span>
                  </div>
                </div>

                {/* Connection Count */}
                <div className="p-5 p-4 rounded-xl bg-neutral-900 border border-neutral-850">
                  <span className="text-[10px] text-neutral-400 font-mono block">ACTIVE WS CHANNELS</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold text-gold font-mono">1.2k req/s</span>
                    <span className="text-[10px] text-neutral-500">Live sockets count</span>
                  </div>
                </div>

              </div>

              {/* SHELL-LIKE LIVE TERMINAL LOGS */}
              <div className="p-6 bg-black border border-neutral-850 rounded-2xl space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-900 text-neutral-500">
                  <span className="text-xs font-mono font-bold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-gold" /> DIAGNOSTIC CONSOLE STREAM
                  </span>
                  <span className="text-[10px] font-mono">CPU Usage: 4%</span>
                </div>

                <div className="font-mono text-[11px] text-green-400 space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                  {liveLogs.map((log, idx) => (
                    <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLATFORM ANALYTICS CORES */}
          {activeTab === "stats" && (
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
    </div>
  );
}
