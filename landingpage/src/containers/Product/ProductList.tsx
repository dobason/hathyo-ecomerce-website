import React, { memo, Fragment } from "react";
import { useAppDispatch } from "@/store";
import Product from "@/components/Product";
import { ProductItem } from "@/types";
import { map } from "lodash";
import { ICartItem } from "@/types/cart-item";
import Empty from "@/components/Empty";
import { addCartItem } from "@/store/cartSlice";

type Props = {
  products?: ProductItem[];
  className?: string;
  loadMore?: () => void;
  hasMoreItems?: boolean;
  isLoading?: boolean; // New prop to indicate if items are currently loading
};

function ProductList({
  className = "",
  products = [],
  loadMore = () => {},
  hasMoreItems = false,
}: Props) {
  const dispatch = useAppDispatch();

  const addProductToCart = (item: ProductItem) => {
    const product: ICartItem = {
      productId: item.id,
      merchantId: item.merchantId,
      quantity: 1,
    };
    dispatch(addCartItem(product));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={className}>
        {products && products.length > 0 ? (
          <div className="grid xl:grid-cols-4 xl:grid-cols-5 grid-cols-2 gap-4 xl:gap-4 xl:px-0">
            {map(products, (item, idx) => (
              <Product
                key={`${item.id}-${idx}`}
                {...item}
                onAddToCart={() => addProductToCart(item)}
              />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
      {hasMoreItems && (
        <button
          className={`m-2 py-2 px-6 rounded-md text-md xl:text-md bg-Moss/50 hover:scale-105 text-Moss/500 hover:text-Moss/600 w-fit mx-auto`}
          onClick={() => loadMore()}
        >
          Xem thêm sản phẩm
        </button>
      )}
    </div>
  );
}

export default memo(ProductList);
