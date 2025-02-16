import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Banner */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/images/about-banner.jpg"
          alt="About Us Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-center px-6">
          <h1 className="text-4xl font-bold">Về Chúng Tôi</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="text-gray-700 leading-relaxed">
            Chúng tôi cam kết cung cấp các sản phẩm chăm sóc da chất lượng cao,
            an toàn và hiệu quả, giúp mọi người có được làn da khỏe mạnh và rạng
            rỡ.
          </p>
          <Button className="mt-6">Tìm Hiểu Thêm</Button>
        </div>
        <Image
          src="/images/mission.jpg"
          alt="Mission"
          width={500}
          height={400}
          className="rounded-lg"
        />
      </div>

      {/* Core Values */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Giá Trị Cốt Lõi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Chất Lượng</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Cam kết sản xuất các sản phẩm đạt tiêu chuẩn y tế cao nhất.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Đổi Mới</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Luôn cập nhật công nghệ và nghiên cứu mới nhất để cải thiện sản
                phẩm.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Chăm Sóc</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Quan tâm đến sức khỏe và sắc đẹp của từng khách hàng.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold">Khám Phá Sản Phẩm Của Chúng Tôi</h2>
        <p className="text-gray-600 mt-2">
          Tận hưởng làn da khỏe mạnh với sản phẩm của chúng tôi ngay hôm nay.
        </p>
        <Button className="mt-6">Xem Sản Phẩm</Button>
      </div>
    </div>
  );
}
