// TODO page แก้ไขข้อมูลร้านค้า โดย id TLE
export default async function AdminEditRestaurantPage({
  params,
}: Readonly<{
  params: Promise<{ restaurantId: string }>;
}>) {
  const { restaurantId } = await params;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold font-playfair-display">
        Admin: Edit Restaurant {restaurantId}
      </h1>
      <p className="mt-4 text-gray-600">Editor coming soon...</p>
    </div>
  );
}
