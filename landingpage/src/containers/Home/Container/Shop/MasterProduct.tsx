"use client";

import Button from "@/components/Button";
import ArrowRightFull from "@/components/Icons/ArrowRightFull";
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";

const masterProducts = [
  {
    id: 1,
    name: "Kem Chống Nắng",
    price: "200.000đ",
    image: "/product/anessa.png",
    category: "Dược mỹ phẩm",
  },
  {
    id: 2,
    name: "Nhiệt Kế",
    price: "90.000đ",
    image: "/product/nhietke.png",
    category: "Thiết bị y tế",
  },
  {
    id: 3,
    name: "Vitamin & Khoáng Chất",
    price: "Giảm đến 50%",
    image: "/product/vitamin.png",
    category: "Thực phẩm chức năng",
  },
  {
    id: 4,
    name: "Kem Đánh Răng",
    price: "Giảm đến 30%",
    image: "/product/sensodyne.png",
    category: "Chăm sóc cá nhân",
  },
];

export default function MasterProducts() {
  const router = useRouter();

  return (
    <div className="container mx-auto md:py-6 xl:py-2">
      {/* Swiper for mobile views */}
      <div className="md:hidden py-6 md:py-auto">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={2.2}
          spaceBetween={4}
          className="mySwiper"
        >
          {masterProducts?.map((product, idx) => (
            <SwiperSlide key={`${product.id}-${idx}`} className="h-full">
              <div className="flex flex-col gap-4 bg-gray-50 md:p-6 p-2 h-full rounded-sm transform transition-transform duration-300 hover:scale-105">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  layout="responsive"
                  className="aspect-square object-cover md:w-auto w-12 object-fit"
                />
                <div className="flex flex-col gap-1">
                  <h5 className="body-bold min-h-[45px]">{product.name}</h5>
                  <p className="body-md-semibold">{product.price}</p>
                  <Button
                    className="md:mt-4 mt-2"
                    type="primary"
                    rounded
                    size="small"
                    onClick={() => router.push("/product")}
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid layout for desktops */}
      <div className="hidden md:flex md:gap-4">
        <div className="w-2/5 min-h-[180px]">
          <div className="p-6 h-full overflow-hidden relative bg-gradient-to-br from-[#FFD9B0] to-[#FF914D] rounded-xl shadow-Shadow/md hover:inset-shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="text-Grayiron/500 body-md-semibold">
                  Dược mỹ phẩm
                </div>
                <div className="text-xl font-semibold text-Grayiron/600">
                  Kem Chống Nắng
                </div>
              </div>
              <div className="text-md text-Orange/600">Chỉ từ 200.000đ</div>
              <Button
                size="small"
                type="primary-outlined"
                rounded
                onClick={() => router.push("/product?shopCategoryId=121")}
              >
                Mua ngay{" "}
                <ArrowRightFull className="inline-block" strokeColor="#fff" />
              </Button>
            </div>
            <Image
              className="absolute bottom-[-32px] right-[-32px] h-auto w-[320px]"
              src={"/product/anessa.png"}
              alt="product image"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>

        <div className="w-1/5">
          <div className="p-6 h-full relative bg-gradient-to-br from-[#B1DFC4] to-[#14804A] rounded-xl shadow-Shadow/md hover:inset-shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="text-Grayiron/500 body-md-semibold">Thiết bị y tế</div>
                <div className="text-xl font-semibold text-Grayiron/600">Nhiệt Kế</div>
                <div className="text-md text-green">Chỉ từ 90.000đ</div>
              </div>
              <Button
                className="text-Moss/400"
                size="small"
                type="primary-outlined"
                rounded
                onClick={() => router.push("/product?shopCategoryId=340")}
              >
                Mua ngay <ArrowRightFull className="inline-block" />
              </Button>
            </div>
            <Image
              className="absolute bottom-0 right-0 h-auto w-[164px]"
              src={"/product/nhietke.png"}
              alt="product image"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>

        <div className="flex flex-col w-2/5 flex-4 justify-between gap-4">
          <div className="w-full h-full xl:col-span-3 xl:row-span-1">
            <div className="p-6 h-full relative bg-gradient-to-br from-[#D0F0E2] to-[#60916B] rounded-xl shadow-Shadow/md hover:inset-shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <div className="text-Grayiron/600 body-md-semibold">
                    Thực phẩm chức năng
                  </div>
                  <div className="text-xl font-semibold text-Grayiron/700">
                    Vitamin & Khoáng Chất
                  </div>
                  <div className="text-md text-Green/400">Giảm đến 50%</div>
                </div>
                <Button
                  className="text-Moss/400"
                  size="small"
                  type="primary-outlined"
                  rounded
                  onClick={() => router.push("/product?shopCategoryId=363")}
                >
                  Mua ngay <ArrowRightFull className="inline-block" />
                </Button>
              </div>
              <Image
                className="absolute bottom-0 right-0 h-auto w-[162px]"
                src={"/product/vitamin.png"}
                alt="product image"
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          </div>

          <div className="w-full h-full xl:col-span-3 xl:row-span-1">
            <div className="p-6 h-full relative bg-gradient-to-br from-[#E5E7EB] to-[#9CA3AF] rounded-xl shadow-Shadow/md hover:inset-shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <div className="text-Grayiron/600 body-md-semibold">
                    Chăm sóc cá nhân
                  </div>
                  <div className="text-xl font-semibold text-Grayiron/700">
                    Kem Đánh Răng
                  </div>
                  <div className="text-md text-Green/400">Giảm đến 30%</div>
                </div>
                <Button
                  className="text-Moss/400"
                  size="small"
                  type="primary-outlined"
                  rounded
                  onClick={() => router.push("/product?shopCategoryId=157")}
                >
                  Mua ngay <ArrowRightFull className="inline-block" />
                </Button>
              </div>
              <Image
                className="absolute bottom-0 right-0 h-auto w-[232px]"
                src={"/product/sensodyne.png"}
                alt="product image"
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
