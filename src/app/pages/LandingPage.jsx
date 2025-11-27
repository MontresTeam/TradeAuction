"use client";
import React, { useState } from "react";
import Header from "../../../components/layout/Header";
import BannerPage from "./BannerPage";
import LayoutDesign from "./HeroSection";
import Footer from "./Footer";
import HowItWorks from "./HowItWork";
import FeaturedAuctions from "./FeaturedAuctions";
import Testimonials from "./Testimonials";

export default function IndexPage() {
  return (
    <div>
      <Header />
      <BannerPage />
      <LayoutDesign/>
      <FeaturedAuctions/>
      <HowItWorks/>
      <Testimonials/>
      <Footer/>
    </div>
  );
}
