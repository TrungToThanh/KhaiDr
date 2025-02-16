import { ShoppingBagIcon } from "lucide-react";

interface PaymentProps {
  showCart: boolean;
  totalItems: number;
  setShowCart: (value: boolean) => void;
}

export const Payment: React.FC<PaymentProps> = ({
  showCart,
  totalItems,
  setShowCart,
}) => {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowCart(!showCart)}
          className="p-2 mt-10 bg-white rounded-full shadow-lg relative"
        >
          <ShoppingBagIcon className="w-5 h-5 md:w-6 md:h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] md:w-5 md:h-5 md:text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
