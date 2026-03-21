interface RestaurantHighlightsProps {
  tags: string[];
}

export default function RestaurantHighlights({ tags }: RestaurantHighlightsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-playfair-display font-bold text-2xl text-[#724a15] mb-1">
        Highlights
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-white border-2 border-[#f8e9a1] text-[#8b4515] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#f8e9a1] transition-colors cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
