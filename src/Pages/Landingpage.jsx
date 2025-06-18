import Nav from "@/Landing/Nav";
import Hero from "@/Landing/Hero";
import FeatureSectionSimple from "@/Landing/Features";
import Testimonials from "@/Landing/Reviews";
import PricingSectionCards from "@/Landing/Pricing";
import SimpleFooter from "@/Landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Nav />

      <section id="home" className="scroll-mt-[80px]">
        <Hero />
      </section>

      <section id="features" className="scroll-mt-[80px]">
        <FeatureSectionSimple />
      </section>

      <section id="reviews" className="scroll-mt-[80px]">
        <Testimonials />
      </section>

      <section id="pricing" className="scroll-mt-[80px]">
        <PricingSectionCards />
      </section>

      <SimpleFooter />
    </>
  );
}
