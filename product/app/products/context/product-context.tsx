"use client";

import { createContext, useContext } from "react";
import { CategoryKiotViet, Customer, ProductKiotViet } from "../types/kiotviet";
import { useGetKiotViet } from "../hooks/get-kiotviet";

interface ProductContextType {
  products: ProductKiotViet[];
  categories: CategoryKiotViet[];
  maxPrice: number;
  isLoading: boolean;
  customer: Customer[];
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const { products, categories, maxPrice, isLoading, customer } =
    useGetKiotViet();

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        maxPrice,
        isLoading,
        customer,
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
