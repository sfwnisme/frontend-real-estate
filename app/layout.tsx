import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SITE_INFO } from "@/constants/config";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL!),
  title: {
    template: `%s | ${SITE_INFO.NAME}`,
    default: SITE_INFO.NAME,
  },
  description: SITE_INFO.DESCRIPTION,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_KEY,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} antialiased overflow-x-hidden`}>
        {children}
        <Toaster position="top-right" expand />
      </body>
    </html>
  );
}
