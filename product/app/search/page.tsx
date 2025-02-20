"use client";
import { useState } from "react";
import { useGetProduct } from "../products/hooks/get";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridView } from "../products/components/product-grid-view";
import { PlaceholdersAndVanishInput } from "@/components/placeholders-and-vanish-input";
import { BackgroundLines } from "@/components/background-lines";
import { motion } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Payment } from "../products/components/payment";
import Cart from "../products/components/cart";

const placeholders = [
  "Để tôi giúp bạn nhá!",
  "Sản phẩm nào bạn quan tâm?",
  "Bạn thích sản phẩm nào!",
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { productServer, isLoading } = useGetProduct();
  const [searched, setSearched] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = !searchTerm
    ? []
    : productServer.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (isLoading) return <Skeleton />;

  return (
    <BackgroundLines>
      <div className="flex flex-col items-center relative">
        <div className="flex-shrink-0">
          <div className="flex flex-col items-center justify-center gap-4 mb-10 mt-20 h-full">
            {/* Hiệu ứng xuất hiện của tiêu đề */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-2xl md:text-4xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
            >
              XIN CHÀO!
            </motion.div>

            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onSubmit={(value) => {
                setSearchTerm(value);
                setSearched(true);
              }}
            />
          </div>
        </div>

        {searched && (
          <motion.div
            className="space-y-4 flex-grow-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={searchTerm}
          >
            {/* Hiệu ứng xuất hiện của kết quả tìm kiếm */}
            <TextAnimate
              animation="blurInUp"
              by="character"
              once
              className="text-center"
              transition={{ duration: 0.1 }}
            >
              {filteredProducts?.length > 0
                ? `Tôi đã tìm thấy được ${filteredProducts?.length} sản phẩm`
                : "Rất tiếc! Tôi không tìm thấy sản phẩm bạn yêu cầu"}
            </TextAnimate>

            {/* Hiệu ứng hiển thị danh sách sản phẩm */}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7, once: false }}
              className="px-8"
            >
              <ProductGridView products={filteredProducts} />
            </motion.div>
          </motion.div>
        )}
      </div>
      <Payment showCart={showCart} setShowCart={setShowCart} />
      <Cart
        showCart={showCart}
        setShowCart={setShowCart}
        products={productServer}
      />
    </BackgroundLines>
  );
}
