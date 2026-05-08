import { useState, useEffect, memo } from "react";

type ShippingMethodType = {
  id: string;
  name: string;
  price: number;
  estimatedTime: string;
};

type ShippingCheckResponse = {
  cartId: number;
  availableMethods: ShippingMethodType[];
  hasMultipleMethods: boolean;
};

type Props = {
  cartId: number;
  merchantName: string;
  className?: string;
  onShippingChange?: (cartId: number, method: ShippingMethodType) => void;
};

const SHIPPING_METHODS = {
  ECONOMY: {
    id: "economy",
    name: "Giao hàng tiết kiệm",
    price: 15000,
    estimatedTime: "3-5 ngày",
  },
  EXPRESS: {
    id: "express",
    name: "Giao hàng hoả tốc",
    price: 30000,
    estimatedTime: "1-2 ngày",
  },
};

function ShippingMethod({
  cartId,
  merchantName,
  className = "",
  onShippingChange,
}: Props) {
  const [selectedMethod, setSelectedMethod] = useState<ShippingMethodType>(
    SHIPPING_METHODS.ECONOMY
  );
  const [availableMethods, setAvailableMethods] = useState<ShippingMethodType[]>(
    []
  );
  const [hasMultipleMethods, setHasMultipleMethods] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  // Fetch shipping methods từ API
  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/v1/product-shipping/check?cartId=${cartId}&provinceId=1`
        );
        const data: ShippingCheckResponse = await response.json();

        // Giả lập response data dựa trên cartId
        const mockMethods =
          cartId % 2 === 0
            ? [SHIPPING_METHODS.ECONOMY, SHIPPING_METHODS.EXPRESS]
            : [SHIPPING_METHODS.ECONOMY];

        setAvailableMethods(mockMethods);
        setHasMultipleMethods(mockMethods.length > 1);
        setSelectedMethod(mockMethods[0]); // Mặc định chọn phương thức đầu tiên

        if (onShippingChange) {
          onShippingChange(cartId, mockMethods[0]);
        }
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
        // Fallback to economy method only
        setAvailableMethods([SHIPPING_METHODS.ECONOMY]);
        setHasMultipleMethods(false);
        setSelectedMethod(SHIPPING_METHODS.ECONOMY);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingMethods();
  }, [cartId, onShippingChange]);

  const handleMethodChange = (method: ShippingMethodType) => {
    setSelectedMethod(method);
    setShowOptions(false);
    if (onShippingChange) {
      onShippingChange(cartId, method);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading) {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  //
  // <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
  //   <div className="flex justify-between items-center pb-3 border-b border-gray-200">
  //     <h3 className="text-lg text-gray-700 font-bold">
  //       Phương thức vận chuyển
  //     </h3>
  //     {hasMultipleMethods && (
  //       <div
  //         className="flex items-center gap-2 cursor-pointer"
  //         onClick={() => setShowOptions(!showOptions)}
  //       >
  //         <span className="text-base text-[#FDB022] font-medium">
  //           Thay đổi
  //         </span>
  //         <svg
  //           className={`w-4 h-4 text-[#FDB022] transition-transform ${showOptions ? 'rotate-180' : ''}`}
  //           fill="none"
  //           stroke="currentColor"
  //           viewBox="0 0 24 24"
  //         >
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  //         </svg>
  //       </div>
  //     )}
  //   </div>

  //   <div className="pt-3 space-y-3">
  //     {/* Selected Method Display */}
  //     <div className="flex justify-between items-center">
  //       <div className="flex items-center gap-3">
  //         <div className="w-6 h-6 rounded-full bg-Moss/500 flex items-center justify-center">
  //           <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
  //             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  //           </svg>
  //         </div>
  //         <div>
  //           <p className="font-medium text-gray-800">{selectedMethod.name}</p>
  //           <p className="text-sm text-gray-500">{selectedMethod.estimatedTime}</p>
  //         </div>
  //       </div>
  //       <div className="text-right">
  //         <p className="font-semibold text-Moss/500">{formatPrice(selectedMethod.price)}</p>
  //       </div>
  //     </div>

  //     {/* Options Dropdown */}
  //     {showOptions && hasMultipleMethods && (
  //       <div className="border-t border-gray-200 pt-3 space-y-2">
  //         {availableMethods.map((method) => (
  //           <div
  //             key={method.id}
  //             className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors ${
  //               selectedMethod.id === method.id
  //                 ? 'bg-Moss/50 border border-Moss/500'
  //                 : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
  //             }`}
  //             onClick={() => handleMethodChange(method)}
  //           >
  //             <div className="flex items-center gap-3">
  //               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
  //                 selectedMethod.id === method.id
  //                   ? 'border-Moss/500 bg-Moss/500'
  //                   : 'border-gray-300'
  //               }`}>
  //                 {selectedMethod.id === method.id && (
  //                   <div className="w-2 h-2 rounded-full bg-white"></div>
  //                 )}
  //               </div>
  //               <div>
  //                 <p className="font-medium text-gray-800">{method.name}</p>
  //                 <p className="text-sm text-gray-500">{method.estimatedTime}</p>
  //               </div>
  //             </div>
  //             <div className="text-right">
  //               <p className="font-semibold text-Moss/500">{formatPrice(method.price)}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )}

  //     {/* Single Method Info */}
  //     {!hasMultipleMethods && (
  //       <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
  //         Cửa hàng {merchantName} chỉ hỗ trợ phương thức vận chuyển này
  //       </div>
  //     )}
  //   </div>
  // </div>
  //);
}

export default memo(ShippingMethod);
