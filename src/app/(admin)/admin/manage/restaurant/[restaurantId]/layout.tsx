// src/app/(admin)/admin/manage/reservations/layout.tsx
import NavBar from "@/components/NavBar";

export default function RestaurantIDLayout({
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
