
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
import { useSession } from "next-auth/react";

const ApplyScreen = dynamic(() => import('../../components/JobDetail/ApplyScreen'), {
  loading: () => <p>Loading...</p>,
})

export default function FollowedJobPage({ searchParams }) {

  const [selectedJob, setSelectedJob] = useState<any>(false);
  const [isModalOpening, setIsModalOpening] = useState(false);

  const [jobData, setJobData] = useState<any[]>([]);
  const [followedJobs, setFollowedJobs] = useState<any[]>();

  const [showJobList, setShowJobList] = useState(true); 
  const [isMoving, setIsMoving] = useState(false);

  let page = searchParams.page;
  if(!page) page = 1;

  console.log(page);

  const [ totalPages, setTotalPages ] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  const { data: session, status } = useSession();
  
async function getFollowedJobs(page) {
  if(session) {
    return getFollowedJobFromServer(page);
  } else {
    return getFollowedJobFromLocalStorage(page);
  }
}

async function getFollowedJobFromLocalStorage(page) {
  const perPage = 10;
  let followedJobs = JSON.parse(localStorage.getItem("followedJobs") ?? "[]");

  console.log(followedJobs);
  //get key and make array of key
  followedJobs = Object.keys(followedJobs);
  followedJobs = followedJobs.reverse();
  console.log("get from local");

  if(!page) page = 1;

  console.log(Math.ceil(followedJobs.length / perPage));
  return {
    jobs: followedJobs.slice((page - 1) * perPage, page * perPage) ?? [],
    totalPages: Math.ceil(followedJobs.length / perPage),
    page: page
  }
}

async function getFollowedJobFromServer(page) {
  const perPage = 10;
  if(!page) page = 1;

  console.log("get from server");
  const data = await fetch(`http://localhost:3000/api/followedJobs?page=${page}`);

  console.log(data);
  return data.json();
}

  const handleClick = (job) => {
    setSelectedJob(job);
    setShowJobList(false);
  }

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
    currentPage = parseInt(currentPage);
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
  }

  function handleApplyButtonClick() {
    setIsModalOpening(true);
  }

  const closeModalCallBack = () => {
    setIsModalOpening(false);
  }

  const handleChangePage = (event, value) => {
    setIsMoving(true);
    setCurrentPage(value);
  }

  const getJobData = (jobData) => {
    if(session) {
      let followedData = {};
      for (const job of jobData) {
        followedData[job.job_id] = job.job;
      }

      return followedData;
    } else {
      return JSON.parse(localStorage.getItem("viewedJobs") ?? "[]");
    }
  }

  function handleApplyButtonClick(jobId) {
    setIsModalOpening(true);

    fetch(`http://localhost:3000/api/presubmit?jobId=${jobId}`)
      .then(response => response.json())
      .then(data => {
        setPresubmitInfo(data);
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    console.log("go use effect");
    getFollowedJobs(currentPage)
    .then(data => {

      console.log("console log data");
      console.log(data);
      
      if(session) {
        let followedId = [];
        for (const job of data.jobs) {
          followedId.push(job.job_id);
        }

        setFollowedJobs(followedId);
      } else {
        setFollowedJobs(data.jobs);
      }

      console.log("result");


      const jobData = getJobData(data.jobs);
      console.log("jobData");
      console.log(jobData);
      setJobData(jobData);

      console.log(JSON.parse(localStorage.getItem("followedJobs") ?? "[]"));

      callBackMethod(data.totalPages, data.page);

      console.log("followedjob");
      console.log(followedJobs);
    });
    
  }, [page, currentPage]);


  return (
<>
  <div className="flex flex-col flex-1 px-5 py-5">
    <h1 className="text-lg font-bold">Followed Jobs</h1>
  </div>
  <div className="flex flex-col flex-1 pb-[15px] md:flex-row">
      <div className={`relative h-[calc(100vh_-_180px)] sm:h-[calc(100vh_-_180px)]  px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedJob ? "hidden md:flex" : "w-full"}`}>

      {/* {(isMoving || loading) ? "Movingggg" : "Not moving"} */}
      {/* {(isMoving) ? "Movingggg" : "Not moving"} */}

        {/* <ul style={{ opacity: isMoving ? 0.5 : 1 }}> */}
        <ul>
            {followedJobs
              ?
              <>
                {followedJobs.length ? followedJobs.map((jobId) => (
                  <JobItem isViewed={0} isFollowed={true} key={jobId} 
                  job={jobData[jobId]} handleOnClick={handleClick}
                  //viewedTime={jobHistory.viewedTime}
                  isSelected={selectedJob && selectedJob.id === jobId}/>
                )) : (
                  <>
                    <p>Không có dữ liệu </p>
                  </>
                )}
              </>
              
             : <JobListSkeleton />
            }
        </ul>

        <div className="sticky bottom-0 z-3 bg-white flex items-center justify-center w-full py-2 md:py-4">
          {totalPages > 1 && currentPage && (
            <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} shape="rounded" />
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