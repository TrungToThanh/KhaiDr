export const SendDataGoogle = (
  eventName: "Xem" | "Xem_chi_tiết" | "Thêm_vào_giỏ_hàng" | "Mua_hàng",
  productCategory: string,
  productTitle: string
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag?.("event", eventName, {
      danh_mục_sản_phẩm: productCategory,
      tên_sản_phẩm: productTitle,
    });
  }
};
