"use client";

import ProductPageIndex from "../components";
import { useGetProduct } from "../hooks/get";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ProductPageContent() {
  const { productServer, brands, categoryList, maxPrice, isLoading } =
    useGetProduct();

  if (isLoading) return <Skeleton />;

  return (
    <Suspense fallback={<Skeleton />}>
      <ProductPageIndex
        products={productServer}
        brands={brands}
        maxPrice={maxPrice}
        categoryList={categoryList}
        isLoading={isLoading}
      />
    </Suspense>
  );
}

export default function ProductPageScreen() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProductPageContent />
    </Suspense>
  );
}
