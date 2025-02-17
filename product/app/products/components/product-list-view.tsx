"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { ProductDto } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { CoolMode } from "@/components/magicui/cool-mode";

export const ProductListView = ({
  products,
  addToCart,
}: {
  products: ProductDto[];
  addToCart: (product: ProductDto, quantity: number) => void;
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQuantity),
    }));
  };

  return (
    <motion.div key="list-view" className="grid grid-cols-1 gap-4 p-4">
      {products.map((product) => {
        const quantity = quantities[product.Id] || 1;

        return (
          <motion.div
            key={product.Id}
            className="group p-4 rounded-xl border flex gap-3 h-full items-center"
          >
            <div className="relative w-full max-w-[300px] h-48 rounded-lg overflow-hidden  cursor-pointer">
              <Image
                src={
                  product.imageUrl?.at(0)?.thumbnails?.card_cover?.signedUrl ||
                  ""
                }
                alt={product.title}
                layout="fill"
                objectFit="contain"
                className="group-hover:scale-110"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-1">{product.brand}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-600 font-semibold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
                <span className="flex items-center gap-1">
                  <ShoppingBasket className="w-4 h-4" />
                  {product.sold} đã bán
                </span>
                <span>•</span>
                <span>{product.viewers} lượt xem</span>
              </div>
            </div>
            <div>
              <div className="flex items-center bg-gray-100 rounded-lg h-10">
                <Button
                  variant={"ghost"}
                  onClick={() => handleQuantityChange(product.Id, quantity - 1)}
                  className=" hover:bg-gray-200 "
                >
                  -
                </Button>
                <span className="px-2 w-8 text-center">{quantity}</span>
                <Button
                  variant={"ghost"}
                  onClick={() => handleQuantityChange(product.Id, quantity + 1)}
                  className="hover:bg-gray-200 "
                >
                  +
                </Button>
              </div>
              <CoolMode>
                <Button
                  onClick={() => {
                    addToCart(product, quantity);
                    toast.success("Đã thêm thành công!");
                  }}
                  className="bg-[#B10836] mt-4"
                >
                  <ShoppingBasket className="w-4 h-4" />
                  <span>Thêm vào giỏ</span>
                </Button>
              </CoolMode>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
