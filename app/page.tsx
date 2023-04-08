import Image from 'next/image'
import styles from './page.module.css'
import Login from './Login'
import JobList from '../components/Job/JobList'

// localhost:3000

export default function Home() {
  return (
    <div style={{width: "500px", margin: "0 auto", paddingTop: "30px"}}>
      <h3>Login Website</h3>
      <Login />
      <JobList />
    </div>
  )
}
