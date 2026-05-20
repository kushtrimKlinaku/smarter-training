import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Smarter Training | Akademia e Aftësive të Buta",
    template: "%s | Smarter Training",
  },
  description:
    "Që nga 2018, Smarter Training ka trajnuar mbi 5,000 profesionistë me programe transformuese lidershipi, komunikimi, dhe inteligjence sociale në Kosovë, Shqipëri dhe Maqedoni.",
  keywords: [
    "Smarter Training",
    "soft skills",
    "trajnim",
    "lidershipi",
    "komunikim",
    "Kosovë",
    "Shqipëri",
    "academy",
  ],
  authors: [{ name: "Smarter Training" }],
  openGraph: {
    type: "website",
    locale: "sq_AL",
    url: "https://smarter.training",
    siteName: "Smarter Training",
    title: "Smarter Training | Akademia e Aftësive të Buta",
    description:
      "Programe transformuese lidershipi dhe aftësi të buta për profesionistë dhe organizata.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
