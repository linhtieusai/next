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
            {/* <a onClick={() => handleBackButton()} 
                className="px-4 py-2 underline lg:hidden hover:cursor-pointer"
            >
                Back to Search Results for "PHP"
            </a> */}
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
                    <button onClick={handleApplyButtonClick} className="hidden px-4 lg:px-12 py-2 font-bold text-white bg-green-700 rounded-full lg:block hover:bg-green-600">
                      Apply
                    </button>
                  </div>
                </div>
               
                <div className="pl-5 pt-13">
                    <h3 className="mt-3 text-lg font-bold">Required Skill</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.job_required_skill}</p>
                    <h3 className="mt-3 text-lg font-bold">Preferred</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.preferred_skill}</p>
                    {/* <h3 className="text-lg font-bold">Job overview</h3>
                    <p className="whitespace-pre-wrap">{selectedJob?.overview}</p> */}
                    <h3 className="mt-3 text-lg font-bold">Job Responsibilites</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.job_responsibility}</p>
                      
                  
                    
                    <h3 className="mt-3 text-lg font-bold">Why you should Apply?</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.why_should_apply}</p>
                    <hr className="my-4"></hr>
                    <h3 className="mt-3 text-lg font-bold">About {selectedJob?.company_name}</h3>
                    <p className="pl-4 whitespace-pre-wrap">{selectedJob?.company_description}</p>
                    <p className="mb-2">Company Address: {selectedJob?.company_address}</p>
                </div>

                <button onClick={handleApplyButtonClick} className="flex fixed hover:opacity-100 opacity-70 bottom-[170px] md:bottom-[50px] right-[5vh] px-4 lg:px-12 py-2 font-bold text-white bg-purple-700 rounded-full hover:bg-purple-800">
                  <svg className="w-6 h-6 text-gray-400 hover:text-green-400 hover:cursor-pointer mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 58 58" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <g xmlns="http://www.w3.org/2000/svg">
                        <path style={{ fill: "#FFFFFF"}} d="M39.767,25.913c-0.354,0-0.696-0.188-0.878-0.519c-2.795-5.097-8.115-8.679-13.883-9.349   c-0.549-0.063-0.941-0.56-0.878-1.108c0.063-0.548,0.558-0.942,1.108-0.878c6.401,0.743,12.304,4.718,15.406,10.373   c0.266,0.484,0.088,1.092-0.396,1.358C40.094,25.873,39.929,25.913,39.767,25.913z"/>
                        <path style={{ fill: "#FFFFFF"}} d="M0,58l4.042-12.125c-2.05-3.45-3.231-7.476-3.231-11.78C0.81,21.34,11.15,11,23.905,11   S47,21.34,47,34.095S36.66,57.19,23.905,57.19c-3.881,0-7.535-0.961-10.745-2.653L0,58z"/>
                        <path style={{ fill: "gray"}} d="M23.905,11C36.66,11,47,21.34,47,34.095c0,3.378-0.731,6.583-2.034,9.475L58,47l-4.042-12.125   c2.05-3.45,3.231-7.476,3.231-11.78C57.19,10.34,46.85,0,34.095,0c-9.426,0-17.528,5.65-21.118,13.746   C16.231,11.995,19.951,11,23.905,11z"/>
                      </g>            
                  </svg>
                  Chat với Công ty
                </button>
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