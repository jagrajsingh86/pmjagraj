import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jag Singh AI | Private AI Architecture for Data-First Enterprises",
  description:
    "The efficiency of Generative AI. The security of Local-First systems. Built in Sydney. Book your $2,000 AI Readiness Audit today.",
  openGraph: {
    title: "Jag Singh AI | AI Solutions Architect",
    description:
      "Private, local-first AI implementation for enterprises. No data leaves your walls.",
    type: "website",
    url: "https://www.pmjagraj.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
