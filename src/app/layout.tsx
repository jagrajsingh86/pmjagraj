import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jag Singh AI | Master the Architecture of Private AI",
  description:
    "Insights, Blueprints, and Community for leaders who build. The Private AI Pulse newsletter, a Resource Vault of digital blueprints, and a private LinkedIn circle for Sydney's AI architects.",
  openGraph: {
    title: "Jag Singh AI | The Private AI Resource Hub",
    description:
      "The Private AI Pulse newsletter. Digital blueprints. A private community for builders.",
    type: "website",
    url: "https://jagsingh.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
