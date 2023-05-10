
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

import JobItem from '../../components/Job/JobItem';
import { usePathname, useSearchParams } from 'next/navigation';
// import Pagination from '../../components/Job/Pagination'
import dynamic from 'next/dynamic'
import { Pagination } from '@mui/material';
// localhost:3000

import { PrismaClient } from "@prisma/client";

async function getViewedJobFromLocalStorage(page) {
  const perPage = 10;
  let jobViewHistory = JSON.parse(localStorage.getItem("jobViewHistory") ?? "[]");

  jobViewHistory = jobViewHistory.reverse();

  if(!page) page = 1;

  console.log(Math.ceil(jobViewHistory.length / perPage));
  return {
    jobs: jobViewHistory.slice((page - 1) * perPage, page * perPage) ?? [],
    totalPages: Math.ceil(jobViewHistory.length / perPage),
    page: page
  }
}


const ApplyScreen = dynamic(() => import('../../components/JobDetail/ApplyScreen'), {
  loading: () => <p>Loading...</p>,
})



export default function ViewedJobPage({ searchParams }) {

  

  // console.log("search page job");
  // console.log(firstPage.jobs);

  const [selectedJob, setSelectedJob] = useState<any>(false);
  const [isModalOpening, setIsModalOpening] = useState(false);

  const [jobData, setJobData] = useState<any[]>([]);
  const [jobViewHistory, setJobViewHistory] = useState<any[]>();

  const [showJobList, setShowJobList] = useState(true); 
  const [isMoving, setIsMoving] = useState(false);

  let page = searchParams.page;
  if(!page) page = 1;

  console.log(page);

  const [ totalPages, setTotalPages ] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  const [followedJobs, setFollowedJobs] = useState<any[]>([]);


  const handleClick = (job) => {
    setSelectedJob(job);
    setShowJobList(false);
  }

  // if(firstPage) {
  //   setJobs(firstPage.jobs);
  // }

  const path = usePathname();
  

  const handleFollowButtonClick = (job, isFollowed) => {
    if(isFollowed) {
      doUnfollowJob(job);
    } else {
      addFollowedJobToLocalStorage(job);
    }
  }

  function doUnfollowJob(job) {
    const followedJobs = JSON.parse(localStorage.getItem("followedJobs") ?? "{}");
    delete followedJobs[job.id];

    localStorage.setItem("followedJobs", JSON.stringify(followedJobs));
    setFollowedJobs(followedJobs);
  }

  function addFollowedJobToLocalStorage(job) {
    const followedJobs = JSON.parse(localStorage.getItem("followedJobs") ?? "{}");
    followedJobs[job.id] = true;

    localStorage.setItem("followedJobs", JSON.stringify(followedJobs));
    setFollowedJobs(followedJobs);
  }
  
  function handleBackButton() {

    setSelectedJob(null);
    setShowJobList(true);
  }

  const callBackMethod = (totalPages, currentPage) => {
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
  }

  function handleApplyButtonClick() {
    console.log("Apply button clicked");
    setIsModalOpening(true);
  }

  const closeModalCallBack = () => {
    setIsModalOpening(false);

  }

  // if(path === "/" && !page) {
  //   //Home page
  //   page = 1;
  // }

  const handleChangePage = (event, value) => {
    setIsMoving(true);
    setCurrentPage(value);
  }

  useEffect(() => {
    // if(page > 1) {
    //   fetch(`http://localhost:3000/api/jobs?page=${page}&itemsPerPage=10`)
    //   .then(response => response.json())
    //   .then(data => setJobs(data.jobs))
    //   .catch(error => console.error(error));

    //   setJobs(getViewedJobFromLocalStorage(page));
    // }

    console.log("go use effect");
    // if(page != currentPage) {
      console.log("go here");
      getViewedJobFromLocalStorage(currentPage)
      .then(data => {
        setJobViewHistory(data.jobs);

        const jobData = JSON.parse(localStorage.getItem("viewedJobs") ?? "[]");
        setJobData(jobData);

        callBackMethod(data.totalPages, data.page);
        const followedJobs = JSON.parse(localStorage.getItem("followedJobs") ?? "[]");
        setFollowedJobs(followedJobs);
      });
  // }
    
    //setJobs(await getViewedJobFromLocalStorage(page));

  }, [currentPage]);


  return (
<>
  <div className="flex flex-col flex-1 px-5 py-5">
    <h1 className="text-lg font-bold">Viewed Jobs</h1>
  </div>
  <div className="flex flex-col flex-1 pb-[15px] sm:pb-20 md:flex-row">
      <div className={`relative h-[calc(100vh_-_180px)] sm:h-[calc(100vh_-_180px)]  px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedJob ? "hidden md:flex" : "w-full"}`}>

      {/* {(isMoving || loading) ? "Movingggg" : "Not moving"} */}
      {/* {(isMoving) ? "Movingggg" : "Not moving"} */}

        {/* <ul style={{ opacity: isMoving ? 0.5 : 1 }}> */}
        <ul>
            {jobViewHistory
              ?
              <>
                {jobViewHistory.length ? jobViewHistory.map((jobHistory, index) => (
                  <JobItem isViewed={0} isFollowed={followedJobs[jobHistory.id]} key={index} 
                  job={jobData[jobHistory.id]} handleOnClick={handleClick}
                  viewedTime={jobHistory.viewedTime}
                  isSelected={selectedJob && selectedJob.id === jobHistory.id}/>
                )) : (
                  <>
                    <p>Không có lịch sử xem</p>
                  </>
                )}
              </>
              
             : <JobListSkeleton />
            }
              

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

        <div className="sticky bottom-0 z-3 bg-white flex items-center justify-center w-full py-2 md:py-4">
          {totalPages > 1 && currentPage && (
            <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} shape="rounded" />

            // <Pagination pageChangeCallback={() => {}} data={ {totalPages: totalPages, page: currentPage }}  />
          )}
        </div>
        <div className="flex">
          Footer
        </div>
      </div>
      <div className="sm:p-4 md:w-2/3">
      {!showJobList &&  (
          <>
          <JobDetail selectedJob={selectedJob} isFollowed={followedJobs[selectedJob.id]}
          handleFollowButtonClick={handleFollowButtonClick}
          handleBackButton={handleBackButton} handleApplyButtonClick={handleApplyButtonClick} />
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