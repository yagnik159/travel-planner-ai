import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-60 text-sm py-[30px] w-full bg-white shadow-sm mb-[-1px]">
      <nav className="container w-full mx-auto sm:flex sm:items-center sm:justify-between px-[1.5rem]">
        <Link href="/" className={`font-bold text-[30px] text-[#27272a]`}>
          <span className="text-[#ec4899]">T</span>
          <span className="text-[#ec4899]">r</span>
          <span className="text-[#ec4899]">a</span>
          <span className="text-[#ec4899]">v</span>
          <span className="text-[#ec4899]">e</span>
          <span className="text-[#ec4899]">l</span>
          <span className="ml-[10px]"></span>
          <span className="text-[#0369a1]">P</span>
          <span className="text-[#0369a1]">l</span>
          <span className="text-[#0369a1]">a</span>
          <span className="text-[#0369a1]">n</span>
          <span className="text-[#0369a1]">n</span>
          <span className="text-[#0369a1]">e</span>
          <span className="text-[#0369a1]">r</span>
        </Link>
      </nav>
    </header>
  );
}
