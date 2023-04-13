import Image from 'next/image'
import styles from './page.module.css'
import Login from '../components/Login'
import JobList from '../components/Job/JobList'


// localhost:3000
export default function Home({ searchParams }) {
  return (
    <>
    
    <script src="https://accounts.google.com/gsi/client" async defer></script>

    <div style={{width: "500px", margin: "0 auto", paddingTop: "30px"}}>
      <h3>Login Website</h3>

      <h1 className="text-3xl font-bold underline">
      Hello, Next.js!
    </h1>

      {/* @ts-expect-error Server Component */}
      <JobList page={searchParams.page} />
    </div>
    </>
   
  )
}
