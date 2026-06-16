import React from "react";
import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import CaseStudies from "@/components/portfolio/CaseStudies";
import GrowthFramework from "@/components/portfolio/GrowthFramework";
import Experience from "@/components/portfolio/Experience";
import Skills from "@/components/portfolio/Skills";
import Exploring from "@/components/portfolio/Exploring";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default function Portfolio() {
  return (
    <main data-testid="portfolio-root" className="relative">
      <Navigation />
      <Hero />
      <CaseStudies />
      <GrowthFramework />
      <Experience />
      <Skills />
      <Exploring />
      <Contact />
      <Footer />
    </main>
  );
}
