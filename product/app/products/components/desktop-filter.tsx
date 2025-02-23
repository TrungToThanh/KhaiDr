import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Tag, ListCheck } from "lucide-react";
import { CategoryKiotViet } from "../types/kiotviet";

export type Props = {
  categories: CategoryKiotViet[];
  selectedCategories: CategoryKiotViet[];
  maxPrice: number;
  maxPriceFilter: number;
  setSelectedCategories: (categories: CategoryKiotViet[]) => void;
  setMaxPrice: (price: number) => void;
};

export const DesktopFilter = ({
  categories,
  selectedCategories,
  maxPrice,
  maxPriceFilter,
  setMaxPrice,
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
              {/* <span>({category?.rank})</span> */}
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
