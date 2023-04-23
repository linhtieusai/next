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
      <div className="lg:w-2/3 p-4">
        {selectedJob ? (
          <div>
            {/* <button className="sticky top-0 bg-white px-4 py-2 border-b" onClick={() => handleBackButton()}>Back</button> */}
            <a onClick={() => handleBackButton()} 
                className="lg:hidden hover:cursor-pointer py-2 px-4 underline"
            >
                Back to Search Results for "PHP"
            </a>
            <div className="flex items-center sticky top-0 bg-white px-4 py-10 border-b justify-between">
                <h1 className="text-2xl font-bold ml-2 overflow-hidden overflow-ellipsis max-w-full clamp-2">{selectedJob.title}</h1>
                <div className="flex items-center justify-between gap-2">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 inline-block">
                      <path d="M20.84 4.76a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-.9a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span  className="ml-2 hidden md:inline-block">Save</span>
                 </button>
                  <button onClick={handleApplyButtonClick} className="hidden lg:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                    Apply
                  </button>
                </div>
                
            </div>
            <div className="flex-grow pt-16 pl-5">
              <h3 className="text-lg font-bold mt-3">Required Skill</h3>
              <p className="whitespace-pre-wrap pl-4">{selectedJob?.job_required_skill}</p>
              {/* <h3 className="text-lg font-bold">Job overview</h3>
              <p className="whitespace-pre-wrap">{selectedJob?.overview}</p> */}
              <h3 className="text-lg font-bold  mt-3">Job Responsibilites</h3>
              <p className="whitespace-pre-wrap pl-4">{selectedJob?.job_responsibility}</p>
                
             
              <h3 className="text-lg font-bold   mt-3">Preferred</h3>
              <p className="whitespace-pre-wrap pl-4">{selectedJob?.preferred_skill}</p>
              <h3 className="text-lg font-bold  mt-3">Why you should Apply?</h3>
              <p className="whitespace-pre-wrap pl-4">{selectedJob?.why_should_apply}</p>
                
              <h3 className="text-lg font-bold  mt-3">About {selectedJob?.company_name}</h3>
              <p className="whitespace-pre-wrap pl-4">{selectedJob?.company_description}</p>
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