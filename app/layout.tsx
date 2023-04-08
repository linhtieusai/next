import "bootstrap/dist/css/bootstrap.css"
import ProvidersWrapper from './ProvidersWrapper'
import TopNavBar from '../components/TopNavBar'

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
        <TopNavBar />

          {children}
        </ProvidersWrapper>
      </body>
    </html>
  )
}
