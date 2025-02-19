import useSWR from "swr";
import { fetcher } from "@/configs/axios";
import { CategoryListDto, ProductDto } from "@/types/types";

export const useGetProduct = () => {
  const { data, isLoading } = useSWR(
    "/tables/mf1i2sltvkvrua2/records",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const products: ProductDto[] = data?.list || [];

  const categories: string[] = [
    ...new Set(
      products
        .filter((product) => product.category)
        .map((product) => product.category)
    ),
  ];

  const categoryCounts: Record<string, number> = {};
  products.forEach((product) => {
    if (product.category) {
      categoryCounts[product.category] =
        (categoryCounts[product.category] || 0) + 1;
    }
  });

  const categoryList: CategoryListDto[] = categories.map((category) => ({
    categoryName: category,
    categoryCount: categoryCounts[category],
  }));

  const brands: string[] = [
    ...new Set(
      products
        .filter((product) => product.brand)
        .map((product) => product.brand)
    ),
  ];

  const maxPrice = Math.max(...products.map((p) => p.price || 0), 0);

  return {
    productServer: products,
    categories,
    categoryList,
    brands,
    maxPrice,
    isLoading,
  };
};
