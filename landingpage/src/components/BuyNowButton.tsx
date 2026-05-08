"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const BuyNowButton = () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => !!state.user?.userInfo);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:opacity-90 transition"
    >
      Mua ngay
    </button>
  );
};
export default BuyNowButton;
