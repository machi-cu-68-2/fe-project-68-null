import Link from "next/link";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { Restaurant } from "@/interface/Restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/discovery/${restaurant.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden border-2 border-[#f8e9a1] shadow-md transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-xl h-full flex flex-col">
        {/* รูปร้าน */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <ImageWithSkeleton
            src={restaurant.imageSrc}
            alt={restaurant.name}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* ข้อมูลร้าน */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-playfair-display font-bold text-lg text-[#724a15] leading-tight mb-1">
            {restaurant.name}
          </h3>
          <p className="text-[#ce7b11] text-sm font-medium mb-3">
            {restaurant.category}
          </p>

          <div className="flex items-center gap-2 text-sm text-[rgba(139,69,21,0.65)] mt-auto flex-wrap">
            {/* Rating */}
            <span className="bg-[#f2d257] text-[#8b4515] font-semibold text-xs px-2 py-0.5 rounded-full">
              ★ {restaurant.rating}
            </span>
            <span className="text-xs text-[rgba(139,69,21,0.5)]">
              ({restaurant.reviews})
            </span>

            {/* Location */}
            <div className="flex items-center gap-1 ml-auto">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-xs truncate max-w-[120px]">
                {restaurant.location}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 pt-2 border-t border-[#f8e9a1]">
          <div className="flex justify-end">
            <span className="bg-[#ce7b11] text-white text-sm font-playfair-display font-semibold px-5 py-1.5 rounded-full group-hover:bg-[#e8a118] transition-colors">
              Reserve
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
