"use client";

import { use, useState, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
import { useSession } from "@/lib/useSession";
import { getRestaurant } from "@/lib/getRestaurant";
import { Restaurant } from "@/interface/Restaurant";

// Modular Components
import RestaurantHero from "@/components/restaurant/RestaurantHero";
import RestaurantInfo from "@/components/restaurant/RestaurantInfo";
import RestaurantHighlights from "@/components/restaurant/RestaurantHighlights";
import RestaurantReservation from "@/components/restaurant/RestaurantReservation";

interface RestaurantPageProps {
  params: Promise<{ restaurantId: string }>;
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = use(params);
  const router = useRouter();
  const { isLoggedIn } = useSession();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRestaurant(restaurantId);

        // Map API data to Restaurant interface
        const mappedRestaurant: Restaurant = {
          id: data._id || data.id,
          name: data.name,
          category: data.category || "Restaurant",
          // location might be an object or a string depending on API version
          location: typeof data.location === 'string' 
            ? data.location 
            : (data.province || data.district || "Bangkok"),
          rating: data.rating || 5.0,
          reviews: data.reviews || 0,
          imageSrc: data.imageSrc || data.image || "/images/hero-1.jpg",
          description: data.description || "Experience fine dining at its best.",
          tags: data.tags || [],
          tel: data.tel,
          openingHours: data.openingHours,
          totalTables: data.totalTables
        };

        setRestaurant(mappedRestaurant);
      } catch (err) {
        console.error("Error fetching restaurant:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fefaec] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#ce7b11] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-playfair-display text-[#724a15] text-xl animate-pulse">
          Setting your table...
        </p>
      </div>
    );
  }

  if (error || !restaurant) return notFound();

  const handleReserve = () => {
    if (!isLoggedIn) {
      router.push(`/signIn?redirect=/discovery/${restaurantId}`);
    } else {
      // TODO: Implement actual reservation logic
      alert("Reservation confirmed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#fefaec]">
      <RestaurantHero restaurant={restaurant} />

      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            <RestaurantInfo restaurant={restaurant} />
            <RestaurantHighlights tags={restaurant.tags} />
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1">
            <RestaurantReservation 
              restaurant={restaurant} 
              isLoggedIn={isLoggedIn} 
              onReserve={handleReserve}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
