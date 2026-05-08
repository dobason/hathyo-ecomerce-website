/* eslint-disable @next/next/no-img-element */
"use client";

import React, { memo, useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/store";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import ProductImageSlide from "@/components/ProductImageSlide";
import Rating from "@/components/Rating";
import SelectQuantity from "@/components/SelectQuantity";
import { formatToCurrencyVND } from "@/utils/commonHelper";
import { addCartItem, addRecentlyViewed } from "@/store/cartSlice";
import classNames from "classnames";
import { AttributeValueResponse, ProductDetail } from "@/types";
import Cart from "@/components/Icons/Cart";
import { useRouter } from "next/navigation";
import gsap from "gsap";

type Props = {
  className?: string;
  product: ProductDetail;
};

function ProductInfo({ className = "", product }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [mainAttr, setMainAttr] = useState<AttributeValueResponse>();
  const [secondAttr, setSecondAttr] = useState<AttributeValueResponse>();
  const [error, setError] = useState<boolean>(false);
  const [productDetail, setProductDetail] = useState<ProductDetail>(product);
  const images = [
    productDetail?.mainImageUrl || "",
    ...(productDetail?.otherImageUrls || []),
  ];
  const [price, setPrice] = useState<number>(product.price);
  const [anchorPrice, setAnchorPrice] = useState<number>(product.anchoPrice);
  const [mainImg, setMainImg] = useState<string>(product.mainImageUrl);

  // Animation Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const toastId = "add-to-cart-success";

  useEffect(() => {
    setProductDetail(product);
  }, [product]);

  useEffect(() => {
    if (product?.id) {
      dispatch(addRecentlyViewed(product));
    }
  }, [product, dispatch]);

  useEffect(() => {
    validateAttributes();
  }, [mainAttr, secondAttr, product]);

  useEffect(() => {
    handlePriceAndImage();
  }, [mainAttr, secondAttr, product]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blocksRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const handlePriceAndImage = () => {
    const findVariants = product.variants?.find(
      (v) =>
        (mainAttr?.id ?? null) === (v.mainAttributeValueId ?? null) &&
        (secondAttr?.id ?? null) === (v.secondAttributeValueId ?? null)
    );
    if (findVariants) {
      setPrice(findVariants.price);
      setAnchorPrice(findVariants.anchoPrice);
      setMainImg(findVariants.imageUrl);
    } else {
      setPrice(product.price);
      setAnchorPrice(product.anchoPrice);
      setMainImg(product.mainImageUrl);
    }
  };

  const validateAttributes = () => {
    if (productDetail?.mainAttribute && !mainAttr) {
      setError(true);
      return;
    }
    if (productDetail?.secondAttribute && !secondAttr) {
      setError(true);
      return;
    }
    setError(false);
  };

  const addProductToCart = () => {
    if (productDetail?.mainAttribute && !mainAttr) {
      setError(true);
      return;
    }
    if (productDetail?.secondAttribute && !secondAttr) {
      setError(true);
      return;
    }
    setError(false);
    dispatch(
      addCartItem({
        productId: productDetail?.id,
        quantity,
        mainAttributeValueId: mainAttr?.id,
        secondAttributeValueId: secondAttr?.id,
        merchantId: productDetail?.merchantId,
      })
    );

    toast.success("Thêm vào giỏ hàng thành công", { toastId });
  };

  const onBuyNow = () => {
    addProductToCart();
    router.push("/cart");
  };

  const productDetails = [
    { label: "Thương hiệu", value: productDetail?.brandName },
    { label: "Đơn vị tính", value: productDetail?.unit },
    { label: "Xuất xứ", value: productDetail?.placeOfOrigin },
    {
      label: "Quy cách",
      value: productDetail?.numberOfChildrenUnit
        ? `${productDetail?.numberOfChildrenUnit} viên`
        : undefined,
    },
  ].filter((d) => d.value != null);

  return (
    <div
      ref={wrapperRef}
      className={classNames("bg-white p-6 rounded-xl", {
        [className]: !!className,
      })}
    >
      <div className="flex xl:flex-row gap-4 xl:gap-8 flex-col justify-between">
        <div
          ref={(el) => void (blocksRef.current[0] = el)}
          className="xl:w-5/12"
        >
          <ProductImageSlide images={images} activeImage={mainImg} />
        </div>

        <div className="xl:w-7/12 text-center xl:text-left flex flex-col gap-4 xl:gap-8">
          <h3
            ref={(el) => void (blocksRef.current[1] = el)}
            className="heading-3 text-Grayiron/600 font-semibold line-clamp-2"
          >
            {productDetail?.title}
          </h3>

          <div ref={(el) => void (blocksRef.current[2] = el)}>
            <Rating
              className="justify-center xl:justify-start"
              size="small"
              value={productDetail?.rating}
            />
          </div>

          <div
            ref={(el) => void (blocksRef.current[3] = el)}
            className="flex gap-4 items-center p-4 bg-gray-100 rounded"
          >
            <div className="text-3xl text-Warning/500 font-bold">
              {formatToCurrencyVND(price)}
            </div>
            {anchorPrice && (
              <div className="text-xl text-Grayiron/400 font-normal line-through">
                {formatToCurrencyVND(anchorPrice)}
              </div>
            )}
            {(() => {
              const discount = productDetail?.discountPercent;
              const isValidDiscount =
                discount && discount > 0 && discount < 100;

              return isValidDiscount ? (
                <div className="bg-red-50 text-xs rounded-sm text-Warning/500 py-1 px-2">
                  {discount} %
                </div>
              ) : null;
            })()}
          </div>

          <div
            ref={(el) => void (blocksRef.current[4] = el)}
            className="text-Grayiron/600 font-normal body-lg-semibold"
            dangerouslySetInnerHTML={{
              __html: productDetail?.shortDescription ?? "",
            }}
          />

          {productDetails.length > 0 && (
            <div
              ref={(el) => void (blocksRef.current[5] = el)}
              className="flex items-center"
            >
              <table className="w-full xl:w-6/12">
                <tbody>
                  {productDetails.map((d, i) => (
                    <tr key={i}>
                      <td className="text-Grayiron/600 body-medium text-start py-2">
                        {d.label}
                      </td>
                      <td className="text-Grayiron/600 body-semibold  text-end py-2">
                        {d.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div
            ref={(el) => void (blocksRef.current[6] = el)}
            className={classNames(
              "flex flex-col gap-4 xl:gap-8 p-4 rounded-sm",
              {
                "bg-orange-50": !!error,
              }
            )}
          >
            {productDetail?.mainAttribute && (
              <div className="flex items-center gap-4">
                <div className="body-sm-semibold text-Grayiron/700  xl:block hidden">
                  {productDetail?.mainAttribute?.name}
                </div>
                <div className="flex flex-wrap -m-2">
                  {productDetail?.mainAttribute?.attributeValues?.map(
                    (c, i) => (
                      <button
                        key={i}
                        className={`m-2 py-1 px-4 border rounded-md body-sm-medium ${
                          mainAttr?.id === c?.id
                            ? "border-Moss/500 bg-Grayiron-100 text-Moss/500"
                            : "border-gray-200"
                        }`}
                        onClick={() => setMainAttr(c)}
                      >
                        {c?.value}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {productDetail?.secondAttribute && (
              <div className="flex items-center gap-4 mb-6">
                <div className="body-sm-semibold text-Grayiron/700  xl:block hidden">
                  {productDetail?.secondAttribute?.name}
                </div>
                <div className="flex flex-wrap -m-2">
                  {productDetail?.secondAttribute?.attributeValues?.map(
                    (m, i) => (
                      <button
                        key={i}
                        className={`m-2 py-1 px-4 border rounded-sm body-sm-medium ${
                          secondAttr?.id === m?.id
                            ? "border-Moss/500 bg-Grayiron-100 text-Moss/500"
                            : "border-gray-200"
                        }`}
                        onClick={() => setSecondAttr(m)}
                      >
                        {m?.value}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-row justify-start items-center">
              <SelectQuantity quantity={quantity} setQuantity={setQuantity} />
            </div>
            {!!error && (
              <p className="text-red-500 body-xs-medium">
                Vui lòng chọn phân loại hàng
              </p>
            )}
          </div>

          <div
            ref={(el) => void (blocksRef.current[7] = el)}
            className="flex xl:flex-row flex-col items-center gap-4"
          >
            <Button
              type="primary-outlined"
              onClick={addProductToCart}
              requiredLogin
              icon={<Cart />}
              className="h-full w-full xl:w-fit"
            >
              Thêm vào giỏ
            </Button>
            <Button
              className="h-full w-full xl:w-fit"
              onClick={onBuyNow}
              type="primary"
              requiredLogin
            >
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductInfo);
