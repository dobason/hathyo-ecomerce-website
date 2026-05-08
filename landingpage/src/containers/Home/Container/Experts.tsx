"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const experts = [
  {
    name: "BS. Cao Xuân Hồng Hạnh",
    specialty: "Chuyên Khoa Phụ Sản",
    image: "/images/dr.Hanh.png",
  },
  {
    name: "BS.CKI. Nguyễn Tiến Lực",
    specialty: "Chuyên Khoa Ngoại Tổng Hợp",
    image: "/images/dr.Luc.png",
  },
  {
    name: "BS.CKI. Cao Thanh Tùng",
    specialty: "Chuyên Khoa Phụ Sản",
    image: "/images/dr.Tung.png",
  },
  {
    name: "BS.CKI. Nguyễn Lê Hồng Vân",
    specialty: "Chuyên Khoa Dinh Dưỡng",
    image: "/images/dr.Van.png",
  },
];

export default function Experts() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const ceoRef = useRef<HTMLDivElement>(null);
  const avatarGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        delay: 0.3,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(ceoRef.current, {
        opacity: 0,
        y: 30,
        delay: 0.5,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(avatarGlowRef.current, {
        x: "100%",
        duration: 1.8,
        repeat: -1,
        ease: "power2.inOut",
        yoyo: true,
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="container mx-auto flex flex-col gap-6 xl:gap-10 px-4"
    >
      <h3
        ref={headingRef}
        className="text-center heading-3 font-quicksand text-Moss/700"
      >
       Tư vấn cùng các chuyên gia về sức khỏe
      </h3>

      <div className="grid xl:grid-rows-1 grid-rows-2 grid-flow-col gap-2 xl:gap-6">
        {experts.map((expert, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="flex flex-col gap-2 items-center text-center p-3"
          >
            <Image
              className="aspect-[1/1] xl:w-[220px] w-28 rounded-full object-cover border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
              src={expert.image}
              alt={expert.name}
              width={220}
              height={220}
              quality={80}
              priority={index === 0}
            />
            <div className="text-lg font-semibold text-gray-700">
              {expert.name}
            </div>
            <div className="text-sm text-gray-500">{expert.specialty}</div>
          </div>
        ))}
      </div>

      {/* CEO Section */}
      <div
        ref={ceoRef}
        className="relative flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-xl mt-10 bg-gradient-to-br from-green-700 via-emerald-600 to-lime-500 text-white"
      >
        {/* Avatar Section with light sweep */}
        <div className="md:w-1/3 w-full min-h-[420px] relative">
          <Image
            src="/images/vcards/phung-hoang.png"
            alt="HOÀNG MINH PHỤNG"
            fill
            className="object-cover"
            quality={90}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            ref={avatarGlowRef}
            className="absolute top-0 left-[-50%] w-1/2 h-full bg-white/10 blur-xl skew-x-[-30deg] pointer-events-none"
          />
        </div>

        {/* Content Section */}
        <div className="relative md:w-2/3 p-6 flex flex-col justify-center gap-4 z-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              HOÀNG MINH PHỤNG
            </h2>
            <h6 className="text-base md:text-lg font-medium text-white/90">
              Founder & CEO | Wellness Architect
            </h6>
          </div>

          <blockquote className="flex flex-col gap-3 border-l-4 pl-4 text-sm md:text-base italic leading-relaxed text-white/90 bg-white/5 py-3 rounded-md border-l-[4px] border-gradient-to-r from-yellow-300 via-pink-400 to-red-400">
            <p>
              “Với tâm huyết sáng lập nên Hathyo, tôi mong muốn xây dựng một
              thương hiệu đáng tin cậy nơi mà mọi người có thể đặt trọn niềm tin
              khi lựa chọn sản phẩm chăm sóc sức khỏe cho bản thân và gia đình.
            </p>
            <p>
              Hathyo không chỉ là một thương hiệu, mà còn là niềm tự hào, là lời
              hứa chân thành mang đến giá trị thật cho cộng đồng, đặc biệt là bà
              con Việt Nam nói chung.”
            </p>
          </blockquote>

          <div className="flex flex-col gap-2 text-sm text-white/90">
            <p className="flex items-center gap-2">
              <i className="bi bi-geo-alt" />
              <a
                href="https://maps.app.goo.gl/9fsyrQdAEaw3Uot97"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                82 Phan Đăng Lưu, Phường Đức Nhuận, TP HCM
              </a>
            </p>
            <p className="flex items-center gap-2">
              <i className="bi bi-phone" />
              <a
                href="http://zalo.me/0908556220"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                (+84) 0908 556 220
              </a>
            </p>
            <p className="flex items-center gap-2">
              <i className="bi bi-envelope" />
              <a href="mailto:email@hathyo.com" className="hover:underline">
                email@hathyo.com
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://www.linkedin.com/company/hathyo"
              target="_blank"
              className="flex items-center gap-1 hover:underline"
            >
              <i className="bi bi-linkedin" /> LinkedIn
            </a>
            <a
              href="https://www.facebook.com/hathyoVN"
              target="_blank"
              className="flex items-center gap-1 hover:underline"
            >
              <i className="bi bi-facebook" /> Facebook
            </a>
            <a
              href="https://lazinet.com/assets/img/team/Phung-Hoang-Wechat.jpeg"
              target="_blank"
              className="flex items-center gap-1 hover:underline"
            >
              <i className="fab fa-weixin" /> WeChat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
