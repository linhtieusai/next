'use client';

import { useState, useEffect, useRef } from 'react';
import JobItem from './JobItem';
import Loading from './Loading';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from "react";

function JobsList({ moving, callBackMethod, callBackPageComplete }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const pathname = usePathname();

  const [isMoving, setIsMoving] = useState(moving);

  var page = searchParams?.get("page");
  page = parseInt(page);

  if(!page) {
     page = 1;
  }

  useEffect(() => {
    setIsMoving(moving);
  }, [moving]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/jobs?page=${page}`)
    // fetch(`/api/jobs?page=${page}&itemsPerPage=${itemsPerPage}`)

      .then(response => response.json())
      .then(response => {
        setJobs(response.jobs);
        callBackMethod(response.totalPages, page);
        setLoading(false);
        // router.push(`?page=${page}`, undefined, { shallow: true });
      }, [page]);

  }, [page]);

  // if (moving) {
  //   return <p>MOVING...</p>;
  // }

  return (
    <>
      {(isMoving || loading) ? "Movingggg" : "Not moving"}
      {/* <Loading /> */}
      <Suspense fallback={<p>Loading feed...</p>}>
      <div className="relative grid grid-cols-1 gap-4 job-container sm:grid-cols-2" style={{ opacity: isMoving ? 0.5 : 1 }}>
        {jobs?.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
         {isMoving && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-50"></div>
            <div className="z-20">
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
        )}
      </div>
      </Suspense>
    </>
  );
}

export default JobsList;