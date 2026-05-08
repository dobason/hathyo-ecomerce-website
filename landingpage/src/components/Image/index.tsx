import Image, { ImageProps } from "next/image";
import { useState } from "react";

// Extend ImageProps for additional properties specific to this component
interface CommonImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  errorImg?: string;
}

function CommonImage({
  src,
  errorImg = "/banner.png",
  ...rest
}: CommonImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);

  const handleError = () => {
    setImgSrc(errorImg); // Use the errorImg prop or its default
  };

  return (
    <Image
      quality={100}
      loading="lazy"
      src={imgSrc}
      onError={handleError}
      {...rest} // This will include all ImageProps except for 'src' and 'onError'
    />
  );
}

export default CommonImage;
