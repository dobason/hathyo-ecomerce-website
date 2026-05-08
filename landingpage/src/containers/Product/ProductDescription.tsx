"use client";

import CKContent from "@/components/CKContent";
import { memo, useEffect, useRef } from "react";
import gsap from "gsap";

function ProductDescription({
  className = "",
  description = "",
}: {
  className?: string;
  description: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, contentRef.current], {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`bg-white p-6 rounded-xl flex flex-col gap-6 ${className}`}
    >
      <div ref={titleRef} className="heading-3 text-Moss/700">
        Mô tả sản phẩm
      </div>
      <div ref={contentRef}>
        <CKContent data={description} />
      </div>
    </div>
  );
}

export default memo(ProductDescription);
