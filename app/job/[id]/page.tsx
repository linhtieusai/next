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

  return job;
}

export async function generateStaticParams() {
  // const posts = await fetch('http://localhost:3000/api/jobAll').then((res) => res.json());

  const prisma = new PrismaClient();
  const posts = await prisma.job.findMany();

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
    <Suspense fallback={<RenderingPageSkeleton />}>
    <div className="flex-grow">
        <h1>job title 2</h1>
        <h1>{data?.title}</h1>
        <p>{data?.why_should_apply}</p>
        <p>{data?.job_required_skill}</p>
        <h3>{data?.company_address}</h3>
        <p>{data?.company_description}</p>
      </div>
    </Suspense>
      <FixedBottomBar jobId={id} />
    </div>

    </>
    
  );
}


