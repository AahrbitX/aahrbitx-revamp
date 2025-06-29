import { HeroParallax } from "@/components/ui/hero-parallax";
import React from "react";
import { productsData } from "./components/productsData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

function ProductsPage() {
  return <HeroParallax products={productsData} />;
}

export default ProductsPage;
