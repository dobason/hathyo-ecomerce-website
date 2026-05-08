"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
    gsap.fromTo(
      featuresRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="bg-Moss/50 py-20 text-center px-4 md:px-20 flex items-center justify-between gap-12"
      >
        <Image
          className="xl:block hidden rounded-2xl"
          src="/images/items/hanh-trinh.png"
          alt="Hathyo vui khoe"
          width={400}
          height={600}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Hành trình thay đổi bản thân
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Cùng Hathyo bắt đầu hành trình hướng đến một phiên bản khỏe mạnh, tự
            tin và hạnh phúc hơn mỗi ngày!
          </p>
          <p className="mt-6 max-w-4xl mx-auto text-gray-600">
            Chúng tôi hiểu rằng mỗi hành trình thay đổi đều bắt đầu từ những
            bước đi nhỏ. Hathyo cam kết đồng hành cùng bạn bằng những sản phẩm,
            dịch vụ và kiến thức hữu ích để bạn cải thiện sức khỏe, xây dựng
            thói quen tích cực và phát triển lối sống lành mạnh bền vững.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-4 md:px-20 bg-[url(/images/background/pattern.png)] bg-cover">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Biến đổi từ bên trong – Khỏe mạnh từ hôm nay
          </h2>
          <p className="mt-4 text-gray-50">
            Tại Hathyo, chúng tôi không chỉ cung cấp sản phẩm, mà còn mang đến
            sự đồng hành và cảm hứng để bạn từng bước tạo dựng một cuộc sống
            lành mạnh, tích cực và cân bằng hơn.
          </p>
        </div>
      </section>

      {/* Feature Highlights */}
      <section
        ref={featuresRef}
        className="py-20 px-4 md:px-20 bg-white grid gap-8 md:grid-cols-2"
      >
        {[
          {
            title: "Dinh Dưỡng Tốt Hơn",
            desc: "Khám phá các giải pháp hỗ trợ ăn uống lành mạnh và đủ chất mỗi ngày.",
            image: "/images/items/dinh-duong.png",
          },
          {
            title: "Thói Quen Tốt",
            desc: "Thiết lập lối sống cân bằng từ giấc ngủ, dinh dưỡng đến vận động.",
            image: "/images/items/thoi-quen.png",
          },
          {
            title: "Tư Duy Tích Cực",
            desc: "Nuôi dưỡng tinh thần lạc quan, yêu bản thân và phát triển bền vững.",
            image: "/images/items/tu-duy.png",
          },
          {
            title: "Đồng Hành Cùng Hathyo",
            desc: "Chúng tôi ở đây mỗi ngày để giúp bạn tiến xa hơn trên hành trình của mình.",
            image: "/images/items/dong-hanh.png",
          },
        ].map((f, idx) => (
          <div
            key={idx}
            className="text-center border border-gray-200 rounded-2xl p-6 shadow-inner hover:shadow-md transition duration-300 bg-white flex items-center justify-between gap-2"
          >
            <Image
              src={f.image}
              alt="Hathyo vui khoe"
              width={200}
              height={200}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold text-Moss/800">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-Moss/700 text-white py-16 text-center px-4">
        <h2 className="text-2xl text-white md:text-3xl font-bold mb-4">
          Sẵn sàng thay đổi bản thân ngay hôm nay?
        </h2>
        <p className="mb-6">
          Cùng Hathyo kiến tạo hành trình sống khỏe – bắt đầu từ chính bạn.
        </p>
        <button className="bg-white text-Moss/700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Bắt đầu ngay
        </button>
      </section>
    </main>
  );
}
