"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "./types";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function Cart({
  showCart,
  setShowCart,
  cartItems,
  addToCart,
  removeFromCart,
  deleteFromCart,
  totalItems,
  totalPrice,
  products,
}: {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  deleteFromCart: (productId: number) => void;
  totalItems: number;
  totalPrice: number;
  products: Product[];
}) {
  return (
    <>
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 right-4 z-50 w-full max-w-md md:w-96 bg-white rounded-xl shadow-2xl p-4 md:p-6 flex flex-col"
            style={{ maxHeight: "calc(100vh - 2rem)" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold">
                Giỏ hàng ({totalItems})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto flex-1 pr-2 -mr-4">
              {cartItems.length === 0 ? (
                <p className="text-center py-4">Giỏ hàng trống</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          layout="fill"
                          objectFit="contain"
                          className="rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">
                          {item.name}
                        </p>
                        <p className="text-base font-semibold text-red-600">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              addToCart(
                                products.find((p) => p.id === item.productId)!
                              )
                            }
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteFromCart(item.productId)}
                        className="p-1 hover:text-red-600 flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Tổng tiền:</span>
                <span className="text-lg font-bold">
                  {totalPrice.toLocaleString()}₫
                </span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Thanh toán
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
