import TopRestaurantCard from "./TopRestaurantCard";
import { TopRestaurants } from "@/interface";

export const mockTopRestaurantData: TopRestaurants[] = [
  {
    name: "La Maison Dorée",
    category: "French Contemporary",
    location: "Downtown, Manhattan",
    rating: "4.9",
    reviews: "324",
    imageSrc: "/images/la-maison-doree.jpg",
  },
  {
    name: "Sakura Garden",
    category: "Japanese Fusion",
    location: "Midtown East",
    rating: "4.8",
    reviews: "256",
    imageSrc: "/images/sakura-garden.jpg",
  },
  {
    name: "Oceano Blu",
    category: "Mediterranean Seafood",
    location: "Chelsea, West Side",
    rating: "4.7",
    reviews: "198",
    imageSrc: "/images/oceano-blu.jpg",
  },
  {
    name: "The Golden Calf",
    category: "American Steakhouse",
    location: "Financial District",
    rating: "4.8",
    reviews: "412",
    imageSrc: "/images/the-golden-calf.jpg",
  },
  {
    name: "Bella Trattoria",
    category: "Classic Italian",
    location: "Little Italy",
    rating: "4.6",
    reviews: "150",
    imageSrc: "/images/bella-trattoria.jpg",
  },
  {
    name: "Dragon Palace",
    category: "Authentic Chinese",
    location: "Chinatown",
    rating: "4.5",
    reviews: "320",
    imageSrc: "/images/dragon-palace.jpg",
  },
  {
    name: "El Matador",
    category: "Spanish Tapas",
    location: "Greenwich Village",
    rating: "4.7",
    reviews: "210",
    imageSrc: "/images/el-matador.jpg",
  },
];

export default function TopRestaurantMagazine() {
  // สร้างสำเนาของอาเรย์และเรียงลำดับตามเรตติ้ง (มากไปน้อย)
  const sortedRestaurants = [...mockTopRestaurantData].sort(
    (a, b) => parseFloat(b.rating) - parseFloat(a.rating),
  );

  // ดึงร้านที่มีเรตติ้งสูงสุด 1 ร้านแรก (ทำเป็นการ์ดใหญ่)
  const largeRestaurant = sortedRestaurants[0];
  // ดึงร้านที่มีเรตติ้งรองลงมาอีก 2 ร้าน (ตำแหน่งขวาบน)
  const rightRestaurants = sortedRestaurants.slice(1, 3);
  // ดึงร้านอีก 3 ร้าน สำหรับแสดงด้านล่าง แนวนอน
  const bottomRestaurants = sortedRestaurants.slice(3, 6);

  return (
    <section
      className="w-full bg-[#FFFAF0] py-20 px-6 md:px-12 lg:px-[6.5rem] 
    flex flex-col items-center box-border gap-12 font-sans"
    >
      <div className="w-full max-w-7xl mx-auto p-4 flex flex-col gap-6">
        {/* ส่วนบน: ซ้าย 1 ใหญ่, ขวา 2 เล็ก */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ฝั่งซ้าย: การ์ดใบใหญ่ (กินพื้นที่ 2 คอลัมน์บนจอใหญ่) */}
          {largeRestaurant && (
            <div className="lg:col-span-2">
              <TopRestaurantCard {...largeRestaurant} />
            </div>
          )}

          {/* ฝั่งขวา: การ์ดใบเล็ก 2 ใบ ซ้อนกันแนวตั้ง */}
          <div className="flex flex-col gap-6">
            {rightRestaurants.map((restaurant) => (
              <TopRestaurantCard key={restaurant.name} {...restaurant} />
            ))}
          </div>
        </div>

        {/* ส่วนล่าง: การ์ด 3 ใบเรียงแนวนอน */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bottomRestaurants.map((restaurant) => (
            <TopRestaurantCard key={restaurant.name} {...restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
}
