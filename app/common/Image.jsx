"use client";
import Image from "next/image";
import { getImageUrl } from "../utils/getImageUrl";

export default function CustomImage({
  src = null,
  alt = "image",
  className = "",
  style = {},
  width = 500,
  height = 500,
  fill = false,
  priority = false,
}) {
  const imgSrc = getImageUrl(src);
  if (!imgSrc) return null;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      style={style}
      priority={priority}
      unoptimized
    />
  );
}
