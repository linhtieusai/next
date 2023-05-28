
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
import Link from 'next/link';
// localhost:3000
import dynamic from 'next/dynamic'
import Router  from 'next/router';
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

  const [viewedJobs, setViewedJobs] = useState<any[]>([]);
  const [followedJobs, setFollowedJobs] = useState<any[]>([]);

  const jobListRef = useRef(null);
  const scrollToFirstChild = () => {
    if(jobListRef.current) {
      jobListRef.current.firstChild.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [presubmitInfo, setPresubmitInfo] = useState<any>(false);
  
  // useEffect(() => {
  //   setIsMoving(moving);
  // }, [moving]);

  const searchParams = useSearchParams();
  let page = Number(searchParams?.get("page"));

  // const router = useRouter();

  const path = usePathname();

  const handleJobItemClick = (job) => {
    setSelectedJob(job);
    setShowJobList(false);
    addViewedJobToLocalStorage(job);
    addViewedJobToServer(job);
  }

  function addViewedJobToServer(job) {
    fetch(`http://localhost:3000/api/addViewedJob?jobId=${job.id}`)
      .then(response => response.json())
      .then(data => {
        // setPresubmitInfo(data);
      })
      .catch(error => console.error(error));

    const followedJobs = JSON.parse(localStorage.getItem("followedJobs") ?? "{}");
    followedJobs[job.id] = true;

    localStorage.setItem("followedJobs", JSON.stringify(followedJobs));
    setFollowedJobs(followedJobs);
  }

  if (process.browser) {
    window.onbeforeunload = () => {
      // your callback
      console.log(222);
    }
  }

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


  function addViewedJobToLocalStorage(job) {
    const viewedJobs = JSON.parse(localStorage.getItem("viewedJobs") ?? "{}");
    let cloneJob:any = {...job};
    cloneJob.viewedTime = Date.now();
    viewedJobs[job.id] = cloneJob;
    localStorage.setItem("viewedJobs", JSON.stringify(viewedJobs));
    setViewedJobs(viewedJobs);

    const jobViewHistory  = JSON.parse(localStorage.getItem("jobViewHistory") ?? "[]");
    jobViewHistory.push( { id: job.id, viewedTime: Date.now() });
    localStorage.setItem("jobViewHistory", JSON.stringify(jobViewHistory));
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
    scrollToFirstChild();
  }

  function handleBackButton() {

    setSelectedJob(null);
    setShowJobList(true);
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

    const viewedJobs = JSON.parse(localStorage.getItem("viewedJobs") ?? "[]");
    setViewedJobs(viewedJobs);

    const followedJobs = JSON.parse(localStorage.getItem("followedJobs") ?? "[]");
    setFollowedJobs(followedJobs);

  }, [page, currentPage, firstPageData]);

  return (
   
<>
  <div className="text-xs flex flex-col flex-1 hidden px-5 py-10 lg:flex-row md:block">
    <span className="text-gray-400 mr-2">Địa điểm</span>
    <button className="mr-2 px-2 py-1 text-xs border rounded-full text-slate-600 border-slate-300  hover:bg-emerald-100 hover:bg-gray-100">
        All
    </button>
    <button className="mr-2 px-2 py-1 text-xs border rounded-full text-slate-600 border-slate-300  hover:bg-emerald-100 hover:bg-gray-100">
        Ha Noi
    </button>
    <button className="mr-2 px-2 py-1 text-xs border rounded-full text-slate-600 border-slate-300 hover:bg-emerald-100 hover:bg-gray-100">
        Đà Nẵng
    </button>
    <button className="mr-2 px-2 py-1 text-xs border rounded-full text-slate-600 border-slate-300 hover:bg-emerald-100 hover:bg-gray-100">
        HCM
    </button>
  </div>
  <div className="flex flex-col flex-1 md:flex-row">
      <div className={`relative h-[calc(100vh_-_140px)] sm:h-[calc(100vh_-_170px)] md:w-1/3 flex-col  overflow-auto 
        ${selectedJob ? "hidden md:flex" : "w-full"}`}
      >

      {/* {(isMoving || loading) ? "Movingggg" : "Not moving"} */}
      {/* {(isMoving) ? "Movingggg" : "Not moving"} */}

        <div ref={jobListRef} className={`px-4 sm:px-4 ${isMoving ? 'opacity-50' : 'opacity-100'}`}>
              {jobs.length ? jobs.map((job) => (
                <JobItem key={job.id} job={job} isViewed={viewedJobs[job.id]} 
                  handleOnClick={handleJobItemClick}
                  isFollowed={followedJobs[job.id]} 
                  isSelected={selectedJob && selectedJob.id === job.id}/>
              )) : (
                <>
                  <JobListSkeleton />
                </>
              )}

        {isMoving && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-green-200 opacity-20"></div>
            <div className="z-20">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
                <div className="h-9 w-9 rounded-full "></div>
              </div>
            </div>
          </div>
        )}
        </div>

        

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
        
        <div className="flex-col text-sm mb-4 px-4">
          <Link className='text-gray-400' href="dieu-khoan">Điều khoản </Link>
          <div className='text-slate-600 flex justify-center items-center'>ViecThom © 2023</div>
        </div>
      </div>
      <div className="sm:p-4 md:w-2/3">
      {!showJobList &&  (
          <>
          <JobDetail selectedJob={selectedJob} 
            handleBackButton={handleBackButton} handleApplyButtonClick={() => handleApplyButtonClick(selectedJob.id)}
            isFollowed={followedJobs[selectedJob.id]}
            handleFollowButtonClick={handleFollowButtonClick}
          />
          <ApplyScreen presubmitInfo={presubmitInfo} jobId={selectedJob?.id} isModalOpening={isModalOpening} closeModalCallBack={closeModalCallBack}/>
            <div className="sticky bottom-0 left-0 w-full p-4 bg-gray-100 border-t border-gray-200 sm:hidden">
              <div className="flex items-center justify-between">
                <button className="px-8 py-2 font-bold text-white bg-green-600 rounded-full hover:opacity-80" onClick={handleApplyButtonClick}>Apply</button>
                <button className="px-8 py-2 font-bold text-white bg-gray-500 rounded-full hover:opacity-80" onClick={handleBackButton}>Back</button>
              </div>
            </div>
          </>
      )}
      </div>
  </div>

  </>
  )
}