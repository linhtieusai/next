'use client';

import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import JobListing from './JobListing';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

function JobsList(props) {
  const [ totalPages, setTotalPages ] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [moving, setMoving] = useState(false);

  const route = useRouter();

  function handleChangePage(event, value) {
    console.log("okokokokokok");
    setMoving(true);
    route.push(`?page=${value}`);
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
        <JobListing moving={moving}  callBackMethod={callBackMethod} callBackPageComplete={callBackPageComplete} />
      </Suspense>
      <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} shape="rounded" />
    </>
  );
}

export default JobsList;