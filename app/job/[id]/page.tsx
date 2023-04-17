import { Suspense } from "react";
import FixedBottomBar from './../../../components/JobDetail/FixedBottomBar';
import RenderingPageSkeleton from '../../../ui/rendering-job-detail-skeleton';

async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/job/${id}`);
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}

export async function generateStaticParams() {
  const posts = await fetch('http://localhost:3000/api/jobAll').then((res) => res.json());

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
    <div className="flex-grow">
        <h1>job title 2</h1>
        <h1>{data.title}</h1>
        <p>{data.why_should_apply}</p>
        <p>{data.job_required_skill}</p>
        <h3>{data.company_address}</h3>
        <p>{data.company_description}</p>
      </div>
      <FixedBottomBar jobId={id} />
    </div>
    </>
    
  );
}


