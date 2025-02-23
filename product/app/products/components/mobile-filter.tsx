import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Tag } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryKiotViet } from "../types/kiotviet";

export type Props = {
  categories: CategoryKiotViet[];
  selectedCategories: CategoryKiotViet[];
  maxPrice: number;
  maxPriceFilter: number;
  setSelectedCategories: (categories: CategoryKiotViet[]) => void;
  setMaxPrice: (price: number) => void;
};

export const MobileFilter = ({
  categories,
  selectedCategories,
  maxPrice,
  maxPriceFilter,
  setMaxPrice,
  setSelectedCategories,
}: Props) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="md:hidden fixed top-32 right-4 -translate-y-1/2 p-3 rounded-full flex items-center justify-center shadow-lg z-50 bg-white"
      >
        <Filter className="w-3 h-3" />
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
                {categories.map((category) => (
                  <div
                    key={category?.categoryName}
                    className="flex items-center mb-2 gap-2 text-sm justify-between"
                  >
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        id={category?.categoryName}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter(
                                (c) => c.categoryName !== category.categoryName
                              )
                            );
                          }
                        }}
                      />
                      <span>{category?.categoryName}</span>
                    </div>
                    {/* <span>({category?.categoryCount})</span> */}
                  </div>
                ))}
              </div>

              <div className="text-xl font-semibold mt-10 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" /> GIÁ TIỀN
              </div>
              <Slider
                defaultValue={[0]}
                max={maxPrice}
                step={1000}
                onValueChange={(value) => setMaxPrice(value?.at(0) || 0)}
              />
              <div className="text-sm mt-4">
                {maxPriceFilter.toLocaleString()} VND
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
