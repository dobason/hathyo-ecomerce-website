import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const EmptyAnimation = () => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current!, // the current element is always expected to be defined
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/empty.json", // the path to the animation json
    });

    return () => anim.destroy(); // Optional clean up for unmounting
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8">
      <div
        ref={animationContainer}
        className="w-full md:w-2/3 xl:w-1/2 xl:w-1/3 mx-auto h-64 md:h-96" // Responsive width and fixed height
      />
      <p className="mt-4 text-center text-gray-600 text-sm md:text-base">
        Không tìm thấy dữ liệu
      </p>
    </div>
  );
};

export default EmptyAnimation;
