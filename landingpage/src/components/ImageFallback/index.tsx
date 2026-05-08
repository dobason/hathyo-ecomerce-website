import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageFallback({
  src,
  fallbackSrc,
  errorImg,
  ...rest
}: any) {
  const [imgSrc, set_imgSrc] = useState(isValidImageUrl(src));

  function isValidImageUrl(url: string) {
    // Regular expression to check if the URL starts with "/", "http://" or "https://"
    const regex = /^(\/|http:\/\/|https:\/\/).*/;
    return regex.test(url) ? url : "/product-fallback-image.png";
  }

  useEffect(() => {
    set_imgSrc(isValidImageUrl(src));
  }, [src]);

  return (
    <Image
      alt="hathyo"
      quality={100}
      loading="lazy"
      {...rest}
      src={imgSrc ?? "/product-fallback-image.png"}
      onLoad={(result: any) => {
        if (result.naturalWidth === 0) {
          // Broken image
          set_imgSrc(errorImg ?? fallbackSrc);
        }
      }}
      onError={() => {
        set_imgSrc(errorImg ?? fallbackSrc ?? "/product-fallback-image.png");
      }}
    />
  );
}
