import Image from 'next/image'
import styles from './page.module.css'
import Login from '../components/Login'
import JobList from '../components/Job/JobList'

// localhost:3000
export default function Home({ searchParams }) {
  // console.log(searchParams);
  return (
    <div style={{width: "500px", margin: "0 auto", paddingTop: "30px"}}>
      <h3>Login Website</h3>
      <JobList page={searchParams.page} />
    </div>
  )
}
