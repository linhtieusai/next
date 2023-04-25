'use client'

import Link from 'next/link';
import { useSession } from "next-auth/react";

const Navbar = () => {

  // get session from nextAuth
  const { data: session } = useSession();
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
      </div>
      <div className="flex items-center">
      </div>
      <div className="flex items-center">
        <div className="ml-4">
          <Link href="/my-page">
            <button className="px-4 py-2 border rounded-full text-emerald-500 border-slate-300 hover:bg-cyan-100 hover:border-indigo-300">
                {session ? "My Page" : "Login"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;