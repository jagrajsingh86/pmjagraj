import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jag Singh AI | Secure AI Systems for the Private Enterprise",
  description:
    "Automated Lead Qualification. Local Document Intelligence. Zero Data Leaks. Built for Sydney's High-Stakes Businesses.",
  openGraph: {
    title: "Jag Singh AI | Secure AI Products",
    description:
      "SENTINEL. VAULT. REPLY. Three secure AI systems built for private enterprise.",
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
