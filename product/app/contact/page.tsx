import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Banner */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/images/contact-banner.jpg"
          alt="Contact Us Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-center px-6">
          <h1 className="text-4xl font-bold">Liên Hệ</h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-10 max-w-2xl mx-auto">
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
      </div>

      {/* Contact Information */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold">Thông Tin Liên Hệ</h2>
        <p className="text-gray-600 mt-2">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn.
        </p>
        <div className="mt-6 space-y-4">
          <p>
            <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP. Hồ Chí Minh
          </p>
          <p>
            <strong>Email:</strong> support@eltamd.vn
          </p>
          <p>
            <strong>Điện thoại:</strong> 0123 456 789
          </p>
          <p>
            <strong>Giờ làm việc:</strong> 08:00 - 18:00 (Thứ Hai - Thứ Sáu)
          </p>
        </div>
      </div>
    </div>
  );
}
