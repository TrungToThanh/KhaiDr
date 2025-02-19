import { Metadata } from "next";
import ProductPageScreen from "./screen";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description:
    "Khám phá các sản phẩm mỹ phẩm cao cấp tại cửa hàng của chúng tôi.",
};

export default function ProductPage() {
  return <ProductPageScreen />;
}
