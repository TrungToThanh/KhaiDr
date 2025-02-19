"use client";
import React from "react";

import Hero from "../components/hero";
import ProductSection from "../components/category-products";
import TrendingProducts from "../components/trending-products";
import HotProducts from "../components/hot-products";
import ExpertReviewSlider from "../components/expert";
import Footer from "@/app/layout/footer";

export default function LandingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Hero />

      <ProductSection />

      <TrendingProducts />

      <HotProducts />

      <ExpertReviewSlider />

      <Footer />
    </div>
  );
}
