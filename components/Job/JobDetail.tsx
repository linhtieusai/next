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
      <div className="p-4 lg:w-2/3">
        {selectedJob ? (
          <div>
            {/* <button className="sticky top-0 px-4 py-2 bg-white border-b" onClick={() => handleBackButton()}>Back</button> */}
            <a onClick={() => handleBackButton()} 
                className="px-4 py-2 underline lg:hidden hover:cursor-pointer"
            >
                Back to Search Results for "PHP"
            </a>
            <div className="sticky top-0 flex items-center justify-between px-4 py-10 bg-white border-b">
                <h1 className="max-w-full ml-2 overflow-hidden text-2xl font-bold overflow-ellipsis clamp-2">{selectedJob.title}</h1>
                <div className="flex items-center justify-between gap-2">
                  <button className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-600">
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
            <div className="flex-grow pt-16 pl-5 overflow-scroll ">
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
        ) : (
          <p>Please select a job</p>
        )}
      </div>
    </>
  );
}

export default JobDetail;