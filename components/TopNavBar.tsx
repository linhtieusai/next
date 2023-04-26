'use client'

import Link from 'next/link';
import { useSession } from "next-auth/react";

const Navbar = () => {

  // get session from nextAuth
  const { data: session } = useSession();
  
  return (
    <div className="flex h-16 p-4">
      <div className="flex items-center flex-none">
        KhongThieuViec
      </div>
      <div className="relative flex items-center justify-end flex-1 ml-10">
          <div className="flex items-center w-2/3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" name="name" placeholder="Search job"
                  className="w-full py-2 border-b-2 border-gray-400 outline-none focus:border-green-400" />
          </div>

      </div>
      <div className="flex items-center justify-end w-32 flex-0 md:flex-1">
        <div className='flex text-gray'>
            <svg className="w-6 h-6 text-gray-400 hover:text-gray-800 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path></svg>
        </div>
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