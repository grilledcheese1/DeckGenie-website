import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PrivacyContent from "@/components/PrivacyContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy & Terms — 汉字练习",
  description:
    "Privacy policy and terms of use for 汉字练习. We collect the minimum needed to make the app work.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
