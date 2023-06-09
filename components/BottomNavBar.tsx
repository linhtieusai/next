'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNavBar = () => {
    const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path ? 'text-green-700 hover:text-green-600' : 'text-gray-400 hover:text-gray-600';
  };

  return (
    <>
    <nav className="flex items-center justify-between h-16 border-t border-gray-200 sm:hidden">
            <Link href="/" className='flex flex-grow h-100'>
              <div className={`flex flex-col items-center justify-center  w-full ${isActive('/')}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path stroke="currentColor" fill="currentColor" d="M3 14.828v9.172h18v-9.172l-9-8.375-9 8.375zm11 7.172h-4v-6h4v6zm10-9.852l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148z"/>
                  </svg>
                  <span className="text-xs">Home</span>
              </div>
            </Link>
            <Link href="/viewed" className='flex flex-grow h-100'>
              <div className={`flex flex-col items-center justify-center w-full ${isActive('/viewed')}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path stroke="currentColor" fill="currentColor" d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                </svg>
                <span className="text-xs">Đã xem</span>
              </div>
            </Link>
            <div className={`flex flex-grow flex-col hover:cursor-pointer items-center justify-center h-100 ${isActive('/search')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"/>
              </svg>
              <span className="text-xs">Tìm kiếm</span>
            </div>
            <Link href="/followed"  className='flex flex-grow h-100'>
              <div className={`flex flex-col items-center justify-center w-full ${isActive('/followed')}`}>
                <svg clipRule="evenodd" fillRule="evenodd" width="24" height="24" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" fill="currentColor" d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/>
                </svg>
                <span className="text-xs">Followed</span>
              </div>
            </Link>

            <Link href="/my-page"  className='flex flex-grow h-100'>
              <div className={`flex flex-col items-center justify-center w-full ${isActive('/my-page')}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path stroke="currentColor" fill="currentColor" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/>
                </svg>
                <span className="text-xs">Profile</span>
            </div>
            </Link>
    </nav>
    </>
    );
  };

  export default BottomNavBar;