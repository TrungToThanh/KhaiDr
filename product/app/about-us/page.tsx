import { Metadata } from "next";

import AboutUsScreen from "./screen";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Khám phá các sản phẩm mỹ phẩm cao cấp tại cửa hàng của chúng tôi.",
};

const AboutUsSection = () => {
  return <AboutUsScreen />;
};

export default AboutUsSection;
