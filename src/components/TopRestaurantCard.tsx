import Image from "next/image";
import { TopRestaurants } from "@/interface/TopRestaurant";
import { isLarge as checkIsLarge } from "../lib/isLarge";
import ImageWithSkeleton from "./ImageWithSkeleton";

export default function TopRestaurantCard(props: TopRestaurants) {
  const { name, category, location, rating, reviews, imageSrc } = props;
  const isLarge = checkIsLarge(props);
  return (
    <div
      className={`relative w-full shadow-lg rounded-2xl overflow-hidden group 
        ${isLarge ? "h-[43.75rem]" : "h-[31.25rem] sm:h-[21rem] md:h-[21rem] lg:h-[21rem] xl:h-[21.375rem]"}`}
    >
      {/* พื้นหลัง: รูปภาพและ Gradient */}
      <ImageWithSkeleton
        src={imageSrc}
        alt={name}
        className={`object-cover transition-transform duration-500 group-hover:scale-105`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* เนื้อหาด้านล่าง */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-3 text-left">
        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <div
            className="bg-goldenrod text-saddlebrown font-semibold px-3 py-1 
          rounded-full flex items-center gap-1 text-sm"
          >
            <Image
              src={"/icons/star.svg"}
              alt="rating star"
              width={20}
              height={20}
            />{" "}
            {rating}
          </div>
          <span className="text-gray-200 text-sm">({reviews} reviews)</span>
        </div>

        {/* ชื่อร้าน */}
        <h3
          className={`text-white font-playfair-display font-bold 
            ${isLarge ? "text-[3rem] leading-tight" : "text-[1.875rem] leading-snug"}`}
        >
          {name}
        </h3>

        {/* หมวดหมู่ */}
        <p
          className={`text-goldenrod ${isLarge ? "text-[1.25rem]" : "text-[1.125rem]"}`}
        >
          {category}
        </p>

        {/* สถานที่ */}
        <div className="flex items-center gap-2 text-gray-100 text-sm">
          <Image
            src="/icons/location-pin.svg"
            alt="Location pin"
            width={16}
            height={16}
          />{" "}
          {location}
        </div>
      </div>
    </div>
  );
}
