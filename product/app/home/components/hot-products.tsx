"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

const products = [
  {
    title:
      "Gel làm lành phục hồi da sau nặn mụn lăn kim thẩm mỹ EltaMD SilverGel",
    image:
      "https://product.hstatic.net/1000288528/product/silvergel_antimicrobial_bellow__1_oz.__large.jpg",
    price: "550,000₫",
  },
  {
    title:
      "Kem chống nắng khô thoáng có màu EltaMD UV Physical Broad-Spectrum SPF 41",
    image:
      "https://product.hstatic.net/1000288528/product/uv_physical_broad_spectrum_spf_41_sunscreen_-_tinted__1__large.jpg",
    price: "750,000₫",
  },
  {
    title: "Kem dưỡng phục hồi da EltaMD Barrier Renewal Complex",
    image:
      "https://product.hstatic.net/1000288528/product/barrier_renewal_complex__1.7_oz.__large.jpg",
    price: "1,110,000₫",
  },
  {
    title:
      "Kem dưỡng phục hồi toàn diện ban đêm EltaMD PM Therapy Facial Moisturizer",
    image:
      "https://product.hstatic.net/1000288528/product/pm_therapy_facial_moisturizer_large.jpg",
    price: "850,000₫",
  },
];

export default function HotProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-4">
      <div className="h-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <p className="text-3xl md:text-[40px] md:py-10 font-bold">
            SẢN PHẨM NỔI BẬT
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-6 md:mt-12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="w-full max-w-[260px] mx-auto sm:w-[260px]"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="aspect-square overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt="Category Image"
                  width={260}
                  height={260}
                  className="object-cover w-full h-full transition-transform duration-500"
                />
              </motion.div>
              <div className="flex flex-col mt-4">
                <p className="text-sm sm:text-base font-semibold line-clamp-2">
                  {product.title}
                </p>
                <p className="text-xs sm:text-sm text-primary mt-2">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="w-full flex justify-center my-10">
        <Link href={"/products"}>
          <PulsatingButton className="bg-[#B10836]" pulseColor="#B10836">
            XEM THÊM SẢN PHẨM
          </PulsatingButton>
        </Link>
      </div>
    </div>
  );
}
