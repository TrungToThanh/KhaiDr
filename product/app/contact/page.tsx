"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <div className="mx-auto w-full px-4 md:px-0">
      {/* Banner with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-[200px]">
          <Image
            src="https://theme.hstatic.net/1000288528/1000382531/14/contact_img.jpg?v=126"
            alt="Contact Us Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-center px-6">
            <h1 className="text-3xl md:text-4xl font-bold">Liên Hệ</h1>
          </div>
        </div>
      </motion.div>

      {/* Contact Form with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 md:mt-10 max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Gửi Tin Nhắn Cho Chúng Tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input type="text" placeholder="Họ và tên" required />
              <Input type="email" placeholder="Email" required />
              <Input type="text" placeholder="Số điện thoại" required />
              <Textarea placeholder="Nội dung tin nhắn" required />
              <Button type="submit" className="w-full">
                Gửi Tin Nhắn
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information with staggered animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 md:mt-16 text-center px-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold">Thông Tin Liên Hệ</h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Địa chỉ",
              content: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
            },
            { title: "Email", content: "support@eltamd.vn" },
            { title: "Điện thoại", content: "0123 456 789" },
            {
              title: "Giờ làm việc",
              content: "08:00 - 18:00 (Thứ Hai - Thứ Sáu)",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4"
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <strong className="block mb-2">{item.title}</strong>
                  <p className="text-sm">{item.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
