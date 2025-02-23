"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PaymentDto } from "@/types/types";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { SendDataGoogle } from "../utils/send-data-google";
import dayjs from "dayjs";
import { GeneratePaymentCode } from "../utils/gen-code-product";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useCart } from "../../../context/cart-context";
import { OrderRequest, ProductKiotViet } from "../types/kiotviet";
import { useGetKiotViet } from "../hooks/get-kiotviet";
import { useProductContext } from "../context/product-context";

// interface ApiResponse {
//   Id?: number;
//   msg?: string;
// }

// async function createRecord(data: PaymentDto): Promise<ApiResponse> {
//   try {
//     const response = await axios.post<ApiResponse>(
//       "https://app.nocodb.com/api/v2/tables/mcnkrxzn926gxee/records",
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "xc-token": process.env.NEXT_PUBLIC_NC_TOKEN,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi gửi dữ liệu:", error);
//     return { msg: "Có lỗi xảy ra khi gửi tin nhắn" };
//   }
// }

export default function Cart({
  showCart,
  setShowCart,
  products,
}: {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  products: ProductKiotViet[];
}) {
  const { cartItems, addToCart, clearCart, removeFromCart, deleteFromCart } =
    useCart();

  const { customer } = useProductContext();

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

  // const handleOrderSubmit = async () => {
  //   if (!isFormValid) {
  //     toast.warning("Vui lòng điền thông tin khách hàng");
  //     return;
  //   }

  //   const duration = 5 * 1000;
  //   const animationEnd = Date.now() + duration;
  //   const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  //   const randomInRange = (min: number, max: number) =>
  //     Math.random() * (max - min) + min;

  //   const interval = window.setInterval(() => {
  //     const timeLeft = animationEnd - Date.now();

  //     if (timeLeft <= 0) {
  //       return clearInterval(interval);
  //     }

  //     const particleCount = 50 * (timeLeft / duration);
  //     confetti({
  //       ...defaults,
  //       particleCount,
  //       origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
  //     });
  //     confetti({
  //       ...defaults,
  //       particleCount,
  //       origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
  //     });
  //   }, 250);

  //   const paymentCode = GeneratePaymentCode();

  //   const orderData: PaymentDto[] = cartItems.map((item) => ({
  //     Code: paymentCode,
  //     ProductId: item.productId,
  //     ProductName: item.name,
  //     Quantity: item.quantity,
  //     UnitPrice: item.price,
  //     Amount: item.price * item.quantity,
  //     UserName: customerInfo.name,
  //     UserPhone: customerInfo.phone,
  //     UserAddress: customerInfo.address,
  //     Note: customerInfo.note,
  //     Category: item.category,
  //     Date: dayjs().format("DD/MM/YYYY").toString(),
  //     Time: dayjs().format("HH:mm").toString(),
  //   }));
  //   const results = [];

  //   for (const product of orderData) {
  //     SendDataGoogle("Mua_hàng", product.Category, product.ProductName);
  //     const result = await createRecord(product);
  //     results.push(result);
  //   }

  //   if (results.every((res) => res.Id)) {
  //     toast.success("Đặt hàng thành công!");
  //     // setCustomerInfo({ name: "", phone: "", address: "", note: "" });
  //     clearCart(); // Xóa toàn bộ giỏ hàng
  //     setShowCart(false);
  //   } else {
  //     toast.error("Có lỗi xảy ra khi đặt hàng, vui lòng thử lại");
  //   }
  // };

  const handleCreateOrder = async () => {
    const order: OrderRequest = {
      isApplyVoucher: true,
      purchaseDate: new Date().toISOString(),
      branchId: 1000000403,
      soldById: 1000000763,
      discount: 0,
      description: "Đơn hàng test",
      method: "CASH",
      totalPayment: 0,
      makeInvoice: false,
      orderDetails: cartItems,
      customer: {
        id: 1002146956,
        code: "KH000002",
        name: "Phạm Thu Hương",
        gender: true,
        birthDate: "1990-01-01T00:00:00Z",
        contactNumber: "0123456789",
        address: "Hà Nội",
        wardName: "Phường A",
        email: "nguyenvana@example.com",
        comments: "Khách VIP",
      },
      payments: [],
    };

    const res = await fetch("/api/kiotviet/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await res.json();
    // setResponse(data);
    // setLoading(false);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
                                  src={item.image || ""}
                                  alt={item.productName}
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium line-clamp-1 text-sm">
                                  {item.productName}
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
                                      type="button"
                                      onClick={() =>
                                        removeFromCart(item.productId)
                                      }
                                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                                    >
                                      <Minus className="!size-3" />
                                    </button>
                                    <span className="w-6 text-center text-sm">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        addToCart(
                                          products.find(
                                            (p) => p.id === item.productId
                                          )!,
                                          1
                                        )
                                      }
                                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                                    >
                                      <Plus className="!size-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => deleteFromCart(item.productId)}
                                className="p-1 hover:text-red-600 flex-shrink-0"
                              >
                                <Trash2 />
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
              </form>

              <div className="sticky !bottom-0 bg-white pt-4 border-t mt-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Tổng tiền:</span>
                  <span className="text-lg font-bold text-red-600">
                    {totalPrice.toLocaleString()}₫
                  </span>
                </div>
                {totalItems > 0 && (
                  <Button
                    className="w-full bg-[#B10836] text-white py-1 rounded-lg hover:scale-105 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCreateOrder}
                    disabled={!isFormValid}
                  >
                    Đặt hàng
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
