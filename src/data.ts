export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
}

export interface Capster {
  id: string;
  name: string;
  experience: string;
  rating: number;
  photoUrl: string;
  status: "Active" | "On Break" | "Fully Booked";
  specialties: string[];
}

export interface Barbershop {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  address: string;
  location: "Jakarta Selatan" | "Jakarta Barat" | "Jakarta Pusat" | "Tangerang" | "Bandung";
  openHours: string;
  priceRange: string;
  coverImage: string;
  description: string;
  services: Service[];
  capsters: Capster[];
  gallery: string[];
}

export interface Booking {
  id: string;
  barbershopId: string;
  barbershopName: string;
  service: Service;
  capster: Capster;
  date: string;
  time: string;
  status: "Waiting" | "Processing" | "Completed" | "Pending" | "Rejected";
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  queueNumber?: string;
  estimatedTime?: string;
  invoiceNumber: string;
  type: "Online" | "Walk-in";
}

export interface PartnerVerificationRequest {
  id: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  barberName: string;
  address: string;
  documentName: string;
  status: "Pending" | "Approved" | "Rejected";
  dateRequested: string;
}

// Global Luxury Seed Data
export const INITIAL_SERVICES: Service[] = [
  { id: "s1", name: "Premium Royal Cut", price: 150000, duration: 45, description: "Signature precision haircut, hot towel massage, premium pomade styling." },
  { id: "s2", name: "Classic Beard & Shave", price: 80000, duration: 30, description: "Straight-razor detailing, hot lather shave, cooling beard oil therapy." },
  { id: "s3", name: "Hair Grooming & Charcoal Mask", price: 230000, duration: 75, description: "Premium haircut, deep conditioning wash, charcoal peel mask, and face massage." },
  { id: "s4", name: "The Executive treatment combo", price: 350000, duration: 90, description: "Luxury double haircut, beard scupting, golden sheet face care, premium drinks of choice." }
];

export const INITIAL_CAPSTERS: Capster[] = [
  { id: "c1", name: "Andra Maulana", experience: "8 Years", rating: 4.9, photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300", status: "Active", specialties: ["Skin Fade", "Modern Slickback", "Beard Sculpting"] },
  { id: "c2", name: "Bagus Setiawan", experience: "5 Years", rating: 4.8, photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300", status: "Active", specialties: ["Classic Buzz", "French Crop", "Traditional Shave"] },
  { id: "c3", name: "Yudi Pratama", experience: "6 Years", rating: 4.7, photoUrl: "https://images.unsplash.com/photo-1620122303020-43ec4b6cf7f8?auto=format&fit=crop&q=80&w=300", status: "Active", specialties: ["Undercut", "Pompadour Detailing", "Hair Tattoo"] },
  { id: "c4", name: "Hendri Wijaya", experience: "12 Years", rating: 5.0, photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300", status: "On Break", specialties: ["Classic Gentleman Scissors Cut", "Beard detailing"] }
];

export const INITIAL_BARBERSHOPS: Barbershop[] = [
  {
    id: "b1",
    name: "Gilded Razor Guild",
    rating: 4.9,
    reviewsCount: 342,
    address: "Jl. Senopati No. 45, Kebayoran Baru",
    location: "Jakarta Selatan",
    openHours: "09:00 - 21:00",
    priceRange: "Rp 150.000 - Rp 350.000",
    coverImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
    description: "An authentic sanctuary of luxury grooming where traditional barbering meets upscale hospitality. Crafted for the modern refined gentleman who appeciates world-class fades and a selection of aged single-malts.",
    services: INITIAL_SERVICES,
    capsters: INITIAL_CAPSTERS,
    gallery: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=500"
    ]
  },
  {
    id: "b2",
    name: "Classic & Co. Whiskeyshop",
    rating: 4.7,
    reviewsCount: 198,
    address: "Kuningan City Mall, Lt. Ground, Jl. Prof. DR. Satrio",
    location: "Jakarta Pusat",
    openHours: "10:00 - 22:00",
    priceRange: "Rp 120.000 - Rp 250.000",
    coverImage: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800",
    description: "Combine your elite styling session with modern luxury whiskey testing of high caliber. Featuring top capsters with a cumulative experience exceeding 20 years in custom aesthetics.",
    services: [INITIAL_SERVICES[0], INITIAL_SERVICES[1]],
    capsters: [INITIAL_CAPSTERS[1], INITIAL_CAPSTERS[2]],
    gallery: [
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1599351431247-f5094087e593?auto=format&fit=crop&q=80&w=500"
    ]
  },
  {
    id: "b3",
    name: "The Obsidian Black Lounge",
    rating: 4.8,
    reviewsCount: 220,
    address: "Paris Van Java, Boulevard Blok B, Sukajadi",
    location: "Bandung",
    openHours: "09:00 - 21:00",
    priceRange: "Rp 130.000 - Rp 300.000",
    coverImage: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=800",
    description: "An ultra-minimalist dark theme boutique barbershop. We focus on low-noise styling with modern ambient low-fi background arrangements. Zero stress, ultimate razor sharpening perfection.",
    services: INITIAL_SERVICES,
    capsters: INITIAL_CAPSTERS,
    gallery: [
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=500"
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-8023",
    barbershopId: "b1",
    barbershopName: "Gilded Razor Guild",
    service: INITIAL_SERVICES[0],
    capster: INITIAL_CAPSTERS[0],
    date: "2026-06-22",
    time: "10:30",
    status: "Pending",
    customerName: "Aldo Wijaya",
    customerPhone: "+62 812-3456-7890",
    customerEmail: "aldo908wijaya@gmail.com",
    invoiceNumber: "INV-20260621-01",
    type: "Online"
  },
  {
    id: "BK-5412",
    barbershopId: "b1",
    barbershopName: "Gilded Razor Guild",
    service: INITIAL_SERVICES[2],
    capster: INITIAL_CAPSTERS[1],
    date: "2026-06-21",
    time: "14:00",
    status: "Processing",
    customerName: "Rian Hendra",
    customerPhone: "+62 821-2233-4455",
    customerEmail: "rian.hendra@example.com",
    queueNumber: "A-012",
    estimatedTime: "20 mins",
    invoiceNumber: "INV-20260621-02",
    type: "Online"
  },
  {
    id: "BK-3392",
    barbershopId: "b1",
    barbershopName: "Gilded Razor Guild",
    service: INITIAL_SERVICES[1],
    capster: INITIAL_CAPSTERS[2],
    date: "2026-06-21",
    time: "15:15",
    status: "Waiting",
    customerName: "Budi Santoso",
    customerPhone: "+62 878-9988-7766",
    customerEmail: "budi.s@example.com",
    queueNumber: "A-013",
    estimatedTime: "45 mins",
    invoiceNumber: "INV-20260621-03",
    type: "Walk-in"
  },
  {
    id: "BK-1102",
    barbershopId: "b2",
    barbershopName: "Classic & Co. Whiskeyshop",
    service: INITIAL_SERVICES[1],
    capster: INITIAL_CAPSTERS[1],
    date: "2026-06-19",
    time: "11:00",
    status: "Completed",
    customerName: "Aldo Wijaya",
    customerPhone: "+62 812-3456-7890",
    customerEmail: "aldo908wijaya@gmail.com",
    invoiceNumber: "INV-20260619-09",
    type: "Online"
  }
];

export const INITIAL_VERIFICATIONS: PartnerVerificationRequest[] = [
  {
    id: "VR-001",
    ownerName: "Steven Dapper",
    ownerEmail: "steven@dappercut.com",
    ownerPhone: "+62 811-9023-1122",
    barberName: "Dapper Dan Barbers & Shave",
    address: "Pantai Indah Kapuk, Ruko Crown Golf Blok B-3",
    documentName: "SIUP_DapperDan_PIK.pdf",
    status: "Pending",
    dateRequested: "2026-06-19"
  },
  {
    id: "VR-002",
    ownerName: "Marcus Aurelius",
    ownerEmail: "marcus@executivegroom.id",
    ownerPhone: "+62 812-4455-0011",
    barberName: "The Executive Groom Room",
    address: "Graha Niaga Kav. 22, SCBD Jakarta Pusat",
    documentName: "Business_License_EGR.pdf",
    status: "Pending",
    dateRequested: "2026-06-20"
  },
  {
    id: "VR-003",
    ownerName: "Beni Wijaya",
    ownerEmail: "beni@benicut.com",
    ownerPhone: "+62 877-6655-2233",
    barberName: "Beni's Vintage Cut",
    address: "Jl. Braga No. 122, Bandung",
    documentName: "SIUP_BenisVintage.pdf",
    status: "Approved",
    dateRequested: "2026-06-15"
  }
];

export const INITIAL_REVIEWS = [
  { id: "r1", userName: "Marcus Cole", rating: 5, comment: "Hands down the best fade in Jakarta. The premium single malt was the perfect touch. Truly a premier experience.", date: "2 Days ago" },
  { id: "r2", userName: "Ahmad Dani", rating: 4.8, comment: "Extremely detailed scissor cut. Capster Bagus is highly professional. The minimalist dark deck is visually very calming.", date: "1 Week ago" },
  { id: "r3", userName: "Farhan Malik", rating: 5, comment: "I am absolutely loving the gold leaf premium grooming. It felt luxurious and completely worth every rupiah.", date: "2 Weeks ago" }
];

export const STATISTICS_DATA = {
  totalUsers: 14208,
  verifiedPartners: 184,
  monthlyBookings: 8420,
  activeQueues: 124,
  revenueThisMonth: 125400000 // Indonesian Rupiah 
};
