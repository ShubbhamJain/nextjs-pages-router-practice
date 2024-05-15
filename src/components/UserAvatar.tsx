import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useAuthContext } from "@/context/auth";

import Profile from "@/assets/profile.svg";

export default function UserAvatar() {
  const { auth, logout } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as any)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          id="profileButton"
          onClick={toggleDropdown}
          className="flex items-center justify-center w-10 h-10 rounded-full outline-none"
        >
          <span className="sr-only">Open user menu</span>
          <Image
            className="w-10 h-10 rounded-full outline-none"
            src={Profile}
            alt="user photo"
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <button
                  className="w-full block text-start px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => logout(auth.user?.id!)}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
