'use client'

import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from 'react';
import NotificationSkeleton from '../ui/rendering-notification-skeleton'
import Image from 'next/image';
import { ApplicationStatus } from '../lib/const'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session, status } = useSession()
  const [notifications, setNotifications] = useState<any[]>();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();
  
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

  function handleClickNotification(notification) {
    if(notification.application) {
      
      router.push(`/applications?applicationId=${notification.application.id}`)
    } else if(notification.job) {
      router.push(`/?jobId=${notification.job.id}`)
    } 
  }

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
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
          <svg strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${showPopup ? "text-green-600 hover:text-green-600" : "text-gray-600 hover:text-gray-800"} hover:cursor-pointer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"`}>
            <path strokeLinecap="round" fill={showPopup ? 'green' : 'none'} strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
          </svg>
        </div>
        <div className="ml-4">
          <Link href="/my-page">
            <button className="px-4 py-2 text-sm border rounded-full text-green-600 border-slate-300 hover:border-emerald-100 hover:bg-emerald-100 hover:bg-gray-100">
                {/* {if (status === "authenticated") &&
                  "My Page"
                } */}
                {status === "loading" ? (
                  <div className="flex animate-pulse">
                    <h3 className="h-4 w-10 bg-gray-200 rounded-md dark:bg-gray-700"></h3>
                  </div>
                ) : (session ? "My Page" : "Login")}
            </button>
          </Link>
        </div>
        
      </div>
      {showPopup && (
       <div className='z-10 max-h-[calc(100vh_-_300px)] max-w-[460px] overflow-auto p-4 notification-popup flex flex-col border rounded-lg shadow-lg bg-slate-50 flex absolute top-16 right-5 ml:10 min-h-[150px] w-[90%] md:w-auto md:min-w-[360px]' ref={popupRef}>
          <div className='flex p-4 text-sm bg-slate-200 text-green-900 font-bold'>Thông báo </div>
          <div className='flex-1 bg-white'>
            <ul className='p-4'>
            {notifications ? (
                notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={notification.id} onClick={() => handleClickNotification(notification)}
                      className='flex px-4 py-4 hover:bg-gray-100 hover:cursor-pointer'>
                      <div className='logo'>
                        <Image src={`/company_logo/${notification.job.source_site}/${notification.job.source_id}.jpg`} alt="me" width="40" height="40" className="object-cover mr-3 rounded-full"/>
                      </div>
                      <div className='flex-col'>
                        <div className={`${notification.application ? "text-gray-500": "font-semibold text-slate-600"} text-xs `}>
                          {notification.job.title}
                        </div>
                        {notification.application && (
                          <div className='flex items-center font-semibold text-sm text-slate-600'>
                            {ApplicationStatus.STATUS_ICON[notification.content] == 'y' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16px" height="16px">
                                  <path fill="none" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
                                  <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"/>
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16px" height="16px">
                                  <path fill="none" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
                                  <path fill="#f44336" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"/>
                                  <path fill="#f44336" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"/>
                                </svg>
                              )}
                            <span className='ml-1'>{notification.application.name}</span>
                          </div>
                        )}
                        <div className='text-gray-700 text-xs'>
                          {ApplicationStatus.STATUS[notification.content]} 
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