/* eslint-disable @next/next/no-img-element */
import { get, map } from "lodash";
import React, { useState, useEffect } from "react";
import ImageFallback from "@/components/ImageFallback";
import classNames from "classnames";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

type Props = {
  images: string[];
  className?: string;
  activeImage?: string;
};

function ProductImageSlide({ images, className, activeImage }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageActive, setImageActive] = useState(get(images, activeIndex));
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    if (!!activeImage) {
      setImageActive(activeImage);
    }
  }, [activeImage]);

  const handleActiveImage = (position: number) => {
    setActiveIndex(position);
    setImageActive(get(images, position));
  };

  return (
    <div
      className={classNames("flex flex-col align-center justify-center gap-4", {
        [className ?? ""]: !!className,
      })}
    >
      <div className="w-full overflow-hidden aspect-square z-1 relative rounded-t-xl">
        <Image
          src={imageActive}
          alt="main"
          objectFit="cover"
          width={920}
          height={920}
          priority
          placeholder="empty"
        />
      </div>
      <div className="">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={isTabletOrMobile ? 3 : 4}
          spaceBetween={4}
          className="mySwiper"
          navigation={true}
        >
          {map(images, (item, index) => (
            <SwiperSlide
              key={index}
              className={classNames({
                "rounded-lg overflow-hidden aspect-square border-4 border-Moss/500 flex items-center justify-center":
                  activeIndex === index,
                "rounded-lg overflow-hidden aspect-square flex items-center justify-center hover:outline-solid hover:outline-Moss/500":
                  activeIndex !== index,
              })}
              onClick={() => handleActiveImage(index)}
            >
              <ImageFallback
                className="h-auto w-full object-contain"
                src={item || "/product-fallback-image.png"}
                alt="other image"
                width={64}
                height={64}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* {map(images, (item, index) => (
          <div
            className={classNames({
              "border-4 border-Moss/500 flex items-center justify-center":
                activeIndex === index,
              "flex items-center justify-center hover:border-4 hover:border-Moss/500":
                activeIndex !== index,
            })}
            onClick={() => setActiveIndex(index)}
            key={index}
          >
            <img
              className="h-auto max-w-full object-contain"
              src={item || "/product-fallback-image.png"}
              alt="other image"
            />
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default ProductImageSlide;
