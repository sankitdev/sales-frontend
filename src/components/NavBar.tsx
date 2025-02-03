"use client";
import Link from "next/link";
import { AvatarComponent } from "./Avatar";
import { ModeToggle } from "./darkmode-toggle";
export function Navbar() {
  return (
    <nav className="shadow-lg relative z-50">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              <div className="size-4">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <Link href="/" className="text-2xl font-bold">
                Inventory Management
              </Link>
            </div>
          </div>
          <div className="flex gap-5">
            <AvatarComponent />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
