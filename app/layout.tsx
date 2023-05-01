// import "bootstrap/dist/css/bootstrap.css"
//import tailwind
import './globals.css';
import ProvidersWrapper from './ProvidersWrapper'
import TopNavBar from '../components/TopNavBar'
import SideBar from '../components/SideBar'
import BottomNavBar from "../components/BottomNavBar";
import Link from "next/link";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ProvidersWrapper>
        <main className="flex flex-col h-screen">
          <div className="flex flex-1 overflow-hidden">
              {/* sidebar */}
            <SideBar />

            <div className="flex flex-col flex-1">
              <TopNavBar />
              <div className="flex flex-col sm:px-4">
                  {children}
              </div>
            </div>
          </div>
          <BottomNavBar />
        </main>
        </ProvidersWrapper>
      </body>
    </html>
  )
}
