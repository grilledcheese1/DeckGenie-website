import type { Metadata } from "next";
import Nav from "@/components/Nav";
import AboutContent from "@/components/AboutContent";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — 汉字练习",
  description:
    "汉字练习 was built by a university student who needed a better way to study Mandarin. Here's the story.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutContent />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
