"use client";

import { useSearchParams } from "next/navigation";
import SaveQuote from "@/containers/Home/SaveQuote";

export default function SharePage() {
  const params = useSearchParams();

  const background = params.get("background") || "/images/banner/01.png";
  const quote = params.get("quoteText") || "Chào mừng bạn đến với Hathyo!";
  const author = params.get("authorText") || "Hathyo Team";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SaveQuote
        background={background}
        quoteText={quote}
        authorText={author}
      />
    </div>
  );
}
