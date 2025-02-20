"use client";
import { notFound, useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowBigLeft,
  FacebookIcon,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBasket,
  TwitterIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SendDataGoogle } from "../utils/send-data-google";
import { useProductContext } from "../context/product-context";
import { Meteors } from "@/components/magicui/meteors";
import { Lens } from "@/components/magicui/lens";
import { Button } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { useState } from "react";
import { useCart } from "../../../context/cart-context";
import { CoolMode } from "@/components/magicui/cool-mode";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetail = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { productServer, isLoading } = useProductContext();
  const { addToCart } = useCart();
  const product = productServer.find((p) => p.slug === slug);
  const router = useRouter();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQuantity),
    }));
  };

  if (isLoading) return <Skeleton />;

  if (!product) {
    return notFound();
  }

  return (
    <div className="w-screen h-screen max-w-screen p-0 md:p-6 !overflow-x-hidden overflow-y-auto rounded-none md:rounded-lg">
      <div className="fixed !mt-20 md:top-4 md:!mt-0 right-4 !z-50 group flex items-center gap-4">
        <span className="text-base font-bold opacity-0 group-hover:opacity-100">
          Quay lại
        </span>
        <button
          onClick={() => router.back()}
          className="bg-[#B10836] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#91072d] transition-colors "
          aria-label="Go back"
        >
          <span className="text-xl font-bold">
            <ArrowBigLeft />
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-6 w-full md:w-3/4 h-full px-4 md:px-0 items-center justify-center mx-auto overflow-hidden">
        <Meteors className="z-50" number={100} />

        <Lens>
          <div className="aspect-square  rounded-none md:rounded-lg overflow-hidden relative border-0">
            <Image
              src={
                product.imageUrl?.at(0)?.thumbnails?.card_cover?.signedUrl || ""
              }
              alt={product.title}
              fill
              quality={100}
              className="object-contain border-0"
            />
          </div>
        </Lens>

        <div className="space-y-4 pb-8 md:pb-0 h-full md:h-auto overflow-hidden">
          <div className="space-y-2">
            <h1 className="font-bold text-xl md:text-2xl text-[#373737]">
              {product.title}
            </h1>
            <p className="text-[#898989] text-xs md:text-sm">{product.brand}</p>
          </div>

          <div
            className="line-clamp-3 text-[#898989] text-sm"
            dangerouslySetInnerHTML={{
              __html: product.description?.replace(/\n/g, "<br>"),
            }}
          />

          <p className="text-base font-bold"> Sản phẩm của EltaMD </p>
          <p className="text-sm"> - Được chuyên gia khuyên dùng </p>
          <p className="text-sm"> - Được chuyên gia khuyên dùng </p>
          <p className="text-sm"> - Được chuyên gia khuyên dùng </p>

          <p className="text-[#898989] text-sm mt-8">
            Đã bán: {product.sold} sản phẩm
          </p>

          <div className="md:hidden sticky bottom-0 bg-white pt-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-red-600 text-lg">
                {product.price.toLocaleString()} VNĐ
              </p>
              <Button
                onClick={() => {
                  addToCart(product, quantities[product.Id] || 1);
                  SendDataGoogle(
                    "Thêm_vào_giỏ_hàng",
                    product.category,
                    product.title
                  );
                  toast.success("Đã thêm thành công!");
                }}
                className="gap-2 w-fit bg-[#B10836]"
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
                <span className="hidden xs:inline ">Thêm vào giỏ</span>
              </Button>
            </div>
          </div>

          <div className="hidden md:block ">
            <p className="text-red-600 font-bold text-2xl">
              {product.price.toLocaleString()} VNĐ
            </p>

            <div className="flex gap-4 mt-8">
              <div className="border w-fit ">
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    handleQuantityChange(
                      product.Id,
                      (quantities[product.Id] || 1) - 1
                    )
                  }
                >
                  <Minus className="!size-3" />
                </Button>
                <span className="px-2 w-8 text-center">
                  {quantities[product.Id] || 1}
                </span>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    const selectedItem = (quantities[product.Id] || 1) + 1;
                    handleQuantityChange(product.Id, selectedItem);
                  }}
                >
                  <Plus className="!size-3" />
                </Button>
              </div>
              <CoolMode>
                <Button
                  onClick={() => {
                    addToCart(product, quantities[product.Id] || 1);
                    SendDataGoogle(
                      "Thêm_vào_giỏ_hàng",
                      product.category,
                      product.title
                    );
                    toast.success("Đã thêm thành công!");
                  }}
                  className="gap-2 w-fit bg-[#B10836]"
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
          </div>

          <p className="text-[#898989] text-sm !mt-10">
            Danh mục: <span className="font-bold">{product.category} </span>
          </p>
        </div>
      </div>
      <div className="relative mb-20">
        <Dock direction="middle">
          <DockIcon>
            <FacebookIcon />
          </DockIcon>
          <DockIcon>
            <TwitterIcon />
          </DockIcon>
          <DockIcon>
            <MessageCircle />
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
};

export default ProductDetail;
