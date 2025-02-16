"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

const products = [
  {
    title: "SUN CARE",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/category1_img.jpg?v=126",
  },
  {
    title: "SKIN CARE",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/category2_img.jpg?v=126",
  },
  {
    title: "DA SAU ĐIỀU TRỊ",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/category3_img.jpg?v=126",
  },
];

export default function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div className="w-full px-4 sm:px-6 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="text-[40px] font-bold pt-40 md:pt-10">LOẠI SẢN PHẨM</p>
        <p className="text-[#898989] text-sm mt-2">
          EltaMD mang tới những dòng sản phẩm chăm sóc da hằng ngày thích hợp
          cho mọi loại da, ngay cả những làn da nhạy cảm nhất.
        </p>
        <p className="text-[#898989] text-sm mt-2">
          {`Tối đa hiệu quả - Tối thiểu kích ứng`}
        </p>
      </motion.div>

      <div
        ref={ref}
        className="mt-12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative border overflow-hidden cursor-pointer group w-full aspect-square"
          >
            <div className="w-full h-full relative">
              <Image
                src={product.image}
                alt="Category Image"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#33333380]">
              <p className="text-xl sm:text-3xl font-bold text-white">
                {product.title}
              </p>
              <button className="mt-6 sm:mt-10 px-4 py-2 text-sm sm:text-xs text-white border font-semibold border-white hover:text-black hover:bg-white">
                XEM TẤT CẢ
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
