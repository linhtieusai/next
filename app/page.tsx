import Image from 'next/image'
import styles from './page.module.css'
import Login from '../components/Login'
import JobList from '../components/Job/JobList'
import JobSearch from '../components/Job/JobSearch'
import Script from 'next/script'
// localhost:3000
import CollapsibleSiderBar from '../components/CollapsibleSideBar'
import SearchPage  from './search/page'

import { PrismaClient } from "@prisma/client";

async function getFirstPage(page) {
  // const res = await fetch(`http://localhost:3000/api/job/${id}`);
  const prisma = new PrismaClient();
  const jobs = await prisma.job.findMany({take: 10, skip: (page - 1) * 10 });

  await prisma.$disconnect()
  
  return jobs;

}
export const dynamic = 'auto'

export default async function Home({ searchParams }) {
  var page = searchParams.page;
  if(!page) {
    page = 1;
  }

  const jobs = await getFirstPage(page);
  const firstPage = {jobs: jobs, totalPages: 10}

  
  console.log("page is");
  console.log(page);

  
  // console.log("first page is");
  // console.log(firstPage.jobs);
  return (
    <>
    <JobSearch firstPage={firstPage} page={page} />
      {/* <CollapsibleSiderBar>
        <SearchPage />
      </CollapsibleSiderBar> */}
    </>
   
  )
}
