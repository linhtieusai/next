import Image from 'next/image'
import styles from './page.module.css'
import Login from '../../components/Login'
import JobList from '../../components/Job/JobList'
import Script from 'next/script'
// localhost:3000

import { PrismaClient } from "@prisma/client";

async function getFirstPage(page) {
  const jobs = await fetch(`http://localhost:8000/api/jobs?page=${page}&itemsPerPage=10`, { cache: 'no-store' });
  // const prisma = new PrismaClient();
  // const jobs = await prisma.job.findMany({take: Math.floor(Math.random() * 9)});

  // await prisma.$disconnect()
  
  return await jobs.json();

}

export default async function Home({ searchParams }) {

  const jobs = await getFirstPage(searchParams.page);
  console.log(jobs);
  const firstPage = {jobs: jobs.jobs, totalPages: 10}
  return (
    <>
    <div className="py-8">
        <div className="container max-w-5xl px-4 mx-auto">
          <h3>Login Website</h3>

            <h1 className="text-3xl font-bold underline">
            Hello, Next.js!
          </h1>
          <JobList firstPage={firstPage}/>
       </div>
      </div>
    </>
   
  )
}
