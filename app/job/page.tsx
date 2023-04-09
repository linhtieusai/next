import JobList from '../../components/Job/JobList'


export default function Home() {
    return (
      <div style={{width: "500px", margin: "0 auto", paddingTop: "30px"}}>
        <h3>joblist Website</h3>
        {/* @ts-expect-error Server Component */}
        <JobList />
      </div>
    )
  }