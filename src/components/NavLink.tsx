import Link from "next/link";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      // ลบ w, h, relative, absolute ทิ้ง ปล่อยให้ขนาดมันยืดหดตามตัวอักษรข้างใน
      className="font-semibold leading-[1.688rem] text-saddlebrown transition-all 
      cursor-pointer hover:text-[#e8a118]"
    >
      {children}
    </Link>
  );
}