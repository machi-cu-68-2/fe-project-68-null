import TopRestaurantCard from "./TopRestaurantCard";
import { mockRestaurants } from "mockdata/restaurant";

export default function TopRestaurantMagazine() {
  // สร้างสำเนาของอาเรย์และเรียงลำดับตามเรตติ้ง (มากไปน้อย)
  const sortedRestaurants = [...mockRestaurants].sort(
    (a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating),
  );

  // ดึง 6 ร้านแรกมาแสดงใน Grid พิเศษ
  const displayRestaurants = sortedRestaurants.slice(0, 6);

  if (displayRestaurants.length < 6) return null;

  return (
    <section
      className="w-full bg-[#FFFAF0] py-20 px-6 md:px-12 lg:px-[6.5rem] 
    flex flex-col items-center box-border gap-12 font-sans"
    >
      <div className="w-full max-w-7xl mx-auto p-4">
        {/* Unified Grid Layout for 1 1 2 / 1 1 3 / 4 5 6 pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Restaurant 1: 2x2 block (top left) on lg screens. On md, we'll let it take the full width for impact. */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <TopRestaurantCard {...displayRestaurants[0]} isLarge={true} />
          </div>

          {/* Restaurant 2: 1x1 block (top right) */}
          <div className="col-span-1">
            <TopRestaurantCard {...displayRestaurants[1]} isLarge={false} />
          </div>

          {/* Restaurant 3: 1x1 block (middle right) */}
          <div className="col-span-1">
            <TopRestaurantCard {...displayRestaurants[2]} isLarge={false} />
          </div>

          {/* Restaurant 4, 5, 6: 1x1 blocks in a row below (takes remaining md slots) */}
          <div className="col-span-1">
            <TopRestaurantCard {...displayRestaurants[3]} isLarge={false} />
          </div>
          <div className="col-span-1">
            <TopRestaurantCard {...displayRestaurants[4]} isLarge={false} />
          </div>
          <div className="col-span-1">
            <TopRestaurantCard {...displayRestaurants[5]} isLarge={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
