
"use client"

import Image from 'next/image'
import styles from './page.module.css'
import Login from '../../components/Login'
import JobSearchList from '../../components/Job/JobSearchList'
import Script from 'next/script'
import JobDetail  from '../../components/Job/JobDetail'
import { useState, useEffect, useRef } from 'react';

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
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
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
  <div className="flex-1 flex lg:flex-row flex-col px-5 py-10">
    <h1 className="text-lg">Search results for "PHP"</h1>
  </div>
  <div className="flex-1 flex lg:flex-row flex-col">
      <div className={selectedJob ? "hidden lg:block lg:w-1/3" : "w-full lg:w-1/3"}>
        <ul>
          {jobs && jobs.map((job) => (
            <JobItem key={job.id} job={job} handleOnClick={handleClick} isSelected={selectedJob && selectedJob.id === job.id}/>
          ))}
        </ul>
      </div>  
      {!showJobList &&  (
          <>
          <JobDetail selectedJob={selectedJob} handleBackButton={handleBackButton} />
          <ApplyScreen jobId={selectedJob?.id} />
          </>
          
      )}
  </div>

  </>
  )
}