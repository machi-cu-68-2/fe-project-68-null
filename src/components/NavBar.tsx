import LogoContainer from "./LogoContainer";
import LogoText from "./LogoText";
import NavLink from "./NavLink";
import Link from "next/link";

export default function NavBar() {
  const session = false; // TODO session signin login
  return (
    <div
      className="top-0 z-50 w-full fixed flex justify-center py-4 px-4 text-left text-[1.125rem] 
    text-saddlebrown font-playfair-display box-border"
    >
      {/* กล่องเมนูหลัก */}
      <div
        className="h-[4.625rem] w-full max-w-[56.25rem] shadow-xl rounded-full bg-cornsilk flex items-center 
      justify-between px-6 box-border bg-[rgba(255,248,220,0.9)]"
      >
        {/* 1. ฝั่งซ้าย: โลโก้*/}
        <div className="flex items-center gap-3 w-1/3 justify-start">
          <LogoContainer />
          <LogoText />
        </div>

        {/* 2. ตรงกลาง: เมนูลิงก์ */}
        <div className="flex items-center gap-8 w-1/3 justify-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/discovery">Discovery</NavLink>
          <NavLink href="/about-us">About Us</NavLink>
        </div>

        {/* 3. ฝั่งขวา: sign in sign up */}
        <div className="flex items-center w-1/3 justify-end">
          {/**
           * // TODO implement real data signin signup
           */}
          <div className="flex gap-[16px] items-center h-[40px]">
            <Link
              href="/signin"
              className="font-semibold leading-[27px] text-[#724a15] text-[18px] 
              hover:text-[#e8a118] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="bg-[#ce7b11] h-[40px] px-6 flex items-center 
              justify-center rounded-full shadow-md font-medium leading-[24px] text-[16px]
               text-white hover:bg-[#e8a118] transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
