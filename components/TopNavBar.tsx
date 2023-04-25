'use client'

import Link from 'next/link';
import { useSession } from "next-auth/react";

const Navbar = () => {

  // get session from nextAuth
  const { data: session } = useSession();
  
  return (

  <nav className="sticky top-0 left-0 z-10 bg-white shadow-md">
    <div className="flex items-center justify-between h-16 px-4 mx-auto ">
      <div className="flex items-center">
        KhôngThieuViec
      </div>
      <div className="flex items-center">
        {/* <ul className="flex items-center">
          <li className="ml-4">
            <Link href="/about">
            Job đã xem
            </Link>
          </li>
          <li className="ml-4">
            <Link href="/contact">
            Job đã lưu
            </Link>
          </li>
        </ul> */}
        <div className="ml-4">
          <Link href="/my-page">
            <button className="px-4 py-2 border rounded-full text-emerald-500 border-slate-300 hover:bg-cyan-100 hover:border-indigo-300">
                {session ? "My Page" : "Login"}
            </button>
          </Link>

        </div>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;