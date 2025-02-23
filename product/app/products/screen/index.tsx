"use client";

import ProductPageIndex from "../components";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetKiotViet } from "../hooks/get-kiotviet";

function ProductPageContent() {
  const { products, categories, maxPrice, isLoading } = useGetKiotViet();

  if (isLoading) return <Skeleton />;

  return (
    <ProductPageIndex
      products={products}
      categories={categories}
      maxPrice={maxPrice}
      isLoading={isLoading}
    />
  );
}

export default function ProductPageScreen() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProductPageContent />
    </Suspense>
  );
}
