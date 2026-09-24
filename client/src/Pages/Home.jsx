import React from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import StatsBar from "../components/StatsBar";
import Gallery from "../components/Gallery";
import Services from "../components/Services";
import Packages from "../components/Packages";
import Contact from "../components/Contact";
import LinePic from "../components/LinePic";
import Trail from "../components/Trail";
import Review from "../components/Review";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-rw-ink bg-white">
      <Hero />
      <AboutUs />
      <StatsBar />
      <Gallery />
      <Services />
      <Packages />
      <LinePic />
      <Review />
      <Footer />
    </div>
  );
}
