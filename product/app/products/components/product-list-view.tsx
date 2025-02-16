"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBagIcon } from "lucide-react";
import { Product } from "./types";

export const ProductListView = ({
  products,
  addToCart,
}: {
  products: Product[];
  addToCart: (product: Product) => void;
}) => {
  return (
    <motion.div
      key="list-view"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="group p-4 rounded-xl border hover:bg-gray-50 flex flex-col gap-3 h-full"
        >
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-1">{product.brand}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-600 font-semibold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </span>
              {/* <span
                className={`text-sm ${
                  product?.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {product?.inStock ? "Còn hàng" : "Hết hàng"}
              </span> */}
            </div>
            {/* <p className="text-sm text-gray-500 line-clamp-3 mb-4">
              {product?.description}
            </p> */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
              <span className="flex items-center gap-1">
                <ShoppingBagIcon className="w-4 h-4" />
                {product.sold} đã bán
              </span>
              <span>•</span>
              <span>{product.viewers} lượt xem</span>
            </div>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-center mt-2"
          >
            <ShoppingBagIcon className="w-4 h-4" />
            <span>Thêm vào giỏ</span>
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};
