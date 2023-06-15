
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
import { ApplicationStatus } from '../../lib/const'

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
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);

  let page = searchParams.page;
  if(!page) page = 1;
  
  const applicationListRef = useRef(null);
  const scrollToFirstChild = () => {
    if(applicationListRef.current) {
      applicationListRef.current.firstChild.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [ totalPages, setTotalPages ] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [isMoving, setIsMoving] = useState(false);

  const [followedApplications, setFollowedApplications] = useState<any[]>([]);
  const [statusCount, setStatusCount] = useState({});
  const [specificApplication, setSpecificApplication] = useState<any>(false);

  const pathname = usePathname();
  const isActive = (status = "0") => {
    console.log("status is");

    console.log(status);
    let filteredStatus = searchParams.status;
    if(!filteredStatus) filteredStatus = "0";
    console.log(filteredStatus);
    console.log(status);
    return filteredStatus === status ? 'bg-gray-100' : 'bg-white';
  };

  const pageChangeCallback = () => {
    setIsMoving(true);
  }
  const handleApplicationItemClick = (application) => {
    setSelectedApplication(application);
    setShowApplicationList(false);
  }

  const path = usePathname();
  const router = useRouter();
  
  function handleBackButton() {
    setSelectedApplication(null);
    setShowApplicationList(true);
  }

  const callBackMethod = (totalPages, currentPage, statusCount) => {
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
    setStatusCount(statusCount);
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
    // console.log(searchParams);
    // if(searchParams) {
      // const params = new URLSearchParams(searchParams);
      // params.set('status', status);
      // params.delete('page');
    // }
    const newPath = `${currentPath}?status=${status}`;
    router.push(newPath);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page)
    let apiUrl = `http://localhost:3000/api/applications?${params.toString()}`;

    if(page > 0) {
      fetch(apiUrl)
      .then(response => response.json())
      .then(data =>  {
          callBackMethod(data.totalPages, data.page, data.statusCount);
          setApplications(data.applications);
          console.log("page is");

          console.log(page);
          if(page == 1 && data.specificApplication) {
            console.log("kakka");
            setSpecificApplication(data.specificApplication);
            handleApplicationItemClick(data.specificApplication);
            scrollToFirstChild();

            // if(!selectedApplication || (selectedApplication && selectedApplication.id == data.specificApplication.id)) {
            //   // setSpecificApplication(data.specificApplication);
            //   handleApplicationItemClick(data.specificApplication);
            // }
            
          } else {
            setSpecificApplication(false);
            // handleApplicationItemClick(data.specificApplication);
          }
        }).catch(error => {
          console.error(error)
        });
    }
    
  }, [page, searchParams]);


  let timeout= null;
  const handleSearchApplications = (event) => {
    clearTimeout(timeout); // Clear the previous timeout

    setApplications(undefined);

    
    const { value } = event.target;
    // setSearchTerm(value);

    // Set a new timeout to call the API after 1 second
    timeout = setTimeout(() => {

      fetch(`http://localhost:3000/api/applications?search=${value}`)
      .then(response => response.json())
      .then(data =>  {
        callBackMethod(data.totalPages, data.page, data.statusCount);
        setApplications(data.applications);
        console.log("page is");
        setSpecificApplication(false);
        // console.log(page);
        // if(page == 1 && data.specificApplication) {
        //   console.log("kakka");
        //   setSpecificApplication(data.specificApplication);
        //   handleApplicationItemClick(data.specificApplication);
        //   scrollToFirstChild();

        //   // if(!selectedApplication || (selectedApplication && selectedApplication.id == data.specificApplication.id)) {
        //   //   // setSpecificApplication(data.specificApplication);
        //   //   handleApplicationItemClick(data.specificApplication);
        //   // }
          
        // } else {
        //   setSpecificApplication(false);
        //   // handleApplicationItemClick(data.specificApplication);
        // }
      }).catch(error => {
        console.error(error)
      });
    }, 1000);
  };



  return (
<>
  <div className="flex-row sm:flex px-5 py-5">
      <div className="flex items-center justify-start flex-1 mb-4">
            <div className="flex items-center w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" name="name" placeholder="Search Email / Name"
                    className="w-full py-2 border-b-2 border-gray-400 outline-none focus:border-green-600"
                    onChange={handleSearchApplications} />
            </div>
        </div>
      <div className="flex items-center justify-center  ">
          {/* <span className='text-sm text-gray-600 mr-3'> Filter by Status </span> */}
          {statusCount && statusCount['0'] > 0 && Object.entries(statusCount).map(([index, count]) => (
              <>
              <button key={index} onClick={() => handleFilterStatus(index)} className={`${isActive(index)}
                flex items-center border text-gray-500 border-red-200 rounded-full p-1 pl-3 
                text-gray-800 mr-2 text-xs hover:cursor-pointer hover:opacity-80`}>
                {index === "0" ? 'All job' : ApplicationStatus.STATUS[index]}
                <span className="ml-2 bg-gray-300 text-gray-700 rounded-full w-6 h-6
                  flex items-center justify-center text-xs font-semibold  flex-shrink-0 min-w-[1.25rem]">
                  {count}
                </span>
                </button>
              </>
          ))}


          {/* <button onClick={() => handleFilterStatus(1)} className={`${isActive()}
            flex items-center border text-gray-500 border-red-200 rounded-full p-1 pl-3 
            text-gray-800 mr-2 text-xs hover:cursor-pointer hover:opacity-80 `}>
            All job
            <span className="ml-2 bg-gray-300 text-gray-700 rounded-full w-6 h-6
              flex items-center justify-center text-xs font-semibold  flex-shrink-0 min-w-[1.25rem]">
              {statusCount[0]}
            </span>
          </button>
          <button onClick={() => handleFilterStatus(1)} className={`${isActive(1)}
            flex items-center border text-gray-500 border-red-200 rounded-full p-1 pl-3 
            text-gray-800 mr-2 text-xs hover:cursor-pointer hover:opacity-80 `}>
            Đang chờ duyệt 
            <span className="ml-2 bg-gray-300 text-gray-700 rounded-full w-6 h-6
              flex items-center justify-center text-xs font-semibold  flex-shrink-0 min-w-[1.25rem]">
              {statusCount[1]}
            </span>

          </button>
          <button onClick={() => handleFilterStatus(2)} className={`${isActive(2)}
          border text-gray-500 border-green-200 rounded-full px-3 py-1
          text-gray-800 mr-2 text-xs hover:cursor-pointer hover:opacity-80`}>
            Đang chờ phong van
          </button> */}
      </div>
  </div>
  {/* <div className="flex flex-col flex-1 sm:pb-20 md:flex-row">
      <div className={`h-[calc(100vh_-_170px)] sm:h-[calc(100vh_-_200px)] px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedApplication ? "hidden md:flex" : "w-full"}`}> */}

<div className="flex flex-col flex-1 md:flex-row">
      <div className={`relative h-[calc(100vh_-_250px)] sm:h-[calc(100vh_-_200px)]  px-4 sm:px-4 md:w-1/3 flex-col  overflow-auto ${selectedApplication ? "hidden md:flex" : "w-full"}`}>
        <div ref={applicationListRef}>
        {specificApplication &&
            <ApplicationItem key={specificApplication.id} application={specificApplication} handleOnClick={handleApplicationItemClick} isSelected={selectedApplication && selectedApplication.id === specificApplication.id}/>
        }
        {applications ? 
          <>
          {applications.length ? applications.map((application) => {
              if (specificApplication && application.id === specificApplication.id) {
                return null; // Skip this application
              }

              return (
                <ApplicationItem
                  key={application.id}
                  application={application}
                  handleOnClick={handleApplicationItemClick}
                  isSelected={selectedApplication && selectedApplication.id === application.id}
                />
              );
            }) : (
              <>
                <p>Không có dữ liệu.</p>
              </>
            )}
     
          </>
          : <JobListSkeleton />
          }
        </div>
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
              <div className='flex'></div>
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