import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { CategoryListDto } from "@/types/types";
import { motion } from "framer-motion";
import { Store, Tag, ListCheck } from "lucide-react";

export type Props = {
  categoryList: CategoryListDto[];
  brands: string[];
  selectedCategories: CategoryListDto[];
  selectedBrands: string[];
  maxPrice: number;
  maxPriceFilter: number;
  setSelectedCategories: (categories: CategoryListDto[]) => void;
  setSelectedBrands: (brands: string[]) => void;
  setMaxPrice: (price: number) => void;
};

export const DesktopFilter = ({
  categoryList,
  brands,
  selectedCategories,
  selectedBrands,
  maxPrice,
  maxPriceFilter,
  setMaxPrice,
  setSelectedBrands,
  setSelectedCategories,
}: Props) => {
  return (
    <>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:block w-full md:w-64 pr-0 md:pr-6 border-r pt-6"
      >
        <div className="mb-8">
          <div className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ListCheck className="w-5 h-5" /> DANH MỤC
          </div>
          {categoryList.map((category) => (
            <div
              key={category?.categoryName}
              className="flex items-center mb-2 gap-2 text-sm justify-between"
            >
              <div className="flex gap-2 items-center">
                <Checkbox
                  id={category?.categoryName}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category]);
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
              <span>({category?.categoryCount})</span>
            </div>
          ))}

          <div className="text-xl font-semibold mt-10 mb-4 flex items-center gap-2">
            <Store className="w-5 h-5" /> THƯƠNG HIỆU
          </div>
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-2 gap-2 text-sm">
              <Checkbox
                id={brand}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(
                      selectedBrands.filter((b) => b !== brand)
                    );
                  }
                }}
              />
              <span>{brand}</span>
            </div>
          ))}

          <div className="text-xl font-semibold mt-10 mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5" /> GIÁ TIỀN
          </div>
          <Slider
            defaultValue={[maxPriceFilter]}
            max={maxPrice}
            step={1000}
            onValueChange={(value) => setMaxPrice(value?.at(0) || 0)}
          />
          <div className="text-sm mt-4">
            {maxPriceFilter.toLocaleString()} VND
          </div>
        </div>
      </motion.div>
    </>
  );
};
