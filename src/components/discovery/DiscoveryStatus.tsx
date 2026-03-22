"use client";

interface DiscoveryStatusProps {
  loading: boolean;
  totalResults: number;
  activeFilter: string;
  onClearFilters: () => void;
}

export default function DiscoveryStatus({
  loading,
  totalResults,
  activeFilter,
  onClearFilters,
}: DiscoveryStatusProps) {
  return (
    <>
      {/* Heading */}
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-playfair-display font-bold text-3xl text-[#8b4515]">
          {activeFilter === "All"
            ? "All Restaurants"
            : `${activeFilter} Restaurants`}
        </h2>
        <span className="text-sm text-[rgba(139,69,21,0.55)]">
          Showing {totalResults} results
        </span>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ce7b11]"></div>
        </div>
      )}

      {/* Empty state */}
      {!loading && totalResults === 0 && (
        <div className="text-center py-20">
          <p className="font-playfair-display text-2xl text-[#8b4515] mb-2">
            No restaurants found
          </p>
          <p className="text-[rgba(139,69,21,0.6)] text-sm mb-4">
            Try adjusting your search or filter
          </p>
          <button
            onClick={onClearFilters}
            className="bg-[#ce7b11] text-white px-6 py-2 rounded-full text-sm font-playfair-display
             font-semibold hover:bg-[#e8a118] transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
