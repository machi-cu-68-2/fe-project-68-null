"use client";

interface FilterChipsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterChips({ filters, activeFilter, onFilterChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 items-center">
      <span className="font-playfair-display font-semibold text-[#724a15] text-sm mr-1">
        Filter:
      </span>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
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
  );
}
