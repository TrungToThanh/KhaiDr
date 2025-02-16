"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

const products = [
  {
    title: "EltaMD Laser Enzyme Gel",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/trending_img_1.jpg?v=126",
    des: "Chứa 5% niacinamide (vitamin B3) nguyên chất giúp dưỡng trắng an toàn và hiệu quả, giúp điều tiết bã nhờn, làm se khít lỗ chân lông, cải thiện bề mặt da lão hóa, làm đều màu da, tái tạo cấu trúc bề mặt da sần sùi, giảm ửng đỏ và giữ ẩm, khiến da tươi trẻ, căng và mịn màng.",
  },
  {
    title: "EltaMD Laser Enzyme Gel",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/trending_img_2.jpg?v=126",
    des: "EltaMD Laser Enzyme Gel là một loại kem dưỡng ẩm enzyme được tăng cường làm lành da, dưỡng ẩm, phục hồi tế bào da sau khi điều trị laser và phẩu thuật thẩm mỹ. Laser Enzyme Gel có thể được áp dụng ngay lập tức sau khi điều trị và tiếp tục thông qua phục hồi sau phẫu thuật.",
  },
  {
    title: "EltaMD Laser Enzyme Gel",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/trending_img_3.jpg?v=126",
    des: "Kem dưỡng phục hồi tái tạo màng da EltaMD Barrier Renewal Complex với công thức độc đáo, kết hợp các thành phần phục hồi da đã được chứng minh trong giới khoa học, có khả năng tăng cường tái tạo collagen, làm săn chắc và phục hồi lớp màng da (stratum corneum).",
  },
  {
    title: "EltaMD Laser Enzyme Gel",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/trending_img_4.jpg?v=126",
    des: "Kem chống nắng dạng xịt lâu trôi EltaMD UV Aero Broad-Spectrum SPF 45 dùng được cho cả mặt và người với chỉ số chống nắng tối ưu SPF50 mạnh mẽ khỏi tác động của các tia UVA và UVB lên da bạn.  Sản phẩm kem chống nắng dạng xịt cho mặt và cơ thể, phù hợp với mọi loại da.",
  },
];

export default function TrendingProducts() {
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
    <div className="!py-20 w-full max-w-[1200px] mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <p className="text-3xl sm:text-[40px] font-bold">{`What's trending `}</p>
        <p className="text-[#898989] text-sm mt-2">
          Những sản phẩm đang dẫn đầu thị trường
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="w-full"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="aspect-square"
            >
              <Image
                src={product.image}
                alt="Category Image"
                width={260}
                height={260}
                className="w-full h-auto object-cover transition-transform duration-500"
              />
            </motion.div>
            <div className="flex flex-col mt-4">
              <p className="text-base font-bold">{product.title}</p>
              <p className="line-clamp-3 break-words text-sm leading-5">
                {product.des}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
