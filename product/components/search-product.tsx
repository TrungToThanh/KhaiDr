"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { PlaceholdersAndVanishInput } from "@/components/placeholders-and-vanish-input";
import { BackgroundLines } from "./background-lines";

type Props = {
  onSubmit: (value: string) => void;
};
export default function SearchProduct({ onSubmit }: Props) {
  const placeholders = [
    "Để tôi giúp bạn nhá!",
    "Sản phẩm nào bạn quan tâm?",
    "Bạn thích sản phẩm nào!",
  ];

  return (
    <div className="h-screen w-screen">
      <div className="h-screen w-screen">
        <BackgroundLines>
          <div className="flex flex-col items-center justify-center gap-4 -mt-20 h-full">
            <TextAnimate
              animation="slideUp"
              by="word"
              className="font-bold text-2xl md:text-4xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
            >
              XIN CHÀO!
            </TextAnimate>

            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onSubmit={(value) => onSubmit(value)}
            />
            {/* Helper text for mobile */}
            <p className="text-xs md:text-sm text-center text-gray-500 mt-4 px-4">
              Nhập tên sản phẩm, từ khóa hoặc mô tả nhu cầu của bạn. Chúng tôi
              sẽ tìm kiếm toàn bộ hệ thống!
            </p>
          </div>
        </BackgroundLines>
      </div>
    </div>
  );
}
