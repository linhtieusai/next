import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

export default function JobItem({ job, handleOnClick, isSelected }) {  
    return (
        <div  key={job.id} onClick={() => handleOnClick(job)}
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

                  </div>
                </div>
            </div>
            </div>
    );
  }
  