import { ProductDto } from "@/types/types";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";
import { useState } from "react";

interface PreviewProductProps {
  product: ProductDto;
  onClose: () => void;
  addToCart: (product: ProductDto, quantity: number) => void;
}

export default function PreviewProduct({
  product,
  onClose,
  addToCart,
}: PreviewProductProps) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQuantity),
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen  max-w-screen p-0 md:p-6 overflow-auto rounded-none md:rounded-lg ">
        <DialogHeader className="mb-4 p-4 md:p-0 text-left">
          CHI TIẾT SẢN PHẨM
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-6 w-full md:w-3/4 h-full md:h-auto px-4 md:px-0 items-center justify-center mx-auto">
          <div className="aspect-square  rounded-none md:rounded-lg overflow-hidden relative">
            <Image
              src={
                product.imageUrl?.at(0)?.thumbnails?.card_cover?.signedUrl || ""
              }
              alt={product.title}
              fill
              className="object-contain p-4"
            />
          </div>

          <div className="space-y-4 pb-8 md:pb-0 h-[calc(100dvh-220px)] md:h-auto overflow-auto ">
            <div className="space-y-2">
              <h1 className="font-bold text-xl md:text-2xl text-[#373737]">
                {product.title}
              </h1>
              <p className="text-[#898989] text-xs md:text-sm">
                {product.brand}
              </p>
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
                  onClick={() =>
                    addToCart(product, quantities[product.Id] || 1)
                  }
                  className="gap-2 w-fit"
                >
                  <ShoppingBagIcon className="w-4 h-4" />
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
                    -
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
                    +
                  </Button>
                </div>
                <Button
                  onClick={() =>
                    addToCart(product, quantities[product.Id] || 1)
                  }
                  className="gap-2 w-fit"
                >
                  <ShoppingBagIcon className="w-4 h-4" />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>

            <p className="text-[#898989] text-sm !mt-10">
              Danh mục: <span className="font-bold">{product.category} </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
