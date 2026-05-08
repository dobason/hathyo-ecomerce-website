"use client";

import "@/lib/gsap-register";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Download, Share2, Check } from "lucide-react";
import ShareModal from "./ShareModal";
import SaveQuote from "./SaveQuote";
import html2canvas from "html2canvas";
import Alert from "@/components/Alerts";
import Calendar from "@/components/Icons/Calendar";
import SearchInputClient from "@/components/SearchInput";
import { getQuotes } from "@/services/client/home";
import dayjs from "dayjs";
import Image from "next/image";

const images = [
  "/images/banner/01.png",
  "/images/banner/02.png",
  "/images/banner/03.png",
  "/images/banner/04.png",
  "/images/banner/05.png",
  "/images/banner/06.png",
  "/images/banner/07.png",
  "/images/banner/08.png",
  "/images/banner/09.png",
  "/images/banner/10.png",
  "/images/banner/11.png",
  "/images/banner/12.png",
  "/images/banner/13.png",
  "/images/banner/14.png",
];

export default function Banner() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharedImageUrl, setSharedImageUrl] = useState<string | null>(null);

  // Ref GSAP
  const wrapperRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const saveQuoteRef = useRef<HTMLDivElement>(null);

  // Random background
  const bannerSrc = useRef(
    images[Math.floor(Math.random() * images.length)]
  ).current;

  // Fetch quote 1 lần
  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await getQuotes();
        setQuote(res?.quote ?? "Chào mừng bạn đến với Hathyo!");
        setAuthor(res?.author ?? "Hathyo Team");
      } catch (err) {
        console.error("Fetch quote error:", err);
      }
    })();
  }, []);

  const handleSaveImage = async () => {
    if (!saveQuoteRef.current) return;

    const canvas = await html2canvas(saveQuoteRef.current, {
      scale: 4,
      useCORS: true,
      backgroundColor: null,
    });

    const dataURL = canvas.toDataURL("image/png");
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`<img src="${dataURL}" style="width:100%"/>`);
      }
    } else {
      const now = new Date();
      const formattedTime = `${now.getFullYear()}-${String(
        now.getHours()
      ).padStart(2, "0")}_${String(now.getMinutes()).padStart(2, "0")}`;

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `Hathyo_${formattedTime}.png`;
      link.click();
    }
  };

  const handleShareLink = async () => {
    if (!saveQuoteRef.current) return;

    const canvas = await html2canvas(saveQuoteRef.current, {
      scale: 0,
      useCORS: true,
      backgroundColor: null,
    });

    const dataURL = canvas.toDataURL("image/png");
    setSharedImageUrl(dataURL);
    setIsShareModalOpen(true);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS && navigator.share) {
      try {
        await navigator.share({
          title: "Hathyo Quote",
          text: `"${quote}" - ${author}`,
          url: window.location.href,
        });
        return;
      } catch (err) {
        console.log("User cancelled share:", err);
      }
    }

    if (isIOS) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`<img src="${dataURL}" style="width:100%"/>`);
      }
    } else {
      setSharedImageUrl(dataURL);
      setIsShareModalOpen(true);
    }
  };

  // GSAP animation
  useLayoutEffect(() => {
    if (!quote || !author) return;

    const ctx = gsap.context(() => {
      gsap.from(wrapperRef.current, { opacity: 0, y: 30, duration: 1 });
      gsap.from(alertRef.current, { opacity: 0, y: -20, delay: 0.2 });
      gsap.from(searchRef.current, { opacity: 0, y: 20, delay: 1.5 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top center",
            once: true,
          },
        })
        .to(quoteRef.current, {
          text: `"${quote}"`,
          duration: 2,
          ease: "none",
        })
        .to(authorRef.current, {
          text: `- ${author}`,
          duration: 1.5,
          ease: "none",
        });
    }, wrapperRef);

    return () => ctx.revert();
  }, [quote, author]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full pt-24 xl:pt-12 py-12 xl:aspect-[1440/585]"
    >
      {/* Background */}
      <Image
        src={bannerSrc}
        alt="Main banner"
        fill
        priority
        quality={80}
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />

      {/* Alert */}
      <div ref={alertRef} className="absolute inset-x-0 top-0 z-30">
        <Alert type="warning" hideIcon textClassName="text-center">
          Website đang hoạt động ở chế độ thử nghiệm
        </Alert>
      </div>

      {/* Content */}
      <div className="relative z-30 flex justify-center items-center h-full">
        <div className="container mx-auto px-2 xl:px-8">
          <div className="flex flex-col gap-2 xl:gap-4">
            {/* Date */}
            <p className="text-white body-sm-semibold capitalize">
              <Calendar className="inline-block align-sub" />{" "}
              {dayjs().format("dddd, DD/MM/YYYY")}
            </p>

            {/* Quote */}
            <h2 ref={quoteRef} className="text-white min-h-[48px]" />
            <p
              ref={authorRef}
              className="text-Orange/200 body-lg-semibold min-h-[24px]"
            />

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveImage}
                className="flex items-center gap-2 text-white hover:text-orange-200 transition"
                title="Tải xuống hình ảnh"
              >
                <Download size={20} />
              </button>

              <button
                onClick={handleShareLink}
                className="flex items-center gap-2 text-white hover:text-orange-200 transition"
                title="Chia sẻ"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Search */}
            <div ref={searchRef}>
              <SearchInputClient
                placeholder="Tìm kiếm mọi thứ trên Hathyo"
                suffixButton
                className="xl:flex"
              />
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", left: "-99999px", top: 0 }}>
          <SaveQuote
            background={bannerSrc}
            quoteText={quote}
            authorText={author}
            forwardRef={saveQuoteRef}
            isSharePage={true}
          />
        </div>
      </div>
      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        quote={quote}
        author={author}
        imageUrl={sharedImageUrl}
      />
    </div>
  );
}
