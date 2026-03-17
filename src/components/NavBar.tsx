import LogoContainer from "./LogoContainer";
import LogoText from "./LogoText";
import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <div
      className="w-full relative flex justify-center py-4 px-4 text-left text-[1.125rem] 
    text-saddlebrown font-playfair-display box-border"
    >
      {/* กล่องเมนูหลัก */}
      <div
        className="h-[4.625rem] w-full max-w-[56.25rem] shadow-xl rounded-full bg-cornsilk flex items-center 
      justify-between px-6 box-border bg-[rgba(255,248,220,0.9)]"
      >
        {/* 1. ฝั่งซ้าย: โลโก้ (กำหนดความกว้างให้เท่ากับฝั่งขวา เพื่อให้ตรงกลางอยู่กึ่งกลางเป๊ะ) */}
        <div className="flex items-center gap-3 w-1/3 justify-start">
          <LogoContainer />
          <LogoText />
        </div>

        {/* 2. ตรงกลาง: เมนูลิงก์ */}
        <div className="flex items-center gap-8 w-1/3 justify-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/discovery">discovery</NavLink>
          <NavLink href="/about us">Contact</NavLink>
        </div>

        {/* 3. ฝั่งขวา: พื้นที่ว่าง หรือ ปุ่มอื่นๆ (เช่น Login / สมัครสมาชิก) */}
        <div className="flex items-center w-1/3 justify-end">
          {/* ถ้ายังไม่มีปุ่ม ปล่อยโล่งไว้แบบนี้ได้เลยครับ กล่องนี้จะช่วยถ่วงน้ำหนัก Layout */}
          {/* <button className="bg-saddlebrown text-white px-4 py-2 rounded-full">Login</button> */}
        </div>
      </div>
    </div>
  );
}
