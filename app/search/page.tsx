
"use client"

import Image from 'next/image'
import styles from './page.module.css'
import Login from '../../components/Login'
import JobSearchList from '../../components/Job/JobSearchList'
import Script from 'next/script'
import { useState, useEffect, useRef } from 'react';

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

export default function SearchPage({ searchParams }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [showJobList, setShowJobList] = useState(true); 

  function handleClick(job) {
    setSelectedJob(job);
    setShowJobList(false);
  }

  function handleBackClick() {
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
<div className="flex-1 flex lg:flex-row flex-col">

      <div className={selectedJob ? "hidden lg:block lg:w-1/3" : "w-full lg:w-1/3"}>
        <ul>
          { jobs && jobs.map(job => (
            <li key={job.id} className="cursor-pointer hover:bg-gray-300" onClick={() => handleClick(job)}>
              {job.title}
            </li>
          ))}
        </ul>
      </div>


    {!showJobList &&  (
       <div className="lg:w-2/3 p-4">
        {selectedJob ? (
          <div>
            <button onClick={handleBackClick}>Back</button>
            <h2 className="sticky top-0 bg-white px-4 py-2 border-b">{selectedJob.title}</h2>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>
            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>

            <div className="px-4 py-2">cxcxcxc</div>
          </div>
        ) : (
          <p>Please select a job</p>
        )}
      </div>
        )}
  </div>

  </>
  )
}