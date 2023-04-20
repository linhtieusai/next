import Image from 'next/image'
import styles from './page.module.css'
import Login from '../components/Login'
import JobList from '../components/Job/JobList'
import Script from 'next/script'
// localhost:3000

import { PrismaClient } from "@prisma/client";

async function getFirstPage() {
  // const res = await fetch(`http://localhost:3000/api/job/${id}`);
  const prisma = new PrismaClient();
  const jobs = await prisma.job.findMany({take: 10});

  await prisma.$disconnect()
  
  return jobs;

}

export default async function Home({ searchParams }) {
  const jobs = await getFirstPage();
  const firstPage = {jobs: jobs, totalPages: 10}
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
