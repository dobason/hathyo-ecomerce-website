"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import ProductList from "./ProductList";
import MasterProduct from "./MasterProduct";
import { getProducts } from "@/services/client/home";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Zap, Heart, Shield, Leaf, Activity, Clock } from "lucide-react";

const listBanners = [
  "/images/coupon/08.png",
  "/images/coupon/07.png",
  "/images/coupon/06.png",
  "/images/coupon/05.png",
];

export default function Shop() {
  const [products, setProducts] = useState([]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const productListRef = useRef<HTMLDivElement>(null);
  const promoRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 45,
    seconds: 25,
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  // BƯỚC 2: THÊM STATE CHO ĐỒNG HỒ THỜI GIAN THỰC
  const TimeBox = ({ value }: { value: number }) => (
    <div className="bg-black text-white rounded-lg p-2 xl:p-3 min-w-12 xl:min-w-16 text-center shadow-lg">
      <div className="text-lg xl:text-2xl font-bold">
        {String(value).padStart(2, "0")}
      </div>
    </div>
  );

  const formatDiscountDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const nextMonth = new Date(year, month, 6);

    const day = nextMonth.getDate().toString().padStart(2, "0");
    const monthStr = (nextMonth.getMonth() + 1).toString().padStart(2, "0");
    const yearStr = nextMonth.getFullYear();

    return `${day}/${monthStr}/${yearStr}`;
  };

  // BƯỚC 3: THÊM HÀM LOGIC TẠO TIME SLOTS
  const createTimeSlots = () => {
    const slots = [];
    const now = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");

      if (i === 0) {
        slots.push({
          displayTime: `${String(currentTime.getHours()).padStart(
            2,
            "0"
          )}:00, ${day}/${month}`,
          label: "Bắt đầu sự kiện",
          active: true,
          realTime: {
            hours: String(currentTime.getHours()).padStart(2, "0"),
            minutes: String(currentTime.getMinutes()).padStart(2, "0"),
            seconds: String(currentTime.getSeconds()).padStart(2, "0"),
          },
        });
      } else {
        slots.push({
          displayTime: `${day}/${month}`,
          label: "Sắp diễn ra",
          active: false,
          realTime: null,
        });
      }
    }
    return slots;
  };

  // useEffect cho đồng hồ đếm ngược của "Ưu đãi đặc biệt"
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 22;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // BƯỚC 2 (tiếp theo): THÊM EFFECT CHO ĐỒNG HỒ THỜI GIAN THỰC
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // useEffect để fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchData();
  }, []);

  // useEffect cho animation GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(productListRef.current, {
        opacity: 0,
        y: 40,
        delay: 0.3,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(promoRef.current, {
        opacity: 0,
        x: 50,
        delay: 0.5,
        duration: 1,
        ease: "power2.out",
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  // BƯỚC 3 (tiếp theo): GỌI HÀM LOGIC TRƯỚC KHI RENDER
  const timeSlots = createTimeSlots();

  return (
    <>
      <main>
        <div ref={wrapperRef} className="xl:py-8 py-4 flex flex-col gap-4">
          <div className="flex flex-col xl:flex-row gap-4">
            {/* Slider Banner */}
            <div className="xl:w-10/12 relative rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-green-400 to-green-600">
              <div className="relative w-full h-[240px] xl:h-full">
                <Swiper
                  slidesPerView={1}
                  loop
                  autoplay={{ delay: 4000 }}
                  pagination={{ clickable: true }}
                  modules={[Autoplay, Pagination]}
                  className="w-full h-full"
                >
                  {listBanners.map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <div
                        className="relative w-full h-full flex items-center justify-center"
                        tabIndex={-1}
                      >
                        <Image
                          src={src}
                          alt={`Slide ${idx + 1}`}
                          fill
                          className="object-contain"
                          quality={80}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-base xl:text-lg text-center py-2 z-10">
                          🎉 Mã giảm giá áp dụng đến{" "}
                          <span tabIndex={-1} className="underline">
                            {formatDiscountDate()}
                          </span>{" "}
                          - Không kèm chương trình khác
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Promotion Boxes */}
            <div
              ref={promoRef}
              className="hidden xl:flex flex-col gap-4 xl:w-2/12"
            >
              {[
                {
                  title: "TRANG HOÀN NHÀ CỬA - ĐIỆN TỬ ĐIỆN LẠNH GIẢM ĐẾN 12%",
                  imageUrl: "/images/promotions/dt-lt-01.png",
                  link: "/product?shopCategoryId=424",
                },
                {
                  title: "ĂN NGON - UỐNG KHỎE - THỰC PHẨM ĐỒ UỐNG GIẢM ĐẾN 20%",
                  imageUrl: "/images/promotions/food-01.png",
                  link: "/product?shopCategoryId=58",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="relative aspect-square overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={item.imageUrl}
                    alt="promotion"
                    fill
                    className="object-cover"
                    quality={80}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-2 px-2 z-10">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div ref={wrapperRef} className="xl:py-8 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-start px-1">
          <h3 className="whitespace-nowrap text-red-600 font-bold tracking-wide text-[30px] text-center leading-tight flex-shrink">
            🔥 Ưu đãi đặc biệt
          </h3>
          {/* Countdown Timer */}
          <div className="flex items-center gap-1 xl:gap-2 scale-50">
            <TimeBox value={timeLeft.hours} />
            <div className="text-sm xl:text-xl font-bold text-gray-800">:</div>
            <TimeBox value={timeLeft.minutes} />
            <div className="text-sm xl:text-xl font-bold text-gray-800">:</div>
            <TimeBox value={timeLeft.seconds} />
          </div>
        </div>
        <div ref={productListRef} className="w-full">
          <ProductList products={products} />
        </div>

        {/* BƯỚC 4: DÁN TOÀN BỘ MÃ JSX VÀO ĐÂY */}
        <div className="my-4 md:my-8">
          <div className="w-full max-w-6xl mx-auto px-2 md:px-4">
            {/* Main Header Banner */}
            <div className="relative bg-gradient-to-r from-green-700 via-green-600 to-green-500 rounded-xl md:rounded-2xl p-3 md:p-6 text-white overflow-hidden shadow-2xl">
              {/* Background decorative elements - Responsive sizes */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute -top-4 md:-top-8 -left-4 md:-left-8 w-16 h-16 md:w-32 md:h-32 bg-white bg-opacity-10 rounded-full blur-sm"></div>
                <div className="absolute -top-2 md:-top-4 left-10 md:left-20 w-8 h-8 md:w-16 md:h-16 bg-yellow-300 bg-opacity-20 rounded-full"></div>
                <div className="absolute top-4 md:top-8 left-16 md:left-32 w-4 h-4 md:w-8 md:h-8 bg-white bg-opacity-15 rounded-full"></div>
                <div className="absolute -bottom-3 md:-bottom-6 -right-3 md:-right-6 w-12 h-12 md:w-24 md:h-24 bg-white bg-opacity-10 rounded-full blur-sm"></div>
                <div className="absolute bottom-2 md:bottom-4 right-10 md:right-20 w-6 h-6 md:w-12 md:h-12 bg-yellow-300 bg-opacity-15 rounded-full"></div>
              </div>

              {/* Content - Responsive Layout */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
                {/* Left side - Logo and Main text */}
                <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto justify-center md:justify-start">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
                        <Heart className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" />
                      </div>
                      <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <Zap className="w-3 h-3 md:w-4 md:h-4 text-green-700" />
                      </div>
                      <div className="absolute -bottom-1 -left-1 md:-left-2 w-4 h-4 md:w-6 md:h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <Leaf className="w-2 h-2 md:w-3 md:h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start">
                      <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-wide drop-shadow-lg">
                        <span className="text-white">TUẦN LỄ SỨC KHỎE</span>
                      </h1>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1 text-green-100">
                      <Shield className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm lg:text-base font-medium">
                        Chăm sóc sức khỏe - Sống khỏe mỗi ngày
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side - Time - Hide on very small screens, show differently on mobile */}
                <div className="relative flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 border border-white border-opacity-30 shadow-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 md:gap-2 text-lg md:text-xl font-black text-yellow-300 drop-shadow-lg">
                        <Clock className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-xl">8H - 22H</span>
                      </div>
                      <div className="text-xs font-medium text-green-100 mt-1">
                        Tư vấn miễn phí
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 w-5 h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full animate-bounce shadow-lg flex items-center justify-center">
                    <span className="text-green-700 text-xs font-bold">!</span>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400"></div>

              {/* Floating wellness icons - Hide on mobile for cleaner look */}
              <div className="hidden md:block absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-3 opacity-30">
                  <Heart className="w-4 h-4 text-white animate-pulse" />
                  <Leaf
                    className="w-4 h-4 text-white animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <Shield
                    className="w-4 h-4 text-white animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                  <Activity
                    className="w-4 h-4 text-white animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                  />
                </div>
              </div>

              {/* Time Slots Bar - Responsive */}
              <div className="relative z-10 mt-4 md:mt-6 bg-green-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-white border-opacity-10">
                <div className="flex items-center justify-between gap-1 md:gap-2">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`flex-1 text-center ${
                        slot.active
                          ? "bg-white bg-opacity-20 rounded-md md:rounded-lg p-1 md:p-2"
                          : "p-1 md:p-2"
                      }`}
                    >
                      <div
                        className={`font-bold text-xs md:text-sm ${
                          slot.active ? "text-yellow-300" : "text-white"
                        }`}
                      >
                        {slot.active && slot.realTime ? (
                          <div className="flex items-center justify-center gap-1">
                            <span className="hidden sm:inline">
                              {slot.realTime.hours}:{slot.realTime.minutes}:
                              {slot.realTime.seconds}
                            </span>
                            <span className="sm:hidden">
                              {slot.realTime.hours}:{slot.realTime.minutes}
                            </span>
                          </div>
                        ) : (
                          <span className="block truncate">
                            {slot.displayTime}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          slot.active ? "text-yellow-100" : "text-green-100"
                        }`}
                      >
                        {slot.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product List with improved spacing */}
            <div className="mt-4 md:mt-6">
              <ProductList products={products} />
            </div>
          </div>
        </div>

        <div ref={wrapperRef} className="xl:py-8 py-4 flex flex-col gap-4">
          <h3
            ref={headingRef}
            className="heading-3 text-black font-bold bg-clip-text bg-gradient-to-r from-teal-500 flex gap-2"
          >
            Sản phẩm nổi bật
          </h3>
          <MasterProduct />
        </div>
      </div>
    </>
  );
}
