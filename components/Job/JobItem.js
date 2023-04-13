import Link from 'next/link';

export default function JobItem({ job }) {  
    return (
      <div key={job.id}>
        <Link href={`/job/${job.id}`}>
          <div className="p-6 bg-white rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="" alt="Job company logo" className="object-cover w-10 h-10 mr-3 rounded-full" />
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company_name}</p>
              </div>
            </div>
         </div>
          <p className="mt-4 text-gray-700">description</p>
          <div className="flex items-center mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18.66l5.54 1.855a1 1 0 0 0 1.31-1.31l-1.855-5.54A9 9 0 1 0 10 18.66zM5 10a5 5 0 1 1 10 0A5 5 0 0 1 5 10z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-600">Type</p>
          </div>
        </div>
        
        </Link>
        </div>
    );
  }
  