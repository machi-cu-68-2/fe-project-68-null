"use client";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Users from "../interface/๊Users";
import Link from "next/link";

export default function ProfileWithDropdown({ user }: { user: Users }) {
  const [isDropDownClicked, setDropDownClicked] = useState<boolean>(false);

  return (
    <div className="relative w-max font-playfair-display">
      {/* Profile Trigger */}
      <button
        className="flex items-center w-44 h-13 px-4 gap-3 bg-transparent rounded-full 
      cursor-pointer hover:bg-black/5 transition-colors"
        onClick={() => setDropDownClicked(!isDropDownClicked)}
      >
        {/* Avatar */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-goldenrod shrink-0 text-white">
          <b className="leading-none text-sm">
            {user.name.charAt(0).toUpperCase()}
          </b>
        </div>

        {/* Name */}
        <span className="flex-1 text-base font-semibold text-saddlebrown text-left">
          {user.name}
        </span>

        {/* Chevron/Icon */}
        {isDropDownClicked ? (
          <Image
            className="w-4 h-4 object-contain shrink-0"
            width={16}
            height={16}
            alt="Dropdown icon"
            src="/icons/chevronup.svg"
          />
        ) : (
          <Image
            className="w-4 h-4 object-contain shrink-0"
            width={16}
            height={16}
            alt="Dropdown icon"
            src="/icons/chevrondown.svg"
          />
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropDownClicked ? (
        <div
          className="absolute top-12 -left-8 z-10 flex flex-col w-60 py-2 
      bg-white border-2 border-palegoldenrod rounded-2xl shadow-lg font-inter text-saddlebrown"
        >
          <Link
            href={"/profile"}
            className="flex items-center w-full px-4 py-3 gap-3 hover:bg-gray-50 transition-colors"
          >
            <Image
              className="w-4 h-4"
              width={18}
              height={18}
              alt="Profile"
              src="/icons/profile.svg"
            />
            <span className="text-base font-semibold">My Profile</span>
          </Link>

          <button className="flex items-center w-full px-4 py-3 gap-3 hover:bg-gray-50 transition-colors">
            <Image
              className="w-4 h-4"
              width={18}
              height={18}
              alt="Reservations"
              src="/icons/calendar.svg"
            />
            <span className="text-base font-semibold">My Reservations</span>
          </button>

          <button className="flex items-center w-full px-4 py-3 gap-3 hover:bg-gray-50 transition-colors">
            <Image
              className="w-4 h-4"
              width={18}
              height={18}
              alt="Settings"
              src="/icons/settings.svg"
            />
            <span className="text-base font-semibold">Settings</span>
          </button>

          {/* Divider */}
          {user?.role === "admin" && (
            <>
              <div className="w-full h-px bg-palegoldenrod my-1" />
              <button className="flex items-center w-full px-4 py-3 gap-3 hover:bg-gray-50 transition-colors">
                <Image
                  className="w-4 h-4"
                  width={18}
                  height={18}
                  alt="Manage"
                  src="/icons/profile.svg"
                />
                <span className="text-base font-semibold">Manage</span>
              </button>
            </>
          )}
          <div className="w-full h-px bg-palegoldenrod my-1" />

          <button
            className="flex items-center w-full px-4 py-3 gap-3 text-crimson
         hover:bg-red-50 transition-colors"
            onClick={() => {
              if (globalThis.confirm("Are you sure you want to log out?")) {
                signOut({ callbackUrl: "/" });
              }
            }}
          >
            <Image
              className="w-4 h-4"
              width={18}
              height={18}
              alt="Log out"
              src="/icons/logout.svg"
            />
            <span className="text-base font-bold">Log out</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
