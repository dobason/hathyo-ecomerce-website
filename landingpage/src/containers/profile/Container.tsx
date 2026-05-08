"use client";

import LeftSide from "./LeftSide";
import { useSearchParams } from "next/navigation";
import UserInformation from "./UserInformation";
import OrderHistory from "@/components/OrderHistory";
import OrderReturn from "@/components/OrderReturn";
import UserAddress from "./UserAddress";
import SavedCoupons from "@/components/SavedCoupons"; // 👈 import thêm

export default function Container() {
  const searchParams = useSearchParams();
  const tabItem = searchParams.get("tab") ?? "User-Infor";

  const ContentPanel = () => {
    switch (tabItem) {
      case "Order-History":
        return <OrderHistory />;
      case "User-Address":
        return <UserAddress />;
      case "Order-Return":
        return <OrderReturn />;
      case "Saved-Coupons":
        return <SavedCoupons />; // 👈 render component mới
      default:
        return <UserInformation />;
    }
  };

  return (
    <div className="container m-auto">
      <div className="flex xl:flex-row flex-col justify-center gap-6 xl:py-8 py-4">
        <div className="h-full xl:w-[350px] w-[calc(100%-48px)]">
          <LeftSide />
        </div>
        <div className="xl:w-[calc(100%-320px)] w-full">
          <ContentPanel />
        </div>
      </div>
    </div>
  );
}
