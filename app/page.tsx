import Image from 'next/image'
import styles from './page.module.css'
import Login from '../components/Login'
import JobList from '../components/Job/JobList'
import Script from 'next/script'
// localhost:3000
import CollapsibleSiderBar from '../components/CollapsibleSideBar'
import SearchPage  from './search/page'

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
      <CollapsibleSiderBar children={<SearchPage />} />
    </>
   
  )
}
