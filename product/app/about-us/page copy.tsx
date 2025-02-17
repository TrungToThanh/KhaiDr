"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Footer from "../layout/footer";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutUs() {
  return (
    <div className="mx-auto w-full">
      {/* Banner */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative w-full h-[200px]"
      >
        <Image
          src="https://theme.hstatic.net/1000288528/1000382531/14/about_header_bg.jpg?v=126"
          alt="About Us Banner"
          fill
          className="rounded-lg"
          style={{ objectFit: "cover" }}
          priority
        />
        <motion.div
          variants={itemVariants}
          className="absolute inset-0 flex items-center justify-center bg-black/40 text-white px-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold">GIỚI THIỆU</h1>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="mt-8 md:mt-10 grid grid-cols-1 md:px-10 gap-8 md:gap-10 mx-auto w-full"
      >
        <div>
          <p className="text-gray-700 leading-relaxed">
            Eltamd là thương hiệu dược mỹ phẩm được ưa chuộng hàng đầu của Mỹ.
            Với hơn 25 năm kinh nghiệm chuyên sâu trong ngành, EltaMD là một
            trong những hãng dược mỹ phẩm tiên phong trong việc chăm sóc làn da,
            với sứ mệnh mang lại làn da đẹp nhất và tự nhiên nhất có thể cho
            người dùng.
          </p>

          <p className="text-gray-700 leading-relaxed md:mt-4">
            Trải qua nhiều công trình nghiên cứu sinh học, dược lý và kiểm
            nghiệm lâm sàng nghiêm ngặt, sản phẩm của EltaMD luôn là sự lựa chọn
            hàng đầu của bác sĩ da liễu, bệnh viện, phòng khám chuyên nghiệp,
            viện bỏng quốc da… được giám định và chỉ định bởi chuyên khoa Da
            Liễu, và được Dược Sĩ khuyên dùng.
          </p>
        </div>
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-3xl h-64 md:h-[380px] mx-auto justify-center"
        >
          <Image
            src="https://theme.hstatic.net/1000288528/1000382531/14/about_shop.png?v=126"
            alt="About Us Shop"
            fill
            className="rounded-lg object-cover"
          />
        </motion.div>
        <p className="font-bold text-3xl text-center">
          CHUẨN MỰC HOÀN MỸ CỦA MỌI LOẠI DA
        </p>
        <p className="text-center">
          Vượt qua ranh giới lãnh thổ, các dòng sản phẩm của EltaMD hiện đã có
          mặt tại nhiều nước trên thế giới và được hàng triệu phụ nữ tin dùng
          nhờ tính năng nổi bật.
        </p>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="mt-12 md:my-16 px-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
          GIÁ TRỊ CỐT LÕI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {["Chất Lượng", "Đổi Mới", "Chăm Sóc"].map((value) => (
            <motion.div key={value} variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">{value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base">
                    {value === "Chất Lượng" &&
                      "Cam kết sản xuất các sản phẩm đạt tiêu chuẩn y tế cao nhất."}
                    {value === "Đổi Mới" &&
                      "Luôn cập nhật công nghệ và nghiên cứu mới nhất để cải thiện sản phẩm."}
                    {value === "Chăm Sóc" &&
                      "Quan tâm đến sức khỏe và sắc đẹp của từng khách hàng."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
