import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

import dynamic from 'next/dynamic'
import { ApplicationStatus } from '../../lib/const'

export default function ConversationItem({ conversation, handleOnClick, isSelected }) {

  let colorClassName;
  switch (ApplicationStatus.STATUS_COLOR[conversation.application_status]) {
    case 'green':
      colorClassName = "text-green-700";
      break;
    case 'red':
      colorClassName = "text-red-700";
      break;
    default:
      // Handle the case when x is neither 1 nor 2
      colorClassName = `text-${ApplicationStatus.STATUS_COLOR[conversation.application_status]}-700`;
      break;
  }


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
        <div onClick={() => handleOnClick(conversation)}
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
              <div className={`relative flex-1 justify-between items-center overflow-hidden`}>
                  <div className="flex items-center">
                    <Image src={`/company_logo/${conversation.source_site}/${conversation.source_id}.jpg`} alt="me" width="55" height="55" className="object-cover mr-3 rounded-full"/>
                    <div className='overflow-hidden'>
                      <div className='flex'>
                        <p className="text-xs truncate text-gray-500">
                          {conversation.company_name}
                        </p>
                      </div>
                      <h3 className={`${colorClassName} text-sm font-semibold`}>{conversation.job_title}</h3>
                      <h3 className={`${colorClassName} text-sm font-semibold`}>{conversation.candidate_email}</h3>
                     
                      <p className="truncate text-sm mt-4 text-gray-700">
                        {conversation.last_message_content}
                      </p>
                      <p className="truncate text-xs mt-4 text-gray-400">
                        {conversation.last_message_date}
                      </p>
                      {/* show on VIEWED PAGE */}
                      {/* {viewedTime && (
                        <div className="flex justify-end mt-4 text-gray-400">
                          {timeAgo(viewedTime)}
                        </div>
                      )} */}
                  </div>
                </div>
            </div>
            </div>
    );
  }
  