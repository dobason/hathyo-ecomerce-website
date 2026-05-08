"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import Bell from "../Icons/Bell";
import CardSideBar from "../CardSideBar";
import HeaderNav from "../HeaderNav";
import NavBar from "./Components/NavBar";
import { useSearchParams } from "next/navigation";

interface Topic {
  id: string;
  name: string;
}

interface NavBarProps {
  topics: Topic[];
}

const Header: React.FC<NavBarProps> = ({ topics }) => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "";
  const [imageSrc, setImageSrc] = useState("/images/hathyo-new-logo.jpg");
  if (mode === "mobile") return null;
  const handleImageError = () => {
    if (imageSrc.includes(".jpg")) {
      setImageSrc("/images/HathyoV1_Rectangle_Full.png");
    } else if (imageSrc.includes(".png")) {
      setImageSrc("/images/HathyoV1_Rectangle_Full.svg");
    }
  };
  return (
    <header className="shadow-sm sticky top-0 z-50 w-full bg-white xl:px-8 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="mr-5 relative group overflow-hidden focus:outline-none focus:ring-0"
        >
          {/* Big logo (desktop) */}
          <img
            className="hidden xl:block"
            src={imageSrc}
            onError={handleImageError}
            alt="Hathyo logo"
            width={180}
            height={100}
          />
          {/* Small logo (mobile) */}
          <img
            className="xl:hidden block relative z-10"
            src="/hathyo-new-icon.svg"
            alt="Hathyo logo"
            width={51}
            height={51}
          />

          {/* ✨ Light overlay effect */}
          <span className="absolute top-0 left-[-100%] w-full h-full bg-white/30 blur-lg animate-logo-shine group-hover:animate-logo-shine z-20" />
        </Link>

        {/* Nav links */}
        <NavBar topics={topics} />

        {/* Right section */}
        <div className="flex items-center gap-4 text-md text-Grayiron/600 font-semibold">
          <CardSideBar />
          {/* Future bell icon: */}
          {/* <Button
            requiredLogin
            className="mx-3 uppercase hidden xl:block"
            type="secondary"
            icon={<Bell className="inline-block" />}
          /> */}
          <HeaderNav topics={topics} />
        </div>
      </div>
    </header>
  );
};
export default Header;
