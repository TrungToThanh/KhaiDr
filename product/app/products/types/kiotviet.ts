export type ProductKiotViet = {
  createdDate: string;
  id: number;
  retailerId: number;
  code: string;
  barCode: string;
  name: string;
  fullName: string;
  categoryId: number;
  categoryName: string;
  allowsSale: boolean;
  type: number;
  hasVariants: boolean;
  basePrice: number;
  conversionValue: number;
  isActive: boolean;
  isLotSerialControl: boolean;
  isBatchExpireControl: boolean;
  images: string[];
  tradeMarkName: string;
};

export type ProductKiotVietDto = {
  products: ProductKiotViet[];
};

export type CategoryKiotViet = {
  categoryId: number;
  categoryName: string;
  retailerId: number;
  createdDate: string;
  rank: number;
};

export type CategoryKiotVietDto = {
  categories: CategoryKiotViet[];
};

export interface OrderRequest {
  isApplyVoucher?: boolean;
  purchaseDate: string; // ISO string datetime
  branchId: number;
  soldById?: number;
  cashierId?: number;
  discount: number;
  description: string;
  method: string;
  totalPayment: number;
  accountId?: number;
  makeInvoice: boolean;
  saleChannelId?: number;
  orderDetails: OrderDetail[];
  orderDelivery?: OrderDelivery;
  customer?: Customer;
  surcharges?: Surcharge[];
  payments?: Payment[];
}

export interface OrderDetail {
  productId: number;
  productCode: string;
  productName: string;
  isMaster: boolean;
  quantity: number;
  price: number;
  discount?: number;
  discountRatio?: number;
  note: string;
  image?: string;
}

export interface OrderDelivery {
  deliveryCode: string;
  type?: number;
  price?: number;
  receiver: string;
  contactNumber: string;
  address: string;
  locationId?: number;
  locationName?: string;
  wardName?: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  partnerDeliveryId?: number;
  expectedDelivery: string;
  partnerDelivery?: {
    code: string;
    name: string;
    address: string;
    contactNumber: string;
    email: string;
  };
}

export interface Customer {
  id: number;
  code: string;
  name: string;
  gender: boolean;
  birthDate: string;
  contactNumber: string;
  address: string;
  wardName?: string;
  email: string;
  comments: string;
}

export interface Surcharge {
  id: number;
  code: string;
  price: number;
}

export interface Payment {
  Method: "Voucher" | string;
  MethodStr: "Voucher" | string;
  Amount: number;
  Id: number;
  AccountId?: number;
  VoucherId?: number;
  VoucherCampaignId?: number;
}
