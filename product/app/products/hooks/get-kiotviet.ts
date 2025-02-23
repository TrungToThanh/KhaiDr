import { useEffect, useState } from "react";
import { CategoryKiotViet, Customer, ProductKiotViet } from "../types/kiotviet";
import axios from "axios";

export const useGetKiotViet = () => {
  const [products, setProducts] = useState<ProductKiotViet[]>([]);
  const [categories, setCategories] = useState<CategoryKiotViet[]>([]);
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        pageSize: "10",
        orderBy: "Name",
        orderDirection: "asc",
        includeInventory: "true",
        includePricebook: "true",
        includeQuantity: "true",
      });

      const response = await axios.get(
        `/api/kiotviet/products?${queryParams.toString()}`
      );
      console.log("API Products Response:", response);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Lỗi khi gọi API KiotViet:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/kiotviet/categories");
      console.log("API Categories Response:", response);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Lỗi khi gọi API Danh mục KiotViet:", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get("/api/kiotviet/branches");
      console.log("API Categories Response:", response);
      //   setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Lỗi khi gọi API Danh mục KiotViet:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/kiotviet/users");
      console.log("API Categories Response:", response);
      //   setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Lỗi khi gọi API Danh mục KiotViet:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/kiotviet/customers");
      console.log("API Categories Response:", response);
      setCustomer(response.data.products || []);
    } catch (error) {
      console.error("Lỗi khi gọi API Danh mục KiotViet:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchBranches(),
        fetchEmployees(),
        fetchCustomers(),
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.basePrice);
      const currentMax = Math.max(...prices);
      setMaxPrice(currentMax);
    } else {
      setMaxPrice(0);
    }
  }, [products]);

  return { products, categories, isLoading, maxPrice, customer };
};
