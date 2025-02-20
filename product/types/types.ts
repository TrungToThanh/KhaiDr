export type ImageThumbnail = {
  tiny?: { signedUrl: string };
  small?: { signedUrl: string };
  card_cover?: { signedUrl: string };
};

export type ProductImage = {
  url: string;
  title: string;
  mimetype: string;
  size: number;
  width: number;
  height: number;
  id: string;
  thumbnails: ImageThumbnail;
  signedUrl: string;
};

export type ProductDto = {
  Id: number;
  title: string;
  price: number;
  originalPrice: number;
  showDiscountPercentage: "Show" | "Hide";
  brand: string;
  category: string;
  stock: number;
  sold: number;
  viewers: number;
  description: string;
  imageUrl: ProductImage[];
  slug?: string;
};

export interface CartItem {
  productId: number;
  category: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export type CategoryListDto = {
  categoryName: string;
  categoryCount: number;
};

export type PaymentDto = {
  Code: string;
  ProductId: number;
  ProductName: string;
  Quantity: number;
  UnitPrice: number;
  Amount: number;
  UserName: string;
  UserPhone: string;
  UserAddress: string;
  Note: string;
  Category: string;
  Date: string;
  Time: string;
};
