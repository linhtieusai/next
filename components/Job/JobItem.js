import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

import dynamic from 'next/dynamic'

const humanizeDuration = require('humanize-duration');

export default function JobItem({ job, handleOnClick, isSelected }) {
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
        <div onClick={() => handleOnClick(job)}
            className={`mt-4 rounded-lg p-4 cursor-pointer hover:shadow-lg 
                hover:border-green-300  hover:border-opacity-50 hover:rounded-lg 
                focus:border-green-500 focus:outline-none focus:shadow-lg focus:border-opacity-50 focus:rounded-lg 
                active:border-gray-400 active:border-opacity-75 
                ${
                  isSelected ? "border-2 border-gray-300 border-opacity-50 border-green-500 shadow-lg" : "border border-gray-300 border-opacity-25 "
                }`}
            >
              <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Image src={`/company_logo/${job.source_site}/${job.source_id}.jpg`} alt="me" width="55" height="55" className="object-cover mr-3 rounded-full"/>
                    <div>
                          <p className="text-gray-600">{job.company_name}</p>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <span className="mt-4 text-gray-700">
                            
                            {job.gross_month_salary}
                          </span>
                          <span className="mt-4 text-gray-700">
                            
                            {job.location}
                          </span>
                          {/* show on VIEWED PAGE */}
                          {job.viewedTime && humanizeDuration && (
                            <div className="flex justify-end mt-4 text-gray-400">
                             {timeAgo(job.viewedTime)}
                           </div>
                          )}
                          
                  </div>
                </div>
            </div>
            </div>
    );
  }
  