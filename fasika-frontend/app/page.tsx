import Navbar from "./components/header/Navbar";
import Hero from "./components/Hero/Hero";
import HeroProgram from "./components/Hero/HeroProgram";
import HeroSection from "./components/Hero/HeroSection"
import BeliefsSection from "./components/Hero/BeliefsSection"
import TestimonialsSection from "./components/Hero/TestimonialsSection"
import NewsletterSection from "./components/Newsletter/Newsletter";
import Footer from "./components/footer/footer";
export default function Home() {
  return (
    <div>
        <Navbar />
        <Hero />
        <HeroSection />
        <HeroProgram />
        <BeliefsSection />
        <TestimonialsSection />
        <NewsletterSection />
        <Footer />
    </div>
  );
}
