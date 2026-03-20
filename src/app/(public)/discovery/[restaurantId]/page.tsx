"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter, notFound } from "next/navigation";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { mockRestaurants } from "mockdata/restaurant";
import { useSession } from "@/lib/useSession";

// ค้นหาร้านจาก id
function findRestaurant(id: string) {
  return mockRestaurants.find((r) => r.id === id);
}

interface RestaurantPageProps {
  params: Promise<{ restaurantId: string }>;
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = use(params);
  const router = useRouter();
  const { isLoggedIn } = useSession();
  const restaurant = findRestaurant(restaurantId);

  if (!restaurant) return notFound();

  // กด Reserve → เช็ค session ก่อน
  const handleReserve = () => {
    if (!isLoggedIn) {
      // redirect ไป signin พร้อมส่ง path กลับมาหน้านี้หลัง login
      router.push(`/signin?redirect=/discovery/${restaurantId}`);
    } else {
      // TODO: ทำ reservation จริงเมื่อมี backend
      alert("Reservation confirmed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#fefaec]">
      {/* Hero Image */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <ImageWithSkeleton
          src={restaurant.imageSrc}
          alt={restaurant.name}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Back button */}
        <Link
          href="/discovery"
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
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
        <div className="absolute bottom-0 left-0 w-full px-8 pb-10 md:px-16">
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

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="font-playfair-display font-bold text-2xl text-[#724a15] mb-3">
                About the Restaurant
              </h2>
              <p className="text-[rgba(139,69,21,0.8)] text-base leading-relaxed">
                {restaurant.description}
              </p>
            </div>

            <div>
              <h2 className="font-playfair-display font-bold text-2xl text-[#724a15] mb-3">
                Highlights
              </h2>
              <div className="flex flex-wrap gap-2">
                {restaurant.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-white border-2 border-[#f8e9a1] text-[#8b4515] px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border-2 border-[#f8e9a1] p-5">
                <p className="text-[rgba(139,69,21,0.5)] text-xs uppercase tracking-wider mb-1">
                  Cuisine
                </p>
                <p className="font-playfair-display font-bold text-[#724a15]">
                  {restaurant.category}
                </p>
              </div>
              <div className="bg-white rounded-2xl border-2 border-[#f8e9a1] p-5">
                <p className="text-[rgba(139,69,21,0.5)] text-xs uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="font-playfair-display font-bold text-[#724a15]">
                  {restaurant.location}
                </p>
              </div>
              <div className="bg-white rounded-2xl border-2 border-[#f8e9a1] p-5">
                <p className="text-[rgba(139,69,21,0.5)] text-xs uppercase tracking-wider mb-1">
                  Rating
                </p>
                <p className="font-playfair-display font-bold text-[#724a15]">
                  ★ {restaurant.rating} / 5.0
                </p>
              </div>
              <div className="bg-white rounded-2xl border-2 border-[#f8e9a1] p-5">
                <p className="text-[rgba(139,69,21,0.5)] text-xs uppercase tracking-wider mb-1">
                  Reviews
                </p>
                <p className="font-playfair-display font-bold text-[#724a15]">
                  {restaurant.reviews} guests
                </p>
              </div>
            </div>
          </div>

          {/* Right: Reservation card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border-2 border-[#f8e9a1] shadow-lg p-6 flex flex-col gap-5">
              <div>
                <h3 className="font-playfair-display font-bold text-xl text-[#724a15] mb-1">
                  Make a Reservation
                </h3>
                <p className="text-[rgba(139,69,21,0.6)] text-sm">
                  Secure your table at {restaurant.name}
                </p>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
                  Date
                </label>
                <input
                  type="date"
                  className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-xl px-4 py-2.5 text-[#724a15] text-sm outline-none focus:border-[#ce7b11] transition-colors"
                />
              </div>

              {/* Time */}
              <div className="flex flex-col gap-1.5">
                <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
                  Time
                </label>
                <select className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-xl px-4 py-2.5 text-[#724a15] text-sm outline-none focus:border-[#ce7b11] transition-colors">
                  {[
                    "6:00 PM",
                    "6:30 PM",
                    "7:00 PM",
                    "7:30 PM",
                    "8:00 PM",
                    "8:30 PM",
                    "9:00 PM",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1.5">
                <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
                  Guests
                </label>
                <select className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-xl px-4 py-2.5 text-[#724a15] text-sm outline-none focus:border-[#ce7b11] transition-colors">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reserve button — เช็ค session ก่อนกด */}
              <button
                onClick={handleReserve}
                className="w-full bg-[#ce7b11] hover:bg-[#e8a118] active:scale-[0.98] text-white font-playfair-display font-semibold text-lg py-3.5 rounded-full shadow-md transition-all"
              >
                {isLoggedIn ? "Reserve a Table" : "Sign in to Reserve"}
              </button>

              {/* hint เมื่อยังไม่ได้ login */}
              {!isLoggedIn && (
                <p className="text-center text-[rgba(139,69,21,0.5)] text-xs -mt-2">
                  You'll be redirected back here after signing in
                </p>
              )}

              {isLoggedIn && (
                <p className="text-center text-[rgba(139,69,21,0.5)] text-xs -mt-2">
                  No credit card required to reserve
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
