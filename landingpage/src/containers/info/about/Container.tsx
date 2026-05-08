"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

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
        className="bg-Moss/50 py-20 text-center px-4 md:px-20"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Chào mừng bạn đến với Hathyo
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Điểm đến hàng đầu cho mọi nhu cầu về sức khỏe và phong cách sống lành
          mạnh!
        </p>
        <p className="mt-6 max-w-4xl mx-auto text-gray-600">
          Với một thế giới ngày càng hối hả và bận rộn, việc chăm sóc sức khỏe
          trở nên ngày càng quan trọng. Tại Hathyo, chúng tôi tin rằng mỗi người
          đều xứng đáng có cuộc sống khỏe mạnh và hạnh phúc. Chính vì vậy, chúng
          tôi cam kết mang lại cho bạn những giải pháp và sản phẩm hàng đầu để
          bạn có thể chăm sóc sức khỏe của mình một cách dễ dàng và hiệu quả
          nhất.
        </p>
        <Image
          src="/images/about/hero-health.png"
          alt="Healthy Lifestyle"
          width={800}
          height={400}
          className="mt-10 rounded-lg mx-auto"
        />
      </section>

      {/* Intro */}
      <section className="py-16 px-4 md:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="heading-3 md:text-3xl font-semibold text-Moss/700">
            Hành trình chăm sóc sức khỏe dễ dàng và hiệu quả
          </h3>
          <p className="mt-4 text-gray-600">
            Hathyo tự hào là một điểm đến toàn diện cho mọi nhu cầu sức khỏe của
            bạn. Từ các sản phẩm chăm sóc sức khỏe hàng ngày, đến các dịch vụ tư
            vấn sức khỏe và phong cách sống, chúng tôi cung cấp một loạt các sản
            phẩm và dịch vụ đa dạng để đáp ứng mọi nhu cầu của bạn.
          </p>
          <p className="mt-4 text-gray-600">
            Tại Hathyo, chúng tôi không chỉ cung cấp sản phẩm, mà còn là một
            người bạn đồng hành trên hành trình chăm sóc sức khỏe của bạn. Với
            đội ngũ chuyên gia giàu kinh nghiệm và nhiệt huyết, chúng tôi sẵn
            lòng hỗ trợ bạn trong mọi vấn đề và thắc mắc liên quan đến sức khỏe
            của bạn.
          </p>
          <p className="mt-4 text-gray-600">
            Dù bạn đang tìm kiếm các sản phẩm chăm sóc cá nhân hàng ngày, hay
            muốn khám phá các giải pháp mới mẻ để cải thiện sức khỏe của mình,
            Hathyo sẽ luôn là địa chỉ tin cậy để bạn đặt niềm tin vào.
          </p>
          <p className="mt-4 text-gray-600">
            Hãy bắt đầu hành trình chăm sóc sức khỏe của bạn ngay hôm nay với
            Hathyo! Chúng tôi cam kết mang lại cho bạn trải nghiệm mua sắm trực
            tuyến an toàn, thuận tiện và đáng tin cậy nhất.
          </p>
        </div>
      </section>

      {/* Feature Highlights */}
      <section
        ref={featuresRef}
        className="py-20 px-4 md:px-20 bg-white grid gap-4 md:grid-cols-4"
      >
        {[
          {
            title: "Sản Phẩm Chất Lượng",
            desc: "Chúng tôi luôn chọn lựa kỹ lưỡng các sản phẩm từ các nhà sản xuất uy tín và được kiểm định chất lượng. Tất cả sản phẩm trên Hathyo.com đều được đảm bảo chất lượng, an toàn và hiệu quả.",
            img: "/images/about/quality.png",
          },
          {
            title: "Đa Dạng Sản Phẩm",
            desc: "Khám phá một loạt các sản phẩm sức khỏe từ các lĩnh vực như dinh dưỡng, thể dục, yoga, spa, trị liệu tự nhiên và nhiều hơn nữa. Bạn có thể dễ dàng tìm thấy những sản phẩm phù hợp với nhu cầu và mong muốn của mình.",
            img: "/images/about/diversity.png",
          },
          {
            title: "Dịch Vụ Tư Vấn Chuyên Nghiệp",
            desc: "Đội ngũ tư vấn chuyên nghiệp và giàu kinh nghiệm của chúng tôi sẽ giúp bạn chọn lựa sản phẩm phù hợp nhất với nhu cầu và mục tiêu sức khỏe của bạn. Chúng tôi luôn sẵn lòng lắng nghe và đồng hành cùng bạn trên hành trình chăm sóc sức khỏe.",
            img: "/images/about/consult.png",
          },
          {
            title: "Thanh Toán An Toàn và Giao Hàng Nhanh Chóng",
            desc: "Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và đảm bảo thanh toán an toàn qua các phương thức thanh toán phổ biến. Hơn nữa, dịch vụ giao hàng của chúng tôi luôn đảm bảo nhanh chóng và tin cậy, mang đến sản phẩm đến tay bạn một cách an toàn và kịp thời.",
            img: "/images/about/payment.png",
          },
        ].map((f, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <Image
              src={f.img}
              alt={f.title}
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-Moss/800">{f.title}</h3>
            <p className="text-gray-600 mt-2 max-w-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-Moss/700 text-white py-16 text-center px-4">
        <h3 className="heading-3 text-Moss/50 md:text-3xl font-bold mb-4">
          Sẵn sàng bắt đầu hành trình sống khỏe?
        </h3>
        <p className="mb-6">
          Hãy tham gia Hathyo ngay hôm nay để trải nghiệm mua sắm trực tuyến an
          toàn và tiện lợi.
        </p>
        <button className="bg-white text-Moss/700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Khám phá ngay
        </button>
        <p className="mt-6 text-sm">
          Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu. Nếu bạn có
          bất kỳ thắc mắc, góp ý hoặc yêu cầu hỗ trợ, đội ngũ dịch vụ khách hàng
          của chúng tôi sẽ luôn sẵn lòng hỗ trợ bạn 24/7.
        </p>
      </section>
    </main>
  );
}
