"use client";

import { Collapse } from "@mui/material";

interface AdvancedFiltersProps {
  filterData: {
    categories: string[];
    locations: string[];
    tags: string[];
  };
  activeFilter: string;
  onFilterChange: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
  isAdvancedVisible: boolean;
  onClearFilters: () => void;
}

export default function AdvancedFilters({
  filterData,
  activeFilter,
  onFilterChange,
  selectedLocation,
  setSelectedLocation,
  selectedTags,
  setSelectedTags,
  isAdvancedVisible,
  onClearFilters,
}: AdvancedFiltersProps) {
  const categories = ["All", ...filterData.categories.filter((c) => c !== "All")];
  const locations = ["All", ...filterData.locations.filter((l) => l !== "All")];
  const tags = filterData.tags;

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Collapse in={isAdvancedVisible}>
      <div className="max-w-[1600px] mx-auto px-6 mb-8">
        <div
          className="w-full bg-white border-2 border-palegoldenrod rounded-2xl 
          shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]
          flex flex-col p-8 gap-8 font-playfair-display"
        >
          {/* Category Row */}
          <div className="flex flex-col gap-3">
            <b className="text-saddlebrown text-lg">Category</b>
            <div className="flex flex-wrap gap-3 font-arimo">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onFilterChange(cat)}
                  className={`px-6 py-2 rounded-full text-sm transition-all shadow-sm border
                  ${
                    activeFilter === cat
                      ? "bg-goldenrod border-goldenrod text-white shadow-md scale-105"
                      : "bg-floralwhite border-palegoldenrod text-saddlebrown hover:bg-[#fdf3d0]"
                  }`}
                >
                  {cat === "All" ? "All Cuisines" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Location Row */}
          <div className="flex flex-col gap-3">
            <b className="text-saddlebrown text-lg">Location</b>
            <div className="flex flex-wrap gap-3 font-arimo">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc === "All" ? "" : loc)}
                  className={`px-6 py-2 rounded-full text-sm transition-all shadow-sm border
                  ${
                    (loc === "All" && !selectedLocation) || selectedLocation === loc
                      ? "bg-goldenrod border-goldenrod text-white shadow-md scale-105"
                      : "bg-floralwhite border-palegoldenrod text-saddlebrown hover:bg-[#fdf3d0]"
                  }`}
                >
                  {loc === "All" ? "All Locations" : loc}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Row */}
          <div className="flex flex-col gap-3">
            <b className="text-saddlebrown text-lg">Tags</b>
            <div className="flex flex-wrap gap-3 font-arimo">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-6 py-2 rounded-full text-sm transition-all shadow-sm border
                  ${
                    selectedTags.includes(tag)
                      ? "bg-goldenrod border-goldenrod text-white shadow-md scale-105"
                      : "bg-floralwhite border-palegoldenrod text-saddlebrown hover:bg-[#fdf3d0]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Button Footer */}
          <div className="border-t border-palegoldenrod pt-6 flex justify-end">
            <button
              onClick={onClearFilters}
              className="group flex items-center gap-2 px-8 py-2.5 rounded-full border-2 border-saddlebrown/10
              text-saddlebrown font-arimo text-sm font-bold hover:bg-saddlebrown/5 
              hover:border-saddlebrown/30 transition-all active:scale-95 shadow-sm"
            >
              <svg 
                className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear All Filters</span>
            </button>
          </div>
        </div>
      </div>
    </Collapse>
  );
}
