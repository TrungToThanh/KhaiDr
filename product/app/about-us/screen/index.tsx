"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

import image from "@/public/contact-us/Image.png";
import image1 from "@/public/contact-us/Image1.png";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AnimatedTooltip } from "@/components/animated-tooltip";
import Link from "next/link";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const AboutUsScreen = () => {
  return (
    <section className="py-12 px-4 md:px-20 flex flex-wrap items-center gap-8 md:gap-12">
      {/* Left Section - Images & Ratings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 w-full mt-20"
      >
        <Card className="relative w-fit h-fit mt-10 mx-auto max-w-[300px]">
          <Image
            src={image}
            alt="Product Image"
            height={380}
            width={300}
            className="rounded-xl shadow-lg w-full h-auto"
          />
          <BorderBeam
            duration={4}
            size={300}
            className="from-transparent via-[#B10836] to-transparent"
          />
        </Card>
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-4"
        >
          {/* Stats Box */}
          <Card className="p-4 md:p-5 border border-gray-200 shadow-md rounded-xl w-full max-w-[180px] md:max-w-[220px] bg-white mb-4 md:mb-10 mx-auto">
            <div className="flex justify-between items-center gap-2 text-blue-900 font-bold text-lg md:text-xl">
              30,000+
              <TrendingUp size={20} className="text-green-500 w-5 md:w-6" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-500 w-4 h-4 md:w-5 md:h-5"
                />
              ))}
            </p>
            {/* Avatar Group */}
            <div className="flex">
              <AnimatedTooltip items={people} />
            </div>
          </Card>

          <Card className="relative w-fit h-fit mx-auto max-w-[300px]">
            <Image
              src={image1}
              alt="Product Image"
              height={380}
              width={300}
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <BorderBeam
              duration={4}
              size={300}
              className="from-transparent via-[#B10836] to-transparent"
            />
          </Card>
        </motion.div>
      </motion.div>

      {/* Right Section - Text & Stats */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 space-y-4 md:space-y-6 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#B10836] leading-tight">
          GIỚI THIỆU
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Eltamd là thương hiệu dược mỹ phẩm hàng đầu của Mỹ. Với hơn 25 năm
          nghiên cứu, EltaMD luôn tiên phong trong lĩnh vực chăm sóc da, giúp
          mang lại vẻ đẹp tự nhiên nhất.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Sản phẩm của EltaMD được kiểm nghiệm lâm sàng nghiêm ngặt và là lựa
          chọn hàng đầu của bác sĩ da liễu trên toàn thế giới.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center md:justify-start"
        >
          {/* Button */}
          <Link href="/contact">
            <Button className="bg-[#b10836] hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 text-sm md:text-base">
              LIÊN HỆ NGAY
              <BorderBeam
                size={40}
                initialOffset={20}
                className="from-transparent via-orange-600 to-transparent"
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                }}
              />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUsScreen;
