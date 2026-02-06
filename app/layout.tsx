import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "./globals.css";
import ThemeProvider from "@/components/custom/theme/ThemeProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AppLayout from "@/components/layout/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview Flashcards",
  description: "Practice role-based interview questions with instant feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <ThemeProvider />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
