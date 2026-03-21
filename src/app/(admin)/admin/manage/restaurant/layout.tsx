// src/app/(admin)/admin/manage/reservations/layout.tsx
import NavBar from "@/components/NavBar";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
