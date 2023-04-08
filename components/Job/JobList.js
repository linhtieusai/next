import JobItem from  "./JobItem";
import { use } from "react"

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/jobs`);

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}
 

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <ul>
      {data?.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
      </ul>
    </main>
  );
}
