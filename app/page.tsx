import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PracticePreview from "@/components/PracticePreview";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Streak from "@/components/Streak";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PracticePreview />
        <Features />
        <HowItWorks />
        <Streak />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
