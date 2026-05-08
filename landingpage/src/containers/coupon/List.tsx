"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import gsap from "gsap";
import { getCoupons, collectCoupon } from "@/services/client/coupon";
import { getProducts } from "@/services/client/home";
import { useAppDispatch } from "@/store";
import { addCartItem } from "@/store/cartSlice";
import Product from "@/components/Product";
import { map, slice } from "lodash";
import BuyNowButton from "@/components/BuyNowButton";

// ==== Type Definitions ====
type Coupon = {
  code: string;
  title: string;
  description: string;
  image: string;
  discountType: "PERCENT" | "PRICE";
  discountValue: number;
  discountPercent: number;
  minimumPriceApply: number;
  maxDiscountPrice: number;
  quantity: number;
  startAt: string;
  expiredAt: string;
  type: string;
  merchantId: number;
  productId: number;
};

type ProductItem = {
  id: number;
  name: string;
  price: number; // updated to number
  image: string;
  category: string;
  catId: number;
  merchantId: number;
  title: string;
  mainImageUrl: string;
};

const slides = [
  { src: "/images/coupon/01.png", alt: "Slide 1" },
  { src: "/images/coupon/02.png", alt: "Slide 2" },
  { src: "/images/coupon/03.png", alt: "Slide 3" },
  { src: "/images/coupon/04.png", alt: "Slide 4" },
];

export default function CouponLandingPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const bannerRef = useRef(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user?.userInfo);

  useEffect(() => {
    fetchCoupons();
    fetchProducts();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await getCoupons({
        params: {
          page: 0,
          size: 100,
        },
      });
      setCoupons(response?.coupons || []);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      const normalized = (res || []).map((item: any) => ({
        ...item,
        price: parseFloat(item.price?.toString().replace(/[^\d.]/g, "") || "0"),
      }));
      setProducts(normalized);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  const handleSave = async (coupon: Coupon) => {
    try {
      await collectCoupon({
        params: {
          couponId: coupon.code,
          code: coupon.code,
        },
      });
      toast.success(`Đã lưu mã ${coupon.code}`);
    } catch (error) {
      console.error("Lỗi khi lưu mã:", error);
      toast.error("Lưu mã thất bại, vui lòng thử lại.");
    }
  };

  const addProductToCart = async (item: ProductItem) => {
    if (!!item.id && !!item.title && !!item.mainImageUrl && !!item.price) {
      const product = {
        productId: item.id,
        merchantId: item.merchantId,
        quantity: 1,
      };
      dispatch(addCartItem(product));
    }
  };

  const getDiscountText = (c: Coupon) =>
    c.discountType === "PERCENT"
      ? `Giảm ${
          c.discountPercent
        }% (tối đa ${c.maxDiscountPrice.toLocaleString()}đ)`
      : `Giảm ${c.discountValue.toLocaleString()}đ`;

  const getConditionText = (c: Coupon) =>
    `Đơn tối thiểu ${c.minimumPriceApply.toLocaleString()}đ`;

  return (
    <main className="bg-gradient-to-br from-yellow-50 to-pink-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="py-20 text-center bg-gradient-to-r from-rose-100 via-orange-100 to-pink-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pink-600">
          Nhận Ưu Đãi Đặc Biệt Hôm Nay!
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Khám phá các mã giảm giá giới hạn, sản phẩm nổi bật và nhiều ưu đãi
          hấp dẫn dành riêng cho bạn.
        </p>
      </section>

      {/* Banner */}
      <section ref={bannerRef} className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full aspect-[16/9] cursor-pointer">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Danh sách mã giảm giá */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text mb-8">
          Danh sách mã giảm giá
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300 border border-orange-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-pink-400"></div>
              <h3 className="font-semibold text-lg mb-1 text-pink-600 flex items-center justify-between">
                <span>{coupon.title}</span>
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded font-mono">
                  {coupon.code}
                </span>
              </h3>
              <p className="text-orange-500 text-sm mb-1">
                {getDiscountText(coupon)}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                {getConditionText(coupon)}
              </p>
              {/* <button
                className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:opacity-90 transition"
              >
                Mua ngay
              </button> */}
              <BuyNowButton />
            </div>
          ))}
        </div>
      </section>

      {/* Sản phẩm gợi ý */}
      <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h5 className="text-center text-2xl font-semibold text-black font-quicksand tracking-wide mb-6">
            🎯 Gợi ý cho bạn
          </h5>
          <div className="grid xl:grid-cols-6 grid-cols-2 gap-4 xl:gap-4 text-sm text-gray-800 font-big line-clamp-2">
            {map(slice(products, 0, 8), (item, index) => (
              <Product
                key={index}
                {...item}
                onAddToCart={() => addProductToCart(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Kết thúc */}
      <section className="bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Hãy sẵn sàng săn ưu đãi mỗi ngày cùng chúng tôi!
        </h2>
        <p className="text-gray-500 mt-2">
          Ưu đãi có thể hết bất cứ lúc nào. Đừng bỏ lỡ!
        </p>
      </section>
    </main>
  );
}
