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
  title: "Jag S. | AI Solutions Architect — Private AI for Mid-Market Leaders",
  description:
    "Scale with AI. Keep your data private. Local-first AI architecture for Sydney-based mid-market firms. Book your $2,000 AI Readiness Audit today.",
  openGraph: {
    title: "Jag S. | AI Solutions Architect",
    description:
      "Private, local-first AI implementation for mid-market CEOs. No data leaves your walls.",
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
      <body className="bg-white text-stone-900 font-sans">{children}</body>
    </html>
  );
}
