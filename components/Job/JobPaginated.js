
import JobItem from './JobItem';

import { useRouter } from 'next/navigation';
import { Suspense } from "react";


async function getJobList() {
  var page = 1;
  const res = await fetch(`http://localhost:3000/api/jobs?page=${page}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}

async function JobsList() {
  const data = await getJobList();
  const jobs = data?.jobs;
  const totalPages = data?.totalPages;
  const page = 1;

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
    </>
  );
}

export default JobsList;