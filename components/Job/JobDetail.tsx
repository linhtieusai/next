'use client';

import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import JobListing from './JobListing';
import { useRouter } from 'next/navigation';
import { useSearchParams, usePathname  } from 'next/navigation';
import { Suspense } from "react";

function JobDetail({ selectedJob, handleBackButton, handleApplyButtonClick }) {

  return (
    <>
      {/* <div className="p-4 lg:w-2/3"> */}
        {selectedJob ? (
          <>
            {/* <button className="sticky top-0 px-4 py-2 bg-white border-b" onClick={() => handleBackButton()}>Back</button> */}
            <a onClick={() => handleBackButton()} 
                className="px-4 py-2 underline lg:hidden hover:cursor-pointer"
            >
                Back to Search Results for "PHP"
            </a>
            <div className="sticky top-0 flex-col items-center justify-between px-5 pb-10 h-[calc(100vh_-_200px)] overflow-auto bg-white border-b">
                <div className="sticky top-0 flex justify-between py-3 bg-white">
                  <h1 className="flex ml-2 text-2xl font-bold overflow-ellipsis clamp-2">{selectedJob.title}</h1>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="inline-block w-4 h-4">
                        <path d="M20.84 4.76a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-.9a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <span  className="hidden ml-2 md:inline-block">Save</span>
                    </button>
                    <button onClick={handleApplyButtonClick} className="hidden px-4 py-2 font-bold text-white bg-blue-500 rounded-full lg:block hover:bg-blue-600">
                      Apply
                    </button>
                  </div>
                </div>
               
                <div className="pl-5 pt-13">
                    <h3 className="mt-3 text-lg font-bold">Required Skill</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.job_required_skill}</p>
                    {/* <h3 className="text-lg font-bold">Job overview</h3>
                    <p className="whitespace-pre-wrap">{selectedJob?.overview}</p> */}
                    <h3 className="mt-3 text-lg font-bold">Job Responsibilites</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.job_responsibility}</p>
                      
                  
                    <h3 className="mt-3 text-lg font-bold">Preferred</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.preferred_skill}</p>
                    <h3 className="mt-3 text-lg font-bold">Why you should Apply?</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.why_should_apply}</p>
                      
                    <h3 className="mt-3 text-lg font-bold">About {selectedJob?.company_name}</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.company_description}</p>
                    <p className="mb-2">Company Address: {selectedJob?.company_address}</p>
                </div>
            </div>
          </>
        ) : (
          <p>Please select a job</p>
        )}
      {/* </div> */}
    </>
  );
}

export default JobDetail;