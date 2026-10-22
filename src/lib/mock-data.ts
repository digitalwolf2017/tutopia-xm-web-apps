export interface StudentProfile {
  name: string;
  mobile: string;
  whatsapp: string;
  city: string;
  pincode: string;
  address: string;
  targetExam: string;
  subscriptionPlan: string;
  subscriptionValidUntil: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  highlightText: string;
  price: string;
  phone: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
}

export interface VideoClassCategory {
  id: string;
  title: string;
  slug: string;
  accent: "blue" | "yellow";
  iconType: "book-gear" | "charts" | "bank" | "lightbulb" | "single-bulb";
  itemCountDescription: string;
}

export interface SubjectChapterTopic {
  id: string;
  name: string;
  chapterCount: number;
  completedChapters?: number;
}

export interface SubjectCategoryGroup {
  id: string;
  title: string; // "Mathematics", "Reasoning", "English", "General Knowledge", "Static GK"
  topics: SubjectChapterTopic[];
}

export interface MockTest {
  id: string;
  title: string;
  totalMarks: number;
  durationMinutes: number;
  durationFormatted: string; // "03:00 Hrs"
  lastAttemptedDate: string; // "27-09-2026"
  questionsCount: number;
  status: "not_attempted" | "in_progress" | "completed";
  category: string;
}

export interface LiveBatch {
  id: string;
  title: string; // "SSC RAIL WBCS PSC Batch"
  badge: string; // "WBCS, SSC, Rail, PSC Combined Classes"
  startDate: string; // "30th September, 2026"
  endDate: string; // "15th September, 2027"
  subscriptionType: string; // "Yearly Subscription Model"
  originalPrice: number;
  discountedPrice: number;
  enrolled: boolean;
  upcomingLiveTime?: string;
  bannerTheme?: "blue" | "placeholder" | "dark";
}

export interface ChapterItem {
  id: string;
  name: string;
  slug: string;
  videoCount: number;
  completedVideos?: number;
  description?: string;
}

export interface VideoLesson {
  id: string;
  chapterSlug: string;
  title: string;
  durationFormatted: string;
  durationMinutes: number;
  videoUrl?: string;
  thumbnailPattern?: "teal-geometric" | "blue-waves" | "dark-slate";
  isLocked: boolean;
  order: number;
  facultyName?: string;
}

// ---------------- MOCK DATA COLLECTIONS ----------------

export const mockCurrentUser: StudentProfile = {
  name: "Abhilash Bera",
  mobile: "9734341856",
  whatsapp: "9734341856",
  city: "Kolkata",
  pincode: "700006",
  address: "Sector V, Salt Lake City, Kolkata, West Bengal",
  targetExam: "SSC, RAIL, WBCS",
  subscriptionPlan: "Yearly Combined Mega Subscription",
  subscriptionValidUntil: "15th September, 2027",
};

export const mockPromoBanners: PromoBanner[] = [
  {
    id: "banner-1",
    title: "SSC, PSC, রেলের ১ বছরের প্রস্তুতি",
    subtitle: "কোনো সাহায্যের জন্য যোগাযোগ করো — 9804490328",
    highlightText: "মাত্র ₹১৯৯৯ টাকায়",
    price: "₹1999",
    phone: "9804490328",
    ctaText: "এখনই শুরু করো",
    ctaLink: "/live-classes",
    bgGradient: "from-sky-700 via-sky-800 to-indigo-900",
  },
  {
    id: "banner-2",
    title: "WBCS 2026 Foundation Live Batch",
    subtitle: "টপ ফ্যাকাল্টিদের সাথে লাইভ ইন্টারঅ্যাক্টিভ ক্লাস ও স্টাডি মেটেরিয়াল",
    highlightText: "ফ্রি ডেমো ক্লাস লাইভ",
    price: "₹2499",
    phone: "9804490328",
    ctaText: "Join Demo",
    ctaLink: "/live-classes",
    bgGradient: "from-amber-600 via-amber-700 to-slate-900",
  },
  {
    id: "banner-3",
    title: "100+ All Bengal Mock Test Series",
    subtitle: "TCS iON CBT প্যাটার্ন টেস্ট ও বিস্তারিত ফলাফল বিশ্লেষণ",
    highlightText: "নতুন মক টেস্ট অ্যাড হয়েছে",
    price: "₹499",
    phone: "9804490328",
    ctaText: "টেস্ট দাও",
    ctaLink: "/mock-tests",
    bgGradient: "from-blue-800 via-sky-800 to-cyan-900",
  },
];

export const mockVideoClassCategories: VideoClassCategory[] = [
  {
    id: "ssc-rail-wbcs",
    title: "SSC, RAIL, WBCS",
    slug: "ssc-rail-wbcs",
    accent: "blue",
    iconType: "book-gear",
    itemCountDescription: "Complete Combined Track",
  },
  {
    id: "exams-portal",
    title: "Exams Portal",
    slug: "exams-portal",
    accent: "yellow",
    iconType: "charts",
    itemCountDescription: "Syllabus & Notifications",
  },
  {
    id: "all-bank-exams",
    title: "All Bank Exams",
    slug: "all-bank-exams",
    accent: "yellow",
    iconType: "bank",
    itemCountDescription: "IBPS, SBI PO & Clerk",
  },
  {
    id: "gk-class-9-12",
    title: "GK From Class 9 to 12",
    slug: "gk-class-9-12",
    accent: "blue",
    iconType: "lightbulb",
    itemCountDescription: "Foundational Board GK",
  },
  {
    id: "one-line-gk",
    title: "One Line GK",
    slug: "one-line-gk",
    accent: "blue",
    iconType: "single-bulb",
    itemCountDescription: "Quick Revision Capsule",
  },
];

export const mockSubjectHierarchy: Record<string, SubjectCategoryGroup[]> = {
  "ssc-rail-wbcs": [
    {
      id: "mathematics",
      title: "Mathematics",
      topics: [
        { id: "arithmetic", name: "Arithmetic", chapterCount: 1, completedChapters: 1 },
        { id: "algebra", name: "Algebra", chapterCount: 0, completedChapters: 0 },
        { id: "geometry", name: "Geometry", chapterCount: 0, completedChapters: 0 },
        { id: "trigo", name: "Trigo", chapterCount: 1, completedChapters: 0 },
        { id: "di", name: "D.I", chapterCount: 0, completedChapters: 0 },
        { id: "2d-3d", name: "2D / 3D", chapterCount: 0, completedChapters: 0 },
      ],
    },
    {
      id: "reasoning",
      title: "Reasoning",
      topics: [
        { id: "verbal-reasoning", name: "Verbal Reasoning", chapterCount: 0, completedChapters: 0 },
        { id: "non-verbal-reasoning", name: "Non verbal Reasoning", chapterCount: 0, completedChapters: 0 },
      ],
    },
    {
      id: "english",
      title: "English",
      topics: [
        { id: "english-grammar", name: "Englisg Grammer", chapterCount: 12, completedChapters: 4 },
        { id: "word-power", name: "Word Power", chapterCount: 1, completedChapters: 1 },
        { id: "rc", name: "RC", chapterCount: 2, completedChapters: 1 },
      ],
    },
    {
      id: "general-knowledge",
      title: "General Knowledge",
      topics: [
        { id: "history", name: "History", chapterCount: 0, completedChapters: 0 },
        { id: "geography", name: "Geography", chapterCount: 0, completedChapters: 0 },
        { id: "physics-chemistry", name: "Physics and Chemistry", chapterCount: 0, completedChapters: 0 },
        { id: "biology", name: "Biology", chapterCount: 0, completedChapters: 0 },
        { id: "economics", name: "Economics", chapterCount: 0, completedChapters: 0 },
        { id: "constitution", name: "Indian Constitution", chapterCount: 0, completedChapters: 0 },
      ],
    },
    {
      id: "static-gk",
      title: "Static GK",
      topics: [
        { id: "national-park", name: "National Park", chapterCount: 0, completedChapters: 0 },
        { id: "arts-culture", name: "Arts and Culture", chapterCount: 0, completedChapters: 0 },
        { id: "sports", name: "Sports", chapterCount: 0, completedChapters: 0 },
      ],
    },
  ],
};

export const mockMockTests: MockTest[] = [
  {
    id: "mock-1",
    title: "SSC CGL Full Length Mock Test 01",
    totalMarks: 100,
    durationMinutes: 180,
    durationFormatted: "Duration 03:00 Hrs",
    lastAttemptedDate: "27-09-2026",
    questionsCount: 100,
    status: "completed",
    category: "SSC",
  },
  {
    id: "mock-2",
    title: "WBCS Prelims GS Paper Mock 02",
    totalMarks: 100,
    durationMinutes: 180,
    durationFormatted: "Duration 03:00 Hrs",
    lastAttemptedDate: "27-09-2026",
    questionsCount: 100,
    status: "completed",
    category: "WBCS",
  },
  {
    id: "mock-3",
    title: "Railways RRB NTPC Stage 1 Mock 01",
    totalMarks: 100,
    durationMinutes: 180,
    durationFormatted: "Duration 03:00 Hrs",
    lastAttemptedDate: "27-09-2026",
    questionsCount: 100,
    status: "not_attempted",
    category: "RAIL",
  },
  {
    id: "mock-4",
    title: "WB PSC Miscellaneous Service Mock 01",
    totalMarks: 100,
    durationMinutes: 180,
    durationFormatted: "Duration 03:00 Hrs",
    lastAttemptedDate: "27-09-2026",
    questionsCount: 100,
    status: "not_attempted",
    category: "PSC",
  },
];

export const mockLiveBatches: LiveBatch[] = [
  {
    id: "batch-combined-1",
    title: "SSC RAIL WBCS PSC Batch",
    badge: "WBCS, SSC, Rail, PSC Combined Classes",
    startDate: "30th September, 2026",
    endDate: "15th September, 2027",
    subscriptionType: "Yearly Subscription Model",
    originalPrice: 3999,
    discountedPrice: 1999,
    enrolled: true,
    upcomingLiveTime: "Today at 7:30 PM",
    bannerTheme: "placeholder",
  },
  {
    id: "batch-banking-special",
    title: "Bank PO & Clerk 2026 Target Batch",
    badge: "SBI PO, IBPS PO & Clerk Comprehensive Course",
    startDate: "10th October, 2026",
    endDate: "10th October, 2027",
    subscriptionType: "Yearly Subscription Model",
    originalPrice: 4499,
    discountedPrice: 2299,
    enrolled: false,
    upcomingLiveTime: "Tomorrow at 6:00 PM",
    bannerTheme: "placeholder",
  },
  {
    id: "batch-rail-ntpc",
    title: "Railway NTPC & Group D Batch",
    badge: "RRB NTPC, ALP & Technician Course",
    startDate: "1st November, 2026",
    endDate: "1st November, 2027",
    subscriptionType: "Yearly Subscription Model",
    originalPrice: 3499,
    discountedPrice: 1799,
    enrolled: false,
    upcomingLiveTime: "Friday at 5:00 PM",
    bannerTheme: "placeholder",
  },
];

export const mockChaptersByTopic: Record<string, ChapterItem[]> = {
  arithmetic: [
    { id: "chap-1", name: "NUMBER SYSTEM", slug: "number-system", videoCount: 2, completedVideos: 1, description: "Divisibility rules, unit digits, primes, remainder theorem" },
    { id: "chap-2", name: "RATIO & PROPORTION", slug: "ratio-and-proportion", videoCount: 0, completedVideos: 0, description: "Direct and inverse proportions, partnership basics" },
    { id: "chap-3", name: "AVERAGE", slug: "average", videoCount: 0, completedVideos: 0, description: "Weighted average, speed-time averages, consecutive numbers" },
    { id: "chap-4", name: "PERCENTAGE", slug: "percentage", videoCount: 0, completedVideos: 0, description: "Fraction to percentage conversions, successive changes" },
    { id: "chap-5", name: "PROFIT LOSS & DISCOUNT", slug: "profit-loss-and-discount", videoCount: 0, completedVideos: 0, description: "Cost price, marked price, successive discounts" },
    { id: "chap-6", name: "SIMPLE INTEREST", slug: "simple-interest", videoCount: 0, completedVideos: 0, description: "Principal, rate of interest, SI formulas & short tricks" },
    { id: "chap-7", name: "COMPOUND INTEREST", slug: "compound-interest", videoCount: 0, completedVideos: 0, description: "CI formula, effective rate method, CI vs SI differences" },
  ],
  algebra: [
    { id: "chap-alg-1", name: "ALGEBRAIC IDENTITIES", slug: "algebraic-identities", videoCount: 1, completedVideos: 0 },
    { id: "chap-alg-2", name: "LINEAR EQUATIONS", slug: "linear-equations", videoCount: 0, completedVideos: 0 },
    { id: "chap-alg-3", name: "QUADRATIC EQUATIONS", slug: "quadratic-equations", videoCount: 0, completedVideos: 0 },
  ],
  geometry: [
    { id: "chap-geo-1", name: "LINES & ANGLES", slug: "lines-and-angles", videoCount: 1, completedVideos: 0 },
    { id: "chap-geo-2", name: "TRIANGLES & CONGRUENCE", slug: "triangles-congruence", videoCount: 0, completedVideos: 0 },
    { id: "chap-geo-3", name: "CIRCLES & TANGENTS", slug: "circles-and-tangents", videoCount: 0, completedVideos: 0 },
  ],
  trigo: [
    { id: "chap-tri-1", name: "TRIGONOMETRIC RATIOS & IDENTITIES", slug: "trigonometric-ratios", videoCount: 1, completedVideos: 1 },
    { id: "chap-tri-2", name: "HEIGHTS AND DISTANCES", slug: "heights-and-distances", videoCount: 0, completedVideos: 0 },
  ],
  di: [
    { id: "chap-di-1", name: "BAR CHARTS & HISTOGRAMS", slug: "bar-charts", videoCount: 0, completedVideos: 0 },
    { id: "chap-di-2", name: "PIE CHARTS & TABULATION", slug: "pie-charts", videoCount: 0, completedVideos: 0 },
  ],
  "2d-3d": [
    { id: "chap-mens-1", name: "2D MENSURATION: AREA & PERIMETER", slug: "2d-mensuration", videoCount: 0, completedVideos: 0 },
    { id: "chap-mens-2", name: "3D MENSURATION: SURFACE AREA & VOLUME", slug: "3d-mensuration", videoCount: 0, completedVideos: 0 },
  ],
  "english-grammar": [
    { id: "chap-eng-1", name: "TENSES & TIME", slug: "tenses-and-time", videoCount: 4, completedVideos: 2 },
    { id: "chap-eng-2", name: "VOICE CHANGE", slug: "voice-change", videoCount: 3, completedVideos: 1 },
    { id: "chap-eng-3", name: "NARRATION CHANGE", slug: "narration-change", videoCount: 3, completedVideos: 1 },
    { id: "chap-eng-4", name: "SUBJECT VERB AGREEMENT", slug: "subject-verb-agreement", videoCount: 2, completedVideos: 0 },
  ],
};

export const mockVideosByChapter: Record<string, VideoLesson[]> = {
  "number-system": [
    {
      id: "vid-ns-1",
      chapterSlug: "number-system",
      title: "NUMBER SYSTEM 1",
      durationFormatted: "42 mins",
      durationMinutes: 42,
      thumbnailPattern: "teal-geometric",
      isLocked: false, // Free preview class
      order: 1,
      facultyName: "Tutopia Math Faculty",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "vid-ns-2",
      chapterSlug: "number-system",
      title: "NUMBER SYSTEM 2",
      durationFormatted: "38 mins",
      durationMinutes: 38,
      thumbnailPattern: "teal-geometric",
      isLocked: true, // Subscription locked
      order: 2,
      facultyName: "Tutopia Math Faculty",
    },
    {
      id: "vid-ns-3",
      chapterSlug: "number-system",
      title: "NUMBER SYSTEM 3",
      durationFormatted: "45 mins",
      durationMinutes: 45,
      thumbnailPattern: "teal-geometric",
      isLocked: true,
      order: 3,
      facultyName: "Tutopia Math Faculty",
    },
    {
      id: "vid-ns-4",
      chapterSlug: "number-system",
      title: "NUMBER SYSTEM 4",
      durationFormatted: "50 mins",
      durationMinutes: 50,
      thumbnailPattern: "teal-geometric",
      isLocked: true,
      order: 4,
      facultyName: "Tutopia Math Faculty",
    },
    {
      id: "vid-ns-5",
      chapterSlug: "number-system",
      title: "NUMBER SYSTEM 5",
      durationFormatted: "36 mins",
      durationMinutes: 36,
      thumbnailPattern: "teal-geometric",
      isLocked: true,
      order: 5,
      facultyName: "Tutopia Math Faculty",
    },
    {
      id: "vid-ns-6",
      chapterSlug: "number-system",
      title: "NUMBER SYSTEM 6",
      durationFormatted: "48 mins",
      durationMinutes: 48,
      thumbnailPattern: "teal-geometric",
      isLocked: true,
      order: 6,
      facultyName: "Tutopia Math Faculty",
    },
  ],
  "tenses-and-time": [
    {
      id: "vid-tense-1",
      chapterSlug: "tenses-and-time",
      title: "TENSES FOUNDATION & PRESENT TENSE",
      durationFormatted: "35 mins",
      durationMinutes: 35,
      thumbnailPattern: "teal-geometric",
      isLocked: false,
      order: 1,
      facultyName: "Tutopia English Faculty",
    },
    {
      id: "vid-tense-2",
      chapterSlug: "tenses-and-time",
      title: "PAST & FUTURE TENSE MASTERCLASS",
      durationFormatted: "40 mins",
      durationMinutes: 40,
      thumbnailPattern: "teal-geometric",
      isLocked: true,
      order: 2,
      facultyName: "Tutopia English Faculty",
    },
  ],
};

