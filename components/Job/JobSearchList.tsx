'use client';

import { useState, useEffect, useRef } from 'react';
import JobItem from './JobItem';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import { useRouter } from 'next/navigation';
import Loading from '../../ui/rendering-home-page-skeleton';
import { PrismaClient } from "@prisma/client";


function JobsList({ firstPage }) {
  let [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const pathname = usePathname();

  if(firstPage) {
    jobs = firstPage.jobs;
  }
  
  
  let page = Number(searchParams?.get("page"));

  if(!page) {
    page = 1;
  }


  // useEffect(() => {

  //   console.log("use effect moving");
  //   setIsMoving(moving);
  // }, [moving]);

  useEffect(() => {

    console.log("use effect");
  }, []);

//   useEffect(() => {
//     if(page > 1) {
//       setLoading(true);
//     fetch(`/api/jobs?page=${page}`)
//     // fetch(`/api/jobs?page=${page}&itemsPerPage=${itemsPerPage}`)
//       .then(response => response.json())
//       .then(response => {
//         setJobs(response.jobs);
//         callBackMethod(response.totalPages, page);
//         setLoading(false);

//         // router.push(`?page=${page}`, undefined, { shallow: true });
//       });
//     }
    
// }, [page]);

  // if (moving) {
  //   return <p>MOVING...</p>;
  // }

  return (
    <>
      {/* {(isMoving || loading) ? "Movingggg" : "Not moving"} */}
      {/* <Loading /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        <Suspense fallback={<Loading />}>
        {jobs && jobs?.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
          </Suspense>
      </div>
    </>
  );
}

export default JobsList;