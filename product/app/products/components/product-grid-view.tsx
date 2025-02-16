"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBagIcon } from "lucide-react";
import type { Product } from "./types";

export const ProductGridView = ({
  products,
  addToCart,
}: {
  products: Product[];
  addToCart: (product: Product) => void;
}) => {
  return (
    <motion.div
      key="grid-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="group p-3 md:p-4 rounded-xl border hover:shadow-lg transition-shadow relative"
        >
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
              -{product.discountPercentage}%
            </div>
          )}
          <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-1">{product.brand}</p>

          <div className="flex justify-between items-center mt-2 md:mt-4">
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-red-600 font-semibold text-base md:text-lg">
                  {product.price.toLocaleString()}₫
                </p>
                {product.discountPercentage > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()}₫
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <ShoppingBagIcon className="w-3 h-3" />
                  {product?.sold >= 1000
                    ? `${(product?.sold / 1000).toFixed(1)}K`
                    : product.sold}
                </span>
                <span>•</span>
                <span>
                  {product?.viewers >= 1000
                    ? `${(product?.viewers / 1000).toFixed(1)}K`
                    : product.viewers}{" "}
                  lượt xem
                </span>
              </div>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-blue-600 text-white p-1 md:p-2 rounded-lg hover:bg-blue-700"
            >
              <ShoppingBagIcon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
