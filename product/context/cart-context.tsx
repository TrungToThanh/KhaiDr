"use client";

import { CartItem, ProductDto } from "@/types/types";
import { createContext, useContext, useState, useEffect } from "react";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: ProductDto, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  deleteFromCart: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductDto, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.Id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.Id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.Id,
          category: product.category,
          name: product.title,
          price: product.price,
          quantity: quantity,
          imageUrl: product.imageUrl[0].thumbnails?.card_cover?.signedUrl || "",
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) =>
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
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cart,
        addToCart,
        removeFromCart,
        clearCart,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
