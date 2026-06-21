import React, { useState } from "react";
import { Mail, Lock, User, Phone, MapPin, FileText, Check, Scissors, Chrome } from "lucide-react";

interface AuthSectionProps {
  initialMode: "login" | "register-customer" | "register-partner";
  onAuthSuccess: (user: { name: string; role: "customer" | "partner" }) => void;
  onNavigate: (view: string) => void;
}

export default function AuthSection({ initialMode, onAuthSuccess, onNavigate }: AuthSectionProps) {
  const [mode, setMode] = useState(initialMode);
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState("aldo908wijaya@gmail.com");
  const [loginPassword, setLoginPassword] = useState("******");
  const [rememberMe, setRememberMe] = useState(true);

  // Register Customer states
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custPassword, setCustPassword] = useState("");

  // Register Partner states
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [barberName, setBarberName] = useState("");
  const [barberAddress, setBarberAddress] = useState("");
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [documentName, setDocumentName] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthSuccess({
      name: loginEmail.split("@")[0],
      role: "customer"
    });
  };

  const handleRegisterCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthSuccess({
      name: custName || "Guest Customer",
      role: "customer"
    });
  };

  const handleRegisterPartner = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthSuccess({
      name: ownerName || "Guest Partner",
      role: "partner"
    });
  };

  const simulateDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentName(e.target.files[0].name);
      setDocumentUploaded(true);
    }
  };

  return (
    <div className="min-y-screen flex items-center justify-center px-4 py-16 bg-neutral-950 text-white font-sans relative">
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg glass-panel p-8 sm:p-10 rounded-2xl border border-neutral-800 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center border border-gold/20 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Scissors className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            {mode === "login"
              ? "Sign In to BarberHub"
              : mode === "register-customer"
              ? "Daftar Akun Baru"
              : "Become Partner Mitra"}
          </h2>
          <p className="text-xs text-neutral-400 mt-2">
            {mode === "login"
              ? "Nikmati booking layanan premium tanpa ngantre."
              : mode === "register-customer"
              ? "Cari capster terbaik Anda dan catat jadwal instan."
              : "Kelola operasional & antrean barbershop Anda secara eksklusif."}
          </p>
        </div>

        {/* Form Selector Tabs (For toggling between Customer Register and Partner Register) */}
        {mode !== "login" && (
          <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-900 rounded-lg mb-6">
            <button
              onClick={() => setMode("register-customer")}
              className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                mode === "register-customer" ? "bg-gold text-black shadow-md" : "text-neutral-400 hover:text-white"
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setMode("register-partner")}
              className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                mode === "register-partner" ? "bg-gold text-black shadow-md" : "text-neutral-400 hover:text-white"
              }`}
            >
              Partner / Barber
            </button>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold transition-colors focus:ring-1 focus:ring-gold"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-medium text-neutral-400">Password</label>
                <a href="#" className="text-[10px] text-gold hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold transition-colors focus:ring-1 focus:ring-gold"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-gold h-4 w-4 rounded dark:bg-neutral-900 border-neutral-800 rounded"
                />
                <span className="text-xs text-neutral-400">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gold hover:bg-gold-hover text-black font-semibold rounded-xl text-xs transition-colors cursor-pointer mt-2"
            >
              Sign In
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-neutral-800"></div>
              <span className="flex-shrink mx-4 text-neutral-500 text-[10px] tracking-widest uppercase">Or Continue with</span>
              <div className="flex-grow border-t border-neutral-800"></div>
            </div>

            <button
              type="button"
              onClick={() => onAuthSuccess({ name: "GoogleUser", role: "customer" })}
              className="w-full py-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-850 text-white rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Chrome className="w-4 h-4 text-white" /> Sign In with Google
            </button>

            <p className="text-center text-xs text-neutral-400 pt-4">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => setMode("register-customer")}
                className="text-gold hover:underline font-semibold cursor-pointer"
              >
                Daftar Akun Baru
              </button>
            </p>
          </form>
        )}

        {/* CUSTOMER REGISTER */}
        {mode === "register-customer" && (
          <form onSubmit={handleRegisterCustomer} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2 font-sans">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Aldo Wijaya"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold transition-colors focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="aldo908wijaya@gmail.com"
                  value={custEmail}
                  onChange={(e) => setCustEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">Phone Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  type="tel"
                  required
                  placeholder="+62 812-3456-7890"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={custPassword}
                  onChange={(e) => setCustPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gold hover:bg-gold-hover text-black font-semibold rounded-xl text-xs transition-colors cursor-pointer mt-4"
            >
              Sign Up Customer
            </button>

            <p className="text-center text-xs text-neutral-400 pt-2">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-gold hover:underline font-semibold cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </form>
        )}

        {/* PARTNER REGISTER */}
        {mode === "register-partner" && (
          <form onSubmit={handleRegisterPartner} className="space-y-4">
            <h4 className="text-xs font-semibold text-gold border-b border-neutral-800 pb-2 mb-2">OWNER DATA</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-medium text-neutral-400 mb-1">Owner Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Steven Dapper"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="block w-full px-3 py-2 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-neutral-400 mb-1">Owner Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+62 811..."
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="block w-full px-3 py-2 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-neutral-400 mb-1">Owner Email</label>
              <input
                type="email"
                required
                placeholder="steven@dappercut.com"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                className="block w-full px-3 py-2.5 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>

            <h4 className="text-xs font-semibold text-gold border-b border-neutral-800 pb-2 pt-2 mb-2">BARBERSHOP BUSINESS PROFILE</h4>

            <div>
              <label className="block text-[10px] font-medium text-neutral-400 mb-1">Barbershop Brand Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Scissors className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Dapper Dan Barbers"
                  value={barberName}
                  onChange={(e) => setBarberName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-neutral-400 mb-1">Operational Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Ruko Crown Golf Blok B-3, PIK, North Jakarta"
                  value={barberAddress}
                  onChange={(e) => setBarberAddress(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-neutral-400 mb-1">Business Registration Certificate (SIUP / SKU / NIB)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-800 border-dashed rounded-xl hover:border-gold/30 transition-colors">
                <div className="space-y-1 text-center">
                  <FileText className="mx-auto h-8 w-8 text-neutral-500" />
                  <div className="flex text-xs text-neutral-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-neutral-950 font-semibold text-gold hover:text-gold-hover">
                      <span>Upload official Document</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={simulateDocumentUpload} />
                    </label>
                    <p className="pl-1">or drag & drop</p>
                  </div>
                  <p className="text-[10px] text-neutral-500">PDF, PNG, JPG up to 10MB</p>
                  {documentUploaded && (
                    <p className="text-xs text-green-500 font-semibold flex items-center justify-center gap-1 mt-2">
                      <Check className="w-3.5 h-3.5" /> {documentName || "SIUP_DapperDan.pdf"} Ready
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gold hover:bg-gold-hover text-black font-semibold rounded-xl text-xs transition-colors cursor-pointer mt-3"
            >
              Submit Business Partnership Apply
            </button>

            <p className="text-center text-xs text-neutral-400 pt-2">
              Sudah bermitra?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-gold hover:underline font-semibold cursor-pointer"
              >
                Sign In Partner
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
