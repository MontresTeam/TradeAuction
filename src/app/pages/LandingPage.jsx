"use client";
import React, { useState } from "react";
import Header from "../../../components/layout/Header";
import BannerPage from "./BannerPage";
import LayoutDesign from "./layoutDesigen";
import Footer from "./Footer";
import HowItWorks from "./HowItWork";

export default function IndexPage() {
  return (
    <div>
      <Header />
      <BannerPage />
      <LayoutDesign/>
      <HowItWorks/>
      <Footer/>
    </div>
  );
}
