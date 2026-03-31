import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedTrack | Never Miss Your Medicine Again",
  description: "A premium prototype for medication adherence and tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} min-h-full flex flex-col font-sans bg-black text-[#ededed]`}>
        {children}
      </body>
    </html>
  );
}
