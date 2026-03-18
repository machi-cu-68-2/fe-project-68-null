// TODO discovery by restaurantId WINNER
export default async function RestaurantDetailPage({
  params,
}: Readonly<{
  params: Promise<{ restaurantId: string }>;
}>) {
  const { restaurantId } = await params;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold font-playfair-display">
        Restaurant: {restaurantId}
      </h1>
      <p className="mt-4 text-gray-600">Restaurant details coming soon...</p>
    </div>
  );
}
