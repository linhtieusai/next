import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

import dynamic from 'next/dynamic'

export default function ApplicationItem({ application, handleOnClick, isSelected }) {
  function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };
  
    let intervalCount = 0;
    let intervalString = "";
  
    for (const [unit, secondsPerUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsPerUnit);
      if (interval >= 1) {
        intervalCount = interval;
        intervalString = unit;
        break;
      }
    }
  
    if (intervalCount === 0) {
      return "just now";
    } else if (intervalCount === 1) {
      return `${intervalCount} ${intervalString} ago`;
    } else {
      return `${intervalCount} ${intervalString}${intervalCount === 1 ? "" : "s"} ago`;
    }
  }

    return (
        <div onClick={() => handleOnClick(application)}
            className={`mb-4 rounded-lg p-4 cursor-pointer hover:shadow-lg 
                hover:border-green-300  hover:border-opacity-50 hover:rounded-lg 
                focus:border-green-500 focus:outline-none focus:shadow-lg focus:border-opacity-50 focus:rounded-lg 
                active:border-gray-400 active:border-opacity-75 
                text-sm 
                ${
                  isSelected ? 
                    "border-2 border-gray-300 border-opacity-50 !border-green-500  border-b-green-500 shadow-lg"
                    : "border border-gray-300 border-opacity-25 "
                }
              `}
            >
              <div className={`relative flex justify-between items-center`}>
                  <div className="flex items-center">
                    <Image src={`/company_logo/${application.job.source_site}/${application.job.source_id}.jpg`} alt="me" width="55" height="55" className="object-cover mr-3 rounded-full"/>
                    <div>
                      <div className='flex'>
                        <p className="text-sm text-gray-600">{application.job.title}</p>
                      </div>
                      <h3 className="text-md font-semibold">{application.name}</h3>
                      <h3 className=" text-gray-700 text-sm">{application.email}</h3>

                      <p className="mt-4 text-gray-700">
                        {application.status}
                      </p>
                      <p className="mt-4 text-gray-700">
                        {application.created_at}
                      </p>
                      {/* show on VIEWED PAGE */}
                      {/* {viewedTime && (
                        <div className="flex justify-end mt-4 text-gray-400">
                          {timeAgo(viewedTime)}
                        </div>
                      )} */}

                        {/* {isFollowed && (
                          <svg className={`absolute top-0 right-0 inline-block text-red-300 w-4 h-4 fill-red-300`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                            <path d="M20.84 4.76a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-.9a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        )} */}
                  </div>
                </div>
            </div>
            </div>
    );
  }
  