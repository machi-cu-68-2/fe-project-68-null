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
      // 1. เปลี่ยนเป็น inline-flex 
      // 2. ใส่ shrink-0 (ห้ามโดนบีบ) และ whitespace-nowrap (ห้ามตกบรรทัด)
      className="inline-flex shrink-0 items-center justify-center whitespace-nowrap px-5 py-2 rounded-full font-semibold text-saddlebrown hover:bg-[#F8E9A1] hover:shadow-md hover:text-black transition-all"
    >
      {children}
    </Link>
  );
}