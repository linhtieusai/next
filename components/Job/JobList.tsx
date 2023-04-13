'use client';

import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import JobItem from './JobItem';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  var page = parseInt(searchParams.get("page"));
  if(!page) {
    page = 1;
  }

  console.log(page);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/jobs?page=${currentPage}`)
    // fetch(`/api/jobs?page=${page}&itemsPerPage=${itemsPerPage}`)

      .then(response => response.json())
      .then(response => {
        setJobs(response.jobs);
        setTotalPages(response.totalPages);
        setLoading(false);
      });
  }, [currentPage, totalPages]);

  function handleChangePage(event, value) {
    setCurrentPage(value);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        {jobs?.map((job) => (
            <JobItem key={job.id} job={job} />  
            // <Grid item key={job.id} xs={12} md={6} lg={4}>
            //   <Card>
            //     <CardHeader title={job.title} subheader={job.location} />
            //     <CardContent>
            //       <p>{job.description}</p>
            //       <p>Salary: {job.salary}</p>
            //     </CardContent>
            //     <CardActions>
            //       <Button variant="contained" color="primary">Apply</Button>
            //     </CardActions>
            //   </Card>
            // </Grid>
          ))}
      </Suspense>
      <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} shape="rounded" />
    </>
  );
}

export default JobsList;