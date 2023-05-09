'use client'

import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from 'react';
import NotificationSkeleton from '../ui/rendering-notification-skeleton'
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<any[]>();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    async function fetchNotifications() {
      const response = await fetch("http://localhost:3000/api/notifications");
      const data = await response.json();
      setNotifications(data.data);
    }

    if (showPopup && !notifications) {
      fetchNotifications();
    }
  }, [showPopup, notifications]);

  const popupRef = useRef<HTMLDivElement>(null);
  const notificationIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event) {
    
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        event.target !== notificationIconRef.current
      ) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    <div className="relative flex h-16 p-4">
      <div className="flex items-center flex-none">
        ViecThom
      </div>
      <div className="flex items-center justify-center flex-1 ">
          <div className="hidden sm:flex items-center w-2/3 min-w-[50%]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" name="name" placeholder="Search job"
                  className="w-full py-2 border-b-2 border-gray-400 outline-none focus:border-green-600" />
          </div>

      </div>
      <div className="flex items-center justify-center flex-0">
        <div className='flex text-gray' role="button" aria-label='Tin nhắn' >
            <svg className="w-6 h-6 text-gray-400 hover:text-green-400 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 58 58" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <g xmlns="http://www.w3.org/2000/svg">
                <path style={{ fill: "#FFFFFF"}} d="M39.767,25.913c-0.354,0-0.696-0.188-0.878-0.519c-2.795-5.097-8.115-8.679-13.883-9.349   c-0.549-0.063-0.941-0.56-0.878-1.108c0.063-0.548,0.558-0.942,1.108-0.878c6.401,0.743,12.304,4.718,15.406,10.373   c0.266,0.484,0.088,1.092-0.396,1.358C40.094,25.873,39.929,25.913,39.767,25.913z"/>
                <path style={{ fill: "#FFFFFF"}} d="M0,58l4.042-12.125c-2.05-3.45-3.231-7.476-3.231-11.78C0.81,21.34,11.15,11,23.905,11   S47,21.34,47,34.095S36.66,57.19,23.905,57.19c-3.881,0-7.535-0.961-10.745-2.653L0,58z"/>
                <path style={{ fill: "gray"}} d="M23.905,11C36.66,11,47,21.34,47,34.095c0,3.378-0.731,6.583-2.034,9.475L58,47l-4.042-12.125   c2.05-3.45,3.231-7.476,3.231-11.78C57.19,10.34,46.85,0,34.095,0c-9.426,0-17.528,5.65-21.118,13.746   C16.231,11.995,19.951,11,23.905,11z"/>
              </g>
          </svg>
        </div>
        <div ref={notificationIconRef} className='flex ml-4' onClick={() => setShowPopup((prevShowPopup) => !prevShowPopup)}>
          <svg strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${showPopup ? "text-green-600 hover:text-green-800" : "text-gray-600 hover:text-gray-800"} hover:cursor-pointer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"`}>
            <path stroke-linecap="round" fill={showPopup ? 'green' : 'none'} stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
          </svg>
        </div>
        <div className="ml-4">
          <Link href="/my-page">
            <button className="px-4 py-2 border rounded-full text-green-600 border-slate-300 hover:border-emerald-100 hover:bg-emerald-100 hover:bg-gray-100">
                {session ? "My Page" : "Login"}
            </button>
          </Link>
        </div>
        
      </div>
      {showPopup && (
       <div className='z-10 max-h-[calc(100vh_-_300px)] max-w-[460px] overflow-auto p-4 notification-popup flex flex-col border rounded-lg shadow-lg bg-slate-50 flex absolute top-16 right-5 ml:10 min-h-[150px] w-[90%] md:w-auto md:min-w-[360px]' ref={popupRef}>
          <div className='flex p-4 bg-slate-200 font-bold'>Thông báo </div>
          <div className='flex-1 bg-white'>
            <ul className='p-4'>
            {notifications ? (
                notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={notification.id} className='flex px-4 py-4 hover:bg-gray-100 hover:cursor-pointer'>
                      <div className='logo'>
                        <Image src={`/company_logo/${notification.job.source_site}/${notification.job.source_id}.jpg`} alt="me" width="40" height="40" className="object-cover mr-3 rounded-full"/>
                      </div>
                      <div className='flex-col'>
                        <div className='font-bold text-sm text-slate-800'>
                          {notification.job.title}
                        </div>
                        <div className='text-gray-700 text-xs'>
                          {notification.content}
                        </div>
                        <div className='text-green-700 text-xs'>
                          4 giờ trước
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className='flex items-center justify-center px-4 py-8'>
                    Không có thông báo nào.
                  </div>
                )
              ) : (
                <NotificationSkeleton />
              )}

            </ul>
          </div>
      </div>
      )}
     
    </div>
    </>
  );
};

export default Navbar;