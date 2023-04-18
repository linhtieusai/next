import { Suspense } from "react";
import FixedBottomBar from './../../../components/JobDetail/FixedBottomBar';
import RenderingPageSkeleton from '../../../ui/rendering-job-detail-skeleton';
import { PrismaClient } from "@prisma/client";

async function getData(id: string) {
  // const res = await fetch(`http://localhost:3000/api/job/${id}`);
  const prisma = new PrismaClient();
  const job = await prisma.job.findUnique({
    where: {
      id: parseInt(id),
    }
  });
  // Recommendation: handle errors
  if (!job) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  await prisma.$disconnect()

  return job;
}

export async function generateStaticParams() {
  // const posts = await fetch('http://localhost:3000/api/jobAll').then((res) => res.json());

  const prisma = new PrismaClient();
  const posts = await prisma.job.findMany();
  await prisma.$disconnect()
  
  return posts?.map((post) => ({
    id: post.id.toString(),
  }));
}


export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getData(id);

  return (
    <>
    <script src="https://accounts.google.com/gsi/client" async defer></script>

    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 bg-white">
      <h1 className="min-w-0 px-4 py-4 text-2xl font-bold sm:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl">Job Title: {data?.title}</h1>
      </div>
      <div className="flex-grow pt-16">
        <h3>Job overview</h3>
        <p className="whitespace-pre-wrap">{data?.job_overview}</p>
        <h3>Job Responsibilites</h3>
        <p className="whitespace-pre-wrap">{data?.job_responsibility}</p>
        
        <h3>Required Skill</h3>
        <p className="whitespace-pre-wrap">{data?.job_required_skill}</p>
        <h3>Preferred</h3>
        <p className="whitespace-pre-wrap">{data?.preferred_skill}</p>
        <h3>Why you should Apply?</h3>
        <p className="whitespace-pre-wrap">{data?.why_should_apply}</p>
        
        <h3>About {data?.company_name}</h3>
        <p className="mb-2 text-xl font-bold">Company Address: {data?.company_address}</p>
        <p className="whitespace-pre-wrap">{data?.company_description}</p>
      </div>
      <FixedBottomBar jobId={id} />
    </div>

    </>
    
  );
}


