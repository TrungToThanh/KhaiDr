import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShoppingBagIcon } from "lucide-react";
import { useCart } from "../../../context/cart-context";

interface PaymentProps {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
}

export const Payment: React.FC<PaymentProps> = ({ showCart, setShowCart }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="fixed top-4 right-4 z-30">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setShowCart(!showCart)}
                className="p-2 mt-10 bg-white rounded-full shadow-lg relative hover:scale-125"
              >
                <ShoppingBagIcon className="w-5 h-5 md:w-6 md:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] md:w-5 md:h-5 md:text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Xem giỏ hàng</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};
