import Image from 'next/image'
import styles from './page.module.css'
import Login from '../../components/Login'
import JobSearchList from '../../components/Job/JobSearchList'
import Script from 'next/script'
// localhost:3000

import { PrismaClient } from "@prisma/client";

async function getFirstPage(page) {
  // const jobs = await fetch(`http://localhost:8000/api/jobs?page=${page}&itemsPerPage=10`, { cache: 'no-store' });
  // return await jobs.json();

  const prisma = new PrismaClient();
  const jobs = await prisma.job.findMany({take: 10, skip: (page-1) * 10});

  await prisma.$disconnect()
  return await jobs;
  

}

export default async function SearchPage({ searchParams }) {

  const jobs = await getFirstPage(1);
  console.log(jobs);
  // const firstPage = {jobs: jobs.jobs, totalPages: 10}
  const firstPage = {jobs: jobs, totalPages: 10}

  return (
    <>
    <div className="flex flex-col lg:flex-row">
    <div className="bg-gray-100 p-4 lg:w-1/3 lg:flex-initial lg:max-h-screen lg:overflow-y-scroll xl:h-screen-145">
        <h2 className="text-lg font-bold mb-4">Jobs</h2>
        <JobSearchList firstPage={firstPage}/>
      </div>
      <div className="lg:w-2/3 lg:ml-4">
        <h1>show job detail</h1>
      </div>
    </div>
    </>
   
  )
}
