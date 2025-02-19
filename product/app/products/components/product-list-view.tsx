"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, Minus, MoveDown, Plus, ShoppingBasket } from "lucide-react";
import { ProductDto } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { CoolMode } from "@/components/magicui/cool-mode";
import { SendDataGoogle } from "../hooks/send-data-google";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import PreviewProduct from "./preview-product";

export const ProductListView = ({
  products,
  addToCart,
}: {
  products: ProductDto[];
  addToCart: (product: ProductDto, quantity: number) => void;
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(
    null
  );

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQuantity),
    }));
  };

  return (
    <>
      <motion.div key="list-view" className="grid grid-cols-1 gap-4 p-4">
        {products.map((product) => {
          const quantity = quantities[product.Id] || 1;
          const percentWord = `${(
            ((product.originalPrice - product.price) / product.originalPrice) *
            100
          ).toFixed(0)}%`;
          return (
            <motion.div
              key={product.Id}
              className="group p-4 rounded-xl border flex gap-3 h-full items-center relative group"
              onMouseEnter={() =>
                SendDataGoogle("Xem", product.category, product.title)
              }
              onClick={() => {
                SendDataGoogle("Xem_chi_tiết", product.category, product.title);
              }}
            >
              {product.showDiscountPercentage === "Show" && (
                <div className="absolute top-2 left-2  text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  <PulsatingButton
                    pulseColor="red"
                    className="bg-red-500 font-bold flex"
                  >
                    <span className="flex">
                      <MoveDown className="size-3" /> {percentWord}{" "}
                    </span>
                  </PulsatingButton>
                </div>
              )}
              <div
                className="relative w-full max-w-[300px] h-48 rounded-lg overflow-hidden  cursor-pointer"
                onClick={() => {
                  setShowPreview(true);
                  setSelectedProduct(product);
                }}
              >
                <Image
                  src={
                    product.imageUrl?.at(0)?.thumbnails?.card_cover
                      ?.signedUrl || ""
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
                <div className="flex items-center  mb-2">
                  <p className="text-red-600 font-semibold text-base md:text-lg">
                    {product.price.toLocaleString()}₫
                  </p>
                  {product.showDiscountPercentage === "Show" && (
                    <span className="text-sm text-gray-500 line-through px-2">
                      {product.originalPrice.toLocaleString()}₫
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
                  <span className="flex items-center gap-1">
                    <ShoppingBasket className="w-4 h-4" />
                    {product.sold} đã bán
                  </span>
                  <span className="pl-2">
                    <Eye className="w-3 h-3" />
                  </span>
                  <span>{product.viewers.toLocaleString()} lượt xem</span>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100">
                <div className="flex items-center bg-gray-100 rounded-lg w-fit">
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      handleQuantityChange(product.Id, quantity - 1)
                    }
                    className=" hover:bg-gray-200 "
                  >
                    <Minus className="!size-3" />
                  </Button>
                  <span className="px-2 w-8 text-center">{quantity}</span>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      const selectedItem = quantity + 1;
                      handleQuantityChange(product.Id, selectedItem);
                    }}
                    className="hover:bg-gray-200"
                  >
                    <Plus className="!size-3" />
                  </Button>
                </div>
                <CoolMode>
                  <Button
                    onClick={() => {
                      addToCart(product, quantity);
                      SendDataGoogle(
                        "Thêm_vào_giỏ_hàng",
                        product.category,
                        product.title
                      );
                      toast.success("Đã thêm thành công!");
                    }}
                    className="bg-[#B10836] mt-4"
                  >
                    <motion.button
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex gap-2"
                    >
                      <ShoppingBasket className="w-4 h-4" />
                    </motion.button>
                    <span>Thêm vào giỏ</span>
                  </Button>
                </CoolMode>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      {showPreview && selectedProduct !== null && (
        <PreviewProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />
      )}
    </>
  );
};
