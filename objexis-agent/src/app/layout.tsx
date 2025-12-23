import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Objexis Toy Inc. | Futuristic Toy Vehicle Studio",
  description:
    "Objexis Toy Inc. designs original, luxury-inspired toy vehicles crafted for premium 3D printing and imaginative play.",
  openGraph: {
    title: "Objexis Toy Inc. | Futuristic Toy Vehicle Studio",
    description:
      "Explore a future-facing toy vehicle brand where automotive artistry meets 3D-printable craftsmanship.",
    url: "https://agentic-a8197b70.vercel.app",
    siteName: "Objexis Toy Inc.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Objexis Toy Inc. | Futuristic Toy Vehicle Studio",
    description:
      "Original toy vehicles for the future, crafted exclusively for 3D printing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
