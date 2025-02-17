"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Grid, List } from "lucide-react";
import Cart from "./components/cart";
import { useGetProduct } from "./hooks/get";
import { ProductGridView } from "./components/product-grid-view";
import { ProductListView } from "./components/product-list-view";
import { Payment } from "./components/payment";
import { DesktopFilter } from "./components/desktop-filter";
import { MobileFilter } from "./components/mobile-filter";
import { CartItem, CategoryListDto, ProductDto } from "@/types/types";
import Footer from "../layout/footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPage() {
  const { products, brands, categoryList, maxPrice, isLoading } =
    useGetProduct();
  const isMobile = useIsMobile();

  const [selectedCategories, setSelectedCategories] = useState<
    CategoryListDto[]
  >([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPriceFilter, setMaxPrice] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (maxPrice) setMaxPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    if (isMobile) setViewMode("grid");
  }, [isMobile]);

  const filteredProducts = useMemo(() => {
    return (
      products?.filter((product) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.some(
            (category) =>
              category.categoryName.toLowerCase() ===
              product.category.toLowerCase()
          );

        const matchesBrand =
          selectedBrands.length === 0 ||
          selectedBrands.some(
            (brand) => brand.toLowerCase() === product.brand.toLowerCase()
          );

        const matchesPrice = product.price <= maxPriceFilter;

        return matchesCategory && matchesBrand && matchesPrice;
      }) ?? []
    );
  }, [products, selectedCategories, selectedBrands, maxPriceFilter]);

  const addToCart = (product: ProductDto, quality: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.Id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.Id
            ? { ...item, quantity: item.quantity + quality }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.Id,
          name: product.title,
          price: product.price,
          quantity: quality,
          imageUrl: product.imageUrl[0].thumbnails?.card_cover?.signedUrl || "",
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
          categoryList={categoryList}
          brands={brands}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          maxPrice={maxPrice}
          maxPriceFilter={maxPriceFilter}
          setSelectedCategories={setSelectedCategories}
          setSelectedBrands={setSelectedBrands}
          setMaxPrice={setMaxPrice}
        />

        {/* Desktop */}
        <DesktopFilter
          categoryList={categoryList}
          brands={brands}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          maxPrice={maxPrice}
          maxPriceFilter={maxPriceFilter}
          setSelectedCategories={setSelectedCategories}
          setSelectedBrands={setSelectedBrands}
          setMaxPrice={setMaxPrice}
        />

        <div className="flex-1 px-2 md:pl-6 h-full overflow-hidden pt-5">
          <div className="hidden xl:flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 pr-2 md:pr-4">
            <p className="text-lg md:text-xl font-bold mb-2 md:mb-0">
              SẢN PHẨM ({filteredProducts.length})
            </p>
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
            <ProductGridView
              products={filteredProducts}
              addToCart={addToCart}
            />
          ) : (
            <ProductListView
              products={filteredProducts}
              addToCart={addToCart}
            />
          )}
        </div>
      </div>

      <Footer />
      <Payment
        totalItems={totalItems}
        showCart={showCart}
        setShowCart={setShowCart}
      />

      <Cart
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        deleteFromCart={deleteFromCart}
        totalItems={totalItems}
        clearCart={() => setCartItems([])}
        totalPrice={totalPrice}
        products={products}
      />
    </div>
  );
}
