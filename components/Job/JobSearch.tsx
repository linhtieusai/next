
"use client"

import Image from 'next/image'
import styles from './page.module.css'
import Login from '../../components/Login'
import Script from 'next/script'
import JobDetail  from '../../components/Job/JobDetail'
import { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react'
import JobDetailSkeleton from '../../ui/rendering-job-detail-skeleton'
import JobListSkeleton from '../../ui/rendering-job-list-skeleton'
import { usePathname, useSearchParams } from 'next/navigation';

import JobItem from '../../components/Job/JobItem';
import Pagination from '../../components/Job/Pagination'

// localhost:3000
import dynamic from 'next/dynamic'

import { PrismaClient } from "@prisma/client";

async function getFirstPage(page) {
  const jobs = await fetch(`http://localhost:3000/api/jobs?page=${page}&itemsPerPage=10`, { cache: 'no-store' });
  return await jobs.json();

  // const prisma = new PrismaClient();
  // const jobs = await prisma.job.findMany({take: 10, skip: (page-1) * 10});

  // await prisma.$disconnect()
  // return await jobs;
  

}


const ApplyScreen = dynamic(() => import('../../components/JobDetail/ApplyScreen'), {
  loading: () => <p>Loading...</p>,
})

export default function SearchPage({ firstPageData, moving }) {

  // console.log("search page job");
  // console.log(firstPage.jobs);

  const [selectedJob, setSelectedJob] = useState<any>(false);
  const [isModalOpening, setIsModalOpening] = useState(false);

  const [jobs, setJobs] = useState<any[]>(firstPageData.jobs);
  const [showJobList, setShowJobList] = useState(true); 

  const [isMoving, setIsMoving] = useState(moving);

  const [ totalPages, setTotalPages ] = useState(firstPageData.totalPages);
  const [currentPage, setCurrentPage] = useState(firstPageData.page);
  // useEffect(() => {
  //   setIsMoving(moving);
  // }, [moving]);

  const searchParams = useSearchParams();
  let page = Number(searchParams?.get("page"));

  const path = usePathname();

  const handleClick = (job) => {
    setSelectedJob(job);
    setShowJobList(false);
    addViewedJobToLocalStorage(job);
  }

  function addViewedJobToLocalStorage(job) {
    const viewedJobs = JSON.parse(localStorage.getItem("viewedJobs") ?? "[]");
    job.viewedTime = Date.now();
    viewedJobs.push(job);

    const viewedJobIds = JSON.parse(localStorage.getItem("viewedJobIds") ?? "[]");
    viewedJobIds[job.id] = 0;

    localStorage.setItem("viewedJobs", JSON.stringify(viewedJobs));
    localStorage.setItem("viewedJobIds", JSON.stringify(viewedJobIds));

  }

  // if(firstPage) {
  //   setJobs(firstPage.jobs);
  // }


  
  const callBackMethod = (totalPages, currentPage) => {
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
    setIsMoving(false);
  }

  const pageChangeCallback = () => {
    setIsMoving(true);
  }

  function handleBackButton() {

    setSelectedJob(null);
    setShowJobList(true);
  }

  function handleApplyButtonClick() {
    console.log("Apply button clicked");
    setIsModalOpening(true);
  }

  const closeModalCallBack = () => {
    setIsModalOpening(false);
  }

  useEffect(() => {
    if(path === "/" && !page) {
      //Home page
      page = 1;
    }

    // if(page != currentPage) {
    //   console.log(`Do fetch ${page}`)
    //   fetch(`http://localhost:3000/api/jobs?page=${page}&itemsPerPage=10`)
    //   .then(response => response.json())
    //   .then(data => {

    //     setJobs(data.jobs);
    //     callBackMethod(data.totalPages, data.page);

    //   })
    //   .catch(error => console.error(error));
    // }
    
    setJobs(firstPageData.jobs);
        callBackMethod(firstPageData.totalPages, firstPageData.page);

  }, [page, currentPage, firstPageData]);

  return (
   
<>
  <div className="flex flex-col flex-1 hidden px-5 py-10 lg:flex-row md:block">
    <h1 className="text-lg">Search results for <span className='font-bold'>"PHP"</span></h1>
  </div>
  <div className="flex flex-col flex-1 sm:pb-20 md:flex-row">
      <div className={`relative h-[calc(100vh_-_140px)] sm:h-[calc(100vh_-_170px)]  px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedJob ? "hidden md:flex" : "w-full"}`}>

      {/* {(isMoving || loading) ? "Movingggg" : "Not moving"} */}
      {/* {(isMoving) ? "Movingggg" : "Not moving"} */}

        <ul style={{ opacity: isMoving ? 0.5 : 1 }}>
              {jobs.length ? jobs.map((job) => (
                <JobItem key={job.id} job={job} handleOnClick={handleClick} isSelected={selectedJob && selectedJob.id === job.id}/>
              )) : (
                <>
                  <JobListSkeleton />
                </>
              )}

            {/* {isMoving && (
                <JobListSkeleton />
            )} */}
        </ul>

        {/* {isMoving && (
          <div className="absolute top-0 left-0 z-1 items-center flex justify-center w-full h-full">
            <div className="absolute top-0 left-0 z-1 w-full h-full bg-black opacity-20"></div>
            <div className="z-2">
              <svg
                className="w-8 h-8 mx-auto text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        )} */}
        {totalPages > 1 && currentPage && (
            <div className="sticky bottom-0 z-3 bg-white flex items-center justify-center w-full py-2 md:py-4">
                <Pagination pageChangeCallback={pageChangeCallback} data={ {totalPages: totalPages, page: currentPage }}  />
            </div>
        )}
        
        <div className="flex">
          Footer
        </div>
      </div>
      <div className="sm:p-4 md:w-2/3">
      {!showJobList &&  (
          <>
          <JobDetail selectedJob={selectedJob} handleBackButton={handleBackButton} handleApplyButtonClick={handleApplyButtonClick} />
          <ApplyScreen jobId={selectedJob?.id} isModalOpening={isModalOpening} closeModalCallBack={closeModalCallBack}/>
          <div className="sticky bottom-0 left-0 z-10 w-full p-4 bg-gray-100 border-t border-gray-200 sm:hidden">
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600" onClick={handleApplyButtonClick}>Apply</button>
              <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600" onClick={handleBackButton}>Back</button>
            </div>
          </div>
          </>
      )}
      </div>
  </div>

  </>
  )
}