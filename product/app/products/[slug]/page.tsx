import { Metadata } from "next";
import ProductDetailScreen from "./screen";

export const metadata: Metadata = {
  title: "Chi tiết sản phẩm",
  description:
    "Khám phá các sản phẩm mỹ phẩm cao cấp tại cửa hàng của chúng tôi.",
};

export default function ProductDetail() {
  return <ProductDetailScreen />;
}
