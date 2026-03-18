"use client"; // ไฟล์นี้เล็กนิดเดียว ให้โหลดที่ Client ได้สบายมาก

import { useState } from "react";
import Image from "next/image";

// รับ Props เหมือน Image ปกติเลย
export default function ImageWithSkeleton({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`
        ${className} 
        ${isLoading ? "bg-gray-200 animate-pulse" : "bg-transparent"}
      `}
      onLoad={() => setIsLoading(false)}
    />
  );
}
