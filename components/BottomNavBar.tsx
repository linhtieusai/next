'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNavBar = () => {
    const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path ? 'text-gray-900' : 'text-gray-600';
  };

  return (
    <>
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 sm:hidden">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className={`flex flex-col items-center justify-center w-full text-gray-600 hover:text-gray-900 ${isActive('/')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 14.828v9.172h18v-9.172l-9-8.375-9 8.375zm11 7.172h-4v-6h4v6zm10-9.852l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148z"/></svg>
              </div>
            </Link>
            <Link href="/viewed">
              <div className={`flex flex-col items-center justify-center w-full text-gray-600 hover:text-gray-900 ${isActive('/seen')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>

              </div>
            </Link>
            <Link href="/saved">
              <div className={`flex flex-col items-center justify-center w-full text-gray-600 hover:text-gray-900 ${isActive('/saved')}`}>
              <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"/>
                </svg>
                {/* <span className="ml-2">Saved</span> */}
                 </div>
            </Link>

            <Link href="/my-page">
              <div className={`flex flex-col items-center justify-center w-full text-gray-600 hover:text-gray-900 ${isActive('/my-page')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg>
                {/* <span className="ml-2">Profile</span> */}
            </div>
            </Link>
        </div>
        </div>
    </nav>
    </>
    );
  };

  export default BottomNavBar;