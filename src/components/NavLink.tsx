import { ReactNode } from "react";

export default function NavLink({ children }: { children: ReactNode }) {
  return (
    <div className="h-[1.688rem] w-[3.075rem] relative">
      <div className="absolute top-[-0.062rem] left-[0rem] leading-[1.688rem] font-semibold">
        {children}
      </div>
    </div>
  );
}
