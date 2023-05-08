'use client';

import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import JobListing from './JobListing';
import { useRouter } from 'next/navigation';
import { useSearchParams, usePathname  } from 'next/navigation';
import { Suspense } from "react";

function JobsList({ firstPage }) {
  const [ totalPages, setTotalPages ] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [moving, setMoving] = useState(false);

  const pathname = usePathname();

  const route = useRouter();

  function handleChangePage(event, value) {
    setMoving(true);
    route.push(`${pathname}?page=${value}`);
  }

  const callBackMethod = (totalPages, currentPage) => {
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
    setMoving(false);
  }

  const callBackPageComplete = () => {
    // setMoving(false);
  }

  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        <JobListing firstPage={firstPage} moving={moving}  callBackMethod={callBackMethod} callBackPageComplete={callBackPageComplete} />
        <Pagination />
      </Suspense>
    </>
  );
}

export default JobsList;