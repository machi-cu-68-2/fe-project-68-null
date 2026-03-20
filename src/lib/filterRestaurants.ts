import { Restaurant } from "@/interface/Restaurant";

export default function filterRestaurants(
  restaurants: Restaurant[],
  activeFilter: string,
  debouncedQuery: string,
  selectedCategory: string,
  selectedLocation: string,
  selectedTags: string[]
) {
  return restaurants.filter((restaurant) => {
    // 1. Search filter (Name) - handled by API but double-checked here safely
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase());

    // 2. Chip bar filter (Category)
    const matchesCategory =
      activeFilter === "All" || restaurant.category === activeFilter;

    // 3. Advanced Category filter
    const matchesSpecificCategory =
      !selectedCategory || restaurant.category === selectedCategory;

    // 4. Location filter
    const matchesLocation =
      !selectedLocation || restaurant.location === selectedLocation;

    // 5. Tags filter (All selected tags must be present on the restaurant)
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => (restaurant.tags || []).includes(tag));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesSpecificCategory &&
      matchesLocation &&
      matchesTags
    );
  });
}
