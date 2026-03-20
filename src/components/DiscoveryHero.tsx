"use client";

interface DiscoveryHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function DiscoveryHero({ searchQuery, onSearchChange }: DiscoveryHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-[#ce7b11] via-[#e8a118] to-[#f2d257] pt-32 pb-12 px-6 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-white/10" />
      <div className="absolute right-28 -bottom-16 w-44 h-44 rounded-full bg-white/[0.06]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-playfair-display font-bold text-5xl text-white leading-tight mb-3">
          Discover Fine Dining
        </h1>
        <p className="text-white/85 text-lg mb-7">
          Explore curated restaurants handpicked for exceptional cuisine and unforgettable experiences
        </p>

        {/* Search bar */}
        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2.5 shadow-lg w-full max-w-xl">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(139,69,21,0.5)"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by restaurant, cuisine, or location..."
            className="border-none outline-none text-[#724a15] text-sm flex-1 bg-transparent placeholder:text-[rgba(139,69,21,0.45)]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="text-[rgba(139,69,21,0.4)] hover:text-[#724a15] text-xl leading-none"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
