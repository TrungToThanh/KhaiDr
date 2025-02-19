import { Metadata } from "next";
import LandingScreen from "./screen";

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "Khám phá các sản phẩm mỹ phẩm cao cấp tại cửa hàng của chúng tôi.",
};

export default function Landing() {
  return <LandingScreen />;
}
