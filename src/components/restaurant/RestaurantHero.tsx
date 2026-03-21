import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import Link from "next/link";
import { Restaurant } from "@/interface/Restaurant";

export default function RestaurantHero({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <ImageWithSkeleton
        src={restaurant.imageSrc}
        alt={restaurant.name}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/20" />

      {/* Back button */}
      <Link
        href="/discovery"
        className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Discovery
      </Link>

      {/* Restaurant name overlay */}
      <div className="absolute bottom-0 left-0 w-full px-8 pb-10 md:px-16 text-left">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#f2d257] text-[#8b4515] font-semibold text-sm px-3 py-1 rounded-full">
            ★ {restaurant.rating}
          </span>
          <span className="text-white/80 text-sm">
            ({restaurant.reviews} reviews)
          </span>
        </div>
        <h1 className="font-playfair-display font-bold text-4xl md:text-6xl text-white leading-tight mb-2">
          {restaurant.name}
        </h1>
        <p className="text-[#f2d257] text-lg md:text-xl font-medium">
          {restaurant.category}
        </p>
      </div>
    </div>
  );
}
