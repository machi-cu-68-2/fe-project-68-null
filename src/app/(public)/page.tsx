import Banner from "@/components/Banner";
import TopRestaurantMagazine from "@/components/TopRestaurantMagazine";

export default function Home() {
  return (
    <div className="font-sans min-h-screen w-full flex flex-col">
      {/* ส่วนหัว: แบนเนอร์ */}
      <Banner />

      {/* ส่วนเนื้อหาหลัก*/}
      <main className="flex-1 flex flex-col w-full">
        <TopRestaurantMagazine />
      </main>

      {/* ส่วนท้าย*/}
      <footer
        className="flex gap-6 flex-wrap items-center justify-center py-8 
      bg-gray-50 w-full border-t border-gray-200"
      >
        <p className="text-gray-500 text-sm">
          © 2024 NULL Dining. No rights reserved.
        </p>
      </footer>
    </div>
  );
}
