"use client";
import React from "react";

import HotProducts from "./components/hot-products";
import Hero from "./components/hero";
import TrendingProducts from "./components/trending-products";
import ProductSection from "./components/category-products";
import ExpertReviewSlider from "./components/expert";
import Footer from "../layout/footer";

export default function Landing() {
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
