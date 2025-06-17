import FeatureSectionSimple from "@/Landing/Features";
import SimpleFooter from "@/Landing/Footer";
import Hero from "@/Landing/Hero";
import Nav from "@/Landing/Nav";
import PricingSectionCards from "@/Landing/Pricing";
import Testimonials from "@/Landing/Reviews";
import React from "react";

const Landingpage = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <FeatureSectionSimple />
      <Testimonials />
      <PricingSectionCards />
      <SimpleFooter />
    </div>
  );
};

export default Landingpage;
