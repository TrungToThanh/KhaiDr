import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

import mainImg from "@/public/slide1_image.webp";

export default function Hero() {
  return (
    <AspectRatio ratio={16 / 10} className="max-md:aspect-[3/4] top-0 -mt-20">
      <Image
        src={mainImg}
        alt="main"
        className="rounded-md object-contain md:object-cover w-full h-full"
        priority
      />
    </AspectRatio>
  );
}
