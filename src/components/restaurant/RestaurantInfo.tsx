import { Restaurant } from "@/interface/Restaurant";

export default function RestaurantInfo({ restaurant }: {restaurant: Restaurant}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-playfair-display font-bold text-2xl text-[#724a15] mb-3">
          About the Restaurant
        </h2>
        <p className="text-[rgba(139,69,21,0.8)] text-base leading-relaxed">
          {restaurant.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard label="Cuisine" value={restaurant.category} />
        <InfoCard label="Location" value={restaurant.location} />
        <InfoCard label="Rating" value={`★ ${restaurant.rating} / 5.0`} />
        <InfoCard label="Reviews" value={`${restaurant.reviews} guests`} />
        {restaurant.tel && (
          <InfoCard label="Contact" value={restaurant.tel} />
        )}
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-[#f8e9a1] p-5">
      <p className="text-[rgba(139,69,21,0.5)] text-xs uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="font-playfair-display font-bold text-[#724a15]">
        {value}
      </p>
    </div>
  );
}
