'use client'

import Link from 'next/link';
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  
  return (
    <div className="flex h-16 p-4">
      <div className="flex items-center flex-none">
        KhongThieuViec
      </div>
      <div className="flex items-center justify-center flex-1 ">
          <div className="hidden sm:flex items-center w-2/3 min-w-[50%]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" name="name" placeholder="Search job"
                  className="w-full py-2 border-b-2 border-gray-400 outline-none focus:border-green-400" />
          </div>

      </div>
      <div className="flex items-center justify-center flex-0">
        <div className='flex text-gray'>
            <svg className="w-6 h-6 text-gray-400 hover:text-gray-800 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 58 58" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <g xmlns="http://www.w3.org/2000/svg">
                <path style={{ fill: "#1081E0"}} d="M39.767,25.913c-0.354,0-0.696-0.188-0.878-0.519c-2.795-5.097-8.115-8.679-13.883-9.349   c-0.549-0.063-0.941-0.56-0.878-1.108c0.063-0.548,0.558-0.942,1.108-0.878c6.401,0.743,12.304,4.718,15.406,10.373   c0.266,0.484,0.088,1.092-0.396,1.358C40.094,25.873,39.929,25.913,39.767,25.913z"/>
                <path style={{ fill: "#A485BE"}} d="M0,58l4.042-12.125c-2.05-3.45-3.231-7.476-3.231-11.78C0.81,21.34,11.15,11,23.905,11   S47,21.34,47,34.095S36.66,57.19,23.905,57.19c-3.881,0-7.535-0.961-10.745-2.653L0,58z"/>
                <path style={{ fill: "#47363D"}} d="M23.905,11C36.66,11,47,21.34,47,34.095c0,3.378-0.731,6.583-2.034,9.475L58,47l-4.042-12.125   c2.05-3.45,3.231-7.476,3.231-11.78C57.19,10.34,46.85,0,34.095,0c-9.426,0-17.528,5.65-21.118,13.746   C16.231,11.995,19.951,11,23.905,11z"/>
              </g>            
          </svg>
        </div>
        <div className='flex ml-4 text-gray'>
          <svg stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400 hover:text-gray-800 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
          </svg>
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