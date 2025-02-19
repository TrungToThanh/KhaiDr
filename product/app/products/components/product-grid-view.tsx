"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, Minus, MoveDown, Plus, ShoppingBasket } from "lucide-react";
import { ProductDto } from "@/types/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PreviewProduct from "./preview-product";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CoolMode } from "@/components/magicui/cool-mode";
import { toast } from "sonner";
import { SendDataGoogle } from "../hooks/send-data-google";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

export const ProductGridView = ({
  products,
  addToCart,
}: {
  products: ProductDto[];
  addToCart: (product: ProductDto, quantity: number) => void;
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(
    null
  );
  const [showPreview, setShowPreview] = useState(false);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQuantity),
    }));
  };

  return (
    <>
      <motion.div
        key="grid-view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-3 gap-4 md:gap-6 mb-10"
      >
        {products.map((product) => {
          const quantity = quantities[product.Id] || 1;
          const percentWord = `${(
            ((product.originalPrice - product.price) / product.originalPrice) *
            100
          ).toFixed(0)}%`;

          return (
            <motion.div
              key={product.Id}
              className="group p-3 md:p-4 rounded-xl hover:border hover:shadow-lg transition-shadow relative "
              onMouseLeave={() =>
                SendDataGoogle("Xem", product.category, product.title)
              }
              onClick={() =>
                SendDataGoogle("Xem_chi_tiết", product.category, product.title)
              }
            >
              {product.showDiscountPercentage === "Show" && (
                <div className="absolute top-2 left-2 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
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
                className="relative h-48 mb-4 rounded-lg overflow-hidden group-hover:scale-110 cursor-pointer"
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
                  fill
                  style={{ objectFit: "contain" }}
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {product?.viewers >= 1000
                    ? `${(product?.viewers / 1000).toFixed(1)}K`
                    : product.viewers}
                </div>
              </div>
              <p className="font-semibold mb-2">{product.title}</p>
              <p className="text-gray-600 mb-1">{product.brand}</p>

              <div className="flex justify-between items-center mt-2 md:mt-4">
                <div>
                  <div className="flex flex-col items-baseline gap-2">
                    {product.showDiscountPercentage === "Show" && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()}₫
                      </span>
                    )}
                    <p className="text-red-600 font-semibold text-base md:text-lg">
                      {product.price.toLocaleString()}₫
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100">
                  <div className="flex items-center bg-gray-100 rounded-lg">
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                            className="bg-[#B10836]"
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
                          </Button>
                        </CoolMode>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Thêm vào giỏ hàng</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
