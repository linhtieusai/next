import Image from 'next/image'
import styles from './page.module.css'
import Login from '../components/Login'
import JobList from '../components/Job/JobList'
import Script from 'next/script'
// localhost:3000
export default function Home({ searchParams }) {
  return (
    <>
    <Script src="dist/typesense.min.js"></Script>
    <div className="py-8">
        <div className="container max-w-5xl px-4 mx-auto">
          <h3>Login Website</h3>

            <h1 className="text-3xl font-bold underline">
            Hello, Next.js!
          </h1>
          <JobList />
       </div>
      </div>
    </>
   
  )
}
