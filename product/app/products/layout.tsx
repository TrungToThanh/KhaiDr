import { ProductProvider } from "@/app/products/context/product-context";
import { CartProvider } from "@/context/cart-context";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <ProductProvider>{children}</ProductProvider>
    </CartProvider>
  );
}
