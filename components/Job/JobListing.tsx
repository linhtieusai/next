'use client';

import { useState, useEffect, useRef } from 'react';
import JobItem from './JobItem';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import { useRouter } from 'next/navigation';
import Loading from '../../ui/rendering-home-page-skeleton';
import { PrismaClient } from "@prisma/client";


function JobsList({ firstPage, moving, callBackMethod, callBackPageComplete }) {
  let [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const pathname = usePathname();

  const [isMoving, setIsMoving] = useState(moving);

  if(firstPage) {
    jobs = firstPage.jobs;

    callBackMethod(firstPage.totalPages, 1);
  }
  
  let page = Number(searchParams?.get("page"));

  if(!page) {
    page = 1;
  }

  useEffect(() => {
    setIsMoving(moving);
  }, [moving]);

  useEffect(() => {
    if(page > 1) {
      setLoading(true);
      fetch(`/api/jobs?page=${page}`)
      // fetch(`/api/jobs?page=${page}&itemsPerPage=${itemsPerPage}`)
        .then(response => response.json())
        .then(response => {
          setJobs(response.jobs);
          callBackMethod(response.totalPages, page);
          setLoading(false);

        // router.push(`?page=${page}`, undefined, { shallow: true });
      });
    }
    
}, [page]);

  // if (moving) {
  //   return <p>MOVING...</p>;
  // }

  return (
    <>
      {(isMoving || loading) ? "Movingggg" : "Not moving"}
      {/* <Loading /> */}
      <div className="relative grid grid-cols-1 gap-4 job-container sm:grid-cols-2" style={{ opacity: isMoving ? 0.5 : 1 }}>
        <Suspense fallback={<Loading />}>
        {jobs && jobs?.map((job) => (
            <></>
            // <JobItem key={job.id} job={job} />
          ))}
          </Suspense>
         {isMoving && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-20"></div>
            <div className="z-20">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
                <div className="h-9 w-9 rounded-full "></div>
              </div>
            </div>
          </div>
          )}
      </div>
    </>
  );
}

export default JobsList;