'use client';

import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSearchParams, usePathname  } from 'next/navigation';
import { Suspense } from "react";
import { ApplicationStatus } from '../../lib/const'

function ApplicationDetail({ selectedApplication, handleBackButton, handleApplyButtonClick }) {

  return (
    <>
      {/* <div className="p-4 lg:w-2/3"> */}
        {selectedApplication ? (
          <>
            {/* <button className="sticky top-0 px-4 py-2 bg-white border-b" onClick={() => handleBackButton()}>Back</button> */}
            {/* <a onClick={() => handleBackButton()} 
                className="px-4 py-2 underline lg:hidden hover:cursor-pointer"
            >
                Back to Search Results for "PHP"
            </a> */}
            <div className="sticky top-0 flex-col items-center
              justify-between px-5 pb-10 h-[calc(100vh_-_200px)]
              overflow-auto bg-white border-b text-sm">
                <div className="flex-row md:flex-row-reverse md:flex">
                  <div className="flex w-full md:w-1/2">
                      <div className="pl-5 pt-13">
                        <h3 className="mt-3 text-sm">{selectedApplication?.email}</h3>
                      </div>
                  </div>
                  <div className="flex w-full md:w-1/2">
                    <div className="flex-row">
                      <h3 className="mt-3 text-sm font-bold">{selectedApplication?.name}</h3>
                      <h3 className="mt-3 text-sm text-gray-500 mb-4">Time Line</h3>
                      <div className="timeline text-sm">
                          <ol className="relative border-l border-gray-200 dark:border-gray-700 text-sm">
                          {selectedApplication.application_logs && selectedApplication.application_logs
                           && ApplicationStatus.STATUS_NEXT[selectedApplication.application_logs[selectedApplication.application_logs.length -1 ].status] 
                           && (
                              <li className="mb-10 ml-6">            
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                    <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
                                    <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"/>
                                    <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"/>
                                  </svg> */}
                                </span>
                                <h3 className="flex items-center mb-1 font-semibold text-green-700 dark:text-white">
                                  {ApplicationStatus.STATUS_NEXT[selectedApplication.application_logs[selectedApplication.application_logs.length -1 ].status]} 
                                  {/* <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">Latest</span> */}
                                </h3>
                                {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{ applicationLog.created_at } </time> */}
                                {/* {applicationLog.message && (
                                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                  {applicationLog.message}
                                  </p>
                                )} */}
                                
                                {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path>
                                  </svg>
                                    Refer again
                                </a> */}
                              </li>
                            )}
                            {selectedApplication.application_logs && selectedApplication.application_logs.map((applicationLog) => (
                                <>
                                  <li className="mb-10 ml-6">            
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                    
                                    {ApplicationStatus.STATUS_ICON[applicationLog.status] == 'y' ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                        <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
                                        <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"/>
                                      </svg>
                                    ) : (
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                        <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
                                        <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"/>
                                        <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"/>
                                      </svg>
                                    )}
                                    
                                    </span>
                                    <h3 className="flex items-center mb-1 font-semibold text-slate-600 dark:text-white">
                                      {ApplicationStatus.STATUS[applicationLog.status]} 
                                      {/* <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">Latest</span> */}
                                    </h3>
                                    <time className="block mb-2 font-normal leading-none text-gray-400 dark:text-gray-500">{ applicationLog.created_at } </time>
                                    {applicationLog.message && (
                                      <p className="mb-4 font-normal text-gray-500 dark:text-gray-400">
                                      {applicationLog.message}
                                      </p>
                                    )}
                                    
                                    {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path>
                                      </svg>
                                        Refer again
                                    </a> */}
                                </li>
                                </>
                            ))}
                            
                            <li className="ml-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                      <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
                                      <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"/>
                                    </svg>
                                </span>
                                <h3 className="mb-1 font-semibold text-gray-900 dark:text-white"> {ApplicationStatus.STATUS[ApplicationStatus.STATUS_SUBMITTED]}</h3>
                                <time className="block mb-2 font-normal leading-none text-gray-400 dark:text-gray-500">{selectedApplication.created_at}</time>
                                {/* <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p> */}
                            </li>
                        </ol>
                      </div>
                      
                  </div>
                  </div>
                </div>
                
                {selectedApplication.candidate.hashed_resume_name && <embed src={`http://localhost:3000/api/viewResume?id=` + selectedApplication.candidate.hashed_resume_name}
                  className='w-full min-w-[400px] h-[50vh]'/>}
                {/* <div className="sticky top-0 flex justify-between py-3 bg-white">
                  <h1 className="flex ml-2 text-2xl font-bold overflow-ellipsis clamp-2">{selectedApplication.title}</h1>
                  <div className="flex items-center gap-2" >
                    <button onClick={handleApplyButtonClick} className="hidden px-4 lg:px-12 py-2 font-bold text-white bg-green-700 rounded-full lg:block hover:bg-green-600">
                      Apply
                    </button>
                  </div>
                </div> */}



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
          <p>Please select a application</p>
        )}
      {/* </div> */}
    </>
  );
}

export default ApplicationDetail;