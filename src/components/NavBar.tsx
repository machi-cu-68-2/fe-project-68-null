import LogoContainer from "./LogoContainer";
import LogoText from "./LogoText";
import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <div className="w-full relative flex justify-center py-4 px-4 text-left text-[1.125rem] text-saddlebrown font-playfair-display box-border">
      {/* กล่องเมนู */}
      <div className="h-[4.625rem] w-full max-w-[56.25rem] shadow-xl rounded-full bg-cornsilk flex items-center justify-between px-6 box-border gap-5">
        {/* ฝั่งซ้าย: โลโก้ */}
        <div className="flex items-center gap-3">
          <LogoContainer />
          <LogoText />
        </div>

        {/* ฝั่งขวา: เมนูลิงก์ */}
        <div className="flex items-center gap-8">
          <NavLink>Home</NavLink>
        </div>
      </div>
    </div>
  );
}
