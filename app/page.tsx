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
  const jobs = await prisma.job.findMany({
    take: 10, 
    skip: (page - 1) * 10,
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });

  const data = await prisma.$transaction([
    prisma.job.count({
      // where: {
      //   [column]: {
      //     mode: 'insensitive',
      //     contains: searchQuery,
      //   },
      // },
    }),
    prisma.job.findMany({
      take: 10, 
      skip: (page - 1) * 10,
      orderBy: [
        {
          id: 'desc',
        },
      ],
    })
  ]);

  await prisma.$disconnect()
  
  return {
    jobs: data[1],
    page: page,
    totalPages: Math.ceil((data[0] ?? 0) / 10)
  };

}
export const dynamic = 'auto'

export default async function Home({ searchParams }) {
  var page = searchParams.page;
  if(!page) {
    page = 1;
  }

  const jobData = await getFirstPage(page);
  const firstPageData = {jobs: jobData.jobs, totalPages: jobData.totalPages, page: jobData.page};

  
  console.log("page is");
  console.log(page);

  // console.log(firstPageData);

  
  // console.log("first page is");
  // console.log(firstPage.jobs);
  return (
    <>
    <JobSearch firstPageData={firstPageData} moving={false} />
      {/* <CollapsibleSiderBar>
        <SearchPage />
      </CollapsibleSiderBar> */}
    </>
   
  )
}
