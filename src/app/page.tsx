import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="font-sans min-h-screen w-full flex flex-col">
      {/* ส่วนหัว: แบนเนอร์ */}
      <Banner />

      {/* ส่วนเนื้อหาหลัก*/}
      <main className="flex-1 flex flex-col gap-8 items-center sm:items-start w-full max-w-7xl mx-auto py-16 px-4">
        {/* TODO: ใส่เนื้อหาเช่น Recommended Restaurants หรือ Categories ตรงนี้ */}
      </main>

      {/* ส่วนท้าย*/}
      <footer className="flex gap-6 flex-wrap items-center justify-center py-8 bg-gray-50 w-full border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          © 2024 Fine Dining. No rights reserved.
        </p>
      </footer>
    </div>
  );
}
