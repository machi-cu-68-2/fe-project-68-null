"use client";

import { useState, useMemo, useEffect } from "react";
import DiscoveryHero from "@/components/discovery/DiscoveryHero";
import RestaurantCard from "@/components/discovery/RestaurantCard";
import AdvancedFilters from "@/components/discovery/AdvancedFilters";
import DiscoveryStatus from "@/components/discovery/DiscoveryStatus";
import { Restaurant } from "@/interface/Restaurant";
import getRestaurants from "@/lib/getRestaurants";
import getFilters from "@/lib/getFilters";
import filterRestaurants from "@/lib/filterRestaurants";

export default function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState<{
    categories: string[];
    locations: string[];
    tags: string[];
  }>({ categories: [], locations: [], tags: [] });

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAdvancedVisible, setIsAdvancedVisible] = useState(false);

  // Fetch filters from API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const result = await getFilters();
        const data = result.data || {};
        setFilterData({
          categories: data.categories || [],
          locations: data.locations || [],
          tags: data.tags || [],
        });
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };
    fetchFilters();
  }, []);

  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch restaurants when debounced query changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getRestaurants(debouncedQuery);
        setRestaurants(result.data || result);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedQuery]);

  const onClearFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
    setSelectedLocation("");
    setSelectedTags([]);
  };

  const filteredRestaurants = useMemo(() => {
    return filterRestaurants(
      restaurants,
      activeFilter,
      debouncedQuery,
      activeFilter === "All" ? "" : activeFilter,
      selectedLocation,
      selectedTags,
    );
  }, [
    restaurants,
    activeFilter,
    debouncedQuery,
    selectedLocation,
    selectedTags,
  ]);

  return (
    <div className="min-h-screen bg-[#fefaec]">
      {/* Hero with Search and Advanced Toggle */}
      <DiscoveryHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isAdvancedVisible={isAdvancedVisible}
        onToggleAdvanced={() => setIsAdvancedVisible(!isAdvancedVisible)}
      />

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        {/* Advanced Filters (Chip Rows) */}
        <AdvancedFilters
          filterData={filterData}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          isAdvancedVisible={isAdvancedVisible}
          onClearFilters={onClearFilters}
        />

        {/* Results Info & Status (Loading/Empty) */}
        <DiscoveryStatus
          loading={loading}
          totalResults={filteredRestaurants.length}
          activeFilter={activeFilter}
          onClearFilters={onClearFilters}
        />

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
