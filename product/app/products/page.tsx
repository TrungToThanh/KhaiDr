"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShoppingBagIcon,
  Paintbrush,
  Scissors,
  SprayCan,
  Store,
  Tag,
  Grid,
  List,
  Check,
  Space,
  Filter,
} from "lucide-react";
import Cart from "./components/cart";
import { Product } from "./components/types";

// Fake data
const categories = ["Chăm sóc da", "Trang điểm", "Chăm sóc tóc", "Nước hoa"];
const brands = ["Laneige", "Innisfree", "Sulwhasoo", "Etude House"];
const fakeProducts: Product[] = [
  {
    id: 1,
    name: "Kem dưỡng ẩm Water Bank",
    price: 450000,
    originalPrice: 600000,
    discountPercentage: 25,
    brand: "Laneige",
    category: "Chăm sóc da",
    stock: 10,
    sold: 150,
    viewers: 2300,
    imageUrl:
      "https://product.hstatic.net/1000288528/product/uv_facial_broad-spectrum_spf_30_plus_-_jar__4_oz.__large.jpg",
  },
  {
    id: 2,
    name: "Son lì Matte Lipstick",
    price: 250000,
    originalPrice: 600000,
    brand: "Etude House",
    discountPercentage: 25,
    category: "Trang điểm",
    stock: 10,
    sold: 150,
    viewers: 2300,
    imageUrl:
      "https://product.hstatic.net/1000288528/product/uv_pure_broad-spectrum_spf_47__4_oz.__large.jpg",
  },
  {
    id: 3,
    name: "Tinh chất First Care",
    price: 650000,
    originalPrice: 600000,
    discountPercentage: 25,
    brand: "Sulwhasoo",
    category: "Chăm sóc da",
    stock: 10,
    sold: 150,
    viewers: 2300,
    imageUrl:
      "https://product.hstatic.net/1000288528/product/uv_sport_broad-spectrum_spf_50_tube__3_oz.__large.jpg",
  },
  {
    id: 3,
    name: "Tinh chất First Care 2",
    price: 650000,
    originalPrice: 600000,
    discountPercentage: 25,
    brand: "Sulwhasoo",
    category: "Chăm sóc da",
    stock: 10,
    sold: 150,
    viewers: 2300,
    imageUrl:
      "https://product.hstatic.net/1000288528/product/uv_sport_broad-spectrum_spf_50_tube__3_oz.__large.jpg",
  },
  {
    id: 5,
    name: "Kem chống nắng Innisfree",
    price: 280000,
    originalPrice: 600000,
    brand: "Innisfree",
    discountPercentage: 25,
    category: "Chăm sóc da",
    stock: 10,
    sold: 150,
    viewers: 2300,
    imageUrl:
      "https://product.hstatic.net/1000288528/product/uv_facial_broad-spectrum_spf_30_plus_-_jar__4_oz.__large.jpg",
  },
  {
    id: 6,
    name: "Dầu gội Head & Shoulders",
    price: 150000,
    originalPrice: 600000,
    discountPercentage: 25,
    brand: "Head & Shoulders",
    category: "Chăm sóc tóc",
    stock: 30,
    sold: 150,
    viewers: 2300,
    imageUrl:
      "https://product.hstatic.net/1000288528/product/uv_facial_broad-spectrum_spf_30_plus_-_jar__4_oz.__large.jpg",
  },
  {
    id: 7,
    name: "Nước hoa Chanel No.5",
    price: 2500000,
    originalPrice: 600000,
    discountPercentage: 25,
    brand: "Chanel",
    category: "Nước hoa",
    stock: 1,
    sold: 150,
    viewers: 2300,
    imageUrl:
      "https://product.hstatic.net/1000288528/product/uv_facial_broad-spectrum_spf_30_plus_-_jar__4_oz.__large.jpg",
  },
  {
    id: 8,
    name: "Mascara Làm Dày Mi",
    price: 180000,
    originalPrice: 600000,
    discountPercentage: 25,
    brand: "Maybelline",
    category: "Trang điểm",
    stock: 10,
    sold: 150,
    viewers: 2300,
    imageUrl:
      "https://product.hstatic.net/1000288528/product/uv_facial_broad-spectrum_spf_30_plus_-_jar__4_oz.__large.jpg",
  },
];

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function ProductPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredProducts = fakeProducts.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesBrand && matchesPrice;
  });

  const addToCart = (product: (typeof fakeProducts)[number]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageUrl: product.imageUrl,
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowCart(!showCart)}
          className="p-2 bg-white rounded-full shadow-lg relative"
        >
          <ShoppingBagIcon className="w-5 h-5 md:w-6 md:h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] md:w-5 md:h-5 md:text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <Cart
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        deleteFromCart={deleteFromCart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        products={fakeProducts}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-4 md:mb-8"
      >
        <div className="relative w-full h-[200px] md:h-48">
          <Image
            src="https://theme.hstatic.net/1000288528/1000382531/14/contact_img.jpg?v=126"
            alt="Product Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 flex-col px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
              Sản Phẩm
            </h1>
            <p className="text-sm md:text-lg text-white/90 max-w-2xl text-center">
              Chúng tôi cam kết chất lượng hàng đầu
            </p>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-col md:flex-row px-2 md:px-4 h-full">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="md:hidden mb-4 p-2 bg-blue-100 text-blue-600 rounded-lg flex items-center gap-2 w-full justify-center"
        >
          <Filter className="w-5 h-5" />
          {isFiltersOpen ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
        </button>

        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div
              key="mobile-filters"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "tween" }}
              className="md:hidden fixed inset-0 z-50"
            >
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setIsFiltersOpen(false)}
              />
              <div className="relative w-4/5 h-full bg-white overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Bộ lọc</h2>
                  <button
                    onClick={() => setIsFiltersOpen(false)}
                    className="p-2 text-gray-500"
                  >
                    ✕
                  </button>
                </div>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Space className="w-5 h-5" /> Danh mục
                  </h3>
                  <div className="max-h-40 overflow-y-auto">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center mb-2 gap-2"
                      >
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                category,
                              ]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter((c) => c !== category)
                              );
                            }
                          }}
                          className="hidden peer"
                        />
                        <div className="w-5 h-5 border rounded flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
                          <Check className="w-3 h-3 text-white hidden peer-checked:block" />
                        </div>
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Store className="w-5 h-5" /> Thương hiệu
                  </h3>
                  <div className="max-h-40 overflow-y-auto">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center mb-2 gap-2"
                      >
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(
                                selectedBrands.filter((b) => b !== brand)
                              );
                            }
                          }}
                          className="hidden peer"
                        />
                        <div className="w-5 h-5 border rounded flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
                          <Check className="w-3 h-3 text-white hidden peer-checked:block" />
                        </div>
                        <Store className="w-4 h-4" />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" /> Giá tối đa
                  </h3>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="100000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-sm">{maxPrice.toLocaleString()} VND</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden md:block w-full md:w-64 pr-0 md:pr-6 border-r"
        >
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Space className="w-5 h-5" /> Danh mục
            </h3>
            {categories.map((category) => (
              <label key={category} className="flex items-center mb-2 gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category)
                      );
                    }
                  }}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border rounded flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
                  <Check className="w-3 h-3 text-white hidden peer-checked:block" />
                </div>
                {category === "Chăm sóc da" && <Space className="w-4 h-4" />}
                {category === "Trang điểm" && (
                  <Paintbrush className="w-4 h-4" />
                )}
                {category === "Chăm sóc tóc" && (
                  <Scissors className="w-4 h-4" />
                )}
                {category === "Nước hoa" && <SprayCan className="w-4 h-4" />}
                <span>{category}</span>
              </label>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Store className="w-5 h-5" /> Thương hiệu
            </h3>
            {brands.map((brand) => (
              <label key={brand} className="flex items-center mb-2 gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedBrands([...selectedBrands, brand]);
                    } else {
                      setSelectedBrands(
                        selectedBrands.filter((b) => b !== brand)
                      );
                    }
                  }}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border rounded flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500">
                  <Check className="w-3 h-3 text-white hidden peer-checked:block" />
                </div>
                <Store className="w-4 h-4" />
                <span>{brand}</span>
              </label>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" /> Giá tối đa
            </h3>
            <input
              type="range"
              min="0"
              max="1000000"
              step="100000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm">{maxPrice.toLocaleString()} VND</div>
          </div>
        </motion.div>

        <div className="flex-1 px-2 md:pl-6 h-[calc(100vh-300px)] md:h-[calc(100vh-200px)] overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 pr-2 md:pr-4">
            <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-0">
              Sản phẩm ({filteredProducts.length})
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Grid className="w-5 h-5" />
                Lưới
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <List className="w-5 h-5" />
                Danh sách
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="group p-3 md:p-4 rounded-xl border hover:shadow-lg transition-shadow relative"
                >
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      -{product.discountPercentage}%
                    </div>
                  )}
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-1">{product.brand}</p>

                  <div className="flex justify-between items-center mt-2 md:mt-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <p className="text-red-600 font-semibold text-base md:text-lg">
                          {product.price.toLocaleString()}₫
                        </p>
                        {product.discountPercentage > 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice.toLocaleString()}₫
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <ShoppingBagIcon className="w-3 h-3" />
                          {product?.sold && product?.sold >= 1000
                            ? `${(product?.sold / 1000).toFixed(1)}K`
                            : product.sold}
                        </span>
                        <span>•</span>
                        <span>
                          {product?.viewers && product?.viewers >= 1000
                            ? `${(product?.viewers / 1000).toFixed(1)}K`
                            : product.viewers}{" "}
                          lượt xem
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-blue-600 text-white p-1 md:p-2 rounded-lg hover:bg-blue-700"
                    >
                      <ShoppingBagIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="list-view" className="space-y-3 md:space-y-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="group p-3 md:p-4 rounded-xl border hover:bg-gray-50 flex flex-col md:flex-row items-start md:items-center gap-4"
                >
                  <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="font-semibold text-lg mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.brand}</p>
                    <div className="md:hidden flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <ShoppingBagIcon className="w-3 h-3" />
                        {product.sold}
                      </span>
                      <span>•</span>
                      <span>{product.viewers} lượt xem</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 self-end"
                  >
                    <ShoppingBagIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
