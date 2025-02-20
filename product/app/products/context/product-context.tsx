"use client";

import { createContext, useContext } from "react";
import { ProductDto, CategoryListDto } from "@/types/types";
import { useGetProduct } from "../hooks/get";

interface ProductContextType {
  productServer: ProductDto[];
  categories: string[];
  categoryList: CategoryListDto[];
  brands: string[];
  maxPrice: number;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const {
    productServer,
    categories,
    categoryList,
    brands,
    maxPrice,
    isLoading,
  } = useGetProduct();

  return (
    <ProductContext.Provider
      value={{
        productServer,
        categories,
        categoryList,
        brands,
        maxPrice,
        isLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
