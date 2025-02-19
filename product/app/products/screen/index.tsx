"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProductPageIndex from "../components";
import { useGetProduct } from "../hooks/get";
import { useSearchParams } from "next/navigation";
import { PlaceholdersAndVanishInput } from "@/components/placeholders-and-vanish-input";
import SearchProduct from "@/components/search-product";
import { useEffect, useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ProductPageContent() {
  const { productServer, brands, categoryList, maxPrice, isLoading } =
    useGetProduct();
  const searchParams = useSearchParams();
  const hasSearchParam = searchParams.has("search");

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter products based on search param
  const filteredProducts = hasSearchParam
    ? !searchTerm
      ? productServer || []
      : productServer.filter((product) =>
          product.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : productServer;

  useEffect(() => {
    if (hasSearchParam) {
      setOpenSearch(true);
    }
  }, [hasSearchParam]);

  if (isLoading) return <Skeleton />;

  return (
    <Suspense fallback={<Skeleton />}>
      <ProductPageIndex
        products={filteredProducts}
        brands={brands}
        maxPrice={maxPrice}
        categoryList={categoryList}
        isLoading={isLoading}
      />
      {openSearch && (
        <Dialog open={openSearch} onOpenChange={setOpenSearch}>
          <DialogTrigger asChild>
            <div>
              <PlaceholdersAndVanishInput
                placeholders={[
                  "Để tôi giúp bạn nhá!",
                  "Sản phẩm nào bạn quan tâm?",
                  "Bạn thích sản phẩm nào!",
                ]}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-screen rounded-lg h-screen px-4">
            <SearchProduct
              onSubmit={(value) => {
                setSearchTerm(value);
                setOpenSearch(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
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
