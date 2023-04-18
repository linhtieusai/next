'use client'

import Link from 'next/link';
import { useSession } from "next-auth/react";

const Navbar = () => {

  // get session from nextAuth
  const { data: session } = useSession();
  
  return (

    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
    <div className="container flex items-center justify-between h-16 mx-auto">
      <div className="flex items-center">
        <Link href="/">
         Home
        </Link>
      </div>
      <div className="flex items-center">
        <ul className="flex items-center">
          <li className="ml-4">
            <Link href="/about">
              About
            </Link>
          </li>
          <li className="ml-4">
            <Link href="/contact">
              Contact
            </Link>
          </li>
        </ul>
        <div className="ml-4">
          <Link href="/my-page">
            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
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