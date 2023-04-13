'use client';

import { useState, useEffect, useRef } from 'react';
import JobItem from './JobItem';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

function JobsList({ moving, callBackMethod }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [isMoving, setIsMoving] = useState(moving);

  var page = searchParams?.get("page");
  page = parseInt(page);

  if(!page) {
     page = 1;
  }

  console.log("moving" );
  console.log(moving);


  useEffect(() => {

    console.log("setting MOVING00");
    console.log(moving);
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
        setIsMoving(false);
        // router.push(`?page=${page}`, undefined, { shallow: true });

      }, [page]);


  }, [page, callBackMethod]);

  // if (moving) {
  //   return <p>MOVING...</p>;
  // }

  return (
    <>
      {isMoving ? "Movingggg" : "Not moving"}
      {/* <Loading /> */}
      <Suspense fallback={<p>Loading feed...</p>}>
        {jobs?.map((job) => (
            <JobItem key={job.id} job={job} />  
          ))}
      </Suspense>
    </>
  );
}

export default JobsList;