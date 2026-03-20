import NavBar from "@/components/NavBar";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-[#FEFAEC] flex flex-col items-center">
      <div className="sticky top-0 w-full z-50">
        <NavBar />
      </div>
      <div className="w-full max-w-[1440px] flex flex-col px-[6.937rem] pt-16 pb-20 box-border font-playfair-display">
        {children}
      </div>
    </div>
  );
}
