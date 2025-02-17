"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { PaymentDto, ProductDto } from "@/types/types";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface ApiResponse {
  Id?: number;
  msg?: string;
}

async function createRecord(data: PaymentDto): Promise<ApiResponse> {
  try {
    const response = await axios.post<ApiResponse>(
      "https://app.nocodb.com/api/v2/tables/mevmgt6fob8jpka/records",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "xc-token": process.env.NEXT_PUBLIC_NC_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    return { msg: "Có lỗi xảy ra khi gửi tin nhắn" };
  }
}

export default function Cart({
  showCart,
  setShowCart,
  cartItems,
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
  totalItems,
  totalPrice,
  products,
}: {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cartItems: CartItem[];
  addToCart: (product: ProductDto, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  deleteFromCart: (productId: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  products: ProductDto[];
}) {
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const isFormValid =
    customerInfo.name && customerInfo.phone && customerInfo.address;

  const handleOrderSubmit = async () => {
    if (!isFormValid) {
      toast.warning("Vui lòng điền thông tin khách hàng");
      return;
    }

    const generatePaymentCode = () => {
      const timestamp = Date.now().toString(); // Lấy timestamp hiện tại
      return `PAY-${timestamp}`;
    };

    const paymentCode = generatePaymentCode();

    const orderData: PaymentDto[] = cartItems.map((item) => ({
      Code: paymentCode,
      ProductId: item.productId,
      ProductName: item.name,
      Quantity: item.quantity,
      UnitPrice: item.price,
      Amount: item.price * item.quantity,
      UserName: customerInfo.name,
      UserPhone: customerInfo.phone,
      UserAddress: customerInfo.address,
      Note: customerInfo.note,
    }));
    const results = [];

    for (const item of orderData) {
      const result = await createRecord(item);
      results.push(result);
    }

    if (results.every((res) => res.Id)) {
      toast.success("Đặt hàng thành công!");
      setCustomerInfo({ name: "", phone: "", address: "", note: "" });
      clearCart(); // Xóa toàn bộ giỏ hàng
      setShowCart(false);
    } else {
      toast.error("Có lỗi xảy ra khi đặt hàng, vui lòng thử lại");
    }
  };
  return (
    <>
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 !h-screen">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 md:top-4 md:right-4 z-50 w-full md:max-w-md md:w-96 bg-white rounded-none md:rounded-xl shadow-2xl p-4 md:p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold">
                Giỏ hàng ({totalItems})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div>
              <form>
                <Collapsible
                  open={isProductsOpen}
                  onOpenChange={setIsProductsOpen}
                  className="mb-4"
                >
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <span className="font-medium">
                        Sản phẩm đã chọn ({totalItems})
                      </span>
                      <span
                        className={`transform transition-transform ${
                          isProductsOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="overflow-y-auto flex-1 pr-2 -mr-4 max-h-96">
                      {cartItems.length === 0 ? (
                        <p className="text-center py-4">Giỏ hàng trống</p>
                      ) : (
                        <>
                          {cartItems.map((item) => (
                            <div
                              key={item.productId}
                              className="flex items-center gap-3 p-1 border mt-1 rounded-lg"
                            >
                              <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.name}
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium line-clamp-1 text-sm">
                                  {item.name}
                                </p>
                                <div className="flex justify-between items-center">
                                  <p className="text-base font-semibold text-red-600">
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}
                                    ₫
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <button
                                      onClick={() =>
                                        removeFromCart(item.productId)
                                      }
                                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                                    >
                                      -
                                    </button>
                                    <span className="w-6 text-center text-sm">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        addToCart(
                                          products.find(
                                            (p) => p.Id === item.productId
                                          )!,
                                          1
                                        )
                                      }
                                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => deleteFromCart(item.productId)}
                                className="p-1 hover:text-red-600 flex-shrink-0"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible
                  open={isCustomerOpen}
                  onOpenChange={setIsCustomerOpen}
                  className="space-y-3"
                >
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <span className="font-medium">Thông tin khách hàng</span>
                      <span
                        className={`transform transition-transform ${
                          isCustomerOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Họ tên
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-1 border rounded-lg"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-3 py-1 border rounded-lg"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-1 border rounded-lg"
                        value={customerInfo.address}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Ghi chú
                        </label>
                        <textarea
                          className="w-full px-3 py-1 border rounded-lg"
                          rows={3}
                          value={customerInfo.note}
                          onChange={(e) =>
                            setCustomerInfo((prev) => ({
                              ...prev,
                              note: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="sticky !bottom-0 bg-white pt-4 border-t mt-2">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Tổng tiền:</span>
                    <span className="text-lg font-bold text-red-600">
                      {totalPrice.toLocaleString()}₫
                    </span>
                  </div>
                  {totalItems > 0 && (
                    <button
                      type="submit"
                      className="w-full bg-[#B10836] text-white py-1 rounded-lg hover:scale-105 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleOrderSubmit}
                      disabled={!isFormValid}
                    >
                      Đặt hàng
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
