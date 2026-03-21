import LogoContainer from "./LogoContainer";
import LogoText from "./LogoText";
import NavLink from "./NavLink";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ProfileWithDropdown from "./ProfileWithDropdown";
import Users from "@/interface/๊Users";

export default async function NavBar() {
  const session = await getServerSession(authOptions); // TODO session signin login
  return (
    <div
      className="top-0 z-50 w-full fixed flex justify-center py-4 px-4 text-left text-[1.125rem] 
    text-saddlebrown font-playfair-display box-border"
    >
      {/* กล่องเมนูหลัก */}
      <div
        className="h-[4.625rem] w-fit min-w-[56.25rem] max-w-[95vw] shadow-xl rounded-full bg-cornsilk flex items-center 
      justify-between px-10 box-border bg-[rgba(255,248,220,0.9)]"
      >
        {/* 1. ฝั่งซ้าย: โลโก้*/}
        <div className="flex items-center gap-3 flex-1 justify-start">
          <LogoContainer />
          <LogoText />
        </div>

        {/* 2. ตรงกลาง: เมนูลิงก์ */}
        <div className="flex items-center gap-8 flex-none justify-center px-10">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/discovery">Discovery</NavLink>
          <NavLink href="/about-us">About Us</NavLink>
        </div>

        {/* 3. ฝั่งขวา: sign in sign up */}
        <div className="flex items-center flex-1 justify-end">
          {/**
           * // TODO realdata
           */}
          {session ? (
            <ProfileWithDropdown user={session.user as Users} />
          ) : (
            <div className="flex gap-[16px] items-center h-[40px]">
              <Link
                href="/signIn"
                className="font-semibold leading-[27px] text-[#724a15] text-[18px] 
              hover:text-[#e8a118] transition-colors whitespace-nowrap"
              >
                Sign in
              </Link>
              <Link
                href="/signUp"
                className="bg-[#ce7b11] h-[40px] px-6 flex items-center 
              justify-center rounded-full shadow-md font-medium leading-[24px] text-[16px]
               text-white hover:bg-[#e8a118] transition-colors whitespace-nowrap"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
