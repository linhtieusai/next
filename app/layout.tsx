import "bootstrap/dist/css/bootstrap.css"
//import tailwind
import './globals.css';
import ProvidersWrapper from './ProvidersWrapper'
import TopNavBar from '../components/TopNavBar'
import BottomNavBar from "../components/BottomNavBar";

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
        <div>
          <TopNavBar />
            <main className="container px-4 mx-auto ml-4">
              {children}
              </main>
            <BottomNavBar />
          </div>
        </ProvidersWrapper>
      </body>
    </html>
  )
}
