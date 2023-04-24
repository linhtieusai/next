
"use client"

import Image from 'next/image'
import styles from './page.module.css'
import Login from '../../components/Login'
import Script from 'next/script'
import JobDetail  from '../../components/Job/JobDetail'
import { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react'
import JobDetailSkeleton from '../../ui/rendering-job-detail-skeleton'

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

export default function SearchPage({ searchParams }) {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpening, setIsModalOpening] = useState(false);

  const [jobs, setJobs] = useState<any[]>([]);
  const [showJobList, setShowJobList] = useState(true); 

  const handleClick = (job) => {
    console.log("handle click");

    setSelectedJob(job);
    setShowJobList(false);
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
    fetch('http://localhost:3000/api/jobs?page=1&itemsPerPage=10')
      .then(response => response.json())
      .then(data => setJobs(data.jobs))
      .catch(error => console.error(error));
  }, []);


  // const firstPage = {jobs: jobs.jobs, totalPages: 10}
  const firstPage = {jobs: jobs, totalPages: 10}

  return (
<>
  <div className="flex flex-col flex-1 hidden px-5 py-10 lg:flex-row md:block">
    <h1 className="text-lg">Search results for <span className='font-bold'>"PHP"</span></h1>
  </div>
  <div className="flex flex-col flex-1 pb-20 lg:flex-row">
      <div className={selectedJob ? "hidden lg:block lg:w-1/3" : "w-full lg:w-1/3"}>
        <ul>
          <Suspense fallback={<JobDetailSkeleton />}>
          {jobs && jobs.map((job) => (
            <JobItem key={job.id} job={job} handleOnClick={handleClick} isSelected={selectedJob && selectedJob.id === job.id}/>
          ))}
          </Suspense>
        </ul>
      </div>  
      {!showJobList &&  (
          <>
          <JobDetail selectedJob={selectedJob} handleBackButton={handleBackButton} handleApplyButtonClick={handleApplyButtonClick} />
          <ApplyScreen jobId={selectedJob?.id} isModalOpening={isModalOpening} closeModalCallBack={closeModalCallBack}/>
          <div className="sticky w-full p-4 bg-gray-100 border-t border-gray-200 sm:hidden bottom-20 ">
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600" onClick={handleApplyButtonClick}>Apply</button>
              <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600" onClick={handleBackButton}>Back</button>
            </div>
          </div>
          </>
          
      )}
  </div>

  </>
  )
}