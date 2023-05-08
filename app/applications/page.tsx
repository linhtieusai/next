
"use client"


import Image from 'next/image'
import styles from './page.module.css'
import Login from '../../components/Login'
import Script from 'next/script'
import ApplicationDetail  from '../../components/Application/ApplicationDetail'

import { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react'
import ApplicationDetailSkeleton from '../../ui/rendering-job-detail-skeleton'
import ApplicationListSkeleton from '../../ui/rendering-job-list-skeleton'

import ApplicationItem from '../../components/Application/ApplicationItem';

// localhost:3000

import { PrismaClient } from "@prisma/client";

async function getFirstPage(page) {
  const applications = await fetch(`http://localhost:3000/api/applications?page=${page}&itemsPerPage=10`, { cache: 'no-store' });
  return await applications.json();

  // const prisma = new PrismaClient();
  // const applications = await prisma.job.findMany({take: 10, skip: (page-1) * 10});

  // await prisma.$disconnect()
  // return await applications;
  

}

// import dynamic from 'next/dynamic'

// const ApplyScreen = dynamic(() => import('../../components/ApplicationDetail/ApplyScreen'), {
//   loading: () => <p>Loading...</p>,
// })



export default function SearchPage() {

  // console.log("search page job");
  // console.log(firstPage.applications);

  const [selectedApplication, setSelectedApplication] = useState<any>(false);
  const [isModalOpening, setIsModalOpening] = useState(false);

  const [applications, setApplications] = useState<any[]>([]);
  const [showApplicationList, setShowApplicationList] = useState(true); 

  const handleClick = (job) => {
    console.log("handle click");

    setSelectedApplication(job);
    setShowApplicationList(false);
  }

  // if(firstPage) {
  //   setApplications(firstPage.applications);
  // }

  const page = 1;
  
  function handleBackButton() {

    setSelectedApplication(null);
    setShowApplicationList(true);
  }

  function handleApplyButtonClick() {
    console.log("Apply button clicked");
    setIsModalOpening(true);
  }

  const closeModalCallBack = () => {
    setIsModalOpening(false);

  }

  useEffect(() => {
    if(page > 0) {
      fetch(`http://localhost:3000/api/applications?page=${page}&itemsPerPage=10`)
      .then(response => response.json())
      .then(data => setApplications(data.applications))
      .catch(error => console.error(error));
    }
    
  }, [page]);


  // console.log("applications is");
  // console.log(applications);

  // const firstPage = {applications: applications.applications, totalPages: 10}


  return (
<>
  <div className="flex flex-col flex-1 hidden px-5 py-10 lg:flex-row md:block">
    <h1 className="text-lg">Search results for <span className='font-bold'>"PHP"</span></h1>
  </div>
  <div className="flex flex-col flex-1 sm:pb-20 md:flex-row">
      <div className={`h-[calc(100vh_-_170px)] sm:h-[calc(100vh_-_200px)] px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedApplication ? "hidden md:flex" : "w-full"}`}>
        <ul>
          {applications.length ? applications.map((job) => (
            <ApplicationItem key={job.id} job={job} handleOnClick={handleClick} isSelected={selectedApplication && selectedApplication.id === job.id}/>
          )) : (
            <>
              <ApplicationListSkeleton />
            </>
          )}
        </ul>
        <p>Pagination</p>
      </div>
      <div className="sm:p-4 md:w-2/3">
      {!showApplicationList &&  (
          <>
          <ApplicationDetail selectedApplication={selectedApplication} handleBackButton={handleBackButton} handleApplyButtonClick={handleApplyButtonClick} />
          <ApplyScreen jobId={selectedApplication?.id} isModalOpening={isModalOpening} closeModalCallBack={closeModalCallBack}/>
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