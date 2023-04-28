
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

// localhost:3000

import { PrismaClient } from "@prisma/client";

async function getFirstPage(page) {
  const jobs = await fetch(`http://localhost:3000/api/jobs?page=${page}&itemsPerPage=10`, { cache: 'no-store' });
  return await jobs.json();

  // const prisma = new PrismaClient();
  // const jobs = await prisma.job.findMany({take: 10, skip: (page-1) * 10});

  // await prisma.$disconnect()
  // return await jobs;
  

}

import dynamic from 'next/dynamic'

const ApplyScreen = dynamic(() => import('../../components/JobDetail/ApplyScreen'), {
  loading: () => <p>Loading...</p>,
})

export default function SearchPage({ firstPage, page }) {

  // console.log("search page job");
  // console.log(firstPage.jobs);

  const [selectedJob, setSelectedJob] = useState<any>(false);
  const [isModalOpening, setIsModalOpening] = useState(false);

  const [jobs, setJobs] = useState<any[]>(firstPage.jobs);
  const [showJobList, setShowJobList] = useState(true); 

  const handleClick = (job) => {
    console.log("handle click");

    setSelectedJob(job);
    setShowJobList(false);
  }

  // if(firstPage) {
  //   setJobs(firstPage.jobs);
  // }
  
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
    if(page > 1) {
      fetch(`http://localhost:3000/api/jobs?page=${page}&itemsPerPage=10`)
      .then(response => response.json())
      .then(data => setJobs(data.jobs))
      .catch(error => console.error(error));
    }
    
  }, [page]);


  // console.log("jobs is");
  // console.log(jobs);

  // const firstPage = {jobs: jobs.jobs, totalPages: 10}


  return (
<>
  <div className="flex flex-col flex-1 hidden px-5 py-10 lg:flex-row md:block">
    <h1 className="text-lg">Search results for <span className='font-bold'>"PHP"</span></h1>
  </div>
  <div className="flex flex-col flex-1 sm:pb-20 md:flex-row">
      <div className={`h-[calc(100vh_-_170px)] sm:h-[calc(100vh_-_200px)] px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedJob ? "hidden md:flex" : "w-full"}`}>
        <ul>
          {jobs.length ? jobs.map((job) => (
            <JobItem key={job.id} job={job} handleOnClick={handleClick} isSelected={selectedJob && selectedJob.id === job.id}/>
          )) : (
            <>
              <JobListSkeleton />
            </>
          )}
        </ul>
        <p>Pagination</p>
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