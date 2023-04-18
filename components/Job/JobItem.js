import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

export default function JobItem({ job }) {  
    return (
      <div key={job.id}>
        <Link href={`/job/${job.id}`}>
          <div className="p-6 bg-white rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Image src={`/company_logo/${job.source_site}/${job.source_id}.jpg`} alt="me" width="100" height="100" className="object-cover mr-3 rounded-full"/>
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company_name}</p>
              </div>
            </div>
         </div>
          <p className="mt-4 text-gray-700">{job.gross_month_salary}</p>
          <div className="flex items-center mt-4">
            <p className="text-gray-600">Test</p>
          </div>
        </div>
        
        </Link>
        </div>
    );
  }
  