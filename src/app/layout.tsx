import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "tailwindcss/tailwind.css";
import Header from "../components/Header/Header";
import RefreshToken from "../middleware/refreshToken";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // Optionally specify "display" if you like
  // display: 'swap',
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Awesome App",
  description: "A better description for your site",
  applicationName: "My Awesome App",
  keywords: ["Next.js", "React", "Awesome App"],
  openGraph: {
    title: "My Awesome App",
    description: "A better description for your site",
    url: "https://mysite.com",
    images: [
      {
        url: "https://mysite.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "MySite",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Awesome App",
    description: "A better description for your site",
    images: ["https://mysite.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]`}
      >
        <RefreshToken />
        <Header />
        <main className="flex-grow flex items-center justify-center min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </body>
    </html>
  );
}

