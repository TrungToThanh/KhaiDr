"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Grid, List } from "lucide-react";
import dynamic from "next/dynamic";
// import Cart from "./cart";
import { ProductGridView } from "./product-grid-view";
// import { ProductListView } from "./product-list-view";
import { Payment } from "./payment";
import { DesktopFilter } from "./desktop-filter";
import { MobileFilter } from "./mobile-filter";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/app/layout/footer";
import { CategoryKiotViet, ProductKiotViet } from "../types/kiotviet";
import { ProductListView } from "./product-list-view";
import Cart from "./cart";

const PlaceholdersAndVanishInput = dynamic(
  () =>
    import("@/components/placeholders-and-vanish-input").then(
      (mod) => mod.PlaceholdersAndVanishInput
    ),
  { ssr: false }
);

declare global {
  interface Window {
    gtag?: (
      event: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

type Props = {
  products: ProductKiotViet[];
  maxPrice: number;
  categories: CategoryKiotViet[];
  isLoading: boolean;
};

export default function ProductPageIndex({
  products,
  categories,
  maxPrice,
  isLoading,
}: Props) {
  const isMobile = useIsMobile();
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryKiotViet[]
  >([]);
  const [maxPriceFilter, setMaxPrice] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (maxPrice) setMaxPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    if (isMobile) setViewMode("grid");
  }, [isMobile]);

  const filteredProducts = useMemo(() => {
    return (
      products?.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.some(
            (category) =>
              category.categoryName.toLowerCase() ===
              product.categoryName.toLowerCase()
          );

        const matchesPrice = product.basePrice <= maxPriceFilter;

        return matchesSearch && matchesCategory && matchesPrice;
      }) ?? []
    );
  }, [products, selectedCategories, maxPriceFilter, searchTerm]);

  if (isLoading) return <Skeleton />;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="relative w-full h-[110px] mt-10 md:mt-0 z-0">
          <Image
            src="https://theme.hstatic.net/1000288528/1000382531/14/heading-products.jpg?v=126"
            alt="Product Banner"
            layout="fill"
            objectFit="cover"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/30 flex-col px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
              Sản Phẩm
            </h1>

            <p className="text-sm md:text-lg text-white/90 max-w-2xl text-center">
              Chúng tôi cam kết chất lượng hàng đầu
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row px-2 md:px-4 h-full">
        {/* Mobile */}
        <MobileFilter
          categories={categories}
          selectedCategories={selectedCategories}
          maxPrice={maxPrice}
          maxPriceFilter={maxPriceFilter}
          setSelectedCategories={setSelectedCategories}
          setMaxPrice={setMaxPrice}
        />

        {/* Mobile Search */}
        <div className="xl:hidden mb-4 mt-4 px-2 z-20">
          <PlaceholdersAndVanishInput
            placeholders={[
              "Để tôi giúp bạn nhá!",
              "Sản phẩm nào bạn quan tâm?",
              "Bạn thích sản phẩm nào!",
            ]}
            onSubmit={(value) => {
              setSearchTerm(value);
            }}
          />
        </div>

        {/* Desktop */}
        <DesktopFilter
          categories={categories}
          selectedCategories={selectedCategories}
          maxPrice={maxPrice}
          maxPriceFilter={maxPriceFilter}
          setSelectedCategories={setSelectedCategories}
          setMaxPrice={setMaxPrice}
        />

        <div className="flex-1 px-2 md:pl-6 h-full overflow-hidden pt-5">
          <div className="hidden xl:flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 pr-2 md:pr-4">
            <p className="text-lg md:text-xl font-bold mb-2 md:mb-0">
              SẢN PHẨM ({filteredProducts.length})
            </p>
            <div>
              <PlaceholdersAndVanishInput
                placeholders={[
                  "Để tôi giúp bạn nhá!",
                  "Sản phẩm nào bạn quan tâm?",
                  "Bạn thích sản phẩm nào!",
                ]}
                onSubmit={(value) => {
                  setSearchTerm(value);
                }}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Grid className="w-5 h-5" />
                Lưới
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <List className="w-5 h-5" />
                Danh sách
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <ProductGridView products={filteredProducts} />
          ) : (
            <ProductListView products={filteredProducts} />
          )}
        </div>
      </div>

      <Footer />
      <Payment showCart={showCart} setShowCart={setShowCart} />
      <Cart showCart={showCart} setShowCart={setShowCart} products={products} />
    </div>
  );
}
