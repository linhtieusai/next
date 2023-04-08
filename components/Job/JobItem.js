import Link from 'next/link';

export default function JobItem({ job }) {  
    return (
      <li key={job.id}>
        <Link href={`/job/${job.id}`}>{job.title}</Link>
        <h1>{job.title}</h1>
      </li>
    );
  }
  