import type { Metadata } from "next";
import { DM_Sans, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "音吉 — Learn Mandarin with AI",
  description:
    "AI-powered Chinese vocabulary practice. HSK 1–6 word corpus, instant grading, character analysis, and progressive unlocks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`${dmSans.variable} ${notoSerifSC.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
