import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tutopia Exam — চাকরির সেরা প্রস্তুতি",
  description:
    "Comprehensive exam preparation portal for SSC, WBCS, Rail, PSC, and Banking exams with live classes, video courses, and CBT mock tests.",
  icons: {
    icon: [
      { url: "/images/favicon.png" },
      { url: "/favicon.png" },
    ],
    apple: [
      { url: "/images/favicon.png" },
    ],
    shortcut: "/images/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0284C7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
