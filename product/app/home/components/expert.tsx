import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";

const testimonials = [
  {
    id: 1,
    text: "EltaMD Physical là KCN mà tớ rất thích, tớ xài thường xuyên. Ưu điểm là nó làm đều màu da, nhẹ, không bóng nhờn, chống nước nhẹ phù hợp với da dầu như tớ",
    author: "Chiếc lá vô tình",
  },
  {
    id: 2,
    text: "Sản phẩm này thật sự tuyệt vời! Tôi đã dùng trong một thời gian dài và rất hài lòng.",
    author: "Ngọc Ánh",
  },
  {
    id: 3,
    text: "“Tất cả mọi thứ về Elta đều hoàn hảo. 9% zinc oxide – chất chống tia UVA/UVB hiệu quả nhất từ trước tới nay, ko bao giờ bị phân hủy và 9% là nồng độ rất cao. 5% Niacinamide giúp da trắng sáng, niacinamide là cell-communicating ingredients giúp các tế bào da cư xử biết điều và hòa thuận với nhau hơn, nó thậm chí còn giúp giảm mụn. Và Elta MD SPF 46 là KCN ít nhờn nhất trong tất cả các thể loại KCN không đến từ Nhật Bản, không hề làm mặt mình trắng xóa. Mix Elta sunscreen này chung với Revlon colorstay cho tớ 1 lớp nền đẹp tự nhiên nhất mọi thời đại, và không trôi sau cả 1 ngày dài.“",
    author: "Through magnifying glass",
  },
  {
    id: 4,
    text: "“Cảm nhận đầu tiên khi sử dụng kem chống nắng này là lên da khá mát, dễ chịu, chất kem (lý do mình để từ kem trong ngoặc kép bởi vì sản phẩm này cũng không hẳn là kem cũng không hẳn là gel, theo mình có vẻ là lai giữa kem lỏng và gel) mịn, nhẹ và thấm khá nhanh. Mình chọn loại không màu (untinted) cá nhân mình thấy lên da mặt hơi trắng nhẹ 1 chút, khoảng 1 vài phút sau nhìn da sẽ bình thường trở lại không còn trắng nữa để lại 1 lớp màng trên da có độ glow nhẹ nhàng không nhờn dính hay khó chịu.“",
    author: "Fierybread",
  },
];

const partners = [
  {
    title: "1",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/home_brand_logo_1.png?v=126",
  },
  {
    title: "2",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/home_brand_logo_2.png?v=126",
  },
  {
    title: "3",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/home_brand_logo_3.png?v=126",
  },
  {
    title: "4",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/home_brand_logo_4.png?v=126",
  },
  {
    title: "4",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/home_brand_logo_5.png?v=126",
  },
  {
    title: "4",
    image:
      "https://theme.hstatic.net/1000288528/1000382531/14/home_brand_logo_6.png?v=126",
  },
];

export default function ExpertReviewSlider() {
  return (
    <div className="bg-gray-100 w-screen md:w-full flex flex-col">
      <div className="relative">
        <div className="absolute inset-0 h-full opacity-20 w-full">
          <Image
            src="https://theme.hstatic.net/1000288528/1000382531/14/testimonial_img.jpg?v=126"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="w-screen md:w-full h-full"
          />
        </div>
        <p className="text-2xl md:text-[40px] mt-10 md:mt-20 font-bold text-center">
          Ý KIẾN CỦA CHUYÊN GIA
        </p>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className=" object-cover w-screen md:max-w-4xl p-4"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="p-4 w-full text-center">
              <h4 className="mt-2 font-semibold text-[#555555] text-sm md:text-base md:mt-10">
                {item.author}
              </h4>
              <p className="text-gray-700 italic my-4 md:my-10 text-sm md:text-base">
                {item.text}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="my-16 md:my-32"></div>
        <div className="flex justify-center w-full mt-10 gap-8 relative bottom-0 left-0 right-0 z-0 bg-[#333] opacity-70 px-4">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{ delay: 1000 }}
            navigation
            loop
            centeredSlides={true}
            className="w-screen md:max-w-5xl mx-auto"
            slidesPerView={3}
            spaceBetween={10}
          >
            {partners.map((partner) => (
              <SwiperSlide
                key={partner.title}
                className="!flex justify-center items-center px-4"
              >
                <Image
                  src={partner.image}
                  alt={partner.title}
                  width={120}
                  height={60}
                  className="grayscale hover:grayscale-0 transition-all duration-300 py-5 object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl justify-center items-center mx-auto md:mt-10 md:gap-20">
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">💰 100% HOÀN TIỀN</span>
          <p className="text-sm text-gray-600">Miễn phí đổi trả</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">🚚 MIỄN PHÍ SHIPPING</span>
          <p className="text-sm text-gray-600">Đơn hàng trên 800K</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">📞 TỔNG ĐÀI 24/7</span>
          <p className="text-sm text-gray-600">Hỗ trợ miễn phí</p>
        </div>
      </div>
      <div className="w-full border mt-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex-1 relative h-[200px] md:h-[400px] w-full overflow-hidden">
          <Image
            src="https://theme.hstatic.net/1000288528/1000382531/14/image_banner_1.jpg?v=126"
            alt="Banner 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 relative h-[200px] md:h-[400px] w-full overflow-hidden">
          <Image
            src="https://theme.hstatic.net/1000288528/1000382531/14/image_banner_2.jpg?v=126"
            alt="Banner 2"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
