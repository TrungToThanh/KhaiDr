import { Metadata } from "next";
import ContactUsScreen from "./screen";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Khám phá các sản phẩm mỹ phẩm cao cấp tại cửa hàng của chúng tôi.",
};

export default function ContactUs() {
  return <ContactUsScreen />;
}
