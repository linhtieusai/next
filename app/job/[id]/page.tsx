import { Suspense } from "react";

async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/job/${id}`);


  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

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
    <main>

      <Suspense fallback={<p>Loading feed...</p>}>
        <h1>job title 2</h1>
        <h1>{data.title}</h1>
        <p>{data.why_should_apply}</p>
        <p>{data.job_required_skill}</p>
        <h3>{data.company_address}</h3>
        <p>{data.company_description}</p>
      </Suspense>
      
    </main>
  );
}
