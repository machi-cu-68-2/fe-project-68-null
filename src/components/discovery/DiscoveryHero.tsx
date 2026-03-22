"use client";

interface DiscoveryHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isAdvancedVisible: boolean;
  onToggleAdvanced: () => void;
}

export default function DiscoveryHero({
  searchQuery,
  onSearchChange,
  isAdvancedVisible,
  onToggleAdvanced,
}: DiscoveryHeroProps) {
  return (
    <div
      className="relative bg-gradient-to-br from-[#ce7b11] via-[#e8a118] to-[#f2d257] 
    pt-35 pb-8 px-6 overflow-hidden"
    >
      {/* Decorative circles - subtler for shorter hero */}
      <div className="absolute -right-10 -top-20 w-64 h-64 rounded-full bg-white/10" />
      <div className="absolute right-20 -bottom-10 w-32 h-32 rounded-full bg-white/[0.06]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-playfair-display font-bold text-4xl text-white leading-tight mb-6">
          Discover Fine Dining
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          {/* Search Bar Container */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-saddlebrown/40 group-focus-within:text-[#ce7b11] transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search restaurants, cuisines, or locations..."
              className="w-full h-14 pl-14 pr-12 bg-white border-none
              rounded-2xl text-saddlebrown text-lg font-playfair-display placeholder:text-saddlebrown/30
              focus:outline-none focus:ring-4 focus:ring-[#ce7b11]/20
              shadow-lg transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-4 flex items-center text-saddlebrown/40 hover:text-saddlebrown"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Advanced Search Button */}
          <button
            onClick={onToggleAdvanced}
            className={`h-14 px-8 flex items-center gap-3 rounded-2xl border-2 transition-all
               shadow-lg active:scale-95
            ${
              isAdvancedVisible
                ? "bg-white border-white text-[#ce7b11]"
                : "bg-white/30 border-white/60 text-white backdrop-blur-lg hover:bg-white/30"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span className="font-semibold whitespace-nowrap">
              Advanced Search
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
