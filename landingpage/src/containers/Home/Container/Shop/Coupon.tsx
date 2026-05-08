"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { useState } from "react";
import Image from "next/image";

const slides = [
  { src: "/images/coupon/01.png", alt: "Slide 1" },
  { src: "/images/coupon/02.png", alt: "Slide 2" },
  { src: "/images/coupon/03.png", alt: "Slide 3" },
  { src: "/images/coupon/04.png", alt: "Slide 4" },
];

const SliderBanner = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.user?.userInfo);
  const [showNotice, setShowNotice] = useState(false);

  const handleClick = () => {
    if (!isLoggedIn) {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 4000);
    } else {
      console.log("Đã đăng nhập");
    }
  };

  return (
    <div className="relative w-full">
      {showNotice && (
        <div className="fixed z-50 top-4 left-1/2 transform -translate-x-1/2 bg-white border border-red-300 px-6 py-3 rounded-lg shadow-md text-sm font-medium text-red-600 transition-opacity duration-300">
          Bạn phải đăng nhập để sử dụng mã khuyến mãi
        </div>
      )}

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={handleClick}
              className="cursor-pointer transition-transform hover:scale-[1.02] rounded-2xl overflow-hidden"
            >
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-fit rounded-2xl"
                  priority={index === 0}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderBanner;
