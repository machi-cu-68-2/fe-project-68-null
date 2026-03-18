"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { TopRestaurants } from "@/interface";

// ============================================================
// TODO: แทนที่ mock data นี้ด้วยการดึงข้อมูลจริงจาก database
// ============================================================
const mockRestaurants: (TopRestaurants & { filter: string })[] = [
  {
    name: "La Maison Dorée",
    category: "French Contemporary",
    location: "Downtown, Manhattan",
    rating: "4.9",
    reviews: "324",
    imageSrc: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    filter: "French",
  },
  {
    name: "Sakura Garden",
    category: "Japanese Fusion",
    location: "Midtown East",
    rating: "4.8",
    reviews: "256",
    imageSrc: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    filter: "Japanese",
  },
  {
    name: "Oceano Blu",
    category: "Mediterranean Seafood",
    location: "Chelsea, West Side",
    rating: "4.7",
    reviews: "198",
    imageSrc: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    filter: "Seafood",
  },
  {
    name: "Ember & Oak",
    category: "Modern American Grill",
    location: "TriBeCa",
    rating: "4.6",
    reviews: "412",
    imageSrc: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    filter: "Contemporary",
  },
  {
    name: "Trattoria Bianca",
    category: "Italian Fine Dining",
    location: "Upper West Side",
    rating: "4.5",
    reviews: "289",
    imageSrc: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    filter: "Italian",
  },
  {
    name: "Verdure",
    category: "Plant-Based Contemporary",
    location: "West Village",
    rating: "4.4",
    reviews: "174",
    imageSrc: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    filter: "Contemporary",
  },
  {
    name: "Golden Spice",
    category: "Modern Indian",
    location: "Flatiron District",
    rating: "4.8",
    reviews: "203",
    imageSrc: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    filter: "Contemporary",
  },
  {
    name: "Atelier Blanc",
    category: "French Patisserie & Bistro",
    location: "SoHo",
    rating: "4.6",
    reviews: "156",
    imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    filter: "French",
  },
  {
    name: "Pearl & Tide",
    category: "Contemporary Seafood",
    location: "Battery Park",
    rating: "4.7",
    reviews: "231",
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    filter: "Seafood",
  },
  {
    name: "Ristorante Fiorentino",
    category: "Italian Coastal",
    location: "Little Italy",
    rating: "4.5",
    reviews: "189",
    imageSrc: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    filter: "Italian",
  },
  {
    name: "Le Petit Jardin",
    category: "French Bistro",
    location: "Upper East Side",
    rating: "4.6",
    reviews: "142",
    imageSrc: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    filter: "French",
  },
  {
    name: "Kyoto Table",
    category: "Japanese Fine Dining",
    location: "East Village",
    rating: "4.9",
    reviews: "311",
    imageSrc: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    filter: "Japanese",
  },
];

const FILTERS = ["All", "French", "Japanese", "Italian", "Mediterranean", "Contemporary", "Seafood"];

// ============================================================
// Restaurant Card Component
// ============================================================
function RestaurantCard({ restaurant }: { restaurant: TopRestaurants }) {
  const slug = restaurant.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return (
    <Link href={`/discovery/${slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden border-2 border-[#f8e9a1] shadow-md transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-xl h-full flex flex-col">
        {/* รูปร้าน */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <img
            src={restaurant.imageSrc}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* ข้อมูลร้าน */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-playfair-display font-bold text-lg text-[#724a15] leading-tight mb-1">
            {restaurant.name}
          </h3>
          <p className="text-[#ce7b11] text-sm font-medium mb-3">{restaurant.category}</p>
          <div className="flex items-center gap-2 text-sm text-[rgba(139,69,21,0.65)] mt-auto flex-wrap">
            <span className="bg-[#f2d257] text-[#8b4515] font-semibold text-xs px-2 py-0.5 rounded-full">
              ★ {restaurant.rating}
            </span>
            <span className="text-xs text-[rgba(139,69,21,0.5)]">({restaurant.reviews})</span>
            <div className="flex items-center gap-1 ml-auto">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-xs truncate max-w-[120px]">{restaurant.location}</span>
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

// ============================================================
// Discovery Page
// ============================================================
export default function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // กรองร้านตาม search + filter และจำกัดสูงสุด 10 รายการ
  const filteredRestaurants = useMemo(() => {
    return mockRestaurants
      .filter((r) => {
        const matchesFilter = activeFilter === "All" || r.filter === activeFilter;
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          query === "" ||
          r.name.toLowerCase().includes(query) ||
          r.category.toLowerCase().includes(query) ||
          r.location.toLowerCase().includes(query);
        return matchesFilter && matchesSearch;
      })
      ;
  }, [searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-[#fefaec]">
      <NavBar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#ce7b11] via-[#e8a118] to-[#f2d257] pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute right-28 -bottom-16 w-44 h-44 rounded-full bg-white/[0.06]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-playfair-display font-bold text-5xl text-white leading-tight mb-3">
            Discover Fine Dining
          </h1>
          <p className="text-white/85 text-lg mb-7">
            Explore curated restaurants handpicked for exceptional cuisine and unforgettable experiences
          </p>

          <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2.5 shadow-lg w-full max-w-xl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(139,69,21,0.5)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by restaurant, cuisine, or location..."
              className="border-none outline-none text-[#724a15] text-sm flex-1 bg-transparent placeholder:text-[rgba(139,69,21,0.45)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-[rgba(139,69,21,0.4)] hover:text-[#724a15] text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <span className="font-playfair-display font-semibold text-[#724a15] text-sm mr-1">
            Filter:
          </span>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
                activeFilter === filter
                  ? "bg-[#ce7b11] border-[#ce7b11] text-white"
                  : "bg-white border-[#f2d257] text-[#8b4515] hover:bg-[#fdf3d0]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Section heading */}
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-playfair-display font-bold text-3xl text-[#8b4515]">
            {activeFilter === "All" ? "All Restaurants" : `${activeFilter} Restaurants`}
          </h2>
          <span className="text-sm text-[rgba(139,69,21,0.55)]">
            Showing {filteredRestaurants.length} results
          </span>
        </div>

        {/* ไม่พบผลลัพธ์ */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-20">
            <p className="font-playfair-display text-2xl text-[#8b4515] mb-2">No restaurants found</p>
            <p className="text-[rgba(139,69,21,0.6)] text-sm mb-4">
              Try adjusting your search or filter
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
              className="bg-[#ce7b11] text-white px-6 py-2 rounded-full text-sm font-playfair-display font-semibold hover:bg-[#e8a118] transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Responsive grid
            - จอเล็ก (mobile)   : 1 คอลัมน์
            - sm (640px+)       : 2 คอลัมน์
            - lg (1024px+)      : 3 คอลัมน์
            - xl (1280px+)      : 4 คอลัมน์  ← จอใหญ่/ซูมออก
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}
