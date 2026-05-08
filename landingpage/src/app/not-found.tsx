"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      imageRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    ).fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-white px-4"
    >
      <Image
        ref={imageRef}
        src="/images/mascot/404.png"
        alt="Mascot"
        width={280}
        height={280}
        className="drop-shadow-md"
      />
      <div ref={textRef} className="flex flex-col items-center gap-4 mt-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Oops! Không tìm thấy trang
        </h1>
        <p className="text-gray-500 text-center max-w-md">
          Có thể đường dẫn đã bị thay đổi hoặc không tồn tại. Hãy thử kiểm tra
          lại URL hoặc quay về trang chủ.
        </p>
        <Link
          href="/"
          className="mt-2 px-6 py-3 rounded-xl text-white bg-Moss/500 hover:bg-Moss/600 transition font-semibold shadow-md"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
