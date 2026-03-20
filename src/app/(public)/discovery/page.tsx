"use client";

import { useState, useMemo, useEffect } from "react";
import DiscoveryHero from "@/components/DiscoveryHero";
import FilterChips from "@/components/FilterChips";
import RestaurantCard from "@/components/RestaurantCard";
import { Restaurant } from "@/interface/Restaurant";
import { FILTERS } from "mockdata/restaurant";
import getRestaurants from "@/lib/getRestaurant";

export default function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getRestaurants();
        // Assuming API structure might be { success: true, count: X, data: [...] }
        setRestaurants(result.data || result);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      // Use r.filter or fallback to r.category if the API doesn't provide a 'filter' property
      const restaurantFilter = r.filter || r.category;
      const matchesFilter = activeFilter === "All" || restaurantFilter === activeFilter;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        query === "" ||
        r.name.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [restaurants, searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-[#fefaec]">
      {/* Hero + Search */}
      <DiscoveryHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-10">
        {/* Filter */}
        <FilterChips
          filters={FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Heading */}
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-playfair-display font-bold text-3xl text-[#8b4515]">
            {activeFilter === "All"
              ? "All Restaurants"
              : `${activeFilter} Restaurants`}
          </h2>
          <span className="text-sm text-[rgba(139,69,21,0.55)]">
            Showing {filteredRestaurants.length} results
          </span>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ce7b11]"></div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredRestaurants.length === 0 && (
          <div className="text-center py-20">
            <p className="font-playfair-display text-2xl text-[#8b4515] mb-2">
              No restaurants found
            </p>
            <p className="text-[rgba(139,69,21,0.6)] text-sm mb-4">
              Try adjusting your search or filter
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="bg-[#ce7b11] text-white px-6 py-2 rounded-full text-sm font-playfair-display font-semibold hover:bg-[#e8a118] transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Grid: 1 → 2 → 3 → 4 → 5 columns */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
