
"use client"


import Image from 'next/image'
import styles from './page.module.css'
import Login from '../../components/Login'
import Script from 'next/script'
import ApplicationDetail  from '../../components/Application/ApplicationDetail'

import { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react'
// import ApplicationDetailSkeleton from '../../ui/rendering-application-detail-skeleton'
import JobListSkeleton from '../../ui/rendering-job-list-skeleton'
import JobDetailSkeleton from '../../ui/rendering-job-detail-skeleton'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Pagination from '../../components/Job/Pagination'

import ApplicationItem from '../../components/Application/ApplicationItem';

// localhost:3000

import { PrismaClient } from "@prisma/client";

async function getFirstPage(page) {
  const applications = await fetch(`http://localhost:3000/api/applications?page=${page}&itemsPerPage=10`, { cache: 'no-store' });
  return await applications.json();

  // const prisma = new PrismaClient();
  // const applications = await prisma.application.findMany({take: 10, skip: (page-1) * 10});

  // await prisma.$disconnect()
  // return await applications;
  

}

// import dynamic from 'next/dynamic'

// const ApplyScreen = dynamic(() => import('../../components/ApplicationDetail/ApplyScreen'), {
//   loading: () => <p>Loading...</p>,
// })



export default function SearchPage({ searchParams }) {


  const [selectedApplication, setSelectedApplication] = useState<any>(false);
  const [isModalOpening, setIsModalOpening] = useState(false);

  const [applicationData, setApplicationData] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>();

  const [showApplicationList, setShowApplicationList] = useState(true); 

  let page = searchParams.page;
  if(!page) page = 1;
  

  const [ totalPages, setTotalPages ] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [isMoving, setIsMoving] = useState(false);

  const [followedApplications, setFollowedApplications] = useState<any[]>([]);

  const pageChangeCallback = () => {
    setIsMoving(true);
  }
  const handleClick = (application) => {
    setSelectedApplication(application);
    setShowApplicationList(false);
  }

  // if(firstPage) {
  //   setApplications(firstPage.applications);
  // }

  const path = usePathname();
  const router = useRouter();
  
  function handleBackButton() {

    setSelectedApplication(null);
    setShowApplicationList(true);
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

  const currentPath = usePathname();


  const handleFilterStatus = (status) => {
    console.log(searchParams);
    // if(searchParams) {
      const params = new URLSearchParams(searchParams);
      params.set('status', status);
      if(!searchParams.page) {
        params.set('page', page);
      }

    // }
    const newPath = `${currentPath}?${params.toString()}`;
    router.push(newPath);
  };

  useEffect(() => {
    // let page = searchParams.page;
    // let status = searchParams.status;

    // let apiUrl = `http://localhost:3000/api/applications?${searchParams.toString()}`;

    const params = new URLSearchParams(searchParams);
    params.set("page", page)
    let apiUrl = `http://localhost:3000/api/applications?${params.toString()}`;

    console.log("dddddddddd");
    if(page > 0) {
      fetch(apiUrl)
      .then(response => response.json())
      .then(data =>  {
          callBackMethod(data.totalPages, data.page);
          setApplications(data.applications);
        }).catch(error => {
          console.error(error)
        });
    }
    
  }, [page, searchParams]);


  // console.log("applications is");
  // console.log(applications);

  // const firstPage = {applications: applications.applications, totalPages: 10}


  return (
<>
  <div className="flex flex-col flex-1 hidden px-5 py-10 lg:flex-row md:block">
    <h1 className="text-lg">Your refer list</h1>
  </div>
  <div className="flex px-5 py-10">
     <div className="flex items-center justify-start flex-1 ">
          <div className="hidden sm:flex items-center w-1/3 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" name="name" placeholder="Search Email / Name"
                  className="w-full py-2 border-b-2 border-gray-400 outline-none focus:border-green-600" />
          </div>
      </div>
      <div className="flex items-center justify-center  ">
          <span> Filter by Status </span>
          <button onClick={() => handleFilterStatus(1)} className="bg-red-500 rounded-full px-4 py-2 text-gray-100 mr-2 text-sm hover:cursor-pointer hover:opacity-80">Đang chờ duyệt </button>
          <button onClick={() => handleFilterStatus(2)} className="bg-green-500 rounded-full px-4 py-2 text-gray-100 mr-2 text-sm hover:cursor-pointer hover:opacity-80">Đang chờ phong van </button>
      </div>
  </div>
  {/* <div className="flex flex-col flex-1 sm:pb-20 md:flex-row">
      <div className={`h-[calc(100vh_-_170px)] sm:h-[calc(100vh_-_200px)] px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedApplication ? "hidden md:flex" : "w-full"}`}> */}

<div className="flex flex-col flex-1 pb-[15px] sm:pb-20 md:flex-row">
      <div className={`relative h-[calc(100vh_-_400px)] sm:h-[calc(100vh_-_400px)]  px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedApplication ? "hidden md:flex" : "w-full"}`}>
        <ul>
        {applications ? 
          <>
          {applications.length ? applications.map((application) => (
            <ApplicationItem key={application.id} application={application} handleOnClick={handleClick} isSelected={selectedApplication && selectedApplication.id === application.id}/>
          ))
          
          : (
            <>
              <p>Không có dữ liệu. Hãy cố gắng lên nhé!</p>
            </>
          )}
          </>
          : <JobListSkeleton />
          }
        </ul>
        <div className="sticky bottom-0 z-3 bg-white flex items-center justify-center w-full py-2 md:py-4">
          {totalPages > 1 && currentPage && (
            <Pagination pageChangeCallback={() => {}} data={ {totalPages: totalPages, page: currentPage }}  />
          )}
        </div>
      </div>
      
      <div className="sm:p-4 md:w-2/3">
      {!showApplicationList &&  (
          <>
          <ApplicationDetail selectedApplication={selectedApplication} handleBackButton={handleBackButton} handleApplyButtonClick={handleApplyButtonClick} />
          {/* <ApplyScreen applicationId={selectedApplication?.id} isModalOpening={isModalOpening} closeModalCallBack={closeModalCallBack}/> */}
          <div className="sticky bottom-0 left-0 z-10 w-full p-4 bg-gray-100 border-t border-gray-200 sm:hidden">
            <div className="flex items-center justify-between">
              {/* <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600" onClick={handleApplyButtonClick}>Apply</button> */}
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